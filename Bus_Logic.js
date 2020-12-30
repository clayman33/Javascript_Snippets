function validateInitial(id) {
    let result = checkForErrorWarningClasses(id);
    if (result == 'error') {
        $('#' + id).removeClass('initials-box').removeClass('initials-box-valid').removeClass('initials-box-warning');
        $('#' + id).addClass('initials-box');
        return;
    }
    /* else if (result == 'warning') {
        $('#' + id).removeClass('initials-box').removeClass('initials-box-valid').removeClass('initials-box-warning');
        $('#' + id).addClass('initials-box-warning');
        return;
    }*/ else {
        if ($('#' + id).val().length >= 2) {
            if (new RegExp("[A-Za-z0-9]{2,}").test($('#' + id).val())) {
                $('#' + id).addClass('initials-box-valid');
                $('#' + id).removeClass('initials-box').removeClass('initials-box-warning');
            }
        } else {
            $('#' + id).addClass('initials-box');
            $('#' + id).removeClass('initials-box-valid').removeClass('initials-box-warning');
        }
    }

}
function initialsCheckBoxClicked(id) {
    let result = checkForErrorWarningClasses(id);
    if (result == 'error') {
        $('#' + id).prop('checked', false).prop('disabled', true);
        $($('#' + id).parent().children()[1]).css('backgroundColor', '#ccc').css('backgroundColor', '#ccc');;
    }
    /* this condition 'valid' added for fixing checkbox is not selected(checked) while prepopulation in MO forms */
    else if (result == 'valid') {
        $('#' + id).removeAttr('disabled');
        $($('#' + id).parent().children()[1]).css('backgroundColor', '#2196F3').css('backgroundColor', '#2196F3');
        $('#' + id).removeClass('checkbox-valid').addClass('checkbox-valid');
        $('#' + id).prop('checked', true);
    }
    /* else if (result == 'warning') {
        //$('#' + id).prop('checked', false).prop('disabled', true);
        $($('#' + id).parent().children()[1]).css('backgroundColor', '#ccc').css('backgroundColor', '#ccc');;
       
    } */else {
        $('#' + id).removeAttr('disabled');
        $($('#' + id).parent().children()[1]).css('backgroundColor', '#2196F3').css('backgroundColor', '#2196F3');
        // $('#'+id).css('backgroundColor','blue').prop('disabled',false);        
        if ($('#' + id).prop('checked') == true) {
            $('#' + id).removeClass('checkbox-valid').addClass('checkbox-valid');
        } else {
            $('#' + id).removeClass('checkbox-valid');
        }
    }
}

function checkForErrorWarningClasses(id) {

    let inputs = $("#" + id).parents().closest('.panel-body').children().not(".hidden").children().find("input").not('[id^=Initial]').not('[id^=reading_]').not(".optional").not(".disable");
    let selects = $("#" + id).parents().closest('.panel-body').children().not(".hidden").children().find('select').not(".optional").not(".disable");
    let textareas = $("#" + id).parents().closest('.panel-body').children().not(".hidden").children().find('textarea').not(".optional").not(".disable");

    // if (inputs.parents().eq(4).not(".disablestep").length == 0 && selects.parents().eq(4).not(".disablestep").length == 0 && textareas.parents().eq(4).not(".disablestep").length == 0) {
    //     return 'none';
    // }

    if (inputs.length == 0 && selects.length == 0 && textareas.length == 0) {
        return 'none';
    }

    let len = inputs.length;
    let error = 0, warning = 0, input_empty = 0, select_empty = 0, textarea_empty = 0;
    let len_of_inputs = inputs.length;
    let len_of_selects = selects.length;
    let len_of_textareas = textareas.length;

    // if there is one input that is empty and one that has a value,
    // check if there is a warning / error flag attached to it.
    // if no flags attached, check for empty inputs.
    // if there are empty inputs, put as red.
    // when all inputs are filled

    for (let input of inputs) {
        if (input.className.indexOf('error') > -1) {
            error++;
        }
        /*else if (input.className.indexOf('warning') > -1) {
            warning++;
        }*/ else if ($(input).val() == "") {
            input_empty++;
        }
    }

    for (let select of selects) {
        if (select.className.indexOf('error') > -1) {
            error++;
        }/* else if (select.className.indexOf('warning') > -1) {
            warning++;
        }*/ else if ($(select).val() == "Select") {
            select_empty++;
        }
    }

    for (let textarea of textareas) {
        if (textarea.className.indexOf('error') > -1) {
            error++;
        }/* else if (textarea.className.indexOf('warning') > -1) {
            warning++;
        }*/ else if ($(textarea).val() == "") {
            textarea_empty++;
        }
    }

    if (error > 0) {
        return 'error';
    } /*else if (warning > 0) {
        return 'warning';
    } */else {
        if (input_empty > 0 || select_empty > 0 || textarea_empty > 0) {
            return 'error';
        } else {
            /*new value introduced 'valid' for fixing issue while pre populating in MO forms*/
            return 'valid'; //return 'none'; 
        }
        // if (input_not_empty == len_of_inputs && select_not_empty == len_of_selects && textarea_not_empty == len_of_textareas) {
        //     return 'error';
        // } else {
        //     return 'none';
        // }
    }

}

// Function to get the details of the initials box that matches the checkbox id and disable it when checkbox is clicked.
var minmaxjson = {};
var externalDefaultMinMax = {};

// $(document).ready(function () {
//     // Get the list of all checkboxes.
//     let initials_checkboxes = $('[id^=OverrideInitials]');
//     $('[onclick^=initialsCheckBoxClicked]').prop('disabled', true);

//     let initialsBoxId = $('[class^=initials]');
//     for (let initial of initialsBoxId) {
//         validateInitial(initial.id);
//     }
//     let initialsCheckBoxId = $('[onclick^=initialsCheckBoxClicked]');
//     for (let initial of initialsCheckBoxId) {
//         initialsCheckBoxClicked(initial.id);
//     }

//     initialsCheckboxValidation(initials_checkboxes);
//     // minmaxjsonValidation();
//     createDefaultMinMaxJson();

//     $('input').on("change", function () {
//         validateAndAssignMinMax();
//         let initialsBoxId = $('[class^=initials]');
//         for (let initial of initialsBoxId) {
//             validateInitial(initial.id);
//         }
//         let initialsCheckBoxId = $('[onclick^=initialsCheckBoxClicked]');
//         for (let initial of initialsCheckBoxId) {
//             initialsCheckBoxClicked(initial.id);
//         }
//     })

//     $('select').on("change", function () {
//         let initialsBoxId = $('[class^=initials]');
//         for (let initial of initialsBoxId) {
//             validateInitial(initial.id);
//         }
//         let initialsCheckBoxId = $('[onclick^=initialsCheckBoxClicked]');
//         for (let initial of initialsCheckBoxId) {
//             initialsCheckBoxClicked(initial.id);
//         }
//     })

//     $('textarea').on("change", function () {
//         let initialsBoxId = $('[class^=initials]');
//         for (let initial of initialsBoxId) {
//             validateInitial(initial.id);
//         }
//         let initialsCheckBoxId = $('[onclick^=initialsCheckBoxClicked]');
//         for (let initial of initialsCheckBoxId) {
//             initialsCheckBoxClicked(initial.id);
//         }
//     })

//     changeDetector();



// });

function changeDetector() {
    // window.localStorage.setItem('CompletionFormEdited',true);
    // $('input').change(function () {
    //     window.localStorage.setItem('CompletionFormEdited', true);
    // })
    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("input[id^='subInput']").each(function () {
        $(this).on("keyup", function (event) {
            if(event.originalEvent !== undefined) {
                window.localStorage.setItem("CompletionFormEdited", true)
                P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
            }
        })
    });

    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("input[type='text']").each(function () {
        $(this).on("keyup", function (event) {
			if(event.originalEvent !== undefined) {
               window.localStorage.setItem("CompletionFormEdited", true)
               P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
			}
        })
    });
    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("input[type='number']").each(function () {
        $(this).on("keyup", function (event) {
            if(event.originalEvent !== undefined) {
               window.localStorage.setItem("CompletionFormEdited", true)
               P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
			}
        })
    });
    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("input[type='checkbox']").each(function () {
        $(this).on("click", function (event) {
           if(event.originalEvent !== undefined) {
               window.localStorage.setItem("CompletionFormEdited", true)
               P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
			}
        })
    });

    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("textarea").each(function () {
        $(this).on("keyup", function (event) {
            if(event.originalEvent !== undefined) {
               window.localStorage.setItem("CompletionFormEdited", true)
               P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
			}
        })
    });

    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("select").each(function () {
        $(this).on("change", function (event) {
            if(event.originalEvent !== undefined) {
               window.localStorage.setItem("CompletionFormEdited", true)
               P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
			}
        })
    });
    $('.main-header').parents().closest(".W6CMPanelHtmlContainer").children().find("input[type='number']").each(function () {
        $(this).on("keypress", function (e) {
            let numKeyCodes = [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 46, 45]
            let key = window.event.keyCode;
            if (numKeyCodes.indexOf(key) > -1) {
            }
            else {
                e.preventDefault();
                return
            }
        })
    });
    $('#ct_relay_table_1 tr td').bind('DOMNodeInserted DOMNodeRemoved', function () {
        window.localStorage.setItem("CompletionFormEdited", true);
        P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.MakeCompletionFormEdited();
    });

    P2.PS.AMEREN.CM.Events.CompletionOutput.prototype.ResetAllCompletionVariables();
}

var json = {};

function dependencyValidation(keyArr, valArr, minmaxJson, targetInput) {

    minmaxArr = [minmaxJson.wmin, minmaxJson.wmax, minmaxJson.emin, minmaxJson.emax];

    let count = 0;
    for (let i = 0; i < keyArr.length; i++) {
        if (keyArr[i] == valArr[i]) {
            count++;
        }
    }
    if (count == (keyArr.length)) {
        $('#' + targetInput).on('blur', '')
            .on('blur', validateErrorWarningRange(targetInput, minmaxArr[0],
                minmaxArr[1], minmaxArr[2], minmaxArr[3]));
    }
}

var defaultMinMaxJson = {};

// 8th March: to be called for every input change:
function validateAndAssignMinMax() {
    // let inputs = $('input').not('[id^=reading_]').not('[id^=OverrideInitials_]').not('[id^=Initials_]');

    // for(let key of inputs) {
    //     assignMinMax(key.id);
    // }

    divs = $('div[meterid]').not('[meterid=""]');

    for (let key of divs) {
        assignMinMaxOnMeterID(key.attributes.meterid.value);
    }

    divs = [];
    delete divs;
}

