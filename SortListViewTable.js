
function sortTable(n,tableName) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableName);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 2; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function insertIntoTable(tableName,dbName,key,mobileKey,Body,CallID,Number)
{
var dbConn = window.openDatabase(dbName,'','my first database',2*1024*1024);
    dbConn.transaction(
        function (trans) {
		var sqlInsert='INSERT OR REPLACE INTO '+ tableName +' (W6Key, MobileKey, Body, Filter_String0, Filter_Value1) VALUES (?, ?, ?, ?, ?)';
          trans.executeSql(sqlInsert,[key,mobileKey,Body,CallID,Number],
          function(trans, sqlResultSet) 
            {
                //console.log('sqlResultSet '+sqlResultSet.insertId )
            },function(trans, sqlResultSet) 
            {
                console.log('sqlResultSet '+sqlResultSet )
            });
        }
    );
}

function loadCompletionForm(formName , isIPAD = 0) {

  	if (formName == "None") {
		$('#completionformContainer').text('No Completion Form Required');
	} else {

  	    var url = '/SO/api/Content/' + formName + '/';

  	    if(isIPAD == 0) {
  	        url = '/SO/api/Content/' + formName + '/';
  	    } else {
  	        url = 'cdvfile://localhost/persitent/SO/api/Content/' + formName + '/';;
  
  	     //   $('#completionformContainer').text('No loaded' + url);
  	    }

        
		$('#completionformContainer').load(url, function (responseTxt, statusTxt, xhr) {
		    if (statusTxt == "success") {
		        //alert("External content loaded successfully!");
		     //  $('#completionformContainer').text('Loaded');
		    }
		    else if (statusTxt == "error")
		       // $('#completionformContainer').text('Error in Loading Completion form');
					console.log("Error: " + xhr.status + ": " + xhr.statusText);
		});
	}
}

