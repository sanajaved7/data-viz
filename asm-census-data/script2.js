$(document).ready(function() {
  var url = api_url;
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

  var data = {
    labels: [], 
    datasets: [{
      label: "Num of Employees",
      fillColor: "black",
      strokeColor: "plum",
      data: [],
    }],
  };

  function getData(results){
    for (var i=0; i < results.length; i++){
      var tempObject = results[i];
      data.labels.push(tempObject.GEO_TTL);
      data.datasets[0].data.push(tempObject.EMP);
    }
    var ctx = $("#myChart").get(0).getContext("2d");;
    var templateString = "<%= datasetLabel %> - <%= value %>";
    var myBarChart = new Chart(ctx).Bar(data, {
      multiTooltipTemplate: templateString
    })
  }
})
