function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    console.log(`Demographics resultArray Keys`,Object.keys(resultArray));
    console.log(`Demographics resultArray Values`,Object.values(resultArray));
    
    var result = resultArray[0];
    console.log(`Demographics result Keys`,Object.keys(result));
    console.log(`Demographics result Values`,Object.values(result));

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    console.log(`data Keys`,Object.keys(data));
    console.log(`data Values`,Object.values(data));

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(`4. Create a variable that filters the samples for the object with the desired sample number. - resultArray`,resultArray);    
    console.log(`resultArray Keys`,Object.keys(resultArray));
    console.log(`resultArray Values`,Object.values(resultArray));

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(`5. Create a variable that holds the first sample in the array. - result:`,result); 
    console.log(`Demographics result Keys`,Object.keys(result));
    console.log(`Demographics result Values`,Object.values(result));
    
    //  6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_idsResult = result.otu_ids;

    console.log(`6. Create variables that hold the otu_ids. - otu_idsResult:`,otu_idsResult)

    var otu_labelsResult = result.otu_labels;
    
    console.log(`6. Create variables that hold the otu_labels. - otu_labelsResult:`,otu_labelsResult)
    

    var sample_valuesResult = result.sample_values;
    
    console.log(`6. Create variables that hold the sample_values. - sample_valuesResult:`,sample_valuesResult)
    

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    text1 = "OTN "
    var yticks = otu_idsResult.slice(0,10).map(element => text1.concat(element));

    // 8. Create the trace for the bar chart. 

    var trace1 = {
      type: 'bar',
      x: sample_valuesResult.slice(0,10).reverse(),
      y: yticks.reverse(),
      text: otu_labelsResult.reverse(),
      // text: yticks,
      name: "Greg",
      type: "bar",
      orientation: 'h'
    };
    var barData = [trace1];
    console.log(`Y Ticks`,yticks);
    console.log(`sample_valuesResult.slice`,sample_valuesResult.slice(0,10));
    console.log(`barData`,barData);


    // 9. Create the layout for the bar chart. 
    var barLayout = {  title: "<b>Top 10 Bacteria Cultures Found</b>",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 50
    }
    }
    console.log(`barLayout`,barLayout)

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar',barData, barLayout)

    // 1. Create the trace for the bubble chart.
    var trace2 = {
    y: sample_valuesResult,
    x: otu_idsResult,
    text: otu_labelsResult,
    mode: 'markers',
    marker: {
      size: sample_valuesResult,
      color: otu_idsResult,
      colorscale: "Earth"
    }

    };

    var bubbleData = [trace2];

    console.log(`bubbleData`,bubbleData);
    
    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {  title: '<b>Bacteria Cultures Per Sample</b>',
    showlegend: false,
    height: 600,
    width: 1200
  
    }

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble',bubbleData,bubbleLayout); 
    
    // 3. Create a variable that holds the washing frequency.
    var metadata = data.metadata;
    var metaArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var metaResult = metaArray[0];
    console.log(`Demographics result Keys`,Object.keys(metaResult));
    console.log(`Demographics result Values`,Object.values(metaResult));
    var wfreq = metaResult.wfreq
    console.log(`wfreq`,wfreq)
        
    // // 5. Create the layout for the gauge chart.
    var gaugeLayout = { width: 500, height: 500, margin: { t: 0, b: 0 }
     
    };

    var title3 =  '<b>Belly Button Washing Frequency</b><br></br>Srubs per Week'


    // 6. Use Plotly to plot the gauge data and layout.
    var trace3 = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreq,
        title: title3,
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10] },
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" },
          ],
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 5
          }
        }
      }
    ];

    var gaugeData = trace3
    Plotly.newPlot('gauge',gaugeData,gaugeLayout);



  });
  
} 

