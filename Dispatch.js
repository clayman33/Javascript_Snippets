 angular.module('platformModule').factory('DispatchTask', ['w6serverServices', 'w6dialogService', '$q', '$filter',
        function (w6serverServices, w6dialogService, $q, $filter) {
            var w6customAction = {};
            w6customAction.canInvoke = function (selectedObjects) {
                //Check if to enable action

                if (selectedObjects.length = 1) {                  
if(selectedObjects[0].Status["@DisplayString"]==="Scheduled")
{
					  return true;                   
					  }
                }
            };

            w6customAction.invoke = function (selectedObject) {
                var returnPromise = $q.defer();
          var selectedTask;
                 if (angular.isArray(selectedObject))

                       selectedTask = selectedObject[0];

                  else
                    selectedTask = selectedObject;
                    selectedTask = {
                        "@objectType": "Task",
                        "Key": selectedTask.Key,
                        "Status": {
							  "Name": "Dispatched"  
                        },
						  "CallID": selectedTask.CallID,
                           "Number": selectedTask.Number
                    };
                    var updateRequest = w6serverServices.updateObject("Task", selectedTask);
                    updateRequest.$promise.then(function () {
                               returnPromise.resolve({ result: null, shouldRefreshData: true, shouldRefreshCount: false });
                        }),
                        function (error) {
                            returnPromise.reject(error);
                        };
                    return returnPromise.promise;
                };
           
            return w6customAction;
        }
    ]);
