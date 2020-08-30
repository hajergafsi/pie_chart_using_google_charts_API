function convert(array) {
  result = [['Tax', 'Percentage']];
  array.forEach((element) => {
    var newRow = [element.Tax, parseInt(element.Percentage)];
    var newArray = result.push(newRow);
  });
  return result;
}

var publicSpreadsheetUrl =
  'https://docs.google.com/spreadsheets/d/1C9WcAthB7j4ti3xkH_v3T9ik8ll2r8FG4Nz_JodMbJI/edit?usp=sharing';

function init() {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true,
  });
}

function showInfo(data, tabletop) {
  alert('Successfully processed!');
  var newData = convert(data);
  console.log(newData);

  function drawChart() {
    var data = new google.visualization.arrayToDataTable(newData);

    var options = {
      title: ' Where do our Taxes go in the year of 2019',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }

  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
}

window.addEventListener('DOMContentLoaded', init);
