Highcharts.setOptions({
    lang: {
        thousandsSep: ','
    }
});
$(document).ready(function(){
	buildStateSelect()

	function buildStateSelect() {
		var states = fipsCodes()
		states.forEach(function(state){
			var optionTag = $("<option value='" + state.fipsCode + "'>" + state.stateName + "</option>")
			$(".states").append(optionTag)
		})
		$('#data .states').on("change", function(){
			buildGraph($(this).val())
		})
        $('.chosen-select').chosen();
	}

	function buildGraph(id){
		$.getJSON(url)
		.then(convertResultsToObjects)
		.then(function(results){
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
		    var data = {
		    	title: "Time Series by State: " + results[0].GEO_TTL,
		    	categories: years,
		    	series: employomentData,
		    	seriesName: results[0].GEO_TTL,
		    	yAxisTitle: "Employees in Manufactoring Sector",
		    	xAxisTitle: "Years"
		    }
		    buildChart(data, $("#employment-by-state"))
		})
	}
	
	function buildChart(data, element){
		element.highcharts({
			chart: {
            	type: 'line'
        	},
        	title: {
        		text: data.title
        	},
        	subtitle: {
        		text: 'Source: U.S. Census Bureau'
        	},
        	xAxis: {
        		title: {
        			text: data.xAxisTitle
        		},
        		categories: data.categories
        	},
        	yAxis: {
        		title: {
        			text: data.yAxisTitle
        		},
        		plotLines: [{
        			value: 0,
        			width: 1,
        			color: '#808080',
        		}],
        	},
        	legend: {
        		layout: 'vertical',
        		align: 'right', 
        		verticalAlign: 'middle',
        		borderWidth: 0,
        	},
        	series: data.series,
		})
	}

	function convertResultsToObjects(response){
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
})
