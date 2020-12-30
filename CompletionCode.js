function PopulateCompletionForm(completionString, rel = 0) {
    
if(completionString != null && completionString != ""){
    let completionJSON = JSON.parse(completionString);
    let relayTableDataArray = [];
    // console.log("Hi");
    // debugger;

    if (rel == 1) {
		try{
       create_ctsection();
        display_ctsections();
		} catch(ex) {
		}
    }


    if ($("#ct_relay_table_1").length > 0) {

        // To do here:
        let rowsInCtRelayTable = $("#ct_relay_table_1").children().find("tr").filter(function () {
            if ($(this).attr("class") && $(this).attr("class") != "" && $(this).attr("class") != "hdr" && $(this).attr("class") != "hdr01") {
                return true;
            } else {
                return false;
            }
        });

        let dataForCtRelayTable = completionJSON.completion.filter(function (n) {
            if (n["instrid"].indexOf(".") == -1) {
                return true;
            } else {
                return false;
            }
        })




        //debugger;

        for (let row of rowsInCtRelayTable) {
            if ($(row).find('input').length > 0 && $(row).attr("class") != "" && $(row).attr("class").indexOf("row") == -1 && $(row).attr("class").indexOf("hdr") == -1) {
                let inpID = $(row).find('input').attr('id');
                let item = dataForCtRelayTable.filter(function (n) {
                    if (n["instrid"] == inpID) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (item.length > 0 && item[0]["value"] != undefined) {
                    $("#" + inpID).val(item[0]["value"]);
                } //APDEV SRS_11
            } else if ($(row).find('textarea').length > 0 && $(row).attr("class") != "" && $(row).attr("class").indexOf("row") == -1 && $(row).attr("class").indexOf("hdr") == -1) {
                let inpID = $(row).find('textarea').attr('id');
                let item = dataForCtRelayTable.filter(function (n) {
                    if (n["instrid"] == inpID) {
                        return true;
                    } else {
                        return false;
                    }
                });
                if (item.length > 0 && item[0]["value"] != undefined) {
                    $("#" + inpID).val(item[0]["value"]);
                }


            }else if ($(row).find('input').length > 0 && $(row).attr("class") != "" && $(row).attr("class").indexOf("hdr02") > -1) {
                // these are the inputs - the input boxes along hdr02.
                let inputs = $(row).find('input');
                let item = dataForCtRelayTable.filter(function (n) {
                    if (n["instrid"] == "hdr02") {
                        return true;
                    } else {
                        return false;
                    }
                });
                for (let inp of inputs) {
                    for (let k = 1; k <= 30; k++) {
                        let a_class = k < 10 ? "cola0" + k : "col" + k;
                        if ($(inp).hasClass(a_class)) {
                            if (item.length > 0 && item[0]["A" + k] != undefined && item[0]["A" + k] != "") {
                                $(inp).val(item[0]["A" + k]);
                                if ($(inp).attr("onchange") != "") {
                                    $(inp).trigger("change");
                                }
                                break;
                            }

                        }
                    }
                }
            } 
            else if ($(row).find('input').length > 0 && $(row).attr("class") != "" && $(row).attr("class").indexOf("row") > -1) {
                let inputs = $(row).find('input');
                let rowID = $(row).attr("class");
                let td = $(row).find('td')
                let item = dataForCtRelayTable.filter(function (n) {
                    if (n["instrid"] == rowID) {
                        return true;
                    } else {
                        return false;
                    }
                });

                for (let inp of td) {
                    if ($(inp).find('input').length > 0) {
                        let inpt = $(inp).find('input').parent();
                        for (let k = 1; k <= 30; k++) {
                            let a_class = k < 10 ? "cola0" + k : "cola" + k;
                            if (inpt.hasClass(a_class)) {
                                if (item.length > 0 && item[0]["A" + k] != "" && item[0]["A" + k] != undefined) {
                                    $(inp).find('input').val(item[0]["A" + k]);
                                    if ($(inp).find('input').attr('onchange') != "") {
                                        $(inp).find('input').trigger('change');
                                    }
                                    break;
                                }

                            }
                        }

                    } else {
                        for (let k = 1; k <= 30; k++) {
                            let a_class = k < 10 ? "cola0" + k : "cola" + k;
                            if ($(inp).hasClass(a_class)) {
                                if (item.length > 0 && item[0]["A" + k] != "" && item[0]["A" + k] != undefined) {
                                    $(inp)[0].innerHTML = (item[0]["A" + k]);
                                    //display_ctsections();
                                    break;
                                }

                            }
                        }
                    }
                }
                display_ctsections();
            }


        }
        // display_ctsections();

        let rowsInCtSectionTable = $("table.ctsection").not(".hh").filter(function () {
            if ($(this).css("display") == "none") {
                return false;
            } else {
                return true;
            }
        });

        for (let table of rowsInCtSectionTable) {
            // for each row, see if there is any input element. 
            // If input element is there, get the class for its parent, and if it matches, apply value of that class to that input.
            // debugger;
            if ($(table).css('display') != 'table') {
                continue;
            }

            // debugger;
            let rows = $(table).find('tr');
            for (let row of rows) {
                if ($(row).find('input').length > 0) {
                    let rowID = $(row).attr("class");
                    let tableID = $($(row)[0]).closest('table').attr('class').replace(" ", ".").replace("ctsection", "")
                    let inputs = $(row).find(':input');
                    let item = completionJSON.completion.filter(function (n) {
                        if (n["instrid"] == tableID + "_" + rowID) {
                            return true;
                        } else {
                            return false;
                        }
                    });

                    for (inp of inputs) {
                        let a_class = $(inp).parent()[0].className.split(" ").filter(function (n) {
                            if (n.indexOf("cola") > -1) {
                                return true;
                            } else {
                                return false;
                            }
                        });


                        if ($(inp).parent().hasClass(a_class[0])) {
                            // debugger;
                            if (item.length > 0 && a_class.length > 0) {
                                $(inp).val(item[0]["A" + a_class[0].replace("cola0", "").replace("cola", "")]);
                                 if ($(inp).attr("onchange")!=""){
                                     $(inp).trigger("change");
                                 }
                            }
                        } else if ($(inp).parent().hasClass("resp")) {
                            $(inp).val(item[0]["instrresp"]);
                            if ($(inp).hasClass("instResp_Row2")) {
                                if ($(inp).val() != "?") {
                                    let tapLabels = $(tableID).find("div[id^=Tap_Row]");
                                    for (let taplbl of tapLabels) {
                                        taplbl.innerText = taplbl.innerText.replace(/[?]/g, $(inp).val());
                                    }
                                }
                            }
                             if ($(inp).attr("onchange") != null) {
                                 $(inp).trigger("change");
                             }
                        }
                    }
                }
            }
        }

        return;
    }


    for (let i = 0; i < completionJSON.completion.length; i++) {

        let item = completionJSON.completion[i];
        let lineno = item.lineno;
        let instrresp = item.instrresp; // == "true" ? true : false;
        let value = item.value;
		if(item.instrresp == "true" || item.instrresp == "false" ) {
			instrresp = item.instrresp == "true" ? true : false;
		}
		if(item.value == "true" || item.value == "false" ) {
			value  = item.value == "true" ? true : false;
		}



        if (lineno == "") {
            // debugger;
            // this could be a picture element. so do nothing.
            // or a relay form - to be done or external inputs:
            // debugger;

            let taskProps = window.localStorage.getItem("taskProperties_" + item["tid"]) == null ? {} : JSON.parse(window.localStorage.getItem("taskProperties_" + item["tid"]));
            if (item["instrid"] != "") {
                if (item["instr"].indexOf("RelayTable_") == -1) {
                    if (item["value"] != "") {

                        if ($("#" + item["instrid"])[0].nodeName.toLowerCase() == "input" && $("#" + item["instrid"]).attr('type') == 'checkbox') {
                            // if checkbox, set the 'checked' property, not the value.
                            $("#" + item["instrid"]).prop('checked', value);
                        } else {
                            // for all other input types, set the value:
                            $("#" + item["instrid"]).val(item["value"]);
                        }
                        $("#" + item["instrid"]).val(item["value"]);
                    } else {
                        $("#" + item["instrid"]).val("");

                    }

                    // Populate from task properties:
                    for (let prop in taskProps) {
                        if (prop == item["instrid"]) {
                            $("#" + item["instrid"]).val(taskProps[prop]);
                        }
                    }
                } else if (item["instr"].indexOf("RelayTable_") > -1) {
                    // these are tabular data:
                    relayTableDataArray.push(item);
                    continue;
                }
            }
        } else {
            // debugger;
            let element = $("div[lineno=" + lineno + "]");
            if (element.hasClass("Steps")) {

                let initialsCheckBox = element.closest(".formData").find("input[id^=Initials][type=checkbox]");
                let initialsInputBox = element.closest(".formData").find("input[id^=Initials][type=text]");
                let textarea = element.closest(".formData").find("textarea");

                if (initialsCheckBox.length > 0) {
                    initialsCheckBox.prop("checked", instrresp);
                } else if (initialsInputBox.length > 0) {
                    initialsInputBox.val(instrresp);
                    if (instrresp != '') {
                        if (initialsInputBox.hasClass('initials-box')) {
                            $(initialsInputBox).removeClass('initials-box');
                            $(initialsInputBox).addClass('initials-box-valid');
                            $(initialsInputBox).trigger("blur");
                        }
                    }
                }

                 if (textarea.length > 0) {
                    textarea.val(value);
                    if (textarea.attr("onchange") != "") {
                        textarea.trigger("change");
                    }
                }

                let select = element.closest(".formData").find("select");
                let input = element.closest(".formData").find("input").not("[id^=reading_]").not("[id^=Initials]").not("[type=checkbox]");

                if (select.length > 0) {
                    select.val(value);
                    if(value != 'Select')
                    {
                        if (select.attr("onchange") != "") {
                            select.trigger("change");
                        }
                    }
                }
                else if (input.length > 0) {
                    input.val(value);
                }

            } else if (element.hasClass("Readings") || element.hasClass("ReadingsHistory")) {
                let input = element.closest(".formData").find("input").not("[id^=reading_]").not("[id^=Initials]");
                if (input.length > 0) {
                    input.val(value);
                    if (input.attr("onblur") != "") {
                        input.trigger("blur");
                    }
                    if (input.attr("onchange") != "") {
                        input.trigger("change");
                    }
                    if (input.attr("onkeyup") != "") {
                        input.trigger("keyup");
                    }
                }

            } else if (element.hasClass("Substeps")) {
                let input = element.closest(".formData").find("input").not("[id^=reading_]").not("[id^=Initials]").not("[type=checkbox]");
                let select = element.closest(".formData").find("select");
                let textarea = element.closest(".formData").find("textarea");
                let checkbox = element.closest(".formData").find("input[type=checkbox][id^=subchkboxID]");
                let checkBboxList = element.closest(".formData").find("input[type=checkbox][id^=chkBxlistInput]");

                if (input.length > 0) {
                    input.val(value);
                    if (input.attr("onblur") != "") {
                        input.trigger("blur");
                    }
                    if (input.attr("onchange") != "") {
                        input.trigger("change");
                    }
                    if (input.attr("onkeyup") != "") {
                        input.trigger("keyup");
                    }
                } else if (select.length > 0) {
                    select.val(value);
                    if(value != 'Select')
                    {
                        if (select.attr("onchange") != "") {
                            select.trigger("change");
                        }
                    }
                } else if (textarea.length > 0) {
                    textarea.val(value);
                    if (textarea.attr("onchange") != "") {
                        textarea.trigger("change");
                    }
                }
				else if (checkbox.length > 0) {
                    let checkBoxValue = (value.toString() == "true" ? true : false);
                    checkbox.prop("checked", checkBoxValue);
                } else if (checkBboxList.length > 0) {
                    let valuesToBeAssigned = value.split(",");
                    for (let j = 0; j < valuesToBeAssigned.length; j++) {
                        let checkBoxValue = (valuesToBeAssigned[j].toString() == "true" ? true : false);
                        $(checkBboxList[j]).prop("checked", checkBoxValue);
                    }
                }
            }
        }


    }

    if (relayTableDataArray.length > 0) {
        // fill in the values based on the table id:
        // instr - table name
        // instrid - row id
        // A1 - A30 contains the values to be stored into the cells.

        //debugger;

        // this section has been specifically added for SRS-10 forms:
        // Clearing the table for the Relay since Phantom row is not part of this table:


        if ($("#busDifferentialTable-tbody").length > 0) {
            srs10DataPopulation(relayTableDataArray);
            // $("#busDifferentialTable-tbody").empty();
            // let rowsToAdd = 0;
            // // debugger;
            // rowsToAdd = (relayTableDataArray.filter(function (e) { return e.instr.indexOf("SRS_10_Tbody") > -1 }).length / 2);

            // for (i = 0; i < rowsToAdd; i++) {
            //     // eval($($("[id*=Phantom]").children()[0]).find("button").attr("onclick"));
            //     eval($("#phantomRow").children().find("button").attr("onclick"));
            // }


            // for (let item of relayTableDataArray) {
            //     let inputIdList = item["instrid"].split(":");
            //     let rowId = item["instrid"].split(":")[0];
            //     for (let elmt of inputIdList) {
            //         if (elmt.indexOf("h_row") > -1) {
            //             continue;
            //         } else {
            //             // let a_class = item["instrid"].split(":")[0].split("_")[0].replace("A","");
            //             let a_class = elmt.split("_")[0];
            //             if (item[a_class] != "") {
            //                 if ($("#" + elmt).is('input')) {
            //                     if ($("#"+elmt).prop("disabled") == true) {
            //                         $("#"+elmt).prop("disabled",false);
            //                         $("#" + elmt).val(item[a_class]);
            //                         $("#"+elmt).prop("disabled",false);
            //                     } else {
            //                         $("#" + elmt).val(item[a_class]);
            //                     }
            //                 } else if ($("#" + elmt).is('td')) {
            //                     // debugger;
            //                     // $("#" + elmt).children().text() = item[a_class];
            //                     $("#" + elmt).children()[0].innerText = item[a_class];
            //                 }

            //             }
            //         }
            //     }
            // }


        } else {
            // get the row with Phantom row:
            if ($("[id*=Phantom]").length > 0) {
                let rowsToAdd = 0;
                let existingRowsOnTable = $("[id*=Phantom]").parent().children().not("[id*=Phantom]").length;
                rowsToAdd = relayTableDataArray.length;

                let tbodyID = $("[id*=Phantom]").parent().attr("id");
                let phantomRow = $("[id*=Phantom]");
                $("#" + tbodyID).empty();
                $("#" + tbodyID).append(phantomRow);

                for (i = 0; i < rowsToAdd; i++) {
                    eval($($("[id*=Phantom]").children()[0]).find("button").attr("onclick"));
                }

            }


            else { // for SWE04260_MO - Release2
                rowsToAdd = (relayTableDataArray.filter(function (e) { return e.instr.indexOf("RelayTable_switch-gear-table") > -1 }).length);
                rowsToAdd1 = (relayTableDataArray.filter(function (e) { return e.instr.indexOf("RelayTable_bus-duct-tests") > -1 }).length);
                if($("#switch-gear-table tr").length == 3)
                {
                    for (i = 0; i < rowsToAdd - 1; i++) {
                        eval($($("[class*=addBtn_switchGear]")).attr("onclick"));
                    } 
                }
                if($("#bus-duct-tests tr").length == 1)          
                {
                    for (i = 0; i < rowsToAdd1; i++) {
                        if(i== 0)
                        {
                            eval($($("[id*=first_add_bus_duct]")).attr("onclick"));
                        }
                        else
                        {
                            eval($($("[class*=addBtn_bus_duct]")).attr("onclick"));
                        }
                    }
                }
            }

            for (let item of relayTableDataArray) {
                let tableName = item["instr"].replace("RelayTable_", "");
                if ($("#" + tableName).length > 0) {
                    // verify if the table exist:
                    // identfy the row to which the value has to be set, using ID for the rows:
                    let row = item["instrid"];
                    // debugger;
                    let cells = $("#" + tableName + " tr[id^=" + row + "]").find("td"); //$("#" + row).find("td");
                    for (let cell of cells) {
                        for (let j = 1; j <= 30; j++) {
                            if ($(cell).hasClass("A" + j)) {
                                if ($(cell).find(":input").length > 0) {
                                    $(cell).find(":input").val(item["A" + j]);
                                } else {
                                    $(cell)[0].innerText = item["A" + j];
                                }
                            }
                        }
                    }

                    // very critical code:
                    // $("#" + row).children().find(":input").parent().each(function () {
                    //     for (let j = 1; j <= 30; j++) {
                    //         if ($(this).hasClass("A" + j)) {
                    //             $(this).children().val(item["A" + j])
                    //         }
                    //     }
                    // });
                    //very critical code ends here:


                    // if there are any rows that do not have input,
                }
            }
        }

}


    }
}

function CaptureCompletionJSON(taskIdentifier) {
    let formValid = true;
    let completionJSON = "";
    let completionObject = [];
    let completionData = [];
    let relayTabularData = {};
    let lno = 0;

    let noCompletionFormDiv = $("div").filter(function () {
        if ($(this).text() == "No Completion Form Required") {
            return true;
        } else {
            return false;
        }
    });

    let errorInLoadingCompletionForm = $("div").filter(function () {
        if ($(this).text() == "Error in loading Completion Form") {
            return true;
        } else {
            return false;
        }
    });

    if (noCompletionFormDiv.length > 0) {
        formValid = true;
        let initialData = {
            "tid": taskIdentifier,
            "lineno": "",
            "lno": 1,
            "instrid": "",
            "instrresp": "",
            "instr": "No Completion Form Required",
            "mid": "",
            "value": "",
            "units": "",
            "category": ""
        }
        for (let j = 1; j <= 30; j++) {
            relayTabularData["A" + j] = "";
        }
        let stepData = Object.assign({}, initialData, relayTabularData);
        completionObject.push(stepData);
        // completionJSON = "";
    } else if (errorInLoadingCompletionForm.length > 0) {
        formValid = false;
        completionJSON = "";
    }

    

    else if ($("#ct_relay_table_1").length > 0) {

        // debugger;
        let rowsInCtRelayTable = $("#ct_relay_table_1").children().find("tr").filter(function () {
            if ($(this).attr("class") && $(this).attr("class") != "" && $(this).attr("class") != "hdr" && $(this).attr("class") != "hdr01") {
                return true;
            } else {
                return false;
            }
        });

        for (let row of rowsInCtRelayTable) {
            let instrid = "";

            let value = "";
            instrid = $(row).attr("class");
            // debugger;
            if (instrid == "hdr02") {
                // debugger;
                let inps = $(row).children().find(":input"); // all the inputs on hdr02
                for (let inp of inps) {
                    for (let k = 1; k <= 30; k++) {
                        let a_class = k < 9 ? "cola0" + k : "cola" + k;
                        if ($(inp).closest("td").hasClass(a_class)) {
                            relayTabularData["A" + k] = $(inp).val();
                            break;
                        }
                    }
                }
            } else if (instrid.indexOf("row") > -1) {
                // debugger;
                let cells = $(row).children();
                if (instrid.indexOf("row10") > -1) {
                    let inp = $(row).find('input');
                    relayTabularData["A9"] = $(inp).val()
                }
                for (let cell of cells) {
                    if ($(cell).children().length > 0 && $($(cell).children()[0]).is("input")) {
                        let inp = $(cell).children();
                        for (let k = 1; k <= 30; k++) {
                            let a_class = k < 9 ? "cola0" + k : "cola" + k;
                            if ($(cell).hasClass(a_class)) {
                                // debugger;
                                relayTabularData["A" + k] = $(inp).val();
                            }
                        }
                    } else {
                        for (let k = 1; k <= 30; k++) {
                            let a_class = k < 9 ? "cola0" + k : "cola" + k;
                            if ($(cell).hasClass(a_class)) {
                                relayTabularData["A" + k] = $(cell)[0].innerText;
                            }
                        }
                    }
                }

            } else {
                let inps = $(row).children().find(":input");
                value = $(inps[0]).val();
                instr = $(row).attr("class");
                if (inps.length != 0) {
                    for (let k = 1; k <= 30; k++) {
                        relayTabularData["A" + k] = "";
                    }
                }

            }
            lno = lno + 1
            let initialData = {
                "tid": taskIdentifier,
                "lineno": "",
                "lno": lno,
                "instrid": instrid,
                "instrresp": "",
                "instr": "",
                "mid": "",
                "value": value,
                "units": "",
                "category": ""
            }
			if ($(".invalidNOMTest").length > 0) {
        formValid = false;
        
    }
            let stepData = Object.assign({}, initialData, relayTabularData);
            completionObject.push(stepData);
        }

        let rowsInCtSectionTable = $("table.ctsection").not(".hh").filter(function () {
            if ($(this).css("display") == "none") {
                return false;
            } else {
                return true;
            }
        });
        // debugger;
        if (rowsInCtSectionTable.length > 0) {
            // let rows = rowsInCtSectionTable.chlidren().find("tr");
            // let rows = [];

            let rows = rowsInCtSectionTable.children().find("tr").not(".hdr").not(".cthdr");

            let instr = "";
            let instrid = "";
            let instrresp = "";
            let value = "";
            // debugger;
            for (let row of rows) {
                let tableID = $(row).closest("table").attr("class").replace(" ", ".").replace("ctsection", "");
                instrid = tableID + "_" + $(row).attr("class").replace(" ", "."); // check this place later.
                let cells = $(row).children();
                if (cells.length == 0) {
                    for (let k = 1; k <= 30; k++) {
                        relayTabularData["A" + k] = "";
                    }
                }
                for (let cell of cells) {
                    if ($(cell).hasClass("instr")) {
                        instr = $(cell).children()[0].innerText;

                    } else if ($(cell).hasClass("resp")) {
                        // debugger;
                        if ($(cell).find(":input").length > 0) {
                            instrresp = $(cell).find(":input").val();
                        }

                    } else if ($(cell).attr("class").indexOf("cola") > -1) {
                        for (let k = 1; k <= 30; k++) {
                            // debugger;
                            let a_class = k < 9 ? "cola0" + k : "cola" + k;
                            if ($(cell).hasClass(a_class)) {
                                if ($(cell).find('input').length > 0) {
                                    // debugger;
                                    relayTabularData["A" + k] = $(cell).find('input').val();
                                    break;
                                } else {
                                    // debugger;
                                    relayTabularData["A" + k] = $(cell).children().length > 0 ? $(cell).children()[0].innerText : $(cell)[0].innerText;
                                    break;
                                }
                            }
                        }
                    } else {
                        for (let k = 1; k <= 30; k++) {
                            relayTabularData["A" + k] = "";
                        }
                    }
                }
                lno = lno + 1
                let initialData = {
                    "tid": taskIdentifier,
                    "lineno": "",
                    "lno": lno,
                    "instrid": instrid,
                    "instrresp": instrresp.toString(),
                    "instr": instr,
                    "mid": "",
                    "value": value,
                    "units": "",
                    "category": ""
                }
                let stepData = Object.assign({}, initialData, relayTabularData);
                completionObject.push(stepData);
            }

        }

        // return;

    } else {
        // instr - No Completion Form found

        // non loading case:
        // Should not be able to complete..

        // iterating through each of the div that has formData class attached to it:
        let inputDivList = $(".formData");
        let otherInputs = $(".main-header").parent().children().find(":input").not("button").filter(function () {
            if ($(this).parent().find("[class^=A]").length > 0) {
                return false;
            } else if ($(this).parent().closest(".formData").length > 0) {
                return false;
            } else {
                return true;
            }
        });

        if ((inputDivList.length > 0 && otherInputs.length == 0) || (inputDivList.length == 0 && otherInputs.length > 0)) {
            if (inputDivList.length > 0) {
                for (let i = 0; i < inputDivList.length; i++) {

                    let tid = taskIdentifier;

                    let lineno = "";
                    let instrid = "";
                    let instrresp = "";
                    let instr = "";
                    let mid = "";
                    let value = "";
                    let units = "";
                    let category = "";
	let heaader = "";

                    let element = inputDivList[i]
                    // do not proceed if there are any classes with warning / error that are mandatory:
                    let erroredMandatory = $(element).children().find(".error").not(".optional");

                    // do not proceed if there are any initials input boxes which are not valid:
                    let emptyInitialsBox = $(element).children().find("[type=text].initials-box");
					
					let isDisableInitialBox = $(element).children().find("[type=text].initials-box-diasbled");
                    // do not proceed if there are any initials check boxes which are not valid:
                    let emptyInitialsChecks = $(element).children().find("[type=checkbox][id^=Initials]").not(".checkbox-valid");

					let  ishiddenParent =false;
                    try{
                        if(emptyInitialsBox.length > 0)
                            ishiddenParent = $("#"+ emptyInitialsBox[0].id).parent().parent().parent().parent().parent().parent().parent().parent().parent().hasClass("hidden");  
                    } catch(ex)
                    {
                    }

                    let isDisableCheckBox = true;
                    let isChecked = true;

                   if(emptyInitialsChecks.length > 0) {
                    isDisableCheckBox  = $("#"+ emptyInitialsChecks[0].id).parent().parent().parent().parent().parent().parent().parent().hasClass("disablestep") 
                     let t = emptyInitialsChecks[0].id ;
                     isChecked = $("#"+ t)[0].checked ;

                   }

                    if (erroredMandatory.length > 0) {
                        formValid = false;
                        completionJSON = "";
                        // return;
                    } 
                    // else if ((emptyInitialsChecks.length > 0 || emptyInitialsBox.length > 0) && isDisableInitialBox.length == 0) 
                    //APDEV-7292
                    else if ((emptyInitialsChecks.length > 0 && !isDisableCheckBox && !isChecked) ||(emptyInitialsBox.length > 0 && isDisableInitialBox.length == 0 && ishiddenParent == false)) 
                    {
                        formValid = false;
                        completionJSON = "";
                        // return;
                    }
                    // get meter id, lineno, instrid, category:
                    mid = $(element).attr("meterid");
                    lineno = $(element).attr("lineno");
                    lno = lno + 1;
                    instrid = $(element).children().find(".stepID").text();
				
			       if($(element).attr("meterid")) {
                category = $(element).attr("meterid") == "" ? "" : "meterreading"
				}

                    if ($(element).children().find(".stepDesc").length > 0) {
                        instr = $(element).children().find(".stepDesc").text().replace(/\r?\n|\r/g, " ").replace(/  +/g, ' ').trim();
                    } else if ($(element).children().find("label.completionLabel").length > 0) {
                        instr = $(element).children().find("label.completionLabel").text().replace(/\r?\n|\r/g, " ").replace(/  +/g, ' ').trim();
                    } else if ($(element).children().find("label.checkbox-label").length > 0) {
                        instr = $(element).children().find("label.checkbox-label").text();
                    }
					
			if(instr == ""){
 				if($(element).parent().children().find("b").length>0)
						{
					if($(element).parent().children().find("b")[0].innerText != "")
						{
							instr = $(element).parent().children().find("b")[0].innerText;
							heaader = "susttion";
						}
			}
			}

                    // check if the element is a step:
                    if (element.classList.contains("Steps")) {
                        if ($(element).children().find("input[id^=Initials][type=checkbox]").length > 0) {
                            instrresp = $(element).children().find("input[id^=Initials]").prop("checked");
                        } else if ($(element).children().find("input[id^=Initials]").length > 0) {
                            instrresp = $(element).children().find("input[id^=Initials]").val();
                        }

                        if ($(element).children().find("input").not("[id^=Initials]").not("[id^=reading_]").length > 0) {
                            value = $(element).children().find("input").not("[id^=Initials]").not("[id^=reading_]").val();
                        } else if ($(element).children().find("select").length > 0) {
                            value = $(element).children().find("select option:selected").val();
                        } else if ($(element).children().find("textarea").length > 0) { //APDEV-7291
                            value = $(element).children().find("textarea").val();
                        }
						else   if ($(element).find("input").length > 0) 
						{
							value = $(element).find("input").val();
						}
                        else {
                            value = "";
                        }
                    } else if (element.classList.contains("Readings") || element.classList.contains("ReadingsHistory")) {
                        if ($(element).children().find("input[id^=readingInput]").length > 0) {
                            value = $(element).children().find("input[id^=readingInput]").val();
                            units = $(element).children().find(".units").text();
                        } else {
                            value = "";
                        }
                        instrresp = "";
                    } else if (element.classList.contains("Substeps")) {
                        if ($(element).children().find("input[type=date]").length > 0) {
                            value = $(element).children().find("input[type=date]").val();
                        } else if ($(element).children().find("input[type=text]").not("[id^=reading_]").length > 0) {
                            value = $(element).children().find("input[type=text]").not("[id^=reading_]").val();
                        } else if ($(element).children().find("input[type=number]").not("[id^=reading_]").length.length > 0) {
                            value = $(element).children().find("input[type=number]").not("[id^=reading_]").val();
                        } else if ($(element).children().find("textarea").length > 0) {
                            value = $(element).children().find("textarea").val();
                        } else if ($(element).children().find("select").length > 0) {
                            value = $(element).children().find("select option:selected").val();
                        } else if ($(element).children().find("input[type=checkbox][id^=subchkboxID]").length > 0) {
                            value = $(element).children().find("input[type=checkbox][id^=subchkboxID]").prop("checked");
                        } else if ($(element).children().find("input[type=checkbox][id^=chkBxlistInput]").length > 0) {
                            let numberOfItems = $(element).children().find("input[type=checkbox][id^=chkBxlistInput]").length;
                            for (let j = 0; j < numberOfItems; j++) {
                                value = value + $(element).children().find("input[type=checkbox][id^=chkBxlistInput][id$=_" + j + "]").prop("checked") + ",";
                            }
                            value = value.slice(0, value.length - 1);
                        }
                        instrresp = "";
                    }

                    let initialData = {
                        "tid": tid,
                        "lineno": lineno,
                        "lno": lno,
                        "instrid": instrid,
                        "instrresp": instrresp.toString(),
                        "instr": instr,
                        "mid": mid,
                        "value": value,
                        "units": units,
                        "category": category
                    }
                    for (let j = 1; j <= 30; j++) {
                        relayTabularData["A" + j] = "";
                    }
                    let stepData = Object.assign({}, initialData, relayTabularData);

                    if ($.isNumeric(lineno) || heaader !="") {
                        completionObject.push(stepData);
                    }
                }
            } else {
                // these are the inputs that are not tabular data. Have to get these seperately:
                //let externalInputs = $(":input").parent().not("[class^=A]").find(":input").not("button").each(function () {
                let externalInputs = $(".main-header").parent().children().find(":input").parent().not("[class^=A]").find(":input").not("button").each(function () {
                    let tid = taskIdentifier;
                    let lineno = "";
                    let instrid = "";
                    let instrresp = "";
                    let instr = "";
                    let mid = "";
                    let value = "";
                    let units = "";
                    let category = "";
                    // debugger;
                    instrid = this.id;

                    // 18th Sep: If the property in other inputs is a checkbox, then capture the checked property, not the value.
                    if ($(this)[0].nodeName.toLowerCase() == "input" && $(this).attr('type') == "checkbox") {
                        value = $(this).prop('checked');
                    } else {
                        value = $(this).val();
                    }

                    lno = lno + 1;
                    // push data to completion JSON here.
                    let initialData = {
                        "tid": tid,
                        "lineno": lineno,
                        "lno": lno,
                        "instrid": instrid,
                        "instrresp": instrresp.toString(),
                        "instr": instr,
                        "mid": mid,
                        "value": value.toString(),
                        "units": units,
                        "category": category
                    }
                    for (let j = 1; j <= 30; j++) {
                        relayTabularData["A" + j] = "";
                    }
                    let stepData = Object.assign({}, initialData, relayTabularData);
                    completionObject.push(stepData);
                });

                // if there are tables with phantom row and if there are no phantom row:
                // these are the inputs that do not have row id but have A1 - A30 classes - the ones present in seperate tables:

                if ($("[id*=Phantom]").length > 0) {
                    // these are the inputs that are tabular data :
                    let relayFormsRows = $("[id^=row]").not("[id*=Phantom]");
                    let instr = $("[id^=row]").parent().parent().parent().find("table").attr("id");
                    let instrid = "";
                    for (let i = 0; i < relayFormsRows.length; i++) {
                        instrid = $(relayFormsRows[i]).attr("id");
                        for (let j = 1; j <= 30; j++) {
                            let cell = $(relayFormsRows[i]).find(".A" + j);
                            if (cell.length > 0) {
                                // check if the cell has a child element.
                                if (cell.children().length > 0) {
                                    // find out for existence of input / select.
                                    let input = cell.find("input");
                                    let select = cell.find("select");
                                    let textarea = cell.find("textarea");

                                    if (input.length > 0) {
                                        relayTabularData["A" + j] = input.val();
                                    } else if (select.length > 0) {
                                        relayTabularData["A" + j] = select.val();
                                    } else if (textarea.length > 0) {
                                        relayTabularData["A" + j] = textarea.val();
                                    } else {
                                        relayTabularData["A" + j] = "";
                                    }

                                } else {
                                    // check if cell has any inner text.
                                    if ((cell.text() != "undefined" || cell.text() != undefined) && cell.text().length > 0) {
                                        relayTabularData["A" + j] = cell.text();
                                    } else {
                                        relayTabularData["A" + j] = "";
                                    }
                                }
                            }

                        }
                        lno = lno + 1
                        // push data to completion JSON here.
                        let initialData = {
                            "tid": taskIdentifier,
                            "lineno": "",
                            "lno": lno,
                            "instrid": instrid,
                            "instrresp": "",
                            "instr": "RelayTable_" + instr,
                            "mid": "",
                            "value": "",
                            "units": "",
                            "category": ""
                        }

                        let stepData = Object.assign({}, initialData, relayTabularData);
                        completionObject.push(stepData);
                    }
                } else {
                    let nonExpandableTables = $("[class^=A]").closest("table");
                    let instr = "";
                    let instrid = "";
                    for (let table of nonExpandableTables) {
                        instr = $(table).attr("id");
                        let rows = $("#" + instr).children().find(":input").closest("tr");
                        for (let i = 0; i < rows.length; i++) {
                            instrid = $(rows[i]).attr("id");
                            for (let j = 1; j <= 30; j++) {
                                relayTabularData["A" + j] = "";  // to clear previous rows data.
                                let cell = $(rows[i]).find(".A" + j);
                                if (cell.length > 0) {
                                    if (cell.children().length > 0) {
                                        let input = cell.find("input");
                                        let select = cell.find("select");
                                        let textarea = cell.find("textarea");                                       
                                        if (input.length > 0) {
                                            relayTabularData["A" + j] = input.val();
                                        } else if (select.length > 0) {
                                            relayTabularData["A" + j] = select.val();
                                        } else if (textarea.length > 0) {
                                            relayTabularData["A" + j] = textarea.val();
                                        } else {
                                            relayTabularData["A" + j] = "";
                                        }
                                    } else {
                                        if ((cell.text() != "undefined" || cell.text() != undefined) && cell.text().length > 0) {
                                            relayTabularData["A" + j] = cell.text();
                                        } else {
                                            relayTabularData["A" + j] = "";
                                        }
                                    }
                                }
                            }
                            // here
                            lno = lno + 1
                            // push data to completion JSON here.
                            let initialData = {
                                "tid": taskIdentifier,
                                "lineno": "",
                                "lno": lno,
                                "instrid": (instrid == "undefined" || instrid == undefined) ? "" : instrid,
                                "instrresp": "",
                                "instr": "RelayTable_" + instr,
                                "mid": "",
                                "value": "",
                                "units": "",
                                "category": ""
                            }

                            let stepData = Object.assign({}, initialData, relayTabularData);
                            completionObject.push(stepData);
                        }

                    }
                }

            }
        } else if (inputDivList.length > 0 && otherInputs.length > 0) {
            // focussing only on SRS-10 form

            for (let i = 0; i < inputDivList.length; i++) {
                let element = inputDivList[i];
                let tid = taskIdentifier;
                let lineno = "";
                let instrid = "";
                let instrresp = "";
                let instr = "";
                let mid = "";
                let value = "";
                let units = "";
                let category = "";
				
				  // do not proceed if there are any classes with warning / error that are mandatory:
                    let erroredMandatory = $(element).children().find(".error").not(".optional");

                    // do not proceed if there are any initials input boxes which are not valid:
                    let emptyInitialsBox = $(element).children().find("[type=text].initials-box");
					
					let isDisableInitialBox = $(element).children().find("[type=text].initials-box-diasbled");
                    // do not proceed if there are any initials check boxes which are not valid:
                    let emptyInitialsChecks = $(element).children().find("[type=checkbox][id^=Initials]").not(".checkbox-valid");

                       let isDisableCheckBox = true;
                       let ischecked = true;

                   if(emptyInitialsChecks.length > 0) {
                    
                    isDisableCheckBox  = $("#"+ emptyInitialsChecks[0].id).parent().parent().parent().parent().parent().parent().parent().hasClass("disablestep") 
                    let t = emptyInitialsChecks[0].id ;
                    ischecked = $("#"+ t)[0].checked ;
                   }

                    if (erroredMandatory.length > 0) {
                        formValid = false;
                        completionJSON = "";
                        // return;
                    } 
                    // else if ((emptyInitialsChecks.length > 0 || emptyInitialsBox.length > 0) && isDisableInitialBox.length == 0) 
                    //APDEV-7292
                    else if ((emptyInitialsChecks.length > 0 && !isDisableCheckBox && !ischecked) ||(emptyInitialsBox.length > 0 && isDisableInitialBox.length == 0)) 
                    {
                        formValid = false;
                        completionJSON = "";
                        // return;
                    }
					
                // get meter id, lineno, instrid, category:
                mid = $(element).attr("meterid");
                lineno = $(element).attr("lineno");
                lno = lno + 1;
                instrid = $(element).children().find(".stepID").text();

			     if($(element).attr("meterid")) {
                category = $(element).attr("meterid") == "" ? "" : "meterreading"
				}
				

                if ($(element).children().find(".stepDesc").length > 0) {
                    instr = $(element).children().find(".stepDesc").text().replace(/\r?\n|\r/g, " ").replace(/  +/g, ' ').trim();
                } else if ($(element).children().find("label.completionLabel").length > 0) {
                    instr = $(element).children().find("label.completionLabel").text().replace(/\r?\n|\r/g, " ").replace(/  +/g, ' ').trim();
                } else if ($(element).children().find("label.checkbox-label").length > 0) {
                    instr = $(element).children().find("label.checkbox-label").text();
                }

                // check if the element is a step:
                if (element.classList.contains("Steps")) {
                    if ($(element).children().find("input[id^=Initials][type=checkbox]").length > 0) {
                        instrresp = $(element).children().find("input[id^=Initials]").prop("checked");
                    } else if ($(element).children().find("input[id^=Initials]").length > 0) {
                        instrresp = $(element).children().find("input[id^=Initials]").val();
                    }

                    if ($(element).children().find("input").not("[id^=Initials]").not("[id^=reading_]").length > 0) {
                        value = $(element).children().find("input").not("[id^=Initials]").not("[id^=reading_]").val();
                    } else if ($(element).children().find("select").length > 0) {
                        value = $(element).children().find("select option:selected").val();
                    } else {
                        value = "";
                    }
                } else if (element.classList.contains("Readings") || element.classList.contains("ReadingsHistory")) {
                    if ($(element).children().find("input[id^=readingInput]").length > 0) {
                        value = $(element).children().find("input[id^=readingInput]").val();
                        units = $(element).children().find(".units").text();
                    } else {
                        value = "";
                    }
                    instrresp = "";
                } else if (element.classList.contains("Substeps")) {
                    if ($(element).children().find("input[type=date]").length > 0) {
                        value = $(element).children().find("input[type=date]").val();
                    } else if ($(element).children().find("input[type=text]").not("[id^=reading_]").length > 0) {
                        value = $(element).children().find("input[type=text]").not("[id^=reading_]").val();
                    } else if ($(element).children().find("input[type=number]").not("[id^=reading_]").length.length > 0) {
                        value = $(element).children().find("input[type=number]").not("[id^=reading_]").val();
                    } else if ($(element).children().find("textarea").length > 0) {
                        value = $(element).children().find("textarea").val();
                    } else if ($(element).children().find("select").length > 0) {
                        value = $(element).children().find("select option:selected").val();
                    } else if ($(element).children().find("input[type=checkbox][id^=subchkboxID]").length > 0) {
                        value = $(element).children().find("input[type=checkbox][id^=subchkboxID]").prop("checked");
                    } else if ($(element).children().find("input[type=checkbox][id^=chkBxlistInput]").length > 0) {
                        let numberOfItems = $(element).children().find("input[type=checkbox][id^=chkBxlistInput]").length;
                        for (let j = 0; j < numberOfItems; j++) {
                            value = value + $(element).children().find("input[type=checkbox][id^=chkBxlistInput][id$=_" + j + "]").prop("checked") + ",";
                        }
                        value = value.slice(0, value.length - 1);
                    }
                    instrresp = "";
                }

                let initialData = {
                    "tid": tid,
                    "lineno": lineno,
                    "lno": lno,
                    "instrid": instrid,
                    "instrresp": instrresp !== "" ? instrresp.toString() : instrresp,
                    "instr": instr,
                    "mid": mid,
                    "value": value,
                    "units": units,
                    "category": category
                }
                for (let j = 1; j <= 30; j++) {
                    relayTabularData["A" + j] = "";
                }
                let stepData = Object.assign({}, initialData, relayTabularData);

                if ($.isNumeric(lineno)) {
                    completionObject.push(stepData);
                }
            }

            //otherInputs = $(".main-header").parent().children().find(":input").parent().not("[class^=A]").find(":input").not("[id^=A]").not("button").not(".relayVol").not(".disableheadercells");
            otherInputs = $(".main-header").parent().children().not(".formData").find(":input").not(".disableCells").not(".enableCells").not("button").not(".disableheadercells").not(".relayVol").not(".disablecells").not(".enablecells").not("[id*=row]").not(".headVal");
            otherInputs.each(function () {
                let tid = taskIdentifier;
                let lineno = "";
                let instrid = "";
                let instrresp = "";
                let instr = "";
                let mid = "";
                let value = "";
                let units = "";
                let category = "";

                instrid = this.id;
                value = $(this).val();
                lno = lno + 1;
                // push data to completion JSON here.
                let initialData = {
                    "tid": tid,
                    "lineno": lineno,
                    "lno": lno,
                    "instrid": instrid,
                    "instrresp": instrresp,
                    "instr": instr,
                    "mid": mid,
                    "value": value,
                    "units": units,
                    "category": category
                }
                for (let j = 1; j <= 30; j++) {
                    relayTabularData["A" + j] = "";
                }
                let stepData = Object.assign({}, initialData, relayTabularData);
                completionObject.push(stepData);
            });

            let ct_tableid = $("#busDifferentialTable");
            srs10completionData(relayTabularData, lno, taskIdentifier, completionObject);

            /* for (let row of ct_tableid.children().find("tr[id^=h_]")) {
                 // debugger;
                 // Added just now: 2nd July
                 for (let j = 1; j <= 30; j++) {
                     relayTabularData["A" + j] = "";
                 }
                 let inputsOnThisRow = $(row).find("[onkeyup]");
                 if ($(row).attr("id") == "h_row4") {
                     inputsOnThisRow = $(row).find("input");
                 }
                 
                 let instrid = $(row).attr("id");
                 // debugger;
                 for (let inp of inputsOnThisRow) {
                     instrid = instrid + ":" + $(inp).attr("id");
                     let value = "";
                     if ($(inp).is('input')) {
                         value = $(inp).val().toUpperCase();
                     } else if ($(inp).is('td')) {
                         value = $(inp).children().text();
                     }
                     let j = $(inp).attr("id").split("_")[0].replace("A", "");
                     relayTabularData["A" + j] = value;
                 }
                 lno = lno + 1
                 //debugger;
                 let instr = "SRS_10_Table";
                 let initialData = {
                     "tid": taskIdentifier,
                     "lineno": "",
                     "lno": lno,
                     "instrid": (instrid == "undefined" || instrid == undefined) ? "" : instrid,
                     "instrresp": "",
                     "instr": "RelayTable_" + instr,
                     "mid": "",
                     "value": "",
                     "units": "",
                     "category": ""
                 }
 
                 let stepData = Object.assign({}, initialData, relayTabularData);
                 completionObject.push(stepData);
             }
 
             // this should get the results of each of the rows except the td:
             let ct_tableBody = $("#busDifferentialTable-tbody");
 
             for (let row of ct_tableBody.children()) {
                 let inputsOnThisRow = $(row).children().find("[onkeyup]").not("[onkeyup='']").not(".disablecells");
                 // debugger;
                 let instrid = $(row).attr("id");
                 for (let inp of inputsOnThisRow) {
                     instrid = instrid + ":" + $(inp).attr("id");
                     let j = $(inp).attr("id").split("_")[0].replace("A", "");
                     relayTabularData["A" + j] = $(inp).val();
                 }
                 lno = lno + 1
                 let instr = "SRS_10_Tbody";
                 let initialData = {
                     "tid": taskIdentifier,
                     "lineno": "",
                     "lno": lno,
                     "instrid": (instrid == "undefined" || instrid == undefined) ? "" : instrid,
                     "instrresp": "",
                     "instr": "RelayTable_" + instr,
                     "mid": "",
                     "value": "",
                     "units": "",
                     "category": ""
                 }
 
                 let stepData = Object.assign({}, initialData, relayTabularData);
                 completionObject.push(stepData);
             }*/


        }


        //let otherInputs = $(".main-header").parent().children().find(":input").parent().not("[class^=A]").find(":input").not("[id^=A]").not("button").not(".relayVol").not(".disableheadercells");



        // including check for Images:
        let imageList = $(".picture");
        for (let i = 0; i < imageList.length; i++) {

            let element = imageList[i];
            let tid = taskIdentifier;
            let lineno = "";
            let instrid = "";
            let instrresp = "";
            let instr = "";
            let mid = "";
            let value = "";
            let units = "";
            let category = "";

            lno = lno + 1;
            let source = $(element).attr("src");
            if (source.indexOf("/") > -1) {
                instr = source.split("/")[source.split("/").length - 1].replace("/", "");
            } else {
                instr = source;
            }
            let stepData = {
                "tid": tid,
                "lineno": lineno,
                "lno": lno,
                "instrid": instrid,
                "instrresp": instrresp,
                "instr": instr,
                "mid": mid,
                "value": value,
                "units": units,
                "category": category
            }
            completionObject.push(stepData);
        }




    }

    completionJSON = {
        "completion": completionObject
    };
    console.log(completionJSON);
    localStorage.setItem("CompletionData", JSON.stringify(completionJSON));
    completionData.push(formValid);
    completionData.push(JSON.stringify(completionJSON));
    return completionData;


}

//Sets the Previous Meter readings in the completion form
function setMeterHistoryValues(meterHistoryValuesDictionary) {


    let meterIdStepObject = generateMeterIDStepObject();

    // let formname = $(".doc-info").children()[0].split(".")[0];
    let formname = $(".doc-info").children()[4].innerText.replace("SUB-", "").replace("-IL", "").replace("-MO", "")
    // {meterId1: 1.a, meterId2: 1.c}

    // foreach of the meterid retrieved in meterIdStepObject, check for the values that needs to be
    // set from meterHistoryValuesDicitonary, and derive the inputs and set the same:

    for (meterID in meterIdStepObject) {
        if (meterHistoryValuesDictionary[meterID] != null) {

            if (meterIdStepObject[meterID].indexOf(",") > -1) {
                let steps = meterIdStepObject[meterID].split(",");
                for (let step of steps) {
                    let inputs = generateInputID(step, formname);
                    if (inputs.length > 0) {
                        if (meterHistoryValuesDictionary[meterID]["Reading1"] != "") {
                            $(inputs[0]).css("display", "inline");
                        }
                        if (meterHistoryValuesDictionary[meterID]["Reading2"] != "") {
                            $(inputs[1]).css("display", "inline");
                        }
                        $(inputs[0]).val(meterHistoryValuesDictionary[meterID]["Reading1"]);
                        $(inputs[1]).val(meterHistoryValuesDictionary[meterID]["Reading2"]);

                        $(inputs[0]).parent().children()[0].innerHTML = convertDate(meterHistoryValuesDictionary[meterID]["ReadingDate1"]);
                        $(inputs[1]).parent().children()[0].innerHTML = convertDate(meterHistoryValuesDictionary[meterID]["ReadingDate2"]);
                    }

                }
            } else {

                let inputs = generateInputID(meterIdStepObject[meterID], formname);
                if (inputs.length > 0) {
                    if (meterHistoryValuesDictionary[meterID]["Reading1"] != "") {
                        $(inputs[0]).css("display", "inline");
                    }
                    if (meterHistoryValuesDictionary[meterID]["Reading2"] != "") {
                        $(inputs[1]).css("display", "inline");
                    }
                    $(inputs[0]).val(meterHistoryValuesDictionary[meterID]["Reading1"]);
                    $(inputs[1]).val(meterHistoryValuesDictionary[meterID]["Reading2"]);

                    $(inputs[0]).parent().children()[0].innerHTML = convertDate(meterHistoryValuesDictionary[meterID]["ReadingDate1"]);
                    $(inputs[1]).parent().children()[0].innerHTML = convertDate(meterHistoryValuesDictionary[meterID]["ReadingDate2"]);
                }

            }
        }
    }
}

function setTaskProperties(callid, number) {
    let taskProperties = window.localStorage.getItem("taskProperties_" + callid + "_" + number) == null ? {} : JSON.parse(window.localStorage.getItem("taskProperties_" + callid + "_" + number));
    for (let prop in taskProperties) {
        if ($("#" + prop).length > 0) {
            $("#" + prop).val(taskProperties[prop]);
        }

    }

}
function convertDate(date) {
    let value = new Date(date)
    let day = value.getDate().toString().length == 1 ? "0" + value.getDate().toString() : value.getDate().toString();
    let month = value.getMonth().toString().length == 1 ? "0" + (value.getMonth() + 1).toString() : (value.getMonth() + 1).toString();
    let year = value.getFullYear().toString().length == 1 ? "0" + value.getFullYear().toString() : value.getFullYear().toString();
    let newDate = day + "/" + month + "/" + year;
    return newDate;
}

function generateMeterIDStepObject() {
    let result = {};
    let element = null;
    let meterId = null;
    let stepNum = null;
    // let meterHistoryElementArray = $("div.ReadingsHistory[meterid]");
    let meterHistoryElementArray = $("[meterid]").not("[meterid='']");
    for (let i = 0; i < meterHistoryElementArray.length; i++) {
        element = meterHistoryElementArray[i];

        meterId = $(element).attr('meterid')
        stepNum = $(element).children().find("[class=stepID]")[0].innerText;
        if (result.hasOwnProperty(meterId) && result[meterId] != "") {
            result[meterId] = result[meterId] + "," + stepNum;
        } else {
            result[meterId] = stepNum;
        }

    }
    return result;
}

function generateInputID(stepNum, formname) {
    inputs = $("[id^=reading_" + formname + "_" + stepNum.split(".").join("_") + "]");
    return inputs;
}
function srs10completionData(relayTabularData, lno, taskIdentifier, completionObject) {

    let ct_tableid = $("#busDifferentialTable");
    for (let row of ct_tableid.children().find("tr[id^=h_]")) {
        // debugger;
        let numOfCols = $(row).children().length;
        // Added just now: 2nd July        
        for (let j = 5; j <= (numOfCols - 9); j++) {
            relayTabularData["A" + j] = "";
        }

        let inputsOnThisRow = $(row).find("[onkeyup]");
        //debugger;
        if ($(row).attr("id") == "h_row4") {
            inputsOnThisRow = $(row).find("input");
        }

        let instrid = $(row).attr("id");
        //debugger;
        for (let inp of inputsOnThisRow) {
            instrid = instrid + ":" + $(inp).attr("id");
            let value = "";
            if ($(inp).is('input')) {
                value = $(inp).val();
            }
            else if ($(inp).is('td')) {
                value = $(inp).children()[0].value;
            }
            let j = $(inp).attr("id").split("_")[0].replace("A", "");
            if (inp.id.indexOf("C1") > -1) {
                relayTabularData["A" + j] = "E:" + value;
            } else if (inp.id.indexOf("C2") > -1) {
                relayTabularData["A" + j] = relayTabularData["A" + j] + ", G:" + value;
            } else if (inp.id.indexOf("C3") > -1) {
                relayTabularData["A" + j] = relayTabularData["A" + j] + ", I:" + value;
            }
            else {
                relayTabularData["A" + j] = value;
            }
        }
        lno = lno + 1
        //debugger;
        let instr = "SRS_10_Table";
        let initialData = {
            "tid": taskIdentifier,
            "lineno": "",
            "lno": lno,
            "instrid": (instrid == "undefined" || instrid == undefined) ? "" : instrid,
            "instrresp": "",
            "instr": "RelayTable_" + instr,
            "mid": "",
            "value": "",
            "units": "",
            "category": ""
        }

        let stepData = Object.assign({}, initialData, relayTabularData);
        completionObject.push(stepData);
    }

    // this should get the results of each of the rows except the td:
    let ct_tableBody = $("#busDifferentialTable-tbody");
    for (let row of ct_tableBody.children()) {
        let inputsOnThisRow = $(row).children().find("[onkeyup]").not("[onkeyup='']").not(".disablecells");

        let numOfCols = $(row).children().length;
        for (let j = 1; j <= (numOfCols - 1); j++) {
            relayTabularData["A" + j] = "";
        }

        let instrid = $(row).attr("id");
        for (let inp of inputsOnThisRow) {
            instrid = instrid + ":" + $(inp).attr("id");
            let j = $(inp).attr("id").split("_")[0].replace("A", "");
            if (inp.id.indexOf("C1") > -1) {
                let id_A1A2A3 = inp.id.split('_');
                if (id_A1A2A3[0] == 'A1' || id_A1A2A3[0] == 'A2' || id_A1A2A3[0] == 'A3') {
                    relayTabularData["A" + j] = $(inp).val() == "" ? "NA" : $(inp).val();
                }
                else {
                    relayTabularData["A" + j] = "E:" + ($(inp).val() == "" ? "NA" : $(inp).val());
                }
            } else if (inp.id.indexOf("C2") > -1) {
                relayTabularData["A" + j] = relayTabularData["A" + j] + ",G:" + ($(inp).val() == "" ? "NA" : $(inp).val());
            } else if (inp.id.indexOf("C3") > -1) {
                relayTabularData["A" + j] = relayTabularData["A" + j] + ",I:" + ($(inp).val() == "" ? "NA" : $(inp).val());
            }
        }
        lno = lno + 1
        let instr = "SRS_10_Tbody";
        let initialData = {
            "tid": taskIdentifier,
            "lineno": "",
            "lno": lno,
            "instrid": (instrid == "undefined" || instrid == undefined) ? "" : instrid,
            "instrresp": "",
            "instr": "RelayTable_" + instr,
            "mid": "",
            "value": "",
            "units": "",
            "category": ""
        }

        let stepData = Object.assign({}, initialData, relayTabularData);
        completionObject.push(stepData);
    }
    console.log(completionObject);
}

function srs10DataPopulation(relayTableDataArray) {
    let firstItem = relayTableDataArray.length > 0 ? relayTableDataArray[0] : "";

    if (firstItem != "") {
        let columns = firstItem["instrid"].replace("h_row1", "").split(":");
        if (columns.length > 7) {
            // additional columns = columns - 6.
            // call function to add column on first row  
            let columns_toadd = columns.length - 7;
            //eval($($("[id*=btn_addCol]")).attr("onclick"));
            addCol_toSRS10_table(columns_toadd);
        }
    }
    // To capture how many extra rows are added

    rowsToAdd = ((relayTableDataArray.length - 5) - 20) / 2;
    // 5 : first 5 rows(table head : id start with  h_) in TableDataArray 
    // 20 : number of default rows(first 10 rows)
    // count the number of rows required and call addRow that many times:
    if (relayTableDataArray.length > $('#busDifferentialTable tr').length) {
        for (let i = 0; i < rowsToAdd; i++) {
            // add row
            eval($($("[id*=phantomRow]").children()[0]).find("button").attr("onclick"));
        }
    }

    // start the function to store data:
    for (let i = 0; i < relayTableDataArray.length; i++) {
        let item = relayTableDataArray[i];
        if (item["instrid"].indexOf("h_row1") > -1) { // posn
            // identify the cell that has class as A5, A6, etc until num of columns.
            for (let i = 1; i <= 30; i++) {
                if ($("#A" + i + "_posn").length > 0) {
                    // if the above id exist,
                    $("#A" + i + "_posn").children()[0].value = item["A" + i];
                }
            }
        } else if (item["instrid"].indexOf("h_row2") > -1) { // Tie
            for (let i = 1; i <= 30; i++) {
                if ($("#A" + i + "_Tie").length > 0) {
                    // if the above id exist,
                    $("#A" + i + "_Tie").children()[0].value = item["A" + i];
                }
            }

        } else if (item["instrid"].indexOf("h_row3") > -1) { // 27TD
            for (let i = 1; i <= 30; i++) {
                if ($("#A" + i + "_27TD").length > 0) {
                    // if the above id exist,
                    $("#A" + i + "_27TD").children()[0].value = item["A" + i];
                }
            }
        } else if (item["instrid"].indexOf("h_row4") > -1) {
            if (item["A4"] != "") {
                // it will be of the form: E: G:I
                let e = item["A4"].split(",")[0].replace("E:", "").trim();
                let g = item["A4"].split(",")[1].replace("G:", "").trim();
                let i = item["A4"].split(",")[2].replace("I:", "").trim();

                $("#A4_C1_relVol").val(e);
                $("#A4_C1_relVol").trigger("keyup");
                $("#A4_C2_relVol").val(g);
                $("#A4_C2_relVol").trigger("keyup");
                $("#A4_C3_relVol").val(i);
                $("#A4_C3_relVol").trigger("keyup");
            }
        } else if (item["instrid"].indexOf("row") > -1) {
            let rowId = item["instrid"].split(":")[0];
            let id = rowId.replace("row", "");
            if (id != "h_5") {
                let e = "";
                let g = "";
                let i = "";
                for (let j = 1; j <= 30; j++) {
                    if (item["A" + j] != "") {
                        if ((item["A" + j].indexOf("E") > -1 || item["A" + j].indexOf("G") > -1 || item["A" + j].indexOf("I") > -1)) {

                            e = item["A" + j].split(",")[0].replace("E:", "").trim() == "NA" ? "" : item["A" + j].split(",")[0].replace("E:", "").trim();
                            g = item["A" + j].split(",")[1].replace("G:", "").trim() == "NA" ? "" : item["A" + j].split(",")[1].replace("G:", "").trim();
                            i = item["A" + j].split(",")[2].replace("I:", "").trim() == "NA" ? "" : item["A" + j].split(",")[2].replace("I:", "").trim();

                            $("#A" + j + "_C1_" + rowId).val(e);
                            $("#A" + j + "_C2_" + rowId).val(g);
                            $("#A" + j + "_C3_" + rowId).val(i);
                            $("#A" + j + "_C1_" + rowId).prop("disabled", false);
                            $("#A" + j + "_C2_" + rowId).prop("disabled", false);
                            $("#A" + j + "_C3_" + rowId).prop("disabled", false);
                        } else {
                            $("#A" + j + "_C1_" + rowId).val((item["A" + j] == "NA" ? "" : item["A" + j]));
                        }
                    }
                }
            }
        }
    }
}

function addCol_toSRS10_table(col) {
    // Mimick the existing columns and create for all rows:
    let noOfCol = col;
    for (let i = 0; i < noOfCol; i++) {
        $('#busDifferentialTable-thead').find('tr').each(function () {
            console.log($(this).children()[$(this).children().length - 1].id);
            let lastCol = $(this).children()[$(this).children().length - 1];
            let id = "";
            if (lastCol.id.indexOf("_posn") > -1) {
                id = parseInt($(this).children()[$(this).children().length - 1].id.replace("_posn", "").replace("A", ""));
                let lastChild = $(this).children()[$(this).children().length - 1].outerHTML;
                $(this).append(lastChild.replace(new RegExp("A" + id + "_posn", "g"), "A" + (id + 1) + "_posn"));
            } else if (lastCol.id.indexOf("_Tie") > -1) {
                id = parseInt($(this).children()[$(this).children().length - 1].id.replace("_Tie", "").replace("A", ""));
                let lastChild = $(this).children()[$(this).children().length - 1].outerHTML;
                $(this).append(lastChild.replace(new RegExp("A" + id + "_Tie", "g"), "A" + (id + 1) + "_Tie"));
            } else if (lastCol.id.indexOf("_27TD") > -1) {
                id = parseInt($(this).children()[$(this).children().length - 1].id.replace("_27TD", "").replace("A", ""));
                let lastChild = $(this).children()[$(this).children().length - 1].outerHTML;
                lastChild = lastChild.replace(new RegExp("A" + id + "_27TD", "g"), "A" + (id + 1) + "_27TD");
                $(this).append(lastChild);
            } else if (lastCol.id.indexOf("_prior") > -1) {
                id = $(this).children()[$(this).children().length - 3].id
                third_id = parseInt($(this).children()[$(this).children().length - 3].id.replace("_priorE", "").replace("A", ""));
                let thirdlastChild = $(this).children()[$(this).children().length - 3].outerHTML;
                thirdlastChild = thirdlastChild.replace(new RegExp(id, "g"), "A" + (third_id + 1) + "_priorE")
                thirdlastChild = thirdlastChild.replace(new RegExp("A" + third_id + "_C1_relVol", "g"), "A" + (third_id + 1) + "_C1_relVol");

                id = $(this).children()[$(this).children().length - 2].id
                second_id = parseInt($(this).children()[$(this).children().length - 2].id.replace("_priorG", "").replace("A", ""));
                let secondlastChild = $(this).children()[$(this).children().length - 2].outerHTML;
                secondlastChild = secondlastChild.replace(new RegExp(id, "g"), "A" + (second_id + 1) + "_priorG");
                secondlastChild = secondlastChild.replace(new RegExp("A" + second_id + "_C2_relVol", "g"), "A" + (second_id + 1) + "_C2_relVol");

                id = $(this).children()[$(this).children().length - 1].id
                last_id = parseInt($(this).children()[$(this).children().length - 1].id.replace("_priorI", "").replace("A", ""));
                let lastChild = $(this).children()[$(this).children().length - 1].outerHTML;
                lastChild = lastChild.replace(new RegExp(id, "g"), "A" + (last_id + 1) + "_priorI")
                lastChild = lastChild.replace(new RegExp("A" + last_id + "_C3_relVol", "g"), "A" + (last_id + 1) + "_C3_relVol");

                $(this).append(thirdlastChild);
                $(this).append(secondlastChild);
                $(this).append(lastChild);
            } else {
                let row = `<td class="tableheader">E</td><td class="tableheader" style="border-left:none;">G</td>
            <td class="tableheader" style="border-left:none;">I</td>`;
                $(this).append(row);
            }
        });
        $('#busDifferentialTable-tbody').find('tr').each(function () {
            if ($(this).attr("id").indexOf("row") > -1) {
                let lastTd = $(this).children()[$(this).children().length - 1];
                $($(this).children()[$(this).children().length - 1]).remove();

                let id = $(this).children()[$(this).children().length - 3].classList[$(this).children()[$(this).children().length - 3].classList.length - 1];
                let thirdLastId = parseInt(id.split("_")[0].replace("A", ""));
                let thirdLastChild = $(this).children()[$(this).children().length - 3].outerHTML;
                thirdLastChild = thirdLastChild.replace(new RegExp("A" + thirdLastId, "g"), "A" + (thirdLastId + 1));

                id = $(this).children()[$(this).children().length - 2].classList[$(this).children()[$(this).children().length - 2].classList.length - 1];
                let secondLastId = parseInt(id.split("_")[0].replace("A", ""));
                let secondLastChild = $(this).children()[$(this).children().length - 2].outerHTML;
                secondLastChild = secondLastChild.replace(new RegExp("A" + secondLastId, "g"), "A" + (secondLastId + 1));

                id = $(this).children()[$(this).children().length - 1].classList[$(this).children()[$(this).children().length - 1].classList.length - 1];
                let lastId = parseInt(id.split("_")[0].replace("A", ""));
                let lastChild = $(this).children()[$(this).children().length - 1].outerHTML;
                lastChild = lastChild.replace(new RegExp("A" + lastId, "g"), "A" + (lastId + 1));


                $(this).append(thirdLastChild);
                $(this).append(secondLastChild);
                $(this).append(lastChild);


                // let thirdLastCls = $(this).children()[$(this).children().length - 3].classList[$(this).children()[$(this).children().length - 3].classList.length -1];
                // let secondLastCls = $(this).children()[$(this).children().length - 2].classList[$(this).children()[$(this).children().length - 2].classList.length -1];
                // let lastCls = $(this).children()[$(this).children().length - 1].classList[$(this).children()[$(this).children().length - 1].classList.length -1];



                // $($(this).children()[$(this).children().length - 3]).addClass( "A" + (parseInt(thirdLastCls.replace("A","")) + 1) );
                // $($(this).children()[$(this).children().length - 2]).addClass( "A" + (parseInt(thirdLastCls.replace("A","")) + 1) );
                // $($(this).children()[$(this).children().length - 1]).addClass( "A" + (parseInt(thirdLastCls.replace("A","")) + 1) );

                $(this).append(lastTd);
            }
        });
    }
}

