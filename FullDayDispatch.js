//entry point for configuraion 
angular.module('platformModule').factory('FullDayDispatch', ['$rootScope', 'w6dialogService', '$q', 'w6serverServices',
    function ($rootScope, w6dialogService, $q, w6serverServices) {
        var w6activeAction = {};
        var options = {};
        var engineer;
        var popWindow = null;
        //setup the dialog options
        options.title = 'Full Day Dispatch';
        options.bodyUrl = '../SO/api/content/PS_Ameren_CS/FullDayDispatchUI.html/';
        options.icon = 'none';
        options.buttons = [{
                label: "Full Day Dispatch",
                kind: 'primary',
                stayOpen: true,
                action: function () {
                    // broadcast the event 
                    // console.log(popWindow);
                    $rootScope.$broadcast('full_day_dispatch_event', {
                        engineer: engineer,
                        popWindow: popWindow
                    });
                }
            },
            {
                label: 'Cancel'
            }
        ];

        // can the action be invoked
        w6activeAction.canInvoke = function (selectedObjects) {
            if (angular.isArray(selectedObjects)) {
                if (selectedObjects.length == 1) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        };

        //actual invocation
        w6activeAction.invoke = function (selectedObjects) {
            var returnPromise = $q.defer();
            try {
                if (angular.isArray(selectedObjects))
                    engineer = selectedObjects[0];
                else
                    engineer = selectedObjects;
                console.log(engineer);
            } catch (error) {
                console.log(error);
            }
            popWindow = w6dialogService.show(options);
            return returnPromise.promise;
        };
        return w6activeAction;
    }
]);

// helper factory to show popup messages
// todo: move it to common place
angular.module('platformModule').factory('DialogHelper', ['$q', 'w6dialogService',
    function ($q, w6dialogService) {
        function showError(errorMessage) {
            var options = {}
            options.title = 'Create Helper Task';
            options.body = errorMessage;
            w6dialogService.error(options);
        }

        function showMessage(message) {
            var options = {}
            options.title = 'Create Helper Task';
            options.body = message;
            options.icon = 'none';
            w6dialogService.show(options);
        }

        var api = {
            showError: showError,
            showMessage: showMessage
        }
        return api;
    }
]);

//main controller for managing the UI
define(['modules/platform/platformModule'], function () {
    angular.module('platformModule').controller('FullDayDispatchController', ['w6dialogService', '$http', '$rootScope', 'FullDayDispatch', '$scope', '$modal', '$q', 'w6serverServices',
        function (w6dialogService, $http, $rootScope, FullDayDispatch, $scope, $modal, $q, w6serverServices) {
            $scope.dateString = '';
            $scope.dateObject = new Date();
            $scope.showProgress = false;
            $scope.popupWindow = null;

            $scope.init = function () {
                // console.log('in init function');
            }

            //needed for kendo date picker
            $scope.getType = function (x) {
                return typeof x;
            };

            //needed for kendo date picker
            $scope.isDate = function (x) {
                return x instanceof Date;
            };

            //utility function to add the days
            $scope.addDays = function (date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }

            $scope.prependZero = function (num) {
                if (parseInt(num) < 10) {
                    return "0" + num;
                }
                return num;
            }

            //main method to dispatch the tasks
            function fullDayDispatch(engineer) {

                //make sure correct date is selected
                if ($scope.dateObject === null) {
                    $scope.hasError = true;
                    $scope.errMessage = 'Invalid date is selected';
                    return;
                } else {
                    $scope.hasError = true;
                    $scope.errMessage = '';
                }

                //get the date range
                var sDate = $scope.dateObject;
                var sDateTo = $scope.addDays($scope.dateObject, 1);
                var curr_date = sDate.getDate();
                var curr_month = sDate.getMonth() + 1; //Months are zero based
                var curr_year = sDate.getFullYear();
                var strDateFrom = sDate.getFullYear() + "-" + $scope.prependZero((parseInt(sDate.getMonth()) + 1)) + "-" + $scope.prependZero(sDate.getDate());
                var strDateTo = sDateTo.getFullYear() + "-" + $scope.prependZero((parseInt(sDateTo.getMonth()) + 1)) + "-" + $scope.prependZero(sDateTo.getDate());

                //prepare the query to fetch the records
                var filterDateString = ' (AssignmentStart gt ' + strDateFrom + ') and (AssignmentStart lt ' + strDateTo + ')'
                var request = w6serverServices.getObjects("Task", {
                    filter: "(AssignedEngineer/Name eq '" + engineer.Name + "') and (Status/Name eq 'Scheduled') and " + filterDateString,
                    requestedProperties: 'Key,Status,CallID,Number,Revision'
                }, false);

                //send request and process the result
                request.$promise.then(
                    function (data) {
                        var count = 0;
                        $scope.toDispatch = '';
                        $scope.showDispatchMsg = true;
                        $scope.showProgress = true;
                        $scope.numberOftaskToDispatch = 0;

                        //check how many task needs to be dispatched 
                        if (data !== null) {
                            $scope.numberOftaskToDispatch = data.length;
                            if ($scope.numberOftaskToDispatch === 0) {
                                $scope.toDispatch = 'No task to dispatch';
                                $scope.showDispatchMsg = false;
                                $scope.showProgress = false;
                                $scope.popupWindow.close();
                            } else if ($scope.numberOftaskToDispatch === 1) {
                                $scope.toDispatch = 'Number of task to dispatch = ' + $scope.numberOftaskToDispatch;
                            } else {
                                $scope.toDispatch = 'Number of tasks to dispatch = ' + $scope.numberOftaskToDispatch;
                            }
                        }

                        //this variable is to keep track of the number of dispatched tasks 
                        $scope.succesCount = 0;

                        //dispatch tasks one by one
                        angular.forEach(data, function (value, key) {
                            var taskKey = value.Key;
                            var objToModity = {
                                "@objectType": "Task",
                                "Key": taskKey,
                                "CallID": value.CallID,
                                "Number": value.Number,
                                "Revision": value.Revision,
                                "Status": {
                                    "Name": "Dispatched"
                                }
                            };
                            //create update request - to dispatch a task
                            var updateRequest = w6serverServices.updateObject("Task", objToModity, 0);
                            updateRequest.$promise.then(
                                function (data) {
                                    //request succeeded - task dispatched
                                    $scope.succesCount = $scope.succesCount + 1;
                                    if ($scope.succesCount === $scope.numberOftaskToDispatch) {
                                        //all tasks are dispatched
                                        $scope.showProgress = false;
                                        $scope.popupWindow.close();
                                        $scope.toDispatch = 'All tasks are dispatched';
                                    }
                                },
                                function (error) {
                                    console.log('Could not update the task with key = ' + taskKey);
                                }
                            );
                        });
                    },
                    function (error) {
                        console.log('could not fetch data', error);
                    }
                );
            }

            // handle the event triggered by the action
            $scope.$on('full_day_dispatch_event', function (event, data) {
                $scope.popupWindow = data.popWindow;
                fullDayDispatch(data.engineer);
            });
        }
    ]);
});