// 20th March: assign minmax for a field using MeterID:
function assignMinMaxOnMeterID(meterID) {
    if (Object.keys(minmaxjson).length > 0) {
        json = minmaxjson;
        if (json[meterID] != undefined) {
            let sorteddependencyarray = json[meterID].sort(function (b, a) { return Object.keys(a["dep"]).length - Object.keys(b["dep"]).length });
            let dependencySatisfied = false;
            for (let item of sorteddependencyarray) {
                if (!dependencySatisfied) {
                    dependencySatisfied = isDependencySatisfied2(item.dep);
                    if (dependencySatisfied) {
                        let p = item.range;
                        if (p.emin == '') { p.emin = "9999999999"; }
                        if (p.emax == '') { p.emax = "9999999999"; }
                        if (p.wmin == '') { p.wmin = "9999999999"; }
                        if (p.wmax == '') { p.wmax = "9999999999"; }

                        let inputs = $("[meterid='" + meterID + "']").children().find('input').not('[id^=Initials]').not('[id^=OverrideInitials]').not('[id^=reading_]');
                        if (inputs.length > 0) {
                            for (let input of inputs) {
                                let inputID = input.id;
                                $("#" + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, parseFloat(p.wmin), parseFloat(p.wmax), parseFloat(p.emin), parseFloat(p.emax)) }
                                ).trigger("blur");
                            }

                            // break;
                        }
                    }
                }
            }
            if (!dependencySatisfied) {
                assignDefaultMinMax2(meterID)
            }
        } else {
            assignDefaultMinMax2(meterID);
        }
    } else {
        assignDefaultMinMax2(meterID);
    }
}

// 20th March
function assignDefaultMinMax2(meterID) {
    let inputs = $("div[meterid*='" + meterID + "']").children().find('input').not('[id^=Initials]').not('[id^=OverrideInitials]').not('[id^=reading_]');
    if (inputs.length >= 1) {
        for (let input of inputs) {
            let inputID = input.id;
            if (Object.keys(defaultMinMaxJson).length != 0) {
                if (defaultMinMaxJson[inputID] != null) {
                    let p = defaultMinMaxJson[inputID].split(',');

                    $('#' + inputID).off("blur").on("blur",
                        function () {
                            validateErrorWarningRange(inputID, parseFloat(p[1]), parseFloat(p[2]),
                                parseFloat(p[3]), parseFloat(p[4]))
                        }).trigger("blur");
                } else {
                    $('#' + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, 9999999999, 9999999999, 9999999999, 9999999999) }).trigger("blur");
                    // $('#'+inputID).off("blur");
                }
            } else {
                $('#' + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, 9999999999, 9999999999, 9999999999, 9999999999) }).trigger("blur");
                // $('#'+inputID).off("blur");
            }
        }
    }

}

// 20th March: check if selected dependency is satisfied:
function isDependencySatisfied2(dep) {
    let count = 0
    for (let meterID in dep) {
        if (meterID.indexOf("?") > -1 || meterID.indexOf("/") > -1) {
            meterID.replace("?", "\\?").replace("/", "\\/");
        }
        if ($("[meterid=" + meterID + "]").children().find('input').not('[id^=reading_]').val() == dep[meterID]) {
            count++;
        } else if ($("[meterid=" + meterID + "]").children().find('select').val() == dep[meterID]) {
            count++;
        }
    }
    if (count == Object.keys(dep).length) {
        return true;
    } else {
        return false;
    }
}

// 8th March: assign minmax for a field based on other inputs:
function assignMinMax(inputID) {
    if (Object.keys(minmaxjson).length == 0) {
        json = minmaxjson;
        if (json[inputID] != undefined) {
            // if this inputID is present in minmaxjson, then check if dependencies are met and call minmax validation:

            // minmaxjson.readingInput_SWE02690_1_10_c_25.sort(function(b,a){return Object.keys(a["dep"]).length - Object.keys(b["dep"]).length})

            // the below sorts the dependency json in descending order of dependency variables:
            let sorteddependencyarray = json[inputID].sort(function (b, a) { return Object.keys(a["dep"]).length - Object.keys(b["dep"]).length });
            let dependencySatisfied = false;
            for (let item of sorteddependencyarray) {
                if (!dependencySatisfied) {
                    dependencySatisfied = isDependencySatisfied(item.dep);
                    if (dependencySatisfied) {
                        let p = item.range;
                        if (p.emin == '') { p.emin = "9999999999"; }
                        if (p.emax == '') { p.emax = "9999999999"; }
                        if (p.wmin == '') { p.wmin = "9999999999"; }
                        if (p.wmax == '') { p.wmax = "9999999999"; }
                        $('#' + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, parseInt(p.wmin), parseInt(p.wmax), parseInt(p.emin), parseInt(p.emax)) }
                        ).trigger("blur");

                        //$('#'+inputID).removeAttr("onblur").attr("onblur",validateErrorWarningRange(inputID,p.wmin,p.wmax,p.emin,p.emax));

                    }
                }
            }

            if (!dependencySatisfied) {
                assignDefaultMinMax(inputID)
            }
        }
    }
}

// 8th March: assign default minmax for a field
function assignDefaultMinMax(inputID) {
    if (Object.keys(defaultMinMaxJson).length != 0) {
        if (defaultMinMaxJson[inputID] != null) {
            let p = defaultMinMaxJson[inputID].split(',')
            $('#' + inputID).off("blur").on("blur",
                function () {
                    validateErrorWarningRange(inputID, parseInt(p[1]), parseInt(p[2]),
                        parseInt(p[3]), parseInt(p[4]))
                }).trigger("blur");

            // $('#'+inputID).removeAttr("onblur").attr("onblur",validateErrorWarningRange(inputID,parseInt(p[1]),parseInt(p[2]),
            // parseInt(p[3]),parseInt(p[4])));

        } else {
            // case where there is no minmax for input:
            // $('#'+inputID).on("blur",null).on("blur",function(){validateErrorWarningRange(inputID,"9999999999","9999999999","9999999999","9999999999")});

            $('#' + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, 9999999999, 9999999999, 9999999999, 9999999999) }).trigger("blur");

            // $('#'+inputID).removeAttr("onblur").attr("onblur",validateErrorWarningRange(inputID));
        }
    } else {
        // $('#'+inputID).on("blur",null).on("blur",function(){validateErrorWarningRange(inputID,"9999999999","9999999999","9999999999","9999999999")});

        $('#' + inputID).off("blur").on("blur", function () { validateErrorWarningRange(inputID, 9999999999, 9999999999, 9999999999, 9999999999) }).trigger("blur");

        // $('#'+inputID).removeAttr("onblur").attr("onblur",validateErrorWarningRange(inputID));
    }
}

// 8th March: check if dependency is satisfied - take the first longest dependency case:
function isDependencySatisfied(dep) {
    let count = 0
    for (let key in dep) {
        if ($('#' + key).val() == dep[key]) {
            count++;
        }
    }
    if (count == Object.keys(dep).length) {
        return true;
    } else {
        return false;
    }
}

// function allowNumbersOnlyForNumberTypes() {
//     let formSteps = $(".formData");
//     for(let step of formSteps) {
//         if ($(step).children().find('input').length > 0) {

//             let inputs = $(step).children().find('input');
//             for (let input of inputs) {
//                 if ($(input).attr('type') == 'number') {

//                 }
//             }
//         }
//     }
// }

function colorOptionalInputs() {
    $(".optional").parent().parent().children().find('label').css('color', 'grey');
}

function validateNumberInputs(val) {
    return /^-?\d*[e]?[.]?\d*$/.test(val);
}

var complexValJSON = {};

function generateComplexValJSON() {
    let listOfComplexVal = $("[onkeyup^=calc]");
    for (let val of listOfComplexVal) {
        let id = $(val).attr("id");
        complexValJSON[id] = $(val).attr("onkeyup");
    }

}

// 8th March: to be called on page load - create list of all default-minmax values:
function createDefaultMinMaxJson() {

    // adding a validation for all inputs of type number to enable only number to be added in the textbox when used in app:
    // allowNumbersOnlyForNumberTypes();
    let listOfValidInputs = $('input').not('[id^=reading_]').not('[id^=OverrideInitials_]').not('[id^=Initials_]')
    // Change color of optional inputs:
    colorOptionalInputs();
    generateComplexValJSON();

    let numberInputs = $("[id^=readingInput][type=number]");
    if (numberInputs.length > 0) {
        for (let i = 0; i < numberInputs.length; i++) {
            $(numberInputs[i]).keyup(function () {
                if (!validateNumberInputs($(this).val())) {
                    $(this).val($(this).val().replace(/[^0-9.e]/, ""));
                }
            });
        }
    }

    if (Object.keys(externalDefaultMinMax).length == 0) {
        if (window.localStorage.getItem("minmaxjson") != null) {
            minmaxjson = JSON.parse(window.localStorage.getItem("minmaxjson"));
        } else {
            minmaxjson = {};
        }
        if (window.localStorage.getItem("externalDefaultMinMax") != null) {
            externalDefaultMinMax = JSON.parse(window.localStorage.getItem("externalDefaultMinMax"));
        } else {
            externalDefaultMinMax = {};
        }
    }
    if (Object.keys(externalDefaultMinMax).length > 0) {
        for (let key in externalDefaultMinMax) {
            let input = $("[meterid='" + key + "']").children().find('input').not('[id^=reading_]');
            if (input.length !== 0) {
                for (let i = 0; i < input.length; i++) {
                    defaultMinMaxJson[$(input)[i].id] = externalDefaultMinMax[key];
                    $(input)[i].onblur = null;
                }
                // defaultMinMaxJson[$(input)[0].id] = externalDefaultMinMax[key];
                // $(input)[0].onblur = null;
            }
        }
    }
    if (typeof externalDefaultMinMax != 'undefined' && Object.keys(externalDefaultMinMax).length > 0) {
        for (let key in externalDefaultMinMax) {
            let input = $("[meterid='" + key + "']").children().find('input').not('[id^=reading_]');
            if (input.length !== 0) {
                for (let i = 0; i < input.length; i++) {
                    defaultMinMaxJson[$(input)[i].id] = externalDefaultMinMax[key];
                    $(input)[i].onblur = null;
                }
                // defaultMinMaxJson[$(input)[0].id] = externalDefaultMinMax[key];
                // $(input)[0].onblur = null;
            }
        }
    }
    for (let input of listOfValidInputs) {
        if ($(input)[0].hasAttribute('onblur')) {
            if (defaultMinMaxJson[$(input)[0].id] == null) {
                defaultMinMaxJson[$(input)[0].id] = $(input).attr('onblur').toString().split('(')[1].replace(')', '').replace('}', '').trim();
                $(input)[0].onblur = null;
            }

        }
    }

}

