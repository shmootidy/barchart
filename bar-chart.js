$(function(){
  var data = [
    {item: "dog",
     amount: 49},
    {item: "cat",
     amount: 97},
    {item: "platypus",
     amount: 4},
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
      inBarLabelHeight: 4, // four options: hover, top, middle, bottom
      barRadius: 3,
    },
    xAxis: {
      xStyle: 1, // 1: outline; 2: background; 3: text color
    },
    yAxis: {
      xAxisTitle: "X-Axis Title",
      yAxisTitle: "Y-Axis Title",
      yAxisTicks: 10,
    }
  };
  var element;

//crawl through options to return desired value
function getOptions(optionKey){
  $.each(options, crawler);
  function crawler(key, value){
    if (optionKey == key){
      optionKey = value;
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
      var inBarLabelHeight = getOptions("inBarLabelHeight");
      function getBarLabelHeight() {
        if (inBarLabelHeight === 1){
          if (barHeight < 90){
            return "top: -20px";
          } else {
            return "top: 5px";
          }
        } else if (barHeight >= 10){
          if (inBarLabelHeight === 2){
            return "top: 5px";
          } else if (inBarLabelHeight === 3) {
            if (barHeight > 50){
              return "top: 45%";
            } else {
              return "top: 40%";
            }
          } else if (inBarLabelHeight === 4) {
            return "top: 100%";
          }
        } else {
          return "top: -20px";
        }
      }

      var inBarLabel = $("<span></span>").text(Object.values(data[i])[1]);
      var inBarLabelHeight = getBarLabelHeight();
      inBarLabel.attr({
        "style": inBarLabelHeight,
      });
      inBarLabel.appendTo(bar);

      //append bars
      bar.appendTo(".bars");

      //x-axis labels
      var xClassName = "values-label-" + num;
      var xStyle = getXStyle();

      //alternate colours of x-axis labels to match their bars
      function getXStyle(){
        if (i % 2 === 0){
          var barColor = getOptions("odd");
        } else {
          var barColor = getOptions("even");
        }
        if (getOptions("xStyle") === 1){
          return "border: 2px solid; border-color: " + barColor;
        } else if (getOptions("xStyle") === 2){
          return "background-color: " + barColor;
        } else if (getOptions("xStyle") === 3){
          return "color: " + barColor;
        }
      }
      //create and append x-axis labels
      var xBarLabel = $("<div></div>").attr({
        "class": xClassName,
        "style": "padding: 5px 0; border-radius: " + barRadius + "px; " + xStyle,
      }).text(Object.values(data[i])[0]);
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
  var topValue = Math.ceil(getTopAmount()/100) * 100;

  function getTopAmount(){
    var amountArray = [];
    for (var i = 0; i < data.length; i++){
      amountArray.push(Object.values(data[i])[1]);
      amountArray.sort().reverse();
    }
    return amountArray[0];
  }

  function generateYAxis(){
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

