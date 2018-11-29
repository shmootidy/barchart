$(function(){
  var data = [
    {item: "dog",
     amount: 49},
    {item: "cat",
     amount: 87},
    {item: "platypus",
     amount: 14},
    {item: "donkey",
     amount: 19},
    {item: "porcupine",
     amount: 72},
    // {item: "goat",
    //  amount: 36} //still need to figure out how to get the labels to organically match the bars
  ];
  var options = {
    chart: {
      chartWidth: 600,
      chartHeight: 300,
      chartTitle: {
        title: "My Bar Chart",
        fontSize: 24,
        fontColor: "red",
      },
    },
    bars: {
      barSpacing: 10,
      barColors: {
        odd: "#1a77ff",
        even: "#e2638e",
      },
      inBarLabelHeight: 1, // three options: top, middle, bottom
      barRadius: 3,
    },
    xAxis: {
      xStyle: 1, // 3 options: outline, background, color (of text)
    },
    yAxis: {
      xAxisTitle: "X-Axis Title",
      yAxisTitle: "Y-Axis Title",
      yAxisTicks: 10,
    }
  };
  var element;

//crawl through options to return desired value
function getOptions(optionKey){  //call with value name in quotes, e.g., getoptions("title");
  $.each(options, crawler);
  function crawler(key, value){
    if (optionKey == key){
      optionKey = value;
      // console.log(optionKey);
      return optionKey;
    }
    if (value !== null && typeof value === "object"){
      $.each(value, crawler);
    }
  }
  return optionKey;
}

//generate and style bars and x-axis labels
  var num = 0;

  function generateBars(){
    // bar spacing
    var barSpacing = getOptions("barSpacing");
    $(".bars").attr({
      "style": "grid-column-gap: " + barSpacing + "px",
    });

    //loop through data to create bars
    for (var i = 0; i < data.length; i++){
      num = num + 1;
      var barHeight = Object.values(data[i])[1];
      var barHeightInverse = 100 - barHeight;

      //create bars and give height
            var barRadius = getOptions("barRadius");

      var barClassName = "bar-" + num;
      var bar = $("<div></div>").attr({
        "class": barClassName,
        "style": "grid-row-start: " + barHeightInverse + "; border-radius: " + barRadius + "px " + barRadius + "px 0 0",
      });

      //give bars in-bar labels
      var inBarLabel = $("<span></span>").text(Object.values(data[i])[1]);
      inBarLabel.appendTo(bar);

      //append bars
      bar.appendTo(".bars");

      //x-axis labels
      var xClassName = "values-label-" + num;
      var xStyle = getStyle();

      function getStyle(){
        if (getOptions("xStyle") === 1){
          return "border: 2px solid #1a77ff";
          // "border: 2px solid #e2638e"
        }
      }

      var xBarLabel = $("<div></div>").attr({
        "class": xClassName,
        "style": "border-radius: " + barRadius + "px; " + xStyle,
      }).text(Object.values(data[i])[0]); //I need to alternate styles here, but it's being generated in a loop, so I can either do it again after the loop, or figure out a way to alternate colours within the loop
      xBarLabel.appendTo("#values");
    }
  }
  generateBars();

// fill the chart title with custom text
  function fillTitle(){
    var title = getOptions("title");
    $("h1").append(title);
  }
  fillTitle();

// fill y-axis title
  var yAxisTitle = "Y-Axis Title";
  $("#chart #y-axis li span").append(yAxisTitle);

// generate and fill y-axis and labels
  var yAxisTicks = getOptions("yAxisTicks");
  function generateYAxis(){
    var topValue = yAxisTicks * yAxisTicks; //add more calculations to round uneven numbers to next natural point
    var numHeight = 300 / yAxisTicks;
    var numPadding = numHeight - 18;
    var numBottom = Math.round(numHeight * 97/100);
    for (var i = 0; i < yAxisTicks; i++){
      $("<div class='numbers'>" + topValue + "</div>").attr({
        "style": "padding-top: " + numPadding + "px; bottom: " + numBottom + "px",
      }).appendTo("#numbers");
      topValue = topValue - yAxisTicks;
    }
  }
  generateYAxis();

//fill x-axis title
  var xAxisTitle = getOptions("X-Axis Title");
  $("#chart #x-axis span").append(xAxisTitle);


//aiming to fit everything in here
  makeBarChart(data, options, element);
  function makeBarChart(data, options, element){

  };

});

