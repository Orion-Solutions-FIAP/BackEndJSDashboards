google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBasic);
function drawBasic() {

      var data = new google.visualization.DataTable();
      var data = new google.visualization.DataTable();
        data.addColumn('string', 'Task');
        data.addColumn('number', 'Points');
      data.addRows([
        ['Janeiro', 15],
        ['Fevereiro', 20],
        ['Março', 27],
        ['Abril', 30],
        ['Maio', 35],
        ['Junho', 40],
        ['Agosto', 50],
        ['Setembro', 60],

      ]);

      var options = {
        title: 'Equipe de desenvolvimento Java',
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
        document.getElementById('curve_chart'));

      chart.draw(data, options);
    }

