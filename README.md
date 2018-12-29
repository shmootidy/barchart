Hello! This is an application for a customizable bar chart and my submission for Lighthouse Lab's bar chart stretch project.

The bar chart is a simple API function - makeBarChart() - with three paramaters: data (an array of items and their amount); options (customizable properties of the bar chart, such as size, colours, etc.); element (where you would like the bar chart to be appended on your webpage).

SUPPORTED FEATURES
To customize this bar chart, all you need to do is adjust the values of the parameters. The `options` is where the majority of the bar chart's features are. You can customize...

* the height and width of the chart
* the text, colour, and size of the chart's title
* the distance between bars
* the two alternating colours of the bars
* the border-radius of the bars
* the height of the in-bar label (three options: bottom, middle, top)
* the style of the labels along the x-axis (three options: background, border, and text colour)
* the title of the x- and y-axes
* the number of y-axis ticks (two options: 5 ticks or 10 ticks)

Some features are automatically determined, based on user input. These include...

* the width of the bars, which are evenly distributed based on the number of bars and the width of the chart
* hidden overflow, for in-bar and x-axis labels that do not fit nicely in their container. Text can be viewed by hovering the mouse over the element. (The resulting distortion is a known bug.)
* the values of the y-axis

KNOWN BUGS

* distortion of chart proportions when hovering to view hidden text

ROADMAP
Plans for this chart include...

* stacked bar charts. The dataMaker() function, commented out at the bottom of the JS file, is the start of this feature. I am making a function to randomly generate the data for the stacked bars, just for fun and practice.
* a form with input fields that will allow the chart to be changed by the user after it has been generated

EXTERNAL RESOURCES
Many a resource was encountered and used in the making of this chart.
* https://www.w3schools.com/jquery/jquery_intro.asp
* https://medium.freecodecamp.org/what-is-an-api-in-english-please-b880a3214a82
* https://css-tricks.com/making-charts-with-css/
* https://www.htmlgoodies.com/html5/other/adding-html5-charts-to-your-website.html
* https://www.json.org/
* https://www.w3schools.com/js/js_json_objects.asp
* https://www.w3schools.com/js/js_json_intro.asp
* https://www.w3schools.com/js/js_ajax_intro.asp
* https://www.tutorialspoint.com/ajax/
* https://www.javatpoint.com/xml-dtd
* https://learn.jquery.com/effects/intro-to-effects/
* https://www.w3schools.com/css/
* http://html-tuts.com/position-absolute-center-horizontal/
* https://css-tricks.com/making-a-bar-chart-with-css-grid/
* https://developers.google.com/web/updates/2017/01/css-grid
* https://css-tricks.com/snippets/css/a-guide-to-flexbox/
* https://css-tricks.com/snippets/css/complete-guide-grid/
* https://www.quackit.com/html/templates/css_grid_templates.cfm
* https://www.xul.fr/en/css/bar-chart.php
* https://www.smashingmagazine.com/2011/09/create-an-animated-bar-graph-with-html-css-and-jquery/ 
* https://www.mathsisfun.com/data/data-graph.php
* https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form
* https://www.jqueryscript.net/chart-graph/Minimalist-Bar-Chart-Plugin-With-jQuery-CSS-barChart.html
* https://learn.jquery.com/using-jquery-core/manipulating-elements/
* https://love2dev.com/blog/javascript-for-loop-foreach/
* https://stackoverflow.com/questions/17546739/loop-through-nested-objects-with-jquery
* https://stackoverflow.com/questions/14879691/get-number-of-digits-with-javascript
* https://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
* https://alligator.io/js/array-sort-numbers/
* https://stackoverflow.com/questions/47945353/is-it-possible-to-create-vertical-text-that-spans-all-rows-in-a-css-grid
* https://webflow.com/blog/how-to-create-a-thumbnail-overlay 
* https://stackoverflow.com/questions/6805482/css3-transition-animation-on-load
* https://www.atlassian.com/git/tutorials/using-branches/git-merge
* https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
* https://spreadsheeto.com/bar-chart/
* https://stackoverflow.com/questions/25005561/filling-up-a-2d-array-with-random-numbers-in-javascript
* https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

I'd also like to thank my friends at Vancouver's Coffee and Code for feedback and guidance on this project. Comments like, "People still use float?" helped more than you might think!

Shmoo Tidy
