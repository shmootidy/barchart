$(function(){
  var data = [
    {item: "dog",
     amount: 49},
    {item: "cat",
     amount: 87},
    {item: "platypus",
     amount: 4},
    {item: "donkey",
     amount: 19},
    {item: "porcupine",
     amount: 72}
  ];
  var options = {
    gaps: 5,
    inBarLabelHeight: top; // or above, middle, bottom; variable for different heights of bars
  };
  var element;

//generate and style bars and x-axis labels
  var numOfBars = data.length; // 5
  var num = 0;

  function generateBars(){
    for (var i = 0; i < numOfBars; i++){
      num = num + 1;
      var barHeight = Object.values(data[i])[1];
      var barHeightInv = 100 - barHeight;

      //create bars
      var barClassName = "bar-" + num;
      var bar = $("<div></div>").attr({
        "class": barClassName,
        "style": "grid-row-start: " + barHeightInv,
      });

      //in-bar label
      var inBarLabel = $("<span></span>").text(Object.values(data[i])[1]);
      inBarLabel.appendTo(bar);
      bar.appendTo(".bars");

      var xClassName = "values-label-" + num;
      var xBarLabel = Object.values(data[i])[0];
      $("<div></div>").attr({
        "class": xClassName,
      }).text(xBarLabel).appendTo("#values");
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
  var yAxisTicks = 10; // USER VARIABLE
  var yAxisTitle = "Y-Axis Title";
  $("#chart #y-axis li span").append(yAxisTitle);

  function generateYAxis(){
    var topValue = 100;
    for (var i = 0; i < yAxisTicks; i++){
      $("#numbers").append("<div class='numbers'>" + topValue + "%</div>");
      topValue = topValue - 10;
    }
  }
  generateYAxis();

//fill x-axis label
  var xAxisTitle = "X-Axis Title";
  $("#chart #x-axis span").append(xAxisTitle);


//aiming to fit everything in here
  makeBarChart(data, options, element);
  function makeBarChart(data, options, element){

  };

});

