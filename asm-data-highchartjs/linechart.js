$(document).ready(function(){
  $.getJSON(url)
    .then(convertResultsToObjects)
    .then(getData)

  function convertResultsToObjects(response) {
    var headers = response[0];

    var results = [];
    for(var row=1; row < response.length; row++) {
      var currentRow = response[row];
      var newRowObj = {};
      
      for(var col=0; col < currentRow.length; col++) {
        var key  = headers[col];
        var value = currentRow[col];
        newRowObj[key] = value;
      }

      results.push(newRowObj);
    }
    return results;
  }

  function getData(results){
    var years = _.pluck(results, 'YEAR');
    var employomentData = [
    {
      name: 'Number of Employees', 
      data: [],
    },
    ];

    for (var i=0; i < results.length; i++){
      var tempObject = results[i];
      employomentData[0].data.push(parseInt(tempObject.EMP));
    }
  $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: 'Employment in the U.S. Manufacturing Sector'
        },
        subtitle: {
            text: 'Source: U.S. Census Bureau'
        },
        xAxis: {
            categories: years
        },
        yAxis: {
            title: {
                text: 'Employment'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: true
            }
        },
        series: employomentData
    });
  };
});