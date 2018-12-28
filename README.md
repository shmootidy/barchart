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

EXTERNAL RESOURCES
