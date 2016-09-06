var Factory = {

  createButton:function (controls, textNode, onclickEvent) {

    var button = document.createElement("a");
    button.setAttribute("class", "btn");
    var linkText = document.createTextNode(textNode);
    button.appendChild(linkText);
    button.href = "#";
    button.setAttribute('onclick', onclickEvent);
    controls.appendChild(button);

  },
  createSearchInput:function (controls) {

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "search_input");
    input.setAttribute("placeholder", "Search by Last Name...");
    controls.appendChild(input);

  },
  createControls:function (container) {

    var controls_div = document.createElement('div');
    controls_div.setAttribute("class", "controls_div");
    container.appendChild(controls_div);

    var controlsDiv = document.createElement('div');
    controlsDiv.setAttribute("id", "controls");
    controlsDiv.setAttribute("class", "controls");
    controls_div.appendChild(controlsDiv);

    Factory.createSearchInput(controlsDiv);
    Factory.createButton(controlsDiv, 'Search', 'Logistics.searchTable(container)');
    Factory.createButton(controlsDiv, 'Clear', 'Factory.createTable(container, contacts)');

  },
  createTable: function (container, tableData) {

    var table_div = document.getElementById('table_div');

    if(table_div == null){

      var tableDiv = document.createElement('div');
      tableDiv.setAttribute('id','table_div');

      var generatedTable = Logistics.generateTable(tableData);
      tableDiv.innerHTML = generatedTable;
      container.appendChild(tableDiv);

    }else {

      container.removeChild(table_div);
      var tableDiv = document.createElement('div');
      tableDiv.setAttribute('id','table_div');

      var generatedTable = Logistics.generateTable(tableData);
      tableDiv.innerHTML = generatedTable;
      container.appendChild(tableDiv); 
    
    }
  }
 
};

var Logistics = {

  initialize: function (container){

    Factory.createControls(container);
    Factory.createTable(container, contacts);

  },
  searchTable: function (container) {

    var search = document.getElementById('search_input').value;

    var searchResults = [];

    for (var i = 0; i < contacts.length; i++){
   
      if( contacts[i].lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ){

        searchResults.push(contacts[i]);
        
      }
    
    }

    Factory.createTable(container, searchResults);

  },
  generateTable: function (tableData) {
    
    var div_html = `
      <table>
        <tr class="table_headers">
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Number</td>
        </tr>
      `;
    if(tableData.length == 0){
      console.log(typeof tableData);
      div_html += '<tr class="table_content"><td colspan="4" style="text-align:center;">Sorry no Contacts Found</td></tr></table>';
      return div_html;

    }
    for(var i = 0; i < tableData.length; i++){

      div_html += '<tr class="table_content">';

      for (var property in tableData[i]) {

        if (tableData[i].hasOwnProperty(property)) {

          div_html+='<td>' + tableData[i][property] + '</td>';

        }

      }

      div_html += '</tr>';

    }
     
    div_html += '</tr></table>';
    return div_html;

  }

};
//4-digit number
//var str = "" + 540;
//var pad = "0000";
//var 4digit = pad.substring(0, pad.length - str.length) + str;
