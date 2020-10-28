google.charts.load('current', {packages: ['corechart', 'bar']});


(async ()=>{
  let { result } = await chargeSelectEmployees();
  let { teams } = await chargeSelectTeams();
  let { dashPerform } = await chargeDashPerform();

  google.charts.setOnLoadCallback(()=>{drawBasic(dashPerform)});

  let employeeSelect = document.querySelector("#employee");
  let teamSelect = document.querySelector("#team");

  let emplyeeOptions = result.map(function(res){
    return `${res.NM_FUNC}`
  })

  let teamOptions = teams.map(function(res){
    return res[`CONCAT('DEPARTAMENTO',NM_DEPTO)`]
  })

  for(let employee of emplyeeOptions){
    var el = document.createElement("option");
    el.textContent = employee;
    el.value = employee;
    employeeSelect.appendChild(el)
  }

  for(let team of teamOptions){
    var el = document.createElement("option");
    el.textContent = team;
    el.value = team;
    teamSelect.appendChild(el)
  }

})()


async function chargeSelectEmployees(){
  let result = await new Promise((resolve)=>{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:8080/employes";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        resolve(JSON.parse(this.responseText));
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }) 
  return result;
}

async function chargeSelectTeams(){
  let result = await new Promise((resolve)=>{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:8080/teams";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let { result }= JSON.parse(this.responseText);
        resolve({teams:result})
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }) 
  return result;
}

async function chargeDashPerform(){
  let result = await new Promise((resolve)=>{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://localhost:8080/dashBoardPermormance";
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let { result }= JSON.parse(this.responseText);
        resolve({dashPerform:result})
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }) 
  return result;
}

function drawBasic(arrayDatamonth) {
    let title = 'Tarefas Completas por todas equipes';

      var data = new google.visualization.DataTable();
      var data = new google.visualization.DataTable();
        data.addColumn('string', 'Task');
        data.addColumn('number', 'Points');
      data.addRows(arrayDatamonth);

      var options = {
        title: title,
        hAxis: {
          viewWindow: {
            min: [7, 30, 0],
            max: [17, 30, 0]
          }
        },
        vAxis: {
          title: 'Rating (scale of 1-10)'
        }
      };

      var chart = new google.visualization.ColumnChart(
        document.getElementById('chart_div'));

      chart.draw(data, options);
    }