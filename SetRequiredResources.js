angular.module('platformModule').factory('SetRequiredResources', ['$rootScope', 'w6dialogService', '$q', 'w6serverServices',
    function ($rootScope, w6dialogService, $q, w6serverServices) {
        var w6activeAction = {};
        var options = {}
        var selectedTask = [];
        options.title = 'Set Required Resource';
        options.bodyUrl = '../SO/api/content/PS_Ameren_CS/SetRequiredResourcesUI.html/';
        options.icon = 'none';
        options.buttons = [{
                label: 'Set Required Resource',
                kind: 'primary',
                action: function () {
                    // console.log('you clicked Set RequiredResource button');
                    $rootScope.$broadcast('set_req_resource', selectedTask);
                }
            },
            {
                label: 'Cancel'
            }
        ];

        w6activeAction.canInvoke = function (selectedObjects) {
            if (selectedObjects.length > 0) {
                return true;
            } else {
                return false;
            }
        };

        w6activeAction.invoke = function (selectedObjects) {
            var returnPromise = $q.defer();
            var updatedObjects = selectedObjects;
            selectedTask = [];
            //update ScheduleToTech property on each Task
            updatedObjects.forEach(function (item) {
                selectedTask.push(item);
            })
            w6dialogService.show(options);
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
            var options = {};
            options.title = 'Create Helper Task';
            options.body = errorMessage;
            w6dialogService.error(options);
        }

        function showMessage(message) {
            var options = {};
            options.icon = 'none';
            options.title = 'Create Helper Task';
            options.body = message;
            w6dialogService.show(options);
        }

        var api = {
            showError: showError,
            showMessage: showMessage
        }
        return api;
    }
]);


define(['modules/platform/platformModule'], function () {
    angular.module('platformModule').controller('SetRequiredResourceUIController', ['DialogHelper', '$resource', 'ScheduleApiProvider', '$scope', '$modal', '$q', 'w6serverServices',
        function (DialogHelper, $resource, ScheduleApiProvider, $scope, $modal, $q, w6serverServices) {
            $scope.selectedEnggs = null;
            $scope.selectedEngg = null;
            $scope.selectedTasks = [];
            var returnPromise = $q.defer();
            $scope.init = function () {
                // console.log('in init function SetRequiredResourceUIController');
                var engg = ScheduleApiProvider.getGanttLoadedResources();
                $scope.selectedEnggs = engg;
            };


            $scope.$on('set_req_resource', function (event, data) {
                if ($scope.selectedEngg === null || $scope.selectedEngg === '') {
                    console.log('ask user to select the engineer');
                    DialogHelper.showMessage("No engineer is selected");
                    return;
                }


                var UpdateTasks = [];
                // console.log('in set_req_resource');
                $scope.selectedTasks = [];
                $scope.selectedTasks = data;
                // console.log($scope.selectedTasks[0]);
                // console.log($scope.selectedEngg);
                $scope.selectedTasks.forEach(function (item) {
                    item = {
                        "@objectType": "Task",
                        "Key": item.Key,
                        "RequiredEngineers": [{
                            Key: $scope.selectedEngg
                        }]
                    };
                    UpdateTasks.push(item);

                })
                w6serverServices.updateObjects('Task', UpdateTasks)
                    .$promise.then(function () {
                        returnPromise.resolve({
                            result: null,
                            shouldRefreshData: true,
                            shouldRefreshCount: false
                        });
                    }),
                    function (error) {
                        returnPromise.reject(error);
                    };
                return returnPromise.promise;

            });
        }


    ]);

});