function minmaxjsonValidation() {
    if (minmaxjson) {
        json = minmaxjson;

        // Getting the list of inputs in the current form:

        let listOfValidInputs = $('input').not('[id^=reading_]').not('[id^=OverrideInitials_]').not('[id^=Initials_]')

        // let targetInputs = Object.keys(json);

        for (let targetInput in json) {
            let countOfDepCombo = json[targetInput].length;
            for (let i = 0; i < countOfDepCombo; i++) {

                dependencyValidation(Object.keys(json[targetInput][i]["dep"]),
                    Object.values(json[targetInput][i]["dep"]),
                    json[targetInput][i]['range'], targetInput);

                // let countOfDep = Object.keys(json[targetInput][i]["dep"]).length;
                // if (countOfDep == 1) {
                //     // single dependency:
                //     let dependency = json[targetInput][i]["dep"][Object.keys(json[targetInput][i]["dep"])[0]]

                // }
            }
        }

        // for each key in this json array, get index of json item
        // that has dep array with max length.

        // put an if condition to check if all the conditions are satisfied.

        // sort the array with dep length descending order.

        // when any drop down changes, on blur of every drop down, check if there is a key in 
        // json that has just that drop down as dependency.

        // if there are more than one dependency associated, do not assign anything to target ip

    }
}

// for each of the inputs in current step, clear inputs:
function clearInputs(inputsInCurrentStep) {
    for (let j = 0; j < inputsInCurrentStep.length; j++) {
        if ($(inputsInCurrentStep[j])[0].id.indexOf('selectID_') > -1) {
            // set to 'Select
            $(inputsInCurrentStep[j]).val('Select');
        } else if ($(inputsInCurrentStep[j])[0].id.indexOf('subchkboxID') > -1) {
            $(inputsInCurrentStep[j]).prop('checked', false)
        } else {
            // clear
            $(inputsInCurrentStep[j]).val('');
        }
    }
    // validateAndAssignMinMax();
}


// Associated with initials box check box, the below function clears and disables 
// all associated inputs under selected step.
function initialsCheckboxValidation(initials_checkboxes) {
    for (let i = 0; i < initials_checkboxes.length; i++) {
        $('#' + initials_checkboxes[i].id).click(function () {
            // if the checkbox is clicked, 
            if ($('#' + initials_checkboxes[i].id).is(':checked')) {
                // 'PASS' should be entered to related initials box and every input apart from
                // checkbox should be disabled.
                $('#' + initials_checkboxes[i].id.replace('Override', '')).removeClass('initials-box').removeClass('initials-box-valid').addClass('initials-box-valid');
                $('#' + initials_checkboxes[i].id.replace('Override', '')).val('pass')

                // disable all inputs under this step:
                $('#' + $("#" + initials_checkboxes[i].id).parents().eq(7)[0].id + " :input")
                    .not('#' + $("#" + initials_checkboxes[i].id)
                        .parents().eq(7)[0].id + " :input[id^='reading_']").prop('disabled', 'true');

                // enable initials-box-checkbox 
                $("#" + initials_checkboxes[i].id).removeAttr('disabled');

                // create array of all inputs excluding: initials-box, initials-box-checkbox,
                // and readingshistory input boxes:
                let inputsInCurrentStep = $('#' + $("#" + initials_checkboxes[i].id).parents().eq(7)[0].id + " :input")
                    .not('#' + $("#" + initials_checkboxes[i].id)
                        .parents().eq(7)[0].id + " :input[id^='reading_']").not('#' + $("#" + initials_checkboxes[i].id)
                            .parents().eq(7)[0].id + " :input[id^='Initials_']").not('#' + $("#" + initials_checkboxes[i].id)
                                .parents().eq(7)[0].id + " :input[id^='OverrideInitials_']");

                $($($("#" + initials_checkboxes[i].id).parents().eq(8)[0]).children().children().children()[0]).removeClass('collapsed').addClass('passed-step');

                // clear / reset values for all inputs defined in above array:
                clearInputs(inputsInCurrentStep);

            } else {
                // if the checkbox is unchecked, 
                $('#' + initials_checkboxes[i].id.replace('Override', '')).removeClass('initials-box-valid').removeClass('initials-box').addClass('initials-box');;

                // remove disable property for all inputs except history inputs:
                $('#' + $("#" + initials_checkboxes[i].id).parents().eq(7)[0].id + " :input")
                    .not('#' + $("#" + initials_checkboxes[i].id)
                        .parents().eq(7)[0].id + " :input[id^='reading_']").removeAttr('disabled');

                // remove entry 'PASS' from initials-box:
                $('#' + initials_checkboxes[i].id.replace('Override', '')).val('');
                validateInitial(initials_checkboxes[i].id.replace('Override', ''))

                $($($("#" + initials_checkboxes[i].id).parents().eq(8)[0]).children().children().children()[0]).removeClass('passed-step').addClass('collapsed');

            }
        })
    }
    // validateAndAssignMinMax();
}


function validateErrorWarningRange(id, warnMin, warnMax, errMin, errMax) {


    if (warnMin.toString().indexOf(">") > -1 || warnMin.toString().indexOf("<") > -1) {
        warnMin.toString().replace(">", "").replace("<", "");
    }
    if (warnMax.toString().indexOf(">") > -1 || warnMax.toString().indexOf("<") > -1) {
        warnMax.toString().replace(">", "").replace("<", "");
    }
    if (errMin.toString().indexOf(">") > -1 || errMin.toString().indexOf("<") > -1) {
        errMin.toString().replace(">", "").replace("<", "");
    }
    if (errMax.toString().indexOf(">") > -1 || errMax.toString().indexOf("<") > -1) {
        errMax.toString().replace(">", "").replace("<", "");
    }
    if ($('#' + id).val() == "") {
        $('#' + id).removeClass('error');
        $('#' + id).removeClass('warning');
        $('#' + id + "_popup").remove();
        $('#' + id).parent().removeClass('tooltip');
        return;
    }
    if (warnMin != "9999999999" && warnMax != "9999999999" && errMin != "9999999999" && errMax != "9999999999") {
        if ($('#' + id).val() && $('#' + id).val() < errMin || $('#' + id).val() > errMax) {
            $('#' + id).addClass('error');
            $('#' + id).removeClass('warning');
            $('#' + id + "_popup").remove();
            // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'>Error Range: <" + errMin + " and >" + errMax + ", Warning Range: <" + warnMin + " and >" + warnMax + "</div>");
            $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + errMin + " - " + warnMin + "," + warnMax + " - " + errMax + "</div>");
            $('#' + id).parent().addClass('tooltip');
        } else if (($('#' + id).val() >= errMin && $('#' + id).val() < warnMin) || ($('#' + id).val() > warnMax && $('#' + id).val() <= errMax)) {
            $('#' + id).addClass('warning');
            $('#' + id).removeClass('error');
            $('#' + id + "_popup").remove();
            // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + " and >" + errMax + ", Warning Range: <" + warnMin + " and >" + warnMax + "</div>");
            $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + errMin + " - " + warnMin + "," + warnMax + " - " + errMax + "</div>");
            // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + errMin + " - " + warnMin + "," + warnMax + " - " + errMax +  "</div>");
            $('#' + id).parent().addClass('tooltip');
        } else {
            $('#' + id).removeClass('error');
            $('#' + id).removeClass('warning');
            $('#' + id + "_popup").remove();
            $('#' + id).parent().removeClass('tooltip');
        }
    }
    else {
        if (warnMin != "9999999999" && warnMax != "9999999999" && errMin == "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() < warnMin || $('#' + id).val() > warnMax) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + " and >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: <" + warnMin + ", >" + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + warnMin + " - 9999999999</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('warning');
            }

        }
        if (errMin != "9999999999" && errMax != "9999999999" && warnMin == "9999999999" && warnMax == "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() < errMin || $('#' + id).val() > errMax) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + " and >" + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + errMax + ", Abnormal Range: <" + errMin + ", >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + errMax + ", Abnormal Range: <" + errMin + ", >" + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('error');
            }
        }
        if (warnMin != "9999999999" && warnMax == "9999999999" && errMin == "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() < warnMin) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: <" + warnMin + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('warning');
            }
        }
        if (warnMax != "9999999999" && warnMin == "9999999999" && errMin == "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() > warnMax) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: >" + warnMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('warning');
            }
        }
        if (warnMax == "9999999999" && warnMin == "9999999999" && errMin != "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() < errMin) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + errMin + ", Abnormal Range: <" + errMin + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('error');

            }
        }
        if (warnMax == "9999999999" && warnMin == "9999999999" && errMin == "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && $('#' + id).val() > errMax) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: >" + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + errMax + ", Abnormal Range: >" + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else {
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');
                $('#' + id).removeClass('error');

            }
        }
        if (warnMax == "9999999999" && warnMin == "9999999999" && errMin == "9999999999" && errMax == "9999999999") {
            $('#' + id).removeClass('warning');
            $('#' + id).removeClass('error');
            $('#' + id + "_popup").remove();
            $('#' + id).parent().removeClass('tooltip');
        }
        if (warnMin != "9999999999" && warnMax != "9999999999" && errMin == "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() > errMax)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >ERROR Range: >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + errMax + ", Abnormal Range: >" + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: < " + warnMin + " , " + warnMax + " - " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() < warnMin || $('#' + id).val() > warnMax)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + " and >" + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: < " + warnMin + ", > " + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: < " + warnMin + ", " + warnMax + " - " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin == "9999999999" && warnMax != "9999999999" && errMin != "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() > errMax || $('#' + id).val() < errMin)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();

                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + " and >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + errMax + ", Abnormal Range: <" + errMin + ", > " + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + warnMax + ", Abnormal Range: <" + errMin + ", > " + warnMax + " - " + errMax + "</div>");

                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() > warnMax)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: >" + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + warnMax + ", Abnormal Range: <" + errMin + ", > " + warnMax + " - " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin != "9999999999" && warnMax == "9999999999" && errMin != "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() > errMax || $('#' + id).val() < errMin)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + " and >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + errMax + ", Abnormal Range: <" + errMin + ", > " + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + errMax + ", Abnormal Range: " + errMin + " - " + warnMin + ", > " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() < warnMin)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: <" + warnMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + errMax + ", Abnormal Range: " + errMin + " - " + warnMin + ", > " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin != "9999999999" && warnMax != "9999999999" && errMin != "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() < errMin)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + errMin + ", Abnormal Range: <" + errMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + errMin + " - " + warnMin + " , >" + warnMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() < warnMin || $('#' + id).val() > warnMax)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + " and >"  + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: <" + warnMin + ", >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + warnMax + ", Abnormal Range: " + errMin + " - " + warnMin + " , >" + warnMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin != "9999999999" && warnMax == "9999999999" && errMin != "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() < errMin)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: " + errMin + " - " + warnMin + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() < warnMin)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: <" + warnMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: " + errMin + " - " + warnMin + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin != "9999999999" && warnMax == "9999999999" && errMin == "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() > errMax)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + errMax + ", Abnormal Range: >" + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + errMax + ", Abnormal Range: <" + warnMin + " , >" + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() < warnMin)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: <" + warnMin + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + warnMin + ", Abnormal Range: <" + warnMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + warnMin + " - " + errMax + ", Abnormal Range: <" + warnMin + " , >" + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin == "9999999999" && warnMax != "9999999999" && errMin != "9999999999" && errMax == "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() < errMin)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: <" + errMin + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: >" + errMin + ", Abnormal Range: <" + errMin + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + warnMax + ", Abnormal Range: <" + errMin + " , >" + warnMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() > warnMax)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: >" + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: " + errMin + " - " + warnMax + ", Abnormal Range: <" + errMin + " , >" + warnMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
        if (warnMin == "9999999999" && warnMax != "9999999999" && errMin == "9999999999" && errMax != "9999999999") {
            if ($('#' + id).val() && ($('#' + id).val() > errMax)) {
                $('#' + id).addClass('error');
                $('#' + id).removeClass('warning');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Error Range: >" + errMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + errMax + ", Abnormal Range: >" + errMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: " + warnMax + " - " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');

            }
            else if ($('#' + id).val() && ($('#' + id).val() > warnMax)) {
                $('#' + id).addClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Warning Range: >" + warnMax + "</div>");
                // $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: >" + warnMax + "</div>");
                $('#' + id).parent().append("<div id='" + id + "_popup' class='tooltiptext' onclick='closePopup(id)'  style='margin-right: 20px;' >Normal Range: <" + warnMax + ", Abnormal Range: " + warnMax + " - " + errMax + "</div>");
                $('#' + id).parent().addClass('tooltip');
            }
            else {
                $('#' + id).removeClass('warning');
                $('#' + id).removeClass('error');
                $('#' + id + "_popup").remove();
                $('#' + id).parent().removeClass('tooltip');

            }
        }
    }
    let initialsBoxId = $('#' + id).parents().closest('.panel-body').children().find('[class^=initials]');
    if (initialsBoxId.length > 0) {
        validateInitial(initialsBoxId[0].id);
    }
    let initialsCheckBoxId = $("#" + id).parents().closest('.panel-body').children().find('[onclick^=initialsCheckBoxClicked]');
    if (initialsCheckBoxId.length > 0) {
        initialsCheckBoxClicked(initialsCheckBoxId[0].id);
    }

}

