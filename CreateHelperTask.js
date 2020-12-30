// main controller to be used as action
angular.module('platformModule').factory('CreateHelperTask', ['$rootScope', 'DialogHelper', 'w6dialogService', '$q', 'w6serverServices',
    function ($rootScope, DialogHelper, w6dialogService, $q, w6serverServices) {
        var w6activeAction = {};
        var selectedTask = {};
        // set options for the dialog window
        var options = {}
        options.title = 'Create Helper Task';
        options.bodyUrl = '../SO/api/content/PS_Ameren_CS/CreateHelperTaskUI.html/';
        options.icon = 'none';
        options.buttons = [{
                label: 'Create Helper Task',
                kind: 'primary',
                action: function () {
                    console.log('you clicked ok button from CreateHelperTask');
                    $rootScope.$broadcast('create_helper_task', selectedTask);
                }
            },
            {
                label: 'Cancel'
            }
        ];

        // check is the addhelper action should be displayed or not
        // check the valid status and valid task type
        function IsAllowedToAddHelper(currentTask) {

            var status = currentTask.Status["@DisplayString"];
            if (status === 'Scheduled' ||
                status === 'Dispatched' ||
                status === 'Accepted' ||
                status === 'En-Route' ||
                status === 'Arrived') {
                return true;
            }
            return false;
        }

        // this methods decides when the action can be invoked
        w6activeAction.canInvoke = function (selectedObjects, additionalParams) {
            if (angular.isArray(selectedObjects)) {
                if (selectedObjects.length == 1) {
                    var isAllowed = IsAllowedToAddHelper(selectedObjects[0]);
                    return isAllowed;
                } else {
                    return false;
                }
            } else {
                var isAllowed = IsAllowedToAddHelper(selectedObjects[0]);
                return isAllowed;
            }
        };

        // actual invocation of the action
        w6activeAction.invoke = function (selectedObjects, additionalParams) {
            var returnPromise = $q.defer();
            try {
                if (angular.isArray(selectedObjects)) {
                    selectedTask = selectedObjects[0];
                    // console.log(selectedTask);
                } else {
                    selectedTask = selectedObjects;
                    // console.log(selectedTask);

                }
            } catch (error) {
                console.log(error);
            }

            if (selectedTask.IsBundled === true) {
                DialogHelper.showError('You cannot Add Helpers to a MegaTask or a Bundled Task');
                return false;
            }
            if (selectedTask.IsMegatask === true) {
                DialogHelper.showError('You cannot Add Helpers to a MegaTask or a Bundled Task');
                return false;
            }

            w6dialogService.show(options);
            return returnPromise.promise;
        };

        return w6activeAction;
    }
]);

// helper service to manager data across the different controllers
angular.module('platformModule').factory('CreateHelperDataManager', ['$q',
    function ($q) {
        var api = {
            validationResults: []
        }
        return api;
    }
]);

