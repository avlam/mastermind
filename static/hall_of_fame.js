

function generateHall(){
    const referenceRadius = 100;
    const scale = 1000;
    var width = 900, height = 600;

    var chart = Plotly.d3
        .select("#hallOfFame")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${50},${50})`);

    var pack = Plotly.d3.layout.pack()
        .size([width, height - 50])
        .padding(10);

    Plotly.d3.json('/leaderboard', function(data) {
        // rearrange data into list of objects containing playername, best attempts, and number of games
        // console.log(data)
        var flatData = []
        for(var i=0; i<Object.keys(data).length; i++){
            if (data[Object.keys(data)[i]]['guesses_to_win'] > 0){
                flatData.push({
                    'name': Object.keys(data)[i],
                    'nGames': data[Object.keys(data)[i]]['n_games'],
                    'bestRecord': data[Object.keys(data)[i]]['guesses_to_win'],
                    // value: data[Object.keys(data)[i]]['n_games']
                    value: scale*(2**(-data[Object.keys(data)[i]]['guesses_to_win']))
                })
            }
        }
    
        // console.log(flatData)

        var root = { 
            name: 'root',
            value: 1,
            children: flatData,
          }

        var nodes = pack.nodes(root);
        // console.log(nodes)
        
        var node = chart.selectAll(".node")
            .data(nodes).enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { 
                console.log(d)
                return "translate(" + d.x + "," + d.y + ")"; 
            });

        node.append("circle")
            .attr("r",function(d) { 
                console.log(`${d.value}: ${d.r}`)
                return d.r;
                // if(d.bestRecord<=0){
                //     return 1;
                // }
                // else{return 100+Math.floor(referenceRadius/d.bestRecord);} 
            })
            .attr("class", function(d) { return d.children ? "root" : "leaf"; })
            .attr("fill", function(d){return `rgb(${255*(d.nGames/20)},${0},${255-255*(d.nGames/20)})`})
            .attr("opacity", function(d) {return d.name=='root' ? 0 : 0.25;})
            .attr("stroke", "#ADADAD")
            .attr("stroke-width", 2);

        node.append("text")
            .text(function(d) {return d.name=='root' ? '' : d.name;})
            .attr('text-anchor','middle');
        
        console.log(nodes)
    });
}