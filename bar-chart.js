$(function(){
  var data = [
    {item: "dog",
     amount: 1},
    {item: "cat",
     amount: 76},
    {item: "platypus",
     amount: 34},
    {item: "donkey",
     amount: 26},
    {item: "porcupine",
     amount: 29},
    {item: "goat",
     amount: 31}
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
      inBarLabelHeight: 2, // four options: hover, top, middle, bottom
      barRadius: 1,
    },
    xAxis: {
      xStyle: 1, // 1: outline; 2: background; 3: text color
    },
    yAxis: {
      xAxisTitle: "X-Axis Title",
      yAxisTitle: "Y-Axis Title",
      yAxisTicks: 20,
    }
  };
  var element;

  var topAmountIntegers = getTopAmount().toString().length;
  var topTest = getTopAmount()/Math.pow(10, topAmountIntegers);


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
    // bar spacing and size
    var barSpacing = getOptions("barSpacing");
    $(".bars").attr({
      "style": "grid-column-gap: " + barSpacing + "px; grid-template-columns: repeat(" + data.length + ", 1fr)",
    });

    $("#values").attr({
      "style": "grid-template-columns: repeat(" + data.length + ", 1fr)",
    });

    //loop through data to create bars
    for (var i = 0; i < data.length; i++){
      num = num + 1;
      var barHeight = Object.values(data[i])[1];

      function getBarHeightAsPercent(){
        var barHeightAsPercent = Math.round(barHeight/Math.pow(10, topAmountIntegers) * 100);
        if (chartZoomCheck() == 2){
          barHeightAsPercent = barHeightAsPercent * 2;
        }
        return barHeightAsPercent;
      }
      var barHeightInverse = 100 - getBarHeightAsPercent();

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
          if (getBarHeightAsPercent() < 90){
            return "top: -20px";
          } else {
            return "top: 5px";
          }
        } else if (getBarHeightAsPercent() >= 10){
          if (inBarLabelHeight === 2){
            return "top: 5px";
          } else if (inBarLabelHeight === 3) {
            if (getBarHeightAsPercent() > 50){
              return "top: 45%";
            } else if (getBarHeightAsPercent() > 15){
              return "top: 40%";
            } else {
              return "top: 30%";
            }
          } else if (inBarLabelHeight === 4) {
            return "top: calc(100% - 20px)";
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
  $("<div id='y-axis'>" + yAxisTitle + "</div>").attr({
"style" : "transform: rotate(270deg)",
}).prependTo($("#y-title"));

// generate and fill y-axis and labels
  var yAxisTicks = getOptions("yAxisTicks");

  function getTopValue(){
    var topValue = Math.ceil(getTopAmount()/Math.pow(10, topAmountIntegers)) * Math.pow(10, topAmountIntegers);
    if (Math.round(topTest) == 0){
      topValue = topValue / 2;
    }
    return topValue;
  }

  function getTopAmount(){
    var amountArray = [];
    for (var i = 0; i < data.length; i++){
      amountArray.push(Object.values(data[i])[1]);
      amountArray.sort((a, b) => b - a); // got this from SO.com, don't understand how it works
    }
    var topAmount = amountArray[0];
    return topAmount;
  }

  function generateYAxis(){
    $("#numbers").attr({
      "style": "grid-template-rows: repeat(" + yAxisTicks + ", 1fr)",
    });
    var num = getTopValue();
    for (var i = 0; i < yAxisTicks; i++){
      $("<div class='numbers'>" + num + "</div>").appendTo("#numbers");
      num = num - (Math.pow(10, (topAmountIntegers - 1)) * (10 / yAxisTicks)) / chartZoomCheck();
    }
  }
  generateYAxis();

  function chartZoomCheck(){
    var chartZoom = 1;
    if (Math.round(topTest) == 0){
      chartZoom = 2;
    }
    return chartZoom;
  }

  function generateTicks(){
    $("#ticks").attr({
      "style": "grid-template-rows: repeat(" + yAxisTicks + ", 1fr)",
    });
    for (var i = 0; i < yAxisTicks; i++){
      $("<div class='ticks'>" + "" + "</div>").appendTo("#ticks");
    }
  }
  generateTicks();

//fill x-axis title
  var xAxisTitle = getOptions("X-Axis Title");
  $("#chart #x-axis span").append(xAxisTitle);


//aiming to fit everything in here
  makeBarChart(data, options, element);
  function makeBarChart(data, options, element){

  };

});