// helper factory to manipulate data
angular.module('platformModule').factory('DataHelper', ['$q',
    function ($q) {
        var String2Xml = function (str) {
            var dom = null;
            if (window.DOMParser) {
                try {
                    dom = (new DOMParser()).parseFromString(str, "text/xml");
                } catch (e) {
                    dom = null;
                }
            } else if (window.ActiveXObject) {
                try {
                    dom = new ActiveXObject('Microsoft.XMLDOM');
                    dom.async = false;
                    if (!dom.loadXML(str)) // parse error ..
                        window.alert(dom.parseError.reason + dom.parseError.srcText);
                } catch (e) {
                    dom = null;
                }
            } else
                alert("oops");
            return dom;
        };

        var Xml2Json = function (xml) {

            var X = {
                toObj: function (xml) {
                    var o = {};
                    if (xml.nodeType == 1) { // element node ..
                        if (xml.attributes.length) // element with attributes  ..
                            for (var i = 0; i < xml.attributes.length; i++)
                                o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
                        if (xml.firstChild) { // element has child nodes ..
                            var textChild = 0,
                                cdataChild = 0,
                                hasElementChild = false;
                            for (var n = xml.firstChild; n; n = n.nextSibling) {
                                if (n.nodeType == 1) hasElementChild = true;
                                else if (n.nodeType == 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                                else if (n.nodeType == 4) cdataChild++; // cdata section node
                            }
                            if (hasElementChild) {
                                if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                                    X.removeWhite(xml);
                                    for (var n = xml.firstChild; n; n = n.nextSibling) {
                                        if (n.nodeType == 3) // text node
                                            o["#text"] = X.escape(n.nodeValue);
                                        else if (n.nodeType == 4) // cdata node
                                            o["#cdata"] = X.escape(n.nodeValue);
                                        else if (o[n.nodeName]) { // multiple occurence of element ..
                                            if (o[n.nodeName] instanceof Array)
                                                o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                                            else
                                                o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                                        } else // first occurence of element..
                                            o[n.nodeName] = X.toObj(n);
                                    }
                                } else { // mixed content
                                    if (!xml.attributes.length)
                                        o = X.escape(X.innerXml(xml));
                                    else
                                        o["#text"] = X.escape(X.innerXml(xml));
                                }
                            } else if (textChild) { // pure text
                                if (!xml.attributes.length)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    o["#text"] = X.escape(X.innerXml(xml));
                            } else if (cdataChild) { // cdata
                                if (cdataChild > 1)
                                    o = X.escape(X.innerXml(xml));
                                else
                                    for (var n = xml.firstChild; n; n = n.nextSibling)
                                        o["#cdata"] = X.escape(n.nodeValue);
                            }
                        }
                        if (!xml.attributes.length && !xml.firstChild) o = null;
                    } else if (xml.nodeType == 9) { // document.node
                        o = X.toObj(xml.documentElement);
                    } else
                        alert("unhandled node type: " + xml.nodeType);
                    return o;
                },
                toJson: function (o, name, ind) {
                    var json = name ? ("\"" + name + "\"") : "";
                    if (o instanceof Array) {
                        for (var i = 0, n = o.length; i < n; i++)
                            o[i] = X.toJson(o[i], "", ind + "\t");
                        json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
                    } else if (o == null)
                        json += (name && ":") + "null";
                    else if (typeof (o) == "object") {
                        var arr = [];
                        for (var m in o)
                            arr[arr.length] = X.toJson(o[m], m, ind + "\t");
                        json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
                    } else if (typeof (o) == "string")
                        json += (name && ":") + "\"" + o.toString() + "\"";
                    else
                        json += (name && ":") + o.toString();
                    return json;
                },
                innerXml: function (node) {
                    var s = ""
                    if ("innerHTML" in node)
                        s = node.innerHTML;
                    else {
                        var asXml = function (n) {
                            var s = "";
                            if (n.nodeType == 1) {
                                s += "<" + n.nodeName;
                                for (var i = 0; i < n.attributes.length; i++)
                                    s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
                                if (n.firstChild) {
                                    s += ">";
                                    for (var c = n.firstChild; c; c = c.nextSibling)
                                        s += asXml(c);
                                    s += "</" + n.nodeName + ">";
                                } else
                                    s += "/>";
                            } else if (n.nodeType == 3)
                                s += n.nodeValue;
                            else if (n.nodeType == 4)
                                s += "<![CDATA[" + n.nodeValue + "]]>";
                            return s;
                        };
                        for (var c = node.firstChild; c; c = c.nextSibling)
                            s += asXml(c);
                    }
                    return s;
                },
                escape: function (txt) {
                    return txt.replace(/[\\]/g, "\\\\")
                        .replace(/[\"]/g, '\\"')
                        .replace(/[\n]/g, '\\n')
                        .replace(/[\r]/g, '\\r');
                },
                removeWhite: function (e) {
                    e.normalize();
                    for (var n = e.firstChild; n;) {
                        if (n.nodeType == 3) { // text node
                            if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                                var nxt = n.nextSibling;
                                e.removeChild(n);
                                n = nxt;
                            } else
                                n = n.nextSibling;
                        } else if (n.nodeType == 1) { // element node
                            X.removeWhite(n);
                            n = n.nextSibling;
                        } else // any other node
                            n = n.nextSibling;
                    }
                    return e;
                }
            };
            if (xml.nodeType == 9) // document node
                xml = xml.documentElement;
            var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
            var tab = '\t';
            return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
        };

        var api = {
            Xml2Json: Xml2Json,
            String2Xml: String2Xml
        }
        return api;
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


// main controller
define(['modules/platform/platformModule'], function () {
    angular.module('platformModule').controller('CreateHelperTaskUIController', ['DataHelper', 'DialogHelper', 'CreateHelperDataManager', '$http', '$resource', 'w6dialogService', 'ScheduleApiProvider', '$scope', '$modal', '$q', 'w6serverServices',
        function (DataHelper, DialogHelper, globalData, $http, $resource, w6dialogService, ScheduleApiProvider, $scope, $modal, $q, w6serverServices) {
            var SXP_CHECK_RULE = `<SXPAssignmentTaskCheckRules>
                                    <Assignment>
                                        <Task>
                                            <Key>KEY_VAL</Key>
                                            <CallID>CALLID_VAL</CallID>
                                            <Number>NUMBER_VAL</Number>
                                        </Task>
                                        <Start>START_VAL</Start>
                                        <Finish>FINISH_VAL</Finish>
                                        <Engineers>
                                            <Engineer><Key>ENGINEER_VAL</Key></Engineer>
                                        </Engineers>
                                    </Assignment>
                                    <SchedulePolicy>SCHEDULEPOLICY_VAL</SchedulePolicy>
                                    <CurrentAssignment>CURRENTASSIGNMENT_VAL</CurrentAssignment>
                                </SXPAssignmentTaskCheckRules>`;
            $scope.selectedEnggs = null;
            $scope.selectedEngg = null;
            $scope.selectedTask = null;

            $scope.init = function () {
                var engg = ScheduleApiProvider.getGanttLoadedResources();
                $scope.selectedEnggs = engg;
            };



            $scope.$on('create_helper_task', function (event, data) {
                if ($scope.selectedEngg === null || $scope.selectedEngg === '') {
                    console.log('ask user to select the engineer');
                    DialogHelper.showMessage("No engineer is selected for creating helper task");
                    return;
                }


                $scope.selectedTask = data;
                var sxpToSend = SXP_CHECK_RULE;
                sxpToSend = sxpToSend.replace("KEY_VAL", $scope.selectedTask.Key);
                sxpToSend = sxpToSend.replace("CALLID_VAL", $scope.selectedTask.CallID);
                sxpToSend = sxpToSend.replace("NUMBER_VAL", 0);
                sxpToSend = sxpToSend.replace("START_VAL", $scope.selectedTask.AssignmentStart);
                sxpToSend = sxpToSend.replace("FINISH_VAL", $scope.selectedTask.AssignmentFinish);
                sxpToSend = sxpToSend.replace("ENGINEER_VAL", $scope.selectedEngg);
              //  sxpToSend = sxpToSend.replace("SCHEDULEPOLICY_VAL", "");
                sxpToSend = sxpToSend.replace("SCHEDULEPOLICY_VAL", "Working OCs");
                sxpToSend = sxpToSend.replace("CURRENTASSIGNMENT_VAL", "false");
                // console.log(sxpToSend);

                // send sxp to check the rule violations 
                var request = w6serverServices.sendSXP(sxpToSend);
                request.then(
                    function (d) {
                        // console.log(d.data);
                        var temp = DataHelper.String2Xml(d.data);
                        temp = DataHelper.Xml2Json(temp);
                        temp = JSON.parse(temp);
                        globalData.validationResults = temp.SXPAssignmentTaskCheckRulesResult.Violations.Violation;
                        // console.log(globalData.validationResults);
                        var options = {}
                        options.title = 'Rule Violations';
                        options.bodyUrl = '../SO/api/content/PS_Ameren_CS/CreateHelperTaskShowViolationsUI.html/';
                        options.size = "lg";
                        options.icon = 'none';
                        options.buttons = [{
                                label: 'OK',
                                kind: 'primary',
                                action: function () {
                                    //create task and assignment
                                    // console.log('Create task assignment');
                                    //get task with all the properties
                                    var getObj = w6serverServices.getObject("Task", $scope.selectedTask.Key, 0);
                                    getObj.$promise.then(
                                        function (gotTask) {
                                            // determine the max number
                                            var getAllTasksByID = w6serverServices.getObjects("Task", {
                                                requestedProperties: 'Number',
                                                filter: "CallID eq '" + gotTask.CallID + "'"
                                            }, 0);
                                            //send request to get the list of task with number
                                            getAllTasksByID.$promise.then(
                                                function (d) {
                                                    // console.log('all numbers');
                                                    // console.log(d);
                                                    //get the max number
                                                    var arrObObject = d;
                                                    var maxNum = 0;
                                                    if (angular.isArray(arrObObject)) {
                                                        for (var i = 0; i < arrObObject.length; i++) {
                                                            var element = arrObObject[i];
                                                            if (maxNum < element.Number) {
                                                                maxNum = element.Number;
                                                            }
                                                        }
                                                    } else {
                                                        maxNum = arrObObject.Number;
                                                    }
                                                    maxNum = maxNum + 1;
                                                    // console.log('gotTask');
                                                    // console.log(gotTask);
                                                    // update the task properties to create new task
                                                    console.log('got the max number = ', maxNum);
                                                    // console.log('creating task and assignment');
                                                    gotTask.Key = -1;
                                                    gotTask.Number = maxNum;
                                                    gotTask.RequiredEngineers = [{
                                                        Key: $scope.selectedEngg
                                                    }];
                                                    gotTask.IsHelper = true;
                                                    gotTask.Status = {
                                                        Name: 'Unassigned'
                                                    };

                                                    var obj2Send = {
                                                        "Task": gotTask,
                                                        "Assignment": {
                                                            "@objectType": "Assignment",
                                                            "Start": $scope.selectedTask.AssignmentStart,
                                                            "Finish": $scope.selectedTask.AssignmentFinish,
                                                            "Engineers": [{
                                                                "Key": $scope.selectedEngg
                                                            }]
                                                        },
                                                        "ReturnAssignment": true,
                                                        "RelatedTasks": null,
                                                        "SchedulingWorkFlow": null,
                                                        "LogicDomain": null,
                                                        "ReturnSchedulingError": true
                                                    };

                                                    //create task and assignment
                                                    createAndScheduleTask(obj2Send).then(
                                                        function (d) {
                                                            DialogHelper.showMessage('Helper Task is created and scheduled.');
                                                            console.log('All Done', d);
                                                        },
                                                        function (e) {
                                                            console.log(e);
                                                        }
                                                    );
                                                },
                                                function (e) {
                                                    console.log(e);
                                                    DialogHelper.showError(e.data.ExceptionMessage);
                                                }
                                            );
                                        },
                                        function (e) {
                                            console.log(e);
                                            DialogHelper.showError(e.data.ExceptionMessage);
                                        }
                                    );
                                }
                            },
                            {
                                label: 'Cancel',
                                action: function () {
                                    console.log('Do nothing');
                                }
                            }
                        ];
                        w6dialogService.show(options);
                    },
                    function (e) {
                        console.log(e);
                        DialogHelper.showError(e.data.ExceptionMessage);
                    }
                );
            });

            // for sending processTaskEx request to the server
            var serverServices = $resource('', null, {
                processTaskEx: {
                    method: 'POST',
                    url: '../SO/api/Services/Integration/Schedule/ProcessTaskEx'
                }
            });

            // send processTaskEx request to the server and return the promise
            function createAndScheduleTask(obj2Send) {
                return serverServices.processTaskEx(obj2Send).$promise;
            }
        }
    ]);

    // additional controller for the violation
    angular.module('platformModule').controller('CreateHelperViolationUIController', ['CreateHelperDataManager', '$scope',
        function (globalData, $scope) {
            $scope.validationResults = null;
            $scope.init = function () {
                $scope.validationResults = [];
                var allVaidation = globalData.validationResults;

                //filter out the "The task is scheduled more than once"
                for (var index = 0; index < allVaidation.length; index++) {
                    var validationText = allVaidation[index].ViolationText;
                    console.log(validationText);
                    if (validationText !== 'The task is scheduled more than once') {
                        $scope.validationResults.push(allVaidation[index]);
                    }
                }
                console.log($scope.validationResults);
            }
        }
    ]);
});