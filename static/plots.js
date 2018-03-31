var url = "http://ucbe-mastermind.herokuapp.com/by_game/columns"

// Plotly.d3.json(url, function(error, response){
//     if (error) return console.warn(error);
//     console.log(response);
//     var 
//     for (var key in response) {
//         if(response)
//         {
//             console.log(response[key])
//         }
//     }});
// function histoPlot(){
//     Plotly.d3.json(url, function(error, response){
//     if (error) return console.warn(error);
//     console.log(response)
//     var games = response.game;
//     var guesses = response.guess_number;
//     var gameswon = Object.keys(games).map(function (key) {
//          return games[key];
//          })
//          var num_guess = Object.keys(guesses).map(function (key) {
//             return guesses[key];
//             })
//         console.log(gameswon);
//         console.log(num_guess); 

//     var trace = {
//             x: num_guess,
//             type: 'histogram',
//             xbins: {
//                 end: 20, 
//                 size: 1, 
//                 start: 0
//               },
//           };
//     var layout = {
//   bargap: 0.05, 
//   bargroupgap: 0.2, 
//   barmode: "overlay", 
//   title: "Histogram",
//   xanchor: 'center', 
//   xaxis: {
//     autotick: false,
//     ticks: 'outside',
//     tick0: 0,
//     dtick: 1,
//     ticklen: 5,
//     tickwidth: 3,
//     tickcolor: '#000'
//   } , 
//   yaxis: {title: "Number of Games"}
// }
//         var data = [trace];
//         Plotly.newPlot('plot', data, layout);

