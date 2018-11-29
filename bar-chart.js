$(function(){
  var data = [1, 2, 3, 4, 5];
  var options = {
    gaps: 5,
  };
  var element;

// var chartHeight = 250;
// chartDimensions();
// function chartDimensions(){
//   $("#chart").attr("style", "height: " + chartHeight);
// }
  // function styleChartContainer(){
  //   $(".chart-container").attr({
  //     "grid-column-gaps": 5 + "px",
  //   })
  // }

//generate and style bars
  var numOfBars = data.length; // 5
  var num = 0;

  function generateBars(){
    for (var i = 0; i < numOfBars; i++){
        var randomNum = Math.floor(Math.random() * 100); //TO BY REPLACED BY USER INPUT

      //create <div>s
      num = num + 1;
      var className = "bar-" + num;
      $("<div></div>").attr({
        "class": className,
        "style": "grid-row-start: " + randomNum,
      }).appendTo(".chart-container");
    }
  }
  generateBars();

// fill the chart title with custom text
  var title = "My Bar Chart";
  function fillTitle(){
    $("h1").append(title);
  }
  fillTitle();

// generate and fill y-axis and label
  var yAxisTicks = 10;
  var yAxisLabel = "Y-Axis Label";
  $("#chart #y-axis li span").append(yAxisLabel);
  function generateYAxis(){
    var topValue = 100;
    for (var i = 0; i < yAxisTicks; i++){
      $("#numbers").append("<li><span>" + topValue + "%</li></span>");
      topValue = topValue - 10;
    }
    $("#numbers").append("<li><span></li></span>");
  }
  generateYAxis();

//fill x-axis label
  var xAxisLabel = "X-Axis Label";
  $("#chart #x-axis span").append(xAxisLabel);

//aiming to fit everything in here
  makeBarChart(data, options, element);
  function makeBarChart(data, options, element){

  };

});

