
function generateHall(thisGame){
    const referenceRadius = 100;
    const scale = 1000;
    const threshold = 3 // cutoff of attempts to accept
    var width = 450, height = 400;

    d3
        .select('#playerSummary')
        .insert('p').text('Player Name:')
        .insert('p').text('Best Record:')
        .insert('p').text('Games Played:');

    d3
        .select('#hallOfFame')
        .append('h1')
        .style('font-size','1.5em')
        .style('font-weight','bold')
        .style('text-align','center')
        .text('Hall of Fame');

    var chart = Plotly.d3
        .select("#hallOfFame")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");
        // .attr("transform", `translate(${0},${50})`);

    var pack = Plotly.d3.layout.pack()
        .size([width, height - 50])
        .padding(10)
        .sort(function(a, b) {
            return -(a.value - b.value);
        });

    Plotly.d3.json('/leaderboard', function(data) {
        // rearrange data into list of objects containing playername, best attempts, and number of games
        // console.log(data)
        var flatData = []
        if(thisGame.rightDigitRightPlace == 4){
            if(!Object.keys(data).includes(thisGame.playerName)){
                flatData.push({
                    'name': thisGame.player,
                    'nGames': 1,
                    'bestRecord': thisGame.guessNumber,
                    value: scale*(2**(threshold-thisGame.guessNumber))
                });
            }
        }
        for(var i=0; i<Object.keys(data).length; i++){
            if (data[Object.keys(data)[i]]['guesses_to_win'] > threshold){
                flatData.push({
                    'name': Object.keys(data)[i],
                    'nGames': data[Object.keys(data)[i]]['n_games'],
                    'bestRecord': data[Object.keys(data)[i]]['guesses_to_win'],
                    // value: data[Object.keys(data)[i]]['n_games']
                    value: scale*(2**(threshold-data[Object.keys(data)[i]]['guesses_to_win']))
                });
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
                // console.log(d)
                return "translate(" + d.x + "," + d.y + ")"; 
            });

        node.append("circle")
            .attr("r",function(d) { 
                // console.log(`${d.value}: ${d.r}`)
                return d.r;
                // if(d.bestRecord<=0){
                //     return 1;
                // }
                // else{return 100+Math.floor(referenceRadius/d.bestRecord);} 
            })
            .attr("class", function(d) { return d.children ? "root" : "leaf"; })
            .attr("fill", function(d){return `rgb(${128-(15*d.nGames)},${128+(15*d.nGames)},${128+(15*d.nGames)})`})
            .attr("opacity", function(d) {return d.name =='root' ? 0 : 1;})
            .attr("stroke", function(d){
                console.log(`${d.name} : ${thisGame.player}`)
                return d.name == thisGame.player ? "red" : "#ADADAD"
            })
            .attr("stroke-width", 2)
            .on('mouseover',function(data){
                if(data.name != 'root'){
                    d3
                        .select('#playerSummary')
                        .html('')
                        .insert('p').text(`Player Name: ${data.name}`)
                        .insert('p').text(`Best Record: ${data.bestRecord}`)
                        .insert('p').text(`Games Played: ${data.nGames}`);
                }
            })
            .on('mouseout',function(data){
                d3
                    .select('#playerSummary')
                    .html('')
                    .insert('p').text(`Player Name: ${''}`)
                    .insert('p').text(`Best Record: ${''}`)
                    .insert('p').text(`Games Played: ${''}`);
            });

        node.append("text")
            .text(function(d) {if(d.value >=100){return d.name=='root' ? '' : d.name;}})
            .attr('text-anchor','middle')
            .on('mouseover',function(data){
                if(data.name != 'root'){
                    d3
                        .select('#playerSummary')
                        .html('')
                        .insert('p').text(`Player Name: ${data.name}`)
                        .insert('p').text(`Best Record: ${data.bestRecord}`)
                        .insert('p').text(`Games Played: ${data.nGames}`);
                }
            })
            .on('mouseout',function(data){
                d3
                    .select('#playerSummary')
                    .html('')
                    .insert('p').text(`Player Name: ${''}`)
                    .insert('p').text(`Best Record: ${''}`)
                    .insert('p').text(`Games Played: ${''}`);
            });
        
        // console.log(nodes)
    });
}