function selectionChanged(id) {
    let filter = $('#' + id).attr("validation");
    if (filter != "") {
        getDdlValidations();
    }
}

function closePopup(id) {
    $('#' + id).hide();
}

let sourceElementLineNumber;

function selectionChanged(id, condition_LHS, condition_RHS, statement_LHS, statement_RHS) {
    let filter = $('#' + id).attr("validation");
    if (filter != "") {
        getDdlValidations();
    }
    if (condition_LHS == null && condition_RHS == null && statement_LHS == null && statement_RHS == null) {
        // minmaxjsonValidation();
        // validateAndAssignMinMax();
        if (Object.keys(complexValJSON).length > 0 && (complexValJSON[id] != "" || complexValJSON[id] != undefined)) {
            eval(complexValJSON[id]);
        }
        return;
    } else if (condition_LHS.length > 0 && condition_LHS[0].indexOf("iff_") > -1) {
        selectionChangedV2(id, condition_LHS, condition_RHS, statement_LHS, statement_RHS);
        return;
    }
    else {
        let if_condition_LHS = [];
        let if_condition_RHS = [];
        let else_condition_RHS = [];
        let else_condition_LHS = [];

        let if_statement_LHS = [];
        let if_statement_RHS = [];
        let else_statement_LHS = [];
        let else_statement_RHS = [];

        if (Array.isArray(condition_LHS) == true && Array.isArray(condition_RHS) == true) {
            if_condition_LHS = condition_LHS.filter(element => element.indexOf("e_") == -1)
            if_condition_RHS = condition_RHS.filter(element => element.indexOf("e_") == -1)

            else_condition_LHS = condition_LHS.filter(element => element.indexOf("e_") > -1)
            else_condition_RHS = condition_RHS.filter(element => element.indexOf("e_") > -1)
        }

        if (Array.isArray(statement_LHS) == true && Array.isArray(statement_RHS) == true) {
            if_statement_LHS = statement_LHS.filter(element => element.indexOf("e_") == -1);
            if_statement_RHS = statement_RHS.filter(element => element.indexOf("e_") == -1);

            else_statement_LHS = statement_LHS.filter(element => element.indexOf("e_") > -1);
            else_statement_RHS = statement_RHS.filter(element => element.indexOf("e_") > -1);
        }

        sourceElementLineNumber = $('#' + id).attr('lineno');
        $("#" + id).removeClass('error');

        if ($('#' + id).val() != 'Select') {
            if (!($("#" + id).hasClass('skip-validation'))) {
                let condition_result = true;

                let counter = 0;

                for (let i = 0; i < if_condition_LHS.length; i++) {

                    let lineno = if_condition_LHS[i];
                    let input_element = $("[lineno=" + lineno + "]").children().find('input');
                    let select_element = $("[lineno=" + lineno + "]").children().find('select');
                    //let textarea_element = $("[lineno=" + lineno + "]").children().find('textarea');
                    // get all inputs that do not have 'Initials_' in the id. Check if the value matches the one in condition_RHS

                    // if (input_element.length > 0) {
                    //     if(input_element.attr('id').indexOf('Initials_') == -1) {
                    //         if (($("[lineno=" + lineno +"]").children().find('input').val().trim()) != if_condition_RHS[i]) {
                    //             counter--;
                    //         }
                    //     }
                    // } 
                    // if (select_element.length > 0) {
                    //     if ($("[lineno=" + lineno +"]").children().find('select').val().trim() != if_condition_RHS[i]) {
                    //         if ($("[lineno=" + lineno +"]").children().find('select').val().trim() != 'Select') {
                    //             counter--;
                    //         }
                    //     }
                    // }

                    if (select_element.length > 0) {
                        if (select_element.val().trim() == if_condition_RHS[i]) {
                            counter++;
                        }
                    }

                    if (input_element.length > 0) {
                        if (input_element.attr('id').indexOf('Initials_') == -1 && input_element.val().trim() == if_condition_RHS[i]) {
                            counter++;
                        }
                    }


                }

                if (counter == if_condition_LHS.length) {
                    // all conditions are satisfied:
                    setValuesV2(if_statement_LHS, if_statement_RHS, true, sourceElementLineNumber);
                } else {
                    setValuesV2(else_statement_LHS, else_statement_RHS, false, sourceElementLineNumber);
                }
            }
        } else {
            revertChangesOnSelect(statement_LHS);
        }
        //minmaxjsonValidation();
        // validateAndAssignMinMax();
    }


}

function selectionChangedBCK(id, condition_LHS, condition_RHS, statement_LHS, statement_RHS) {
    let if_condition_LHS = [];
    let if_condition_RHS = [];
    let else_condition_RHS = [];
    let else_condition_LHS = [];

    let if_statement_LHS = [];
    let if_statement_RHS = [];
    let else_statement_LHS = [];
    let else_statement_RHS = [];

    $("#" + id).removeClass('error');

    sourceElementLineNumber = $('#' + id).attr('lineno');

    if ($('#' + id).val() != 'Select') {

        if (!($("#" + id).hasClass('skip-validation'))) {
            if (Array.isArray(condition_LHS) == true && Array.isArray(condition_RHS) == true) {
                if_condition_LHS = condition_LHS.filter(element => element.indexOf("e_") == -1)
                if_condition_RHS = condition_RHS.filter(element => element.indexOf("e_") == -1)

                else_condition_LHS = condition_LHS.filter(element => element.indexOf("e_") > -1)
                else_condition_RHS = condition_RHS.filter(element => element.indexOf("e_") > -1)
            }

            if (Array.isArray(statement_LHS) == true && Array.isArray(statement_RHS) == true) {
                if_statement_LHS = statement_LHS.filter(element => element.indexOf("e_") == -1);
                if_statement_RHS = statement_RHS.filter(element => element.indexOf("e_") == -1);

                else_statement_LHS = statement_LHS.filter(element => element.indexOf("e_") > -1);
                else_statement_RHS = statement_RHS.filter(element => element.indexOf("e_") > -1);
            }

            let condition_result = true;

            let clear = 0;

            for (let i = 0; i < if_condition_LHS.length; i++) {
                clear = 0;
                let lineno = if_condition_LHS[i];
                let input_element = $("[lineno=" + lineno + "]").children().find('input');
                let select_element = $("[lineno=" + lineno + "]").children().find('select');

                // get all inputs that do not have 'Initials_' in the id. Check if the value matches the one in condition_RHS

                if (input_element.length > 0) {
                    if (input_element.attr('id').indexOf('Initials_') == -1) {
                        if (($("[lineno=" + lineno + "]").children().find('input').val().trim()) != if_condition_RHS[i]) {
                            condition_result = false;
                        }
                    }
                }
                if (select_element.length > 0) {
                    if ($("[lineno=" + lineno + "]").children().find('select').val().trim() != if_condition_RHS[i]) {
                        if ($("[lineno=" + lineno + "]").children().find('select').val().trim() != 'Select') {
                            condition_result = false;
                        }
                    }
                }
            }





            if (condition_result) {
                //setValues(if_statement_LHS, if_statement_RHS);
                setValuesV2(if_statement_LHS, if_statement_RHS, true, sourceElementLineNumber);
            } else {
                //setValues(else_statement_LHS, else_statement_RHS);
                setValuesV2(else_statement_LHS, else_statement_RHS, false, sourceElementLineNumber);
            }


        }

    } else {
        // take the list of all elements - remove validation :
        // remove the values in the listed elements:
        revertChangesOnSelect(statement_LHS);


    }
}