//     })};

    function pinGauge(pin){
    // Link to pin_difficulty lookup to pull frequency 
    url = `/lookup_difficulty/${pin}`
    Plotly.d3.json(url, function(error, response) {
        if (error){return console.warn(error);}
            var frequency = response.frequency;	
            var level = response.level;
                              
            console.log('lookup_difficulty/pin:',response);
    
        // Trig to calc meter point
        var degrees = (180/255) * frequency,
            radius = .5;
        var radians = degrees * Math.PI / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);
    
        // Path: may have to change to create a better triangle
        var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
            pathX = String(x),
            space = ' ',
            pathY = String(y),
            pathEnd = ' Z';
        var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
        var data = [{ type: 'scatter',
        x: [0], y:[0],
            marker: {size: 28, color:'850000'},
            showlegend: false,
            name: 'pin_diff',
            text: level},
            //hoverinfo: 'text+name'},
        { values: [50/3, 50/3, 50/3,50],
        rotation: 90,
        text: ['Difficult', 'Moderate', 'Easy', ''],
        textinfo: 'text',
        textposition:'inside',      
        marker: {colors:['rgba(255, 0, 0, .9)', 'rgba(255, 190, 0, .9)',
                                'rgba(255, 255, 0, .9)', 'rgba(255, 255, 255, 0)']},
        labels: ['0-50', '51-100', '101-150',''],
        hoverinfo: 'label',
        hole: .5,
        type: 'pie',
        showlegend: false
        }];
    
        var layout = {
        shapes:[{
            type: 'path',
            path: path,
            fillcolor: '850000',
            line: {
                color: '850000'
            }
            }],
        title: '<b>Pin Difficulty Gauge</b>',
        height: 700,
        width: 900,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };
    
        Plotly.newPlot('pin_diff', data, layout);
    
})}

    // function speedGauge(){
    //     // Enter a speed between 0 and 180
    //     var level = 130;
    
    //     // Trig to calc meter point
    //     var degrees = 180 - level,
    //         radius = .5;
    //     var radians = degrees * Math.PI / 180;
    //     var x = radius * Math.cos(radians);
    //     var y = radius * Math.sin(radians);
    
    //     // Path: may have to change to create a better triangle
    //     var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
    //         pathX = String(x),
    //         space = ' ',
    //         pathY = String(y),
    //         pathEnd = ' Z';
    //     var path = mainPath.concat(pathX,space,pathY,pathEnd);
    
    //     var data = [{ type: 'scatter',
    //     x: [0], y:[0],
    //         marker: {size: 28, color:'850000'},
    //         showlegend: false,
    //         name: 'speed',
    //         text: level,
    //         hoverinfo: 'text+name'},
    //     { values: [50/3, 50/3, 50/3,50],
    //     rotation: 90,
    //     text: ['Dwayne Johnson', 'Plane Jane', 'EZ-PZ', ''],
    //     textinfo: 'text',
    //     textposition:'inside',      
    //     marker: {colors:['rgba(255, 0, 0, .9)', 'rgba(255, 190, 0, .9)',
    //                             'rgba(255, 255, 0, .9)', 'rgba(255, 255, 255, 0)']},
    //     labels: ['151-180', '121-150', '91-120',''],
    //     hoverinfo: 'label',
    //     hole: .5,
    //     type: 'pie',
    //     showlegend: false
    //     }];
    
    //     var layout = {
    //     shapes:[{
    //         type: 'path',
    //         path: path,
    //         fillcolor: '850000',
    //         line: {
    //             color: '850000'
    //         }
    //         }],
    //     title: '<b>Gauge</b> <br> Difficulty 0-3',
    //     height: 700,
    //     width: 900,
    //     xaxis: {zeroline:false, showticklabels:false,
    //                 showgrid: false, range: [-1, 1]},
    //     yaxis: {zeroline:false, showticklabels:false,
    //                 showgrid: false, range: [-1, 1]}
    //     };
    
    //     Plotly.newPlot('speed', data, layout);
    // };

    function histotwo() {
        Plotly.d3.json(url, function(error, response){
            if (error) return console.warn(error);
            console.log(response)

        var color = "steelblue";

        // Generate a 1000 data points using normal distribution with mean=20, deviation=5
        // var values = d3.range(1000).map(d3.random.normal(20, 5));
        var games = response.game;
        var guesses = response.guess_number;
        var gameswon = Object.keys(games).map(function (key) {
             return games[key];
             })
             var values = Object.keys(guesses).map(function (key) {
                return guesses[key];
                })
            console.log(gameswon);
            console.log(values); 

        last_player = values[values.length - 1];
        console.log(last_player);

        // A formatter for counts.
        var formatCount = d3.format(",.0f");

        var margin = {top: 20, right: 300, bottom: 30, left: 30},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var max = d3.max(values);
        var min = d3.min(values);
        var x = d3.scale.linear()
            .domain([0, 20])
            // .domain([min, max])
            .range([0, width]);

        // Generate a histogram using twenty uniformly-spaced bins.
        var data = d3.layout.histogram()
            .bins(x.ticks(20))
            (values);

        var yMax = d3.max(data, function(d){return d.length});
        var yMin = d3.min(data, function(d){return d.length});
        var colorScale = d3.scale.linear()
                    .domain([yMin, yMax])
                    .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        var y = d3.scale.linear()
            .domain([0, yMax])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .tickValues(d3.range(0, 21, 1))    
            .scale(x)
            .orient("bottom");

        var svg = d3.select("#plot").append("svg")
        // var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            // .attr("width", width)
            // .attr("height", height)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bar = svg.selectAll(".bar")
            .data(data)
            .enter().append("g")
            .attr("class", "bar")
            .attr("transform", function(d) { return "translate(" + (x(d.x)-15) + "," + y(d.y) + ")"; });
            // .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

        bar.append("rect")
            .attr("x", 1)
            .attr("width", (x(data[0].dx) - x(0)) - 1)
            .attr("height", function(d) { return height - y(d.y); })

            // .attr("fill", function(d) { return colorScale(d.y) });
            .attr("fill", function(d) {console.log(d)
                console.log(d.x);
                if (d.x === last_player) {
                return "red";
              } else  {
                return colorScale(d.y);}
             
            });

        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(data[0].dx) - x(0)) / 2)
            .attr("text-anchor", "middle")
            .text(function(d) { return formatCount(d.y); });

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
            })};