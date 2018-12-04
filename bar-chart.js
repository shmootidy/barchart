/*globals $:false */
/* eslint multiline-comment-style: ["error", "separate-lines"] */
$(function(){
//                    ********** USER INPUT **********
  var data = [
    {item: "aadfadfasdf",
     amount: 0},
    {item: "bcxvcxvxcv",
     amount: 49},
    {item: "cjhjdjskska",
     amount: 34},
    {item: "dadfasdfasdfasdfasdffasd",
     amount: 26},
    {item: "ertuwisdhfsdfga",
     amount: 9},
    {item: "fasdfasdfashaj",
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
//                 ***** END OF USER INPUT *****

  function makeBarChart(data, options, element){
  // VARIABLES AHOY!
    var topAmountIntegers = getTopAmount().toString().length;
    var topTest = getTopAmount()/Math.pow(10, topAmountIntegers);
    var inBarLabelHeight = getOptions("inBarLabelHeight");
    var barHeightAsPercent;
    var yAxisTicks = getYAxisTicks();

  // SETTING THE ATTRIBUTES
    // dimensions of the chart
    var chartHeight = getOptions("chartHeight"); //not sure if I should move all variables to the top; there is no consensus, it seems
    var chartWidth = getOptions("chartWidth");
    $("#barsBox").attr({
      "style": "height: " + chartHeight + "px; width: " + chartWidth + "px",
    });

    // size of and space between bars
    var barSpacing = getOptions("barSpacing");
    $(".bars").attr({
      "style": "grid-column-gap: " + barSpacing + "px; "+
      "grid-template-columns: repeat(" + data.length + ", 1fr); " +
      "padding: 5px " + barSpacing + "px 0 " + barSpacing + "px", //not sure if the top (5px) should stay
    });

    // size of and space between x-labels
    $("#values").attr({
      "style": "grid-template-columns: repeat(" + data.length + ", 1fr); "+
      "grid-column-gap: " + barSpacing + "px; "+
      "padding: 2px " + (barSpacing + 1) + "px; "+
      "width: " + chartWidth + "px",
    });
    $("#numbers").attr({
      "style": "grid-template-rows: repeat(" + yAxisTicks + ", 1fr)",
    });

  // FILLING STATIC ELEMENTS
    // chart title
    var title = getOptions("title");
    var fontSize = getOptions("fontSize");
    var fontColor = getOptions("fontColor");
    $("h1").attr({"style": "font-size: " + fontSize + "px; "+
      "color: " + fontColor}).append(title);

    // ticks grid
    $("#ticks").attr({
      "style": "grid-template-rows: repeat(" + yAxisTicks + ", 1fr)",
    });

    // y-axis title
    var yAxisTitle = getOptions("yAxisTitle");
    $("<div id='y-axis'>" + yAxisTitle + "</div>").prependTo("#y-title");

    // x-axis title
    var xAxisTitle = getOptions("X-Axis Title");
    $("#chart #x-axis span").append(xAxisTitle);

  // LOOP 1 of 2 -- create, style and append the bars, in-bar labels and x-labels
    for (var i = 0; i < data.length; i++){
      // THE BARS
      var barHeight = Object.values(data[i])[1];
      var barHeightInverse = 100 - getBarHeightAsPercent(barHeight);
      var barRadius = getOptions("barRadius");
      var barClassName = "bar-";
      var bar = $("<div></div>").attr({
        "class": barClassName,
        "style": "grid-row-start: " + barHeightInverse + "; border-radius: " + barRadius + "px " + barRadius + "px 0 0",
      });
      // IN-BAR LABELS
      var inBarLabel = $("<span></span>").text(Object.values(data[i])[1]);
      var fixedInBarLabelHeight = getBarLabelHeight(barHeight);
      inBarLabel.attr({
        "style": fixedInBarLabelHeight,
      });
      // X-LABELS
      var xStyle = getXStyle(i);
      var xBarLabel = $("<div></div>").attr({
        "class": "x-label",
        "style": "padding: 5px; border-radius: 0 0 " + barRadius + "px " + barRadius + "px; " + xStyle,
      }).text(Object.values(data[i])[0]);
      // append each element
      inBarLabel.appendTo(bar);
      xBarLabel.appendTo("#values");
      bar.appendTo(".bars");
    }

  // LOOP 2 of 2 -- create and append the y-labels and ticks
    var yLabel = getTopValue();
    for (var y = 0; y < yAxisTicks; y++){
      // Y-LABELS
      $("<div class='numbers'>" + yLabel + "</div>").appendTo("#numbers");
      yLabel = yLabel - (Math.pow(10, (topAmountIntegers - 1)) * (10 / yAxisTicks)) / chartZoomCheck();
      // TICKS
      $("<div class='ticks'>" + "" + "</div>").appendTo("#ticks");
    }

  //THE FUNCTIONS
    // return the desired value by key
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

    // return bar height as percentage of y-axis height
    function getBarHeightAsPercent(barHeight){
      barHeightAsPercent = Math.round(barHeight/Math.pow(10, topAmountIntegers) * 100);
      if (chartZoomCheck() == 2){
        barHeightAsPercent = barHeightAsPercent * 2;
      }
      return barHeightAsPercent;
    }

    // return style for selected height of in-bar labels
    function getBarLabelHeight(barHeight) {
      barHeightAsPercent = getBarHeightAsPercent(barHeight);
      if (inBarLabelHeight === 1){
        if (barHeightAsPercent < 90){
          return "top: -20px";
        } else {
          return "top: 5px";
        }
      } else if (barHeightAsPercent >= 10){
        if (inBarLabelHeight === 2){
          return "top: 5px";
        } else if (inBarLabelHeight === 3) {
          if (barHeightAsPercent > 50){
            return "top: 45%";
          } else if (barHeightAsPercent > 15){
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

    // return odd/even styles for x-axis labels
    function getXStyle(i){
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

    // generate and fill y-axis and labels
    function getYAxisTicks(){
       if (getOptions("yAxisTicks") === 1){
        yAxisTicks = 10;
       } else if (getOptions("yAxisTicks") === 2) {
        yAxisTicks = 5;
       }
       return yAxisTicks;
    }

    // generate an appropriate highest value for the y-axis
    function getTopValue(){
      var topValue = Math.ceil(getTopAmount()/Math.pow(10, topAmountIntegers)) * Math.pow(10, topAmountIntegers);
      if (Math.round(topTest) == 0){
        topValue = topValue / 2;
      }
      return topValue;
    }

    // return value of highest data amount
    function getTopAmount(){
      var amountArray = [];
      for (var i = 0; i < data.length; i++){
        amountArray.push(Object.values(data[i])[1]);
        amountArray.sort(sortAmounts);
      }
      var topAmount = amountArray[0];
      return topAmount;
    }

    // sorts data amounts array from highest to lowest (as numbers, not strings)
    function sortAmounts (a, b) {
      return a > b ? -1 : b > a ? 1 : 0;
    }

    // checks if y-axis is full or half length
    function chartZoomCheck(){
      var chartZoom = 1;
      if (Math.round(topTest) == 0){
        chartZoom = 2;
      }
      return chartZoom;
    }
  }
  makeBarChart(data, options, element);
});

