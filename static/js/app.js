
 function buildMetadata(sample) {
 
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  var url = `/metadata/${sample}`;
  d3.json(url).then(function(sampleData){
    // Use d3 to select the panel with id of `#sample-metadata`
    var sampleMetadata = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    sampleMetadata.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
      Object.entries(sampleData).forEach(function([key, value]) {
         sampleMetadata.append('p')
        .text(`${key}:${value}`);
      });
  });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}
   
    // otu_ids, and labels (10 each).
function buildCharts(sample) {
// // @TODO: Use `d3.json` to fetch the sample data for the plots
var url = `/samples/${sample}`;
d3.json(url).then(function(data) {
// @TODO: Build a Bubble Chart using the sample data
var x_values=data.otu_ids;
var y_values= data.sample_values;
var m_size=data.sample_values;
var m_color=data.otu_ids;
var t_values=data.otu_labels;
var trace1 = {

  x: x_values,

  y: y_values,

  text: t_values,

  mode: 'markers',

  marker: {

    color:m_color,

    size: m_size,

  }

};

    
    var bubbleData = [trace1];
    console.log(bubbleData);
  
var layout = {

  title: 'Bubble Chart Hover Text',

  showlegend: false,

  height: 600,

  width: 600

};

  Plotly.newPlot('bubble', bubbleData, layout);

    

// @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    var piedata=[{

      values:data.sample_values.slice(0,10),

      labels:data.otu_ids.slice(0,10),

      type: 'pie'

      }];

      //var data = [data];

      var pielayout = {

      height: 400,

      width: 500

      };

     

      Plotly.newPlot('pie', piedata, pielayout);


});

}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
