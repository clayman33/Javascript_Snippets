angular.module('platformModule').factory('P2_FSEChangeTaskStatus', ['$q', 'w6serverServices','w6dialogService', function ($q, w6serverServices,w6dialogService) {

            var w6activeAction = {};
        
      w6activeAction.canInvoke = function (selectedObjects) 
      {
        if (angular.isArray(selectedObjects))
            {
                if (selectedObjects.length == 1)
                    {
                        if((selectedObjects[0].Status["@DisplayString"] != "Cancelled"))
                        {
                        return true;
                        }
                     }
                else if(selectedObjects.length > 1)
                    {
                        if((selectedObjects[0].Status["@DisplayString"] != "Cancelled"))
                        {
                    var range=1;
                    for(var i=1;i<selectedObjects.length;i++) 
                             {
                                 if((selectedObjects[0].Status["@DisplayString"]) == selectedObjects[i].Status["@DisplayString"])
                                     {
                                    range +=1;
                                     }
                          }
                    if(range == selectedObjects.length)
                    {
                            return true;
                    }
                    else
                         return false;
                    }
                }
                else
                     return false;
            }
            else
                     return false;
    };

  w6activeAction.invoke = function (selectedObjects){

        var returnPromise = $q.defer();
        
            var taskObj=selectedObjects[0];
            var result,xml;
            data = {};
            currRecord = selectedObjects;
             options = {};
             cancelOptions = {};
             completeOptions ={};
            
				  var xhttp = new XMLHttpRequest();
				    xhttp.onreadystatechange = function() {
                 if (this.readyState == 4 && this.status == 200) {
                     result= JSON.parse(this.responseText);
                    var records = [];
                     result.forEach(function(statusRecords, index){
                        if(statusRecords.StatusTransitionType == "AllowStatusChange" && statusRecords.SourceStatus.Name == taskObj.Status["@DisplayString"]){
                             if(angular.isArray(statusRecords.TargetStatuses)){
                                statusRecords.TargetStatuses.forEach(function(statusNames, index){
                                     records.push({Key: statusNames.Key, Name: statusNames.Name});
                                    data.TaskStatuses=records;
                                 });
                            }
                      }
                      });
             }
             };
             
            xhttp.open("GET","https://fse-na-sb.cloud.clicksoftware.com/SO/api/Services/AllowedStatusFlowTransitions?collectionName=Task&err=0&propertyName=Status", true);
            xhttp.send();
            
             options.title='Change Task(s) Status';
 			 options.bodyUrl='../SO/api/Content/P2_FSEChangeTaskStatus/TaskStatusUpdate.html/';
 			options.icon='none';
 			options.size='sm';
				
			 	cancelOptions.title='Change Task Status Confirmation';
				cancelOptions.body='The Task(s) status will be changed to Cancelled. Do you want to continue?';
 			    cancelOptions.icon = 'bell'; 
 				cancelOptions.size='md';
 				cancelOptions.buttons = [{ label: 'OK', kind: 'primary', disabled: 'data.IsCriticalError' }, { label: 'Cancel' }];
 				
 					completeOptions.title='Change Task(s) Status to Complete';
				completeOptions.body='Cannot change status to Complete as additional Task details are required. Please fill additional Task details in the Task form from FSE Mobile.';
 			    completeOptions.icon = 'bell'; 
 				completeOptions.size='md';
 				completeOptions.buttons = [{ label: 'OK',kind: 'primary', disabled: 'data.IsCriticalError'}]; 
 
        //Updating single and multi task Objects
        if(selectedObjects.length == 1)
        {
 				options.buttons=[
 				{
 				label: 'OK',kind:'primary',action:function(){
 				    data.selectedStatus = JSON.parse(data.selectedStatus);
 				    if(data.selectedStatus.Name == "Cancelled")
 				    {
 				        w6dialogService.show(cancelOptions);
 				        cancelOptions.afterClosed = function(button) { 
                         if (button.label === 'OK')
                         {
                            	 w6serverServices.updateObject('Task',{'@objectType': 'Task', 'Key': taskObj.Key,'Status':{'Name':data.selectedStatus.Name}}).$promise.then(function (){
                     returnPromise.resolve({ result: null, shouldRefreshData: true, shouldRefreshCount: false });
 				         }), function (error){
                     returnPromise.reject(error);
                          };
                         }
                        
 				    };
 				    }
 				    if(data.selectedStatus.Name == "Complete")
 				    {
 				         w6dialogService.show(completeOptions);
 				    }
 				     if(data.selectedStatus.Name != "Cancelled" && data.selectedStatus.Name != "Complete")
				    {
 				         w6serverServices.updateObject('Task',{'@objectType': 'Task', 'Key': taskObj.Key,'Status':{'Name':data.selectedStatus.Name}}).$promise.then(function (){
                     returnPromise.resolve({ result: null, shouldRefreshData: true, shouldRefreshCount: false });
 				         }), function (error){
                     returnPromise.reject(error);
                         };
 				    }
 				}
 				},
 				{label: 'Cancel',kind:'primary'}];
				
        }
        
        else
        {
 		options.buttons=[
 				{
 				label: 'OK',kind:'primary',action:function()
 				{
 				    data.selectedStatus = JSON.parse(data.selectedStatus);
 				    if(data.selectedStatus.Name == "Cancelled")
 				    {
                         w6dialogService.show(cancelOptions);
                         cancelOptions.afterClosed = function(button) { 
                         if (button.label === 'OK')
                         {
                             var task = [];
                            currRecord.forEach(function (singleRec, recIndex) {
                     task.push({ '@objectType': 'Task', 'Key': singleRec.Key,'Status':{'Name':data.selectedStatus.Name}});
                });

                w6serverServices.updateObjects('Task',task).$promise.then(function () {
                    returnPromise.resolve({
                        result: null,
                        shouldRefreshData: true,
                        shouldRefreshCount: false
                    });
                }),
                    function (error) {
                        returnPromise.reject(error);
                    };
                }
                
 				    };
 				}
 				     if(data.selectedStatus.Name == "Complete")
 				    {
 				         w6dialogService.show(completeOptions);
 				    }
 				
 				     if(data.selectedStatus.Name != "Cancelled" && data.selectedStatus.Name != "Complete")
 				    {
 				        var task1 = [];
                         currRecord.forEach(function (singleRec, recIndex) {
                     task1.push({ '@objectType': 'Task', 'Key': singleRec.Key,'Status':{'Name':data.selectedStatus.Name}});
                });

                w6serverServices.updateObjects('Task',task1).$promise.then(function () {
                    returnPromise.resolve({
                        result: null,
                        shouldRefreshData: true,
                        shouldRefreshCount: false
                    });
                }),
                    function (error) {
                        returnPromise.reject(error);
                    };
 				    
 				    }}},{label:'Cancel',kind:'primary'}];
 				}
        
        w6dialogService.show(options,data);

};
               
    return w6activeAction;


    }]);

