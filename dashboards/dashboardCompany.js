google.charts.load('current', {'packages':['corechart']});

      (async ()=>{
        let { result } = await dashFunc();
        google.charts.setOnLoadCallback(()=>{drawChart(result)});
      })()

      async function myNewFunction(sel) {
        let { result } = await dashFuncSelect(sel.options[sel.selectedIndex].text);
        google.charts.setOnLoadCallback(()=>{drawChart(result,sel.options[sel.selectedIndex].text)});
      }

      async function dashFuncSelect(employee){
        let result = await new Promise((resolve)=>{
          var xmlhttp = new XMLHttpRequest();
          var url = `http://localhost:8080/dashBoardFunc/${employee}`;
          xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              resolve(JSON.parse(this.responseText))
            }
          };
          xmlhttp.open("GET", url, true);
          xmlhttp.send();
        }) 
        return result;
      }


      async function dashFunc(){
        
        let result = await new Promise((resolve)=>{
          var xmlhttp = new XMLHttpRequest();
          var url = "http://localhost:8080/dashBoardFunc";
          xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              resolve(JSON.parse(this.responseText))
            }
          };
          xmlhttp.open("GET", url, true);
          xmlhttp.send();
        }) 
        return result;
      }

      function drawChart(arrayDatamonth,titleFunc) {
        console.log(arrayDatamonth)
        let title = 'Tarefas Completas por funcionarios';
        console.log(titleFunc)
        if(titleFunc) title = titleFunc
        var data = google.visualization.arrayToDataTable(
          arrayDatamonth
        );

        var options = {
          title: title,
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }
