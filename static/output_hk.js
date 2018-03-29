function speedGauge(){
    // Enter a speed between 0 and 180
    var level = 130;

    // Trig to calc meter point
    var degrees = 180 - level,
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
    // { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
    // rotation: 90,
    // text: ['TOO FAST!', 'Pretty Fast', 'Fast', 'Average',
    //             'Slow', 'Super Slow', ''],
    // textinfo: 'text',
    // textposition:'inside',      
    // marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
    //                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
    //                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
    //                         'rgba(255, 255, 255, 0)']},
    // labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
    // hoverinfo: 'label',
    // hole: .5,
    // type: 'pie',
    // showlegend: false
    // }];
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
    title: '<b>Gauge</b> <br> Difficulty 0-3',
    height: 500,
    width: 700,
    xaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]},
    yaxis: {zeroline:false, showticklabels:false,
                showgrid: false, range: [-1, 1]}
    };

    Plotly.newPlot('speed', data, layout);
}

function boxPlot(){
    var y0=[],y1=[]
    for (var i = 0; i < 50; i ++) {
        y0[i] = Math.random();
        y1[i] = Math.random() + 1;
    }
    
    var trace1 = {
    y: y0,
    type: 'box'
    };
    
    var trace2 = {
    y: y1,
    type: 'box'
    };
    
    var data = [trace1, trace2];
    
    Plotly.newPlot('plot', data);
}