function setValuesV3(LHS, RHS) {
    for (i = 0; i < LHS.length; i++) {
        LHS[i] = LHS[i].replace("iff_", "").replace("elsif_", "").replace("else_", "");
        let element = $("[lineno=" + LHS[i].replace("set_", "") + "]");
        let targetElement;

        switch (RHS[i].toLowerCase()) {
            case 'set_na':
                if (element.children().find('input').length > 0) {
                    targetElement = element.children().find('input');
                    if (targetElement[0].hasAttribute('type') && targetElement[0].type == "number") {
                        targetElement[0].setAttribute('number', 'true');
                        targetElement[0].setAttribute('type', 'text');
                    }
                    targetElement.val('NA');
                    if (targetElement.attr('id').indexOf('Initials_') > -1) {
                        validateInitial(targetElement.attr('id'));
                    }
                }
                if (element.children().find('select').length > 0) {
                    element.children().find('select').val('NA');
                }
                if (element.children().find('textarea').length > 0) {
                    element.children().find('textarea').val('NA');
                }
                break;

            case 'return':

                if (element.children().find('input').length > 0
                    && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                    // there can be more than one input associated with a line number ?
                    targetElement = element.children().find('input').not("[id^=reading_]");
                    targetElement.val("");
                    targetElement.removeClass('error').addClass('error');
                }

                if (element.children().find('select').length > 0) {
                    targetElement = element.children().find('select');

                    targetElement.removeClass('error').addClass('error');
                }
                break;

            case 'continue':
                if (element.children().find('input').length > 0
                    && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                    // there can be more than one input associated with a line number ?
                    targetElement = element.children().find('input');
                    targetElement.removeClass('skip-validation');
                }

                if (element.children().find('select').length > 0) {
                    targetElement = element.children().find('select');
                    targetElement.removeClass('skip-validation');
                }
                break;
            case 'skip':
                if (element.children().find('input').length > 0
                    && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                    // there can be more than one input associated with a line number ?
                    targetElement = element.children().find('input');
                    targetElement.removeClass('skip-validation').addClass('skip-validation');
                }

                if (element.children().find('select').length > 0) {
                    targetElement = element.children().find('select');
                    targetElement.removeClass('skip-validation').addClass('skip-validation');
                }
                break;

            case 'revert_changes_to_line':
                if (element.children().find('input').length > 0) {
                    // there can be more than one input associated with a line number ?
                    targetElement = element.children().find('input');
                    //targetElement.val("");
                    targetElement.removeClass('error');

                    if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                        validateInitial(targetElement.attr('id'));
                    }

                }

                if (element.children().find('select').length > 0) {

                    targetElement = element.children().find('select');
                    targetElement.removeClass('error');
                    //targetElement.val('Select');
                    //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                    //targetElement.val('Select');
                    //}


                }
                break;
            case 'reset_values_on_line':

                if (element.children().find('input').length > 0) {
                    // there can be more than one input associated with a line number ?
                    targetElement = element.children().find('input').not("[id^=reading_]");
                    targetElement.val("");
                    if (targetElement[0].hasAttribute('number')) {
                        targetElement[0].removeAttribute('number');
                        targetElement[0].setAttribute('type', 'number');
                    }

                    targetElement.removeClass('error');

                    if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                        validateInitial(targetElement.attr('id'));
                    }

                }

                if (element.children().find('select').length > 0) {

                    targetElement = element.children().find('select');
                    targetElement.removeClass('error');
                    targetElement.val('Select');
                    //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                    //targetElement.val('Select');
                    //}
                }
                if (element.children().find('textarea').length > 0) {
                    element.children().find('textarea').val("");
                }
                break;
            default:
                if (RHS[i].toLowerCase().indexOf("set_") > -1) {
                    // this is to set value:
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        targetElement = element.children().find('input');
                        targetElement.val(RHS[i].replace("set_", ""));
                    }
                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.val(RHS[i].replace("set_", ""));
                    }
                    if (element.children().find('textarea').length > 0) {
                        element.children().find('textarea').val(RHS[i].replace("set_", ""));
                    }
                }

                break;
        }
    }
}

function selectionChangedV2(id, cndtn_LHS, cndtn_RHS, stmt_LHS, stmt_RHS) {
    // expected parameters:
    // cndtn_LHS = [line number array: 123,&&_122,||_200]
    // ["iff_123","iff_&&_130","elsif_122","elsif_&&_132","else_110","else_||_120"]

    // cndtn_RHS = ["==Yes",>65,<76,>=90,<=31,!=No]
    // stmt_LHS = [iff_123,iff_134,elsif_134,elsif_123,else_133,else_132] - indicates to which line the below action is to be done
    // stmt_RHS = ["Yes","No",skip,continue,return,reset,revert] - indicates what has to be done
    // [calc(abs(l_123-l_124)/(l_123+l_124))]['>0.01'][iff_125,else_125][Pass,Fail]
    // [calc(some Calculation)]['>l_123'][]
    if (Object.keys(complexValJSON).length > 0 && (complexValJSON[id] != "" || complexValJSON[id] != undefined)) {
        eval(complexValJSON[id]);
    }
    let if_cndtn = cndtn_LHS.filter(function (e) { return e.indexOf("iff_") > -1 });
    let elsif_cndtn = cndtn_LHS.filter(function (e) { return e.indexOf("elsif_") > -1 });
    let else_cndtn = cndtn_LHS.filter(function (e) { return e.indexOf("else_") > -1 });
    let if_exp = "";
    let elsif_exp = "";

    let if_stmt = stmt_LHS.filter(function (e) { return e.indexOf("iff_") > -1 });
    let elsif_stmt = stmt_LHS.filter(function (e) { return e.indexOf("elsif_") > -1 });
    let else_stmt = stmt_LHS.filter(function (e) { return e.indexOf("else_") > -1 });

    try {
        let statementLHS = stmt_LHS;
        let val = $('#' + id).val();
        if (val == "Select" || val == "") {
            revertChangesOnSelect(statementLHS);
            return;
        }
        if (if_cndtn.length > 0) {
            let len = if_cndtn.length;
            let conditionRHS = cndtn_RHS.slice();
            let statementRHS = stmt_RHS.slice();
            if_exp = generateExpression(if_cndtn, conditionRHS.splice(0, if_cndtn.length));

            if (if_exp.indexOf("_novalue_") == -1 && eval(if_exp)) {

                //setValuesV2(stmt_LHS.splice(0,if_cndtn.length),stmt_RHS.splice(0,if_cndtn.length),eval(exp),$('#' + id).attr('lineno'))
                setValuesV3(if_stmt, statementRHS.splice(0, if_stmt.length));
            } else {
                conditionRHS = cndtn_RHS.slice();
                statementRHS = stmt_RHS.slice();
                elsif_exp = generateExpression(elsif_cndtn, conditionRHS.splice(if_cndtn.length, elsif_cndtn.length));

                if (elsif_exp == "") {
                    setValuesV3(else_stmt, statementRHS.splice(if_stmt.length, statementRHS.length));
                } else {
                    if (elsif_exp.indexOf("_novalue_") == -1 && eval(elsif_exp) && !(eval(if_exp))) {
                        // setValuesV2(stmt_LHS.splice(if_cndtn.length,elsif_cndtn.length),stmt_RHS.splice(if_cndtn.length,elsif_cndtn.length),eval(exp),$('#' + id).attr('lineno'))
                        // setValuesV2(elsif_stmt,statementRHS.splice(if_stmt.length,elsif_stmt.length),eval(exp),$('#' + id).attr('lineno'));

                        setValuesV3(elsif_stmt, statementRHS.splice(if_stmt.length, elsif_stmt.length));
                    } else {
                        // setValuesV2(stmt_LHS.splice(elsif_cndtn.length,),stmt_RHS.splice(if_cndtn.length,elsif_cndtn.length),eval(exp),$('#' + id).attr('lineno'))

                        setValuesV3(else_stmt, statementRHS.splice(elsif_stmt.length, statementRHS.length));
                    }
                }


            }
        }
    } catch (ex) {
        console.log(ex);
    }
}

function findAndReplaceValue(lineno) {

    let tmp = "";
    if (lineno.indexOf("&&") > -1) {
        tmp = "&&_";
        lineno = lineno.replace("&&_", "")
    } else if (lineno.indexOf("||") > -1) {
        tmp = "||_";
        lineno = lineno.replace("||_", "")
    }

    let input = $("[lineno=" + lineno + "]").children().find('input').not('[id^=initials]').not("[id^=reading_]").not("[id^=Initial]");
    let select = $("[lineno=" + lineno + "]").children().find('select');
    let textarea = $("[lineno=" + lineno + "]").children().find('textarea');

    if (input.length > 0) {
        return tmp + "'" + input.val() + "'";
        // return tmp.replace("(_"+ lineno +"_)","("+ input.val() +")");
    } else if (select.length > 0) {
        return tmp + "'" + select.val() + "'";
        // return tmp.replace("(_"+ lineno +"_)","("+ select.val() +")");
    } else if (textarea.length > 0) {
        return tmp + "'" + textarea.val() + "'";
        // return tmp.replace("(_"+ lineno +"_)","("+ textarea.val() +")");
    }
}

function generateExpression(LHS, RHS) {

    let exp = "";
    let len = LHS.length;
    try {
        for (let i = 0; i < len; i++) {

            RHS[i] = RHS[i].trim().replace(">=", ">='").replace(">", ">'").replace("<=", "<='").replace("<", "<'").replace("==", "=='").replace("!=", "!='") + "'";
            RHS[i] = RHS[i].trim().replace(">=' ", ">='").replace(">' ", ">'").replace("<=' ", "<='").replace("<' ", "<'").replace("==' ", "=='").replace("!=' ", "!='");
            // if (RHS[i].indexOf("L_num_") > -1) {
            //     let operator = findOperation(RHS[i]);
            //     let RHS_val = findAndReplaceValue(RHS[i].replace(operator,"").replace("iff_","").replace("elsif_","").replace("else_","")).replace("_"," ").trim();
            //     if (RHS_val == "" || RHS_val == null) {
            //         RHS[i] = "_novalue_";
            //     } else {
            //         RHS[i] = operator + RHS_val;
            //     }
            // }
            exp += findAndReplaceValue(LHS[i].replace("iff_", "").replace("elsif_", "").replace("else_", "")).replace("_", " ").trim() + RHS[i];
        }
        return exp;
    } catch (ex) {
        console.log(ex);
    }

}

// Complex:

function calc(lineno, exp, success = null, error = null) {
    let expressionArr = exp.split(" ");
    let newExp = [];
    let result = "";

    if (lineno.split(":").length >= 2) {
        // there are more than one target element:
        let list_of_lines = lineno.split(":");
        for (let line of list_of_lines) {
            let lno = line.replace("L_", "");
            let input = $("[lineno=" + lno + "]").children().find('input').not('[id^=initials]').not("[id^=reading_]");
            let select = $("[lineno=" + lno + "]").children().find('select');
            let textarea = $("[lineno=" + lno + "]").children().find('textarea');

            for (let i = 0; i < expressionArr.length; i++) {
                if (expressionArr[i].indexOf("L_") > -1) {
                    let val = getVal(expressionArr[i]);
                    if (val == "" || val == "NaN") {
                        if (input.length > 0) {
                            input.removeClass('error-box');
                        } else if (select.length > 0) {
                            select.removeClass('error-box');
                        } else if (textarea.length > 0) {
                            textarea.removeClass('error-box');
                        }
                        return;
                    } else {
                        newExp[i] = getVal(expressionArr[i]);
                    }

                } else {
                    newExp[i] = expressionArr[i]
                }
            }

            exp = newExp.join(" ");     
            result = eval(exp);
            if (!result) {

                if (input.length > 0) {
                    if (error == null) {
                        input.removeClass('error-box').addClass('error-box');
                        if (input.attr("number") == "true") {
                            input.attr("type", "number");
                        }
                    } else {
                        if (input.attr("type") == "number") {
                            input.attr("type", "text");
                            input.attr("number", "true");
                        }
                        input.val(error);
                    }

                    // error == null ? input.removeClass('error-box').addClass('error-box') : input.val(error);
                } else if (select.length > 0) {
                    error == null ? select.removeClass('error-box').addClass('error-box') : select.val(error);
                } else if (textarea.length > 0) {
                    error == null ? textarea.removeClass('error-box').addClass('error-box') : textarea.val(error);
                }
            } else {
                if (input.length > 0) {
                    if (success == null) {
                        input.removeClass("error-box");
                        if (input.attr("number") == "true") {
                            input.attr("type", "number");
                        }
                    } else {
                        if (input.attr("type") == "number") {
                            input.attr("type", "text");
                            input.attr("number", "true");
                        }
                        input.val(success);
                    }
                    // success == null ? input.removeClass('error-box') : input.val(success);
                } else if (select.length > 0) {
                    success == null ? select.removeClass('error-box') : select.val(success);
                } else if (textarea.length > 0) {
                    success == null ? textarea.removeClass('error-box') : textarea.val(success);
                }
            }

        }
    } else {
        lineno = lineno.replace("L_", "");

        let input = $("[lineno=" + lineno + "]").children().find('input').not('[id^=initials]').not("[id^=reading_]");
        let select = $("[lineno=" + lineno + "]").children().find('select');
        let textarea = $("[lineno=" + lineno + "]").children().find('textarea');

        for (let i = 0; i < expressionArr.length; i++) {
            if (expressionArr[i].indexOf("L_") > -1) {
                let val = getVal(expressionArr[i]);
                if (val == "" || val == "NaN") {
                    if (input.length > 0) {
                        input.removeClass('error-box');
                    } else if (select.length > 0) {
                        select.removeClass('error-box');
                    } else if (textarea.length > 0) {
                        textarea.removeClass('error-box');
                    }
                    return;
                } else {
                    newExp[i] = getVal(expressionArr[i]);
                }

            } else {
                newExp[i] = expressionArr[i]
            }
        }

        exp = newExp.join(" ");
		exp = exp.replace(/'/g, '');
        result = eval(exp);
        if (!result) {

            if (input.length > 0) {
                if (error == null) {
                    input.removeClass('error-box').addClass('error-box');
                    if (input.attr("number") == "true") {
                        input.attr("type", "number");
                    }
                } else {
                    if (input.attr("type") == "number") {
                        input.attr("type", "text");
                        input.attr("number", "true");
                    }
                    input.val(error);
                }

                // error == null ? input.removeClass('error-box').addClass('error-box') : input.val(error);
            } else if (select.length > 0) {
                error == null ? select.removeClass('error-box').addClass('error-box') : select.val(error);
            } else if (textarea.length > 0) {
                error == null ? textarea.removeClass('error-box').addClass('error-box') : textarea.val(error);
            }
        } else {
            if (input.length > 0) {
                if (success == null) {
                    input.removeClass("error-box");
                    if (input.attr("number") == "true") {
                        input.attr("type", "number");
                    }
                } else {
                    if (input.attr("type") == "number") {
                        input.attr("type", "text");
                        input.attr("number", "true");
                    }
                    input.val(success);
                }
                // success == null ? input.removeClass('error-box') : input.val(success);
            } else if (select.length > 0) {
                success == null ? select.removeClass('error-box') : select.val(success);
            } else if (textarea.length > 0) {
                success == null ? textarea.removeClass('error-box') : textarea.val(success);
            }
        }
    }



}
function getVal(lineno) {
    lineno = lineno.replace("L_", "");
    let input = $("[lineno = " + lineno + "]").children().find('input').not('[id^=initials]').not("[id^=reading_]");
    let select = $("[lineno = " + lineno + "]").children().find('select');
    let textarea = $("[lineno = " + lineno + "]").children().find('textarea');

    if (input.length > 0) {
        if (input.val() == '') {
            return 'undefined';
        }
        return "'" + input.val() + "'";
    } else if (select.length > 0) {
        if (select.val() == '') {
            return 'undefined';
        }
        return "'" + select.val() + "'";
    } else if (textarea.length > 0) {
        if (textarea.val() == '') {
            return 'undefined';
        }
        return "'" + textarea.val() + "'";
    } else {
        return "NaN";
    }
}

function revertChangesOnSelect(statement_LHS) {
    let element;
    for (let i = 0; i < statement_LHS.length; i++) {
        element = $("[lineno=" + statement_LHS[i].replace("e_", "").replace("set_", "").replace("iff_", "").replace("elsif_", "").replace("else_", "") + "]");

        let input = element.children().find('input');
        let select = element.children().find('select');
        let textarea = element.children().find('textarea');

        if (input.length > 0) {
            element.children().find('input').removeClass('skip-validation');
            element.children().find('input').removeClass('error');

            if (element.children().find('input').val() == "NA" || element.children().find('input').val().toString() != "") {
                element.children().find('input').val('');
                if (element.children().find('input')[0].hasAttribute('number')) {
                    element.children().find('input')[0].setAttribute('type', 'text');
                    element.children().find('input')[0].removeAttribute('number');
                }
                if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                    validateInitial(element.children().find('input').attr('id'));
                }
            }
        }

        if (textarea.length > 0) {
            if (element.children().find('textarea').val() == "NA") {
                element.children().find('textarea').val('');
            }
        }

        if (select.length > 0) {
            //element.children().find('input').val("");
            element.children().find('select').removeClass('skip-validation');
            element.children().find('select').removeClass('error');
            //if (element.children().find('select').val() == "NA") {
            //element.children().find('select').val('Select');
            //}
            element.children().find('select').val("Select");
        }
    }
}

function setValuesV2(LHS, RHS, condition, sourceElementLineNumber) {
    if (condition) { // if the conditions of if condition is true:

        for (i = 0; i < LHS.length; i++) {
            let element = $("[lineno=" + LHS[i].replace("set_", "") + "]");
            let targetElement;

            switch (RHS[i].toLowerCase()) {
                case 'set_na':
                    if (element.children().find('input').length > 0) {
                        targetElement = element.children().find('input');
                        if (targetElement[0].hasAttribute('type') && targetElement[0].type == "number") {
                            targetElement[0].setAttribute('number', 'true');
                            targetElement[0].setAttribute('type', 'text');
                        }
                        targetElement.val('NA');
                        if (targetElement.attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }
                    }
                    if (element.children().find('select').length > 0) {
                        element.children().find('select').val('NA');
                    }
                    if (element.children().find('textarea').length > 0) {
                        element.children().find('textarea').val('NA');
                    }
                    break;

                case 'return':

                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input').not("[id^=reading_]");
                        targetElement.val("");
                        targetElement.removeClass('error').addClass('error');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');

                        targetElement.removeClass('error').addClass('error');
                    }
                    break;

                case 'continue':
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        targetElement.removeClass('skip-validation');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.removeClass('skip-validation');
                    }
                    break;
                case 'skip':
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        targetElement.removeClass('skip-validation').addClass('skip-validation');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.removeClass('skip-validation').addClass('skip-validation');
                    }
                    break;

                case 'revert_changes_to_line':
                    if (element.children().find('input').length > 0) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        //targetElement.val("");
                        targetElement.removeClass('error');

                        if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }

                    }

                    if (element.children().find('select').length > 0) {

                        targetElement = element.children().find('select');
                        targetElement.removeClass('error');
                        //targetElement.val('Select');
                        //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                        //targetElement.val('Select');
                        //}


                    }
                    break;
                case 'reset_values_on_line':

                    if (element.children().find('input').length > 0) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input').not("[id^=reading_]");
                        targetElement.val("");
                        if (targetElement[0].hasAttribute('number')) {
                            targetElement[0].removeAttribute('number');
                            targetElement[0].setAttribute('type', 'number');
                        }

                        targetElement.removeClass('error');

                        if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }

                    }

                    if (element.children().find('select').length > 0) {

                        targetElement = element.children().find('select');
                        targetElement.removeClass('error');
                        targetElement.val('Select');
                        //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                        //targetElement.val('Select');
                        //}
                    }
                    if (element.children().find('textarea').length > 0) {
                        element.children().find('textarea').val("");
                    }
                    break;
                default:
                    if (RHS[i].toLowerCase().indexOf("set_") > -1) {
                        // this is to set value:
                        if (element.children().find('input').length > 0
                            && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                            targetElement = element.children().find('input');
                            targetElement.val(RHS[i].replace("set_", ""));
                        }
                        if (element.children().find('select').length > 0) {
                            targetElement = element.children().find('select');
                            targetElement.val(RHS[i].replace("set_", ""));
                        }
                        if (element.children().find('textarea').length > 0) {
                            element.children().find('textarea').val(RHS[i].replace("set_", ""));
                        }
                    }

                    break;
            }
        }

    } else { // execute below code for else condition:
        for (i = 0; i < LHS.length; i++) {

            let element = $("[lineno=" + LHS[i].replace("e_", "") + "]");
            let targetElement;

            switch (RHS[i].toLowerCase()) {
                case 'e_set_na':
                    if (element.children().find('input').length > 0) {
                        targetElement = element.children().find('input');
                        if (targetElement[0].hasAttribute('type') && targetElement[0].type == "number") {
                            targetElement[0].setAttribute('number', 'true');
                            targetElement[0].setAttribute('type', 'text');
                        }
                        targetElement.val('NA');
                        if (targetElement.attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }
                    }
                    if (element.children().find('select').length > 0) {
                        element.children().find('select').val('NA');
                    }
                    if (element.children().find('textarea').length > 0) {
                        element.children().find('textarea').val('NA');
                    }
                    break;

                case 'e_return':
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input').not("[id^=reading_]");
                        targetElement.val("");
                        targetElement.removeClass('error').addClass('error');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        // targetElement.val('Select');                                    
                        targetElement.removeClass('error').addClass('error');
                    }
                    break;

                case 'e_continue':
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        targetElement.removeClass('skip-validation');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.removeClass('skip-validation');
                    }
                    break;
                case 'e_skip':
                    if (element.children().find('input').length > 0
                        && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        targetElement.removeClass('skip-validation').addClass('skip-validation');
                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.removeClass('skip-validation').addClass('skip-validation');
                    }
                    break;

                case 'e_revert_changes_to_line':
                    if (element.children().find('input').length > 0) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input');
                        //targetElement.val("");
                        targetElement.removeClass('error');

                        if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }

                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        //targetElement.val("Select");
                        targetElement.removeClass('error');
                        //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                        //targetElement.val('Select');
                        //}

                    }
                    break;
                case 'e_reset_values_on_line':
                    if (element.children().find('input').length > 0) {
                        // there can be more than one input associated with a line number ?
                        targetElement = element.children().find('input').not("[id^=reading_]");
                        targetElement.val("");
                        if (targetElement[0].hasAttribute('number')) {
                            targetElement[0].removeAttribute('number');
                            targetElement[0].setAttribute('type', 'number');
                        }
                        targetElement.removeClass('error');

                        if (element.children().find('input').attr('id').indexOf('Initials_') > -1) {
                            validateInitial(targetElement.attr('id'));
                        }



                    }

                    if (element.children().find('select').length > 0) {
                        targetElement = element.children().find('select');
                        targetElement.val("Select");
                        targetElement.removeClass('error');
                        //if (LHS[i].replace("e_","").replace("set_","") < sourceElementLineNumber) {
                        //targetElement.val('Select');
                        //}

                    }
                    if (element.children().find('textarea').length > 0) {
                        element.children().find('textarea').val("");
                    }
                    break;
                default:
                    if (RHS[i].toLowerCase().indexOf("e_set_") > -1) {
                        // this is to set value:
                        if (element.children().find('input').length > 0
                            && element.children().find('input').attr('id').indexOf('Initials_') == -1) {
                            targetElement = element.children().find('input');
                            targetElement.val(RHS[i].replace("e_set_", ""));
                        }
                        if (element.children().find('select').length > 0) {
                            targetElement = element.children().find('select');
                            targetElement.val(RHS[i].replace("e_set_", ""));
                        }
                        if (element.children().find('textarea').length > 0) {
                            element.children().find('textarea').val(RHS[i].replace("e_set_", ""));
                        }
                    }
                    break;
            }
        }
    }
}

