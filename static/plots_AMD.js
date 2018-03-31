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
function histoPlot(){
    Plotly.d3.json(url, function(error, response){
    if (error) return console.warn(error);
    console.log(response)
    var games = response.game;
    var guesses = response.guess_number;
    var gameswon = Object.keys(games).map(function (key) {
         return games[key];
         })
         var num_guess = Object.keys(guesses).map(function (key) {
            return guesses[key];
            })
        console.log(gameswon);
        console.log(num_guess); 

    var trace = {
            x: num_guess,
            type: 'histogram',
            xbins: {
                end: 20, 
                size: 1, 
                start: 0
              },
          };
    var layout = {
  bargap: 0.05, 
  bargroupgap: 0.2, 
  barmode: "overlay", 
  title: "Histogram",
  xanchor: 'center', 
  xaxis: {
    autotick: false,
    ticks: 'outside',
    tick0: 0,
    dtick: 1,
    ticklen: 5,
    tickwidth: 3,
    tickcolor: '#000'
  } , 
  yaxis: {title: "Number of Games"}
}
        var data = [trace];
        Plotly.newPlot('plot', data, layout);

    })};

    function pinGauge(){
        //WE NEED SOMETHING LIKE THIS, WHICH I NEED IMPLEMENTING -pseudocode
        // Link to pin_difficulty lookup to pull frequency 

	    url = "/lookup_difficulty/pin"
	    Plotly.d3.json(url, function(error, response) {
		    if (error) return console.warn(error);
			    var frequency = response.frequency;			  		
			    console.log('lookup_difficulty/pin:',response);
        
        
        // Trig to calc meter point
        var degrees = (180/255) * frequency,
        //END OF CHANGES
        //var degrees = 180 - level,
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
            name: 'speed',
            text: level,
            hoverinfo: 'text+name'},
        { values: [50/3, 50/3, 50/3,50],
        rotation: 90,
        text: ['Dwayne Johnson', 'Plane Jane', 'EZ-PZ', ''],
        textinfo: 'text',
        textposition:'inside',      
        marker: {colors:['rgba(255, 0, 0, .9)', 'rgba(255, 190, 0, .9)',
                                'rgba(255, 255, 0, .9)', 'rgba(255, 255, 255, 0)']},
        labels: ['151-180', '121-150', '91-120',''],
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
        title: '<b>Pin Difficulty Gauge</b> <br> From most to least Used',
        height: 700,
        width: 900,
        xaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]},
        yaxis: {zeroline:false, showticklabels:false,
                    showgrid: false, range: [-1, 1]}
        };
    
        Plotly.newPlot('speed', data, layout);
    };
