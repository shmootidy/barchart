$(function(){
  //things coming in from the user:
  var data = [ //so far this is only used for its length
    {label: "Option 1", dataPercentage: 56},
    {label: "Option 2", dataPercentage: 24},
    {label: "Option 3", dataPercentage: 87},
    {label: "Option 4", dataPercentage: 12},
    {label: "Option 5", dataPercentage: 75},
    {label: "Option 6", dataPercentage: 49}
    ];
  var yAxisLabel = "Y-Axis Label";
  var xAxisLabel = "X-Axis Label";
  var customWidth = 600; // used to determine width of columns, available space between bars, not applied directly
  var customHeight = 300;
  var title = "My Bar Chart";
  var yAxisTicks = 10;

function generateYAxis(){
  var topValue = 100;
  for (var i = 0; i < yAxisTicks; i++){
    $("#numbers").append("<li><span>" + topValue + "%</li></span>");
    topValue = topValue - 10;
  }
  $("#numbers").append("<li><span></li></span>");
}
generateYAxis();


  $("h1").append(title);
  $("#chart #y-axis li span").append(yAxisLabel);
  $("#chart #x-axis span").append(xAxisLabel);

  $("#chart #bars").attr({
    // "height": customHeight,
  });

  var numOfBars = data.length;
  var columnWidth = customWidth / numOfBars; //100
  var barSpacing = 30; //USER INPUT - must be smaller than columnWidth
  var barWidth = columnWidth - barSpacing; //70
  var barMargin = barSpacing / 2; //15
  // $("#chart #bars li").attr({"width": columnWidth});
  // $("#chart").load(location.href + " #chart>*", ""); //not working



  var options;
  // = {
  //   chartHeight,
  //   chartWidth,
  //   barColors: {},
  //   barSpacing,
  //   titleFontSize,
  //   titleFontColor,
  // };
  var element;

  function makeBarChart(){

    $("#bars li .bar").each(function(key, bar){
    var percentage = $(this).data('percentage');

    $(this).animate({
      'height':percentage+'%'
    }, 1000);
  });
  }

  makeBarChart(data, options, element);
});

