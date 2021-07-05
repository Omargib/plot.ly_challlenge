// Reading json file
var data;
d3.json("samples.json").then((samples) => {
    data = samples;
    console.log(data);
    var dropdown = d3.select("#selDataset")
    data.names.forEach(x => {
        dropdown.append("option").property("value", x).text(x)
    })
    buildCharts(data.names[0])
}
);

function buildCharts(selID){
    var fullMeta = data.metadata
    var filtermeta = fullMeta.filter(x => x.id == selID)[0]
    var table = d3.select("#sample-metadata")
    table.html("")
    Object.entries(filtermeta).forEach(([key, value]) => {
        table.append("p").html(`${key}: ${value}`)
    })

    var fullsample = data.samples
    var filtersample = fullsample.filter(x => x.id == selID)[0]
    var OTUid = filtersample.otu_ids
    var OTUlabel = filtersample.otu_labels
    var samplevalue = filtersample.sample_values

    var bartrace = [{
        x: samplevalue.slice(0, 10).reverse(),
        y: OTUid.slice(0, 10).reverse().map(x => `OTU ${x}`),
        text: OTUlabel.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
    }]
    var layout = {
        title: "Top 10 Bacteria"
    }
    var config = {
        responsive: true
    }

    Plotly.newPlot("bar", bartrace, layout, config)

    // Bubble chart
    
        var bubbletrace = {
            x: OTUid,
            y: samplevalue,
            mode: 'markers',
            marker: {
                size: samplevalue
            }

        };

        var bubble = [bubbletrace];

        var layoutb = {
            tittle: 'Marker Size',
            showlegend: false,
            height: 600,
            width: 600


        };

        Plotly.newPlot('bubbleplot', bubble, layoutb);


    
} 
