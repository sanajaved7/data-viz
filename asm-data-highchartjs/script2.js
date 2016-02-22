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
    var all_states = [];
    var state_data = [{
      name: 'Number of Employees', 
      data: [],
    }];

    for (var i=0; i < results.length; i++){
      var tempObject = results[i];
      all_states.push(tempObject.GEO_TTL);
      state_data[0].data.push(parseInt(tempObject.EMP));
    }
  $('#container').highcharts({
          chart: {
              type: 'column'
          },
          title: {
              text: 'Annual Manufacturing Survey'
          },
          subtitle: {
              text: 'Source: U.S. Census Bureau'
          },
          xAxis: {
              categories: all_states,
              crosshair: true
          },
          yAxis: {
              min: 0,
              title: {
                  text: 'Number of Employees'
              }
          },
          tooltip: {
              headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
              pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
              footerFormat: '</table>',
              shared: true,
              useHTML: true
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: state_data
        })
      console.log(state_data);
      }
});