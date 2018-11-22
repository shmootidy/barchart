function drawBarChart(data, options, element){
  let num = 0;
  var chart = document.getElementById("chart-container");

  function createBars(data){
    for (var i = 0; i < data.length; i++){
      let bar = document.createElement("div");
      num++;
      bar.setAttribute("class", "bar-" + num);
      chart.appendChild(bar);
    }
  }

  $("[class*='bar']").attr("grid-row-start", function(data){
    //code here will extract names and values from data object (currently it's an array)
  });

  createBars(data);

}

var sampleData = [1, 2, 3, 4];
// var sampleData = {John: 50, Lucy: 12, Alexis: 24, Qing: 78};
var sampleOptions = {"width": "10", "height": "20px"};
var sampleElement = $("#chart-container");

drawBarChart(sampleData, sampleOptions, sampleElement);
