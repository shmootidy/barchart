/*globals $:false */
$(function(){
  var data = [
    {item: "a",
     amount: 0},
    {item: "b",
     amount: 46},
    {item: "c",
     amount: 34},
    {item: "dadfasdfasdfasdfasdffasd",
     amount: 26},
    {item: "e",
     amount: 9},
    {item: "f",
     amount: 31},
  ];
  var options = {
    chart: {
      chartWidth: 600,
      chartHeight: 300,
      chartTitle: {
        title: "My Bar Chart",
        fontSize: 36,
        fontColor: "#eee",
      },
    },
    bars: {
      barSpacing: 10,
      barColors: {
        odd: "#1a77ff",
        even: "#e2638e",
      },
      inBarLabelHeight: 1, // four options: 1 - hover; 2 - top; 3- middle; 4 - bottom
      barRadius: 5,
    },
    xAxis: {
      xStyle: 1, // three options: 1 - outline; 2 - background; 3 - text color
    },
    yAxis: {
      xAxisTitle: "X-Axis Title",
      yAxisTitle: "Y-Axis Title",
      yAxisTicks: 2, //two option: 1 - 10 ticks; 2 - 5 ticks
    }
  };
  var element;
// ***** END OF USER INPUT *****

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
//set barsBox dimensions
  var chartHeight = getOptions("chartHeight");
  var chartWidth = getOptions("chartWidth");
  $("#barsBox").attr({
    "style": "height: " + chartHeight + "px; width: " + chartWidth + "px",
  });

//generate and style bars and x-axis labels
  function generateBars(){
    // bar spacing and size
    var barSpacing = getOptions("barSpacing");
    $(".bars").attr({
      "style": "grid-column-gap: " + barSpacing + "px; "+
      "grid-template-columns: repeat(" + data.length + ", 1fr); " +
      "padding: 5px " + barSpacing + "px 0 " + barSpacing + "px", //not sure if the top (5px) should stay
    });

    //x-labels (as grid area) spacing and size;
    $("#values").attr({
      "style": "grid-template-columns: repeat(" + data.length + ", 1fr); "+
      "grid-column-gap: " + barSpacing + "px; "+
      "padding: 2px " + (barSpacing + 1) + "px; "+
      "width: " + chartWidth + "px",
    });

    //loop through data to create bars
    for (var i = 0; i < data.length; i++){
      var barHeight = Object.values(data[i])[1];


      var barHeightInverse = 100 - getBarHeightAsPercent();

      //create bars and give height
      var barRadius = getOptions("barRadius");
      var barClassName = "bar-";
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
      function getBarHeightAsPercent(){
        var barHeightAsPercent = Math.round(barHeight/Math.pow(10, topAmountIntegers) * 100);
        if (chartZoomCheck() == 2){
          barHeightAsPercent = barHeightAsPercent * 2;
        }
        return barHeightAsPercent;
      }
      var inBarLabel = $("<span></span>").text(Object.values(data[i])[1]);
      inBarLabelHeight = getBarLabelHeight();
      inBarLabel.attr({
        "style": inBarLabelHeight,
      });
      inBarLabel.appendTo(bar);

      //append bars
      bar.appendTo(".bars");

      //x-axis labels
      var xStyle = getXStyle();

      //alternate colours of x-axis labels to match their bars
      function getXStyle(){
        var barColor;
        if (i % 2 === 0){
           barColor = getOptions("odd");
        } else {
           barColor = getOptions("even");
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
        "class": "x-label",
        "style": "padding: 5px; border-radius: 0 0 " + barRadius + "px " + barRadius + "px; " + xStyle,
      }).text(Object.values(data[i])[0]);
      //append x-labels
      xBarLabel.appendTo("#values");

      // create full x-labels revealed by hover events (for labels that overflow)
      function createHoverLabels (){
        $("<span></span>").text(Object.values[i][0]).appendTo();
      }

    } //the end of the loop
  }
  generateBars();


// fill the chart title with custom text of a custom size and custom colour
  function fillTitle(){
    var title = getOptions("title");
    var fontSize = getOptions("fontSize");
    var fontColor = getOptions("fontColor");
    $("h1").attr({"style": "font-size: " + fontSize + "px; "+
      "color: " + fontColor}).append(title);
  }
  fillTitle();

// fill y-axis title
  var yAxisTitle = getOptions("yAxisTitle");
  $("<div id='y-axis'>" + yAxisTitle + "</div>").attr({
// "style" : "transform: rotate(270deg)",
}).prependTo($("#y-title"));

// generate and fill y-axis and labels
  var yAxisTicks = getYAxisTicks();
  function getYAxisTicks(){
     if (getOptions("yAxisTicks") === 1){
      yAxisTicks = 10;
     } else if (getOptions("yAxisTicks") === 2) {
      yAxisTicks = 5;
     }
     return yAxisTicks;
  }

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

  }

});