function cmbselectionChanged(selectedVal, cmbOptns, disSteps, formId, toVisibleCondition = null, visibleSteps = null, filteringValue = null) {
    if (filteringValue != "") {
        getDdlValidations();
    }
    if (disSteps != "") {
        let linenos = null;
        let to_enable = "", to_disable = "", each_steps;
        let stepIDs = disSteps;// == "" ? null : stepIDs;
        let input = [], select = [], textarea = [];
        let Optns = cmbOptns.split(':');

        let list_of_lines = linenos != null ? linenos.split(":") : [];
        let list_of_steps = stepIDs != null ? stepIDs.split(":") : [];
        for (let i = 0; i < Optns.length; i++) {
            if (selectedVal != Optns[i] && selectedVal != 'Select') {
                to_enable = linenos == null ? list_of_steps[i] : list_of_lines[i];
            }
            else if (selectedVal == 'Select') {
                to_enable = to_enable + "," + (linenos == null ? list_of_steps[i] : list_of_lines[i]);
            }
            else {
                to_disable = linenos == null ? list_of_steps[i] : list_of_lines[i];
            }
        }
        if (linenos != null) {
            // Add Code to diable steps using line Number
        }
        else {
            let stepIdDiv = $(".stepID");
            if (to_enable != '' && to_enable != undefined) {
                while (to_enable.charAt(0) === ',') {
                    to_enable = to_enable.substr(1);

                }
                let to_enable_stepNos = to_enable.split(',');
                for (let enable_steps of to_enable_stepNos) {
                    for (let div of stepIdDiv) {
                        if ($(div).text() == enable_steps) {
                            $(div).parents().eq(2).children().find(":input").not("[id^=Initials]").removeClass("disable");
                            $(div).parents().eq(2).children().find("[id^=Initials]").not("input[type='checkbox']").removeClass("initials-box-diasbled").removeClass("initials-box-valid").addClass("initials-box");

                            $(div).parents().eq(4).removeClass("enablestep").addClass("enablestep").removeClass('disablestep');
                            break;
                        }
                    }
                }
            }
            if (to_disable != "" && to_disable != undefined) {
                let stepnos = to_disable.split(',');
                for (let stp of stepnos) {
                    for (let div of stepIdDiv) {
                        if ($(div).text() == stp) {
                            $(div).parents().eq(2).children().find(":input").not("[id^=Initials]").removeClass("disable").addClass("disable");
                            //initials-box-diasbled
                            //$(div).parents().eq(2).children().find("[id^=Initials]").removeClass("initials-box").addClass("initials-box-diasbled");
                            $(div).parents().eq(2).children().find("[id^=Initials]").not("input[type='checkbox']").removeClass("initials-box").addClass("initials-box-diasbled");
                            //initials-box-diasbled
                            if ($(div).parents().eq(4).children().find("input").length > 0) {
                                $(div).parents().eq(4).children().find("input").val("");
                            } if ($(div).parents().eq(4).children().find("select").length > 0) {
                                $(div).parents().eq(4).children().find("select").val("Select");
                            } if ($(div).parents().eq(4).children().find("textarea").length > 0) {
                                $(div).parents().eq(4).children().find("textarea").val("")
                            }
                            $(div).parents().eq(4).removeClass("disablestep").addClass("disablestep").removeClass('enablestep');
                            break;
                        }
                    }
                }
            }
        }
    }
    // Hide/Reveal steps
    if (toVisibleCondition != "" && toVisibleCondition != null) {
        let conditionArr = toVisibleCondition.split(':');
        let toDisplay = visibleSteps.split(':');
        // To hide all the steps(conditionally hidden steps) before displaying.
        for (let a = 0; a < toDisplay.length; a++) {
            let allStepNos = toDisplay[a];
            let eachStepNo = allStepNos.split(',');
            for (let b = 0; b < eachStepNo.length; b++) {
                if (eachStepNo[b].includes('.')) {
                    let ElementID = '_' + formId + '_' + eachStepNo[b].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
                    //changes made as part of bugfix for warning comments(mo forms)
                    let warn_val = $('[id*="readingInput' + ElementID + '"]').val();
                    if (warn_val != "" && warn_val != undefined) {
                        $('[id*="readingInput' + ElementID + '"]').val("");
                        let event_triggered = $('[id*="readingInput' + ElementID + '"]').attr("onchange");
                        if (event_triggered !== undefined && event_triggered.indexOf("displaySteps") > -1) {
                            $('[id*="readingInput' + ElementID + '"]').off("change").on("change", function () { event_triggered }
                            ).trigger("change");
                        }

                    }
                    $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().addClass('hidden');
                }
                else {
                    $('#collapse_' + formId + '_' + eachStepNo[b]).parent().addClass('hidden');
                    $('#collapse_' + formId + '_' + eachStepNo[b]).children().children().find("[id^=Initials]").not("input[type='checkbox']").removeClass("initials-box").addClass("initials-box-diasbled");
                }
            }
        }
        // to display steps
        for (let i = 0; i < conditionArr.length; i++) {
            if (selectedVal == conditionArr[i]) {
                if (conditionArr.length == toDisplay.length) {
                    let toVisible = toDisplay[i];
                    let toDisplayStep = toVisible.split(',');
                    for (j = 0; j < toDisplayStep.length; j++) {
                        if (toDisplayStep[j].includes('.')) {
                            let ElementID = '_' + formId + '_' + toDisplayStep[j].replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
                            $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().removeClass('hidden');
                            $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().addClass('visible');
                        }
                        else {
                            $('#collapse_' + formId + '_' + toDisplayStep[j]).parent().removeClass('hidden');
                            $('#collapse_' + formId + '_' + toDisplayStep[j]).parent().addClass('visible');

                            $('#collapse_' + formId + '_' + toDisplayStep[j]).children().children().find("[id^=Initials]").not("input[type='checkbox']").removeClass("initials-box-diasbled").removeClass("initials-box-valid").addClass("initials-box");
                        }
                    }
                }
            }
        }
    }

}

