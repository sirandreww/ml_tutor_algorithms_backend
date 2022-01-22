// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import { create, all } from 'mathjs';
import Plotly from 'plotly.js-dist-min'

// ------------------------ CODE ------------------------    

const math = create(all, {})

function getData2D(f) {
    var data = {
        x: [],
        y: [],
        z: []
    }

    for (let y = -10; y < 11; y += 1)  {
        var new_y = [[], []]
        for (let x = -10; x < 11; x += 1)  {
            new_y[0].push(math.evaluate(f, {'x': x, 'y': y}))
            new_y[1].push(x)
        };
        data.x.push(new_y[1])
        data.y.push(y)
        data.z.push(new_y[0])
    }

    return data
}

function getGraph2D(data){
    // console.log('getGraph2D - \n')
    // console.log('data = ', data, '\n')
    // console.log('points = ', points, '\n')

    var z = []

    for (let y = -10; y < 11; y += 1)  {
        var new_y = []
        for (let x = -10; x < 11; x += 1)  {
            new_y.push(x)
        };
        z.push(new_y)
    }
    const data_z1 = {
        type: 'surface',
        x: data.x,
        y: data.y,
        z: data.z,
        colorscale: 'Viridis', 
        lighting: {
            roughness: 0.2
        }
    };
    const layout = {
        xaxis: {
            range: [-5, 5]
        },
        yaxis: {
            range: [-5, 5]
        }
    }
    var config = {responsive: true}
    Plotly.newPlot('graph2-board', [data_z1,], layout, config);
}

// --------------------------------------------------------

export default function Graph2D(props) {
    React.useEffect(() => {
        getGraph2D(getData2D(props.function))
    });
    
    return (<div id='graph2-board'></div>);
}

