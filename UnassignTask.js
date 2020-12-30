    angular.module('platformModule').factory('UnassignTask', ['w6serverServices', 'w6dialogService', '$q', '$filter',
        function (w6serverServices, w6dialogService, $q, $filter) {
            var w6customAction = {};
            w6customAction.canInvoke = function (selectedObjects) {
                //Check if to enable action

                if (selectedObjects.length > 0) {
                    
                        if(selectedObjects[0].Status["@DisplayString"]==="Rejected")
                        {
					        return true;                   
					    }
                
                }
            };

            w6customAction.invoke = function (selectedObjects) {
                var returnPromise = $q.defer();
                if (selectedObjects.length > 1) {
                    var options = {}
                    options.title = 'Error';
                    options.body = 'More than one task(s) is selected. Please select only one task';
                    options.buttons = [{
                        label: 'Ok',
                        kind: 'primary'
                    }];
                    w6dialogService.show(options);
                } else {
                    var selectedTask = selectedObjects[0];
                    var selectedTask = {
                        "@objectType": "Task",
                        "Key": selectedObjects[0].Key,
                        "Status": {
                            "Name": "Unassigned"
                        }
                    };
                    var updateRequest = w6serverServices.updateObject("Task", selectedTask);
                    updateRequest.$promise.then(function () {
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
                }
            };
            return w6customAction;
        }
    ]);