function setValues(stmt_LHS, stmt_RHS) {
    for (let i = 0; i < stmt_LHS.length; i++) {
        // Set
        if (stmt_RHS[i] == 'set_na' || stmt_RHS[i] == 'e_set_na') {
            if ($("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('input').length > 0) {

                $("[lineno=" + stmt_LHS[i].replace("e_", "").
                    replace("set_", "" + "]")).children().
                    find('input').val(stmt_RHS[i].replace("e_", ""), "set_", "").toUpperCase();

            } if ($("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('select').length > 0) {

                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('select').val(stmt_LHS[i].replace("e_", "").replace("set_", ""));
            }

            // return:
        } else if (stmt_RHS[i] == 'return' || stmt_RHS[i] == 'e_return') {
            if ($("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').length > 0 &&
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').attr('id').indexOf('Initials_') == -1) {
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').val('');
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').removeClass('error').addClass('error');


            } else if ($("[lineno=" + stmt_LHS[i] + "]").children().find('select').length > 0) {
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('select').removeClass('error').addClass('error');
            }

            // skip
        } else if (stmt_RHS[i] == 'skip' || stmt_RHS[i] == 'e_skip') {
            if ($("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').length > 0 &&
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').attr('id').indexOf('Initials_') == -1) {
                //$("[lineno=" + stmt_LHS[i] + "]").children().find('input').val = '';
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').removeClass('skip-validation').addClass('skip-validation');


            } else if ($("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('select').length > 0) {
                //$("[lineno=" + stmt_LHS[i] + "]").children().find('select').val = '';
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('select').removeClass('skip-validation').addClass('skip-validation');
            }

            // continue
        } else if (stmt_RHS[i] == 'continue' || stmt_RHS[i] == 'e_continue') {
            if ($("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').length > 0 &&
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').attr('id').indexOf('Initials_') == -1) {
                //$("[lineno=" + stmt_LHS[i] + "]").children().find('input').val = '';
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('input').removeClass('skip-validation')


            } else if ($("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('select').length > 0) {
                //$("[lineno=" + stmt_LHS[i] + "]").children().find('select').val = '';
                $("[lineno=" + stmt_LHS[i].replace("e_", "") + "]").children().find('select').removeClass('skip-validation')
            }

            // set value - here see that when e_ condition is being executed, then 
        } else if (stmt_RHS[i].indexOf('set_') > -1 || stmt_RHS[i].indexOf('e_set_') > -1) {
            if ($("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('input').length > 0 &&
                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('input').attr('id').indexOf('Initials_') == -1) {
                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('input').val(stmt_RHS[i].replace("e_", "").replace("set_", ""));
                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('input').removeClass('skip-validation');


            } else if ($("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('select').length > 0) {

                //let selectOptions = $("[lineno=" + stmt_LHS[i].replace("e_","").replace("set_","") + "]").children().find('select option');

                //let matchedOption = selectOptions.filter( element => element.toLowerCase() == stmt_RHS[i].replace("e_","").replace("set_",""));

                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('select').val(stmt_RHS[i].replace("e_", "").replace("set_", ""));
                $("[lineno=" + stmt_LHS[i].replace("e_", "").replace("set_", "") + "]").children().find('select').removeClass('skip-validation');
            }
        }
    }
}

function mandatoryFields(id) {
    $('#' + id).blur(function () {
        if (!$(this).val()) {
            $('#' + id).addClass('error');
        }
        else {
            $('#' + id).removeClass('error');
        }
    });
}

function Generatejson(taskIdentifier) {
    var completionObject = [];
    var completionJSON;
    var formValid = true;
    var completionData = [];

    $('.formData').each(function (index, element) {
        //checks whether the form is valid for saving.
        if ($(element).find('.invalid').length > 0 || $(element).find('.error').length > 0 || $(element).find('.initials-box').length > 0) {
            formValid = false;
            completionJSON = "";
            return false;
        }
        var tid = "";
        var lineno = "";
        var instrid = "";
        var instrresp = "";
        var instr = "";
        var mid = "";
        var value = "";
        var units = "";
        var category = "";
        if (element.classList.contains('Steps')) {
            instrresp = $($(element).find('input')[0]).val();
            value = "";
        }
        if (element.classList.contains('Readings')) {
            if ($($(element).find('input')[0]).length != 0) {
                value = $($(element).find('input')[0]).val();
            }
            instrresp = "";
        }
        if ($(element).find('select').length != 0) {
            value = $(element).find('select option:selected').html();
        }
        lineno = element.getAttribute("lineno");
        mid = element.getAttribute("meterid");
        category = "meterreading";
        instrid = $(element).find(".stepID").html();
        if ($(element).find('.units').length != 0) {
            units = $(element).find('.units').html();
        } else {
            units = "";
        }
        if ($(element).find('.stepDesc').length != 0) {
            instr = unescape($(element).find('.stepDesc').html());
        } else {
            instr = unescape($($(element).find('label')[0]).html());
        }
        if (mid == null) {
            mid = "";
            category = "";
        }
        var stepData = {
            "tid": taskIdentifier,
            "lineno": lineno,
            "instrid": instrid,
            "instrresp": instrresp,
            "instr": instr,
            "mid": mid,
            "value": value,
            "units": units,
            "category": category
        }
        completionObject.push(stepData);
    });

    if (formValid) {
        completionJSON = {
            "completion": completionObject
        };
        console.log(completionJSON);
        localStorage.setItem("CompletionData", JSON.stringify(completionJSON));
    }
    completionData.push(formValid);
    completionData.push(JSON.stringify(completionJSON));
    console.log(completionData);
    return true;
}

function myFunction(id) {
    let prevRead_Id = $("#myPopup" + id).next().attr('id');
    if (prevRead_Id != "") {
        let redvalue = $("#" + prevRead_Id).val();
        $("#myPopup" + id).text(redvalue);
    }
    let visibility = $("#myPopup" + id).css("visibility");
    if (visibility == "hidden") {
        $("#myPopup" + id).css("visibility", "visible");
    } else {
        $("#myPopup" + id).css("visibility", "hidden");
    }
}

function displaySteps(readingVal, condition, stepNos, formId) {
    let allSteps = stepNos.split(',');
    let result;
    if (condition.includes(',')) {  // value with in the range of value
        let disConLHS = condition.split(',');
        let Cond_LHS = disConLHS[0];
        let Cond_RHS = disConLHS[1];
        result = eval(eval(readingVal + Cond_LHS) && eval(readingVal + Cond_RHS));
        if (result) {
            for (let i = 0; i < allSteps.length; i++) {
                basedOnStepsNos_display(allSteps[i], formId);
            }
        }
        else {
            for (let i = 0; i < allSteps.length; i++) {
                basedOnStepsNos_hide(allSteps[i], formId);
            }
        }
    }
    else {
        if (readingVal != "") {
            result = eval(parseFloat(readingVal,10) + condition);
            if (result) {
                for (let i = 0; i < allSteps.length; i++) {
                    basedOnStepsNos_display(allSteps[i], formId);
                }
            }
            else {
                for (let i = 0; i < allSteps.length; i++) {
                    basedOnStepsNos_hide(allSteps[i], formId);
                }
            }
        }
        else {
            for (let i = 0; i < allSteps.length; i++) {
                basedOnStepsNos_hide(allSteps[i], formId);
            }
        }

    }
}

function basedOnStepsNos_display(stepNo, formId) {
    if (stepNo.includes('.')) {
        // let ElementID = '_' + formId + '_' + stepNo.replace('.', '_');
        let ElementID = '_' + formId + '_' + stepNo.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
        $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().removeClass('hidden');
        $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().addClass('visible');
    }
    else {
        $('#collapse_' + formId + '_' + stepNo).parent().removeClass('hidden');
        $('#collapse_' + formId + '_' + stepNo).parent().addClass('visible');
    }
}
function basedOnStepsNos_hide(stepNo, formId) {
    if (stepNo.includes('.')) {
        // let ElementID = '_' + formId + '_' + stepNo.replace('.', '_');
        let ElementID = '_' + formId + '_' + stepNo.replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, '_');
        $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().removeClass('visible');
        $('[id$="' + ElementID + '"]').parent().parent().parent().parent().parent().addClass('hidden');
    }
    else {
        $('#collapse_' + formId + '_' + stepNo).parent().removeClass('visible');
        $('#collapse_' + formId + '_' + stepNo).parent().addClass('hidden');
    }
}



// Summary:
// Gets the list of all elements which has non-empty validation attribute.
// Iterates through each of these elements, 
// - captures the id of the element (select box) in variable key,
// - captures condition for the validation in the format: 1.1:Yes,1.2:A or 1.1:Yes,1.2:A;1.3:C,
// - captures the filtered dropdown for the target select box in the format: [1,2,3]
// evaluates the conditions and filters select box.
// 1.1:Yes|No=>[Tab,Enter|Tab,Up] - Special Case
function getDdlValidations() {
    let validations = $("[validation]").not("[validation='']");
    let conditions = [];
    validations.each(function () {
        let result = "";
        let key = $(this).attr("id");
        let validation_Val = $(this).attr("validation").split("=>")[1].replace("[", "").replace("]", "");
        if (validation_Val.indexOf("|") > -1) {
            ddlValidationSpecialCase(validation_Val);
        } else {
            let filteredValues = $(this).attr("validation").split("=>")[1].replace("[", "").replace("]", "").split(",");
            filteredValues.push("Select");
            // let allOptionsInDropDown = $("#"+key).find("option").map(function(){return $(this)[0].innerText});
            let condition = $(this).attr("validation").split("=>")[0];
            if (condition.indexOf(";") > -1) {
                // there are multiple conditions (OR conditions) present which can lead to the current result:
                conditions = condition.split(";");
                for (let cnd of conditions) {
                    if (cnd.indexOf(",") > -1) {
                        // there are more than one condition to satisfy:
                        let and_conditions = cnd.split(",");
                        for (let cndn of and_conditions) {
                            if (result === "") {
                                result = "(" + evaluateCondition(cndn).toString();
                            } else {
                                result = result + "&&" + evaluateCondition(cndn).toString();
                            }
                        }
                        result = result + ")"
                        result = eval(result);
                        // filterOptions(result, key, filteredValues);
                        if (result == true) {
                            break;
                        }
                    } else {
                        if (result === "") {
                            result = evaluateCondition(cnd).toString();
                        } else {
                            result = result + "||" + evaluateCondition(cnd).toString();
                        }
                        // result = eval(result);
                    }
                    result = eval(result);

                }
                filterOptions(result, key, filteredValues);

            } else {
                // only one condition - perform check to see if there are more than one condition to satisfy:
                if (condition.indexOf(",") > -1) {
                    // there are more than one condition to satisfy:
                    let conditions = condition.split(",");
                    for (let cndn of conditions) {
                        if (result === "") {
                            result = result + evaluateCondition(cndn).toString();
                        } else {
                            result = result + "&&" + evaluateCondition(cndn).toString();
                        }
                    }
                    result = eval(result);
                    // filterOptions(result, key, filteredValues);
                } else {
                    result = evaluateCondition(condition).toString();
                    result = eval(result);
                    // filterOptions(result, key, filteredValues);
                }
                filterOptions(result, key, filteredValues);
            }
        }

    })
}

// function under construction - works only with one input and mulitple values on the same parent input should generate different inputs 
// for the child
// 1.1:Yes|No|NA=>[A,B,C|B,C|C,D]
function ddlValidationSpecialCase(validation, key) {
    // Special Case scenario where | is present:
    let condition = validation.split("=>")[0];
    let targetValues = validation.split("=>")[1];

    let sourceStep = condition.split(":")[0];
    let possibleValues = condition.split(":")[1].split("|");

    let possibleTargetValueCombinations = targetValues.replace("[", "").replace("]", "").split("|");

    for (let i = 0; i < possibleValues.length; i++) {
        let cndn = sourceStep + ":" + possibleValues[i];
        let result = evaluateCondition(cndn);
        filterOptions(result, key, possibleTargetValueCombinations[i]);
    }
}

// Summary:
// Accepts three parameters - evaluated result for conditions, id of the target select box, filtered values.
// Iterates through all the options in the target select box and adds class: hide-option when option not part of filtered values.
function filterOptions(result, key, filteredValues) {
    let i = 0;
    let arraysed = new Array();

    if (result == true) {
        // break;
        $("#" + key).find("option").each(function () {
            if (filteredValues.indexOf($(this)[0].innerText) == -1) {
                if (navigator.platform.indexOf("Win32") > - 1 || navigator.platform.indexOf("Android") > -1) {

                    $(this).removeClass("hide-option").addClass("hide-option");


                }

                else {
                    $(this).removeClass("hide-option").prop('disabled', true);
                }
            }
            else {
                let valuesToAssign = $(this)[0].innerText;
                if (i <= filteredValues.length && valuesToAssign != "Select") {
                    arraysed[i] = valuesToAssign;
                    i++;
                }
            }
        })

        let a = arraysed[0];
        $("#" + key).val(a);
    } else {
        $("#" + key).find("option").each(function () {

            if (navigator.platform.indexOf("Win32") > - 1 || navigator.platform.indexOf("Android") > -1) {

                $(this).removeClass("hide-option");

            }
            else {
                $(this).removeClass("hide-option").removeAttr('disabled');
            }
            let valuesToAssign = $(this)[0].innerText;

            if (i <= filteredValues.length && filteredValues.length >= 2) {
                arraysed[i] = valuesToAssign;
                i++;
            }
        })
        let a = arraysed[0];
        $("#" + key).val(a);

    }

}

function DropDownColourChange(select) {
    var selectedOption = select.options[select.selectedIndex].value;
    if (selectedOption.toLowerCase() == 'no') {
        select.style.backgroundColor='red';
    }
    else {
        select.style.backgroundColor='';
    }
    }
// Summary:
// Accepts one condition in the form: 1.1:Yes
// Identifies the select box in step 1.1 and checks if its value is Yes.
// Returns true if above is true, else, returns false.
function evaluateCondition(condition) {
    let step = condition.split(":")[0];
    let value = condition.split(":")[1];

    let stepId = $(".stepID").filter(function () {
        if ($(this)[0].innerText == step) {
            return true;
        } else {
            return false;
        }
    });

    let select = stepId.closest(".formData").find("select");
    if (select.length > 0) {
        if (select.val() == value) {
            return true;
        }
    }
    return false;
}
function ValidateInput(id, event) {
    var keyCode = event.keyCode;
    if (keyCode >= 48 && keyCode <= 57) {
        event.preventDefault();
        return false;
    }
    else {
        return true;
    }
   
}

