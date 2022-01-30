function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    ageText = "age:".toUpperCase().concat(result.age)
    bbtypeText = "bbtype:".toUpperCase().concat(result.bbtype)
    ethnicityText = "ethnicity:".toUpperCase().concat(result.ethnicity)
    genderText = "gender:".toUpperCase().concat(result.gender)
    idText = "id:".toUpperCase().concat(result.id)
    locationText = "location:".toUpperCase().concat(result.location)
    wfreqText = "wfreq:".toUpperCase().concat(result.wfreq)
        
    PANEL.append("h6").text(idText);
    PANEL.append("h6").text(ethnicityText);
    PANEL.append("h6").text(genderText);
    PANEL.append("h6").text(ageText);
    PANEL.append("h6").text(locationText);
    PANEL.append("h6").text(bbtypeText);
    PANEL.append("h6").text(wfreqText);
    
  });
}

function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}
  
  init();
  
