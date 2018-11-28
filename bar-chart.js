$(function(){

  $("#chart #bars").attr({
    "width": "600",
    "height": "300",
  });

  $("#chart #bars li").attr("width", function(i, currentVal){

  })




  var data = [1, 2, 3, 4, 5];
  var options;
  // = {
  //   chartHeight,
  //   chartWidth,
  //   barColors: {},
  //   barSpacing,
  //   xAxisLabel,
  //   yAxisLabel,
  //   chartTitle,
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
  })
  }

  makeBarChart(data, options, element);
});