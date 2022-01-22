// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Plotly from 'plotly.js-dist-min';
import { button, LeftItem, CenterItem } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';
import { getDev, getExample, PrettoSlider, math, DIGITS } from '../helper';
import { mathJaxConfig, mathJaxStyle } from 'pages/algorithms/dashboard/utils';
import { MathJax, MathJaxContext } from "better-react-mathjax";
// --------------------------------------------------------

export const HEADERS_2D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['y', 'y'],
    ['dx', "dfx(x, y)"],
    ['dy', "dfy(x, y)"],
    ['tmpX', "alpha * dfx(x, y)"],
    ['tmpY', "alpha * dfy(x, y)"],
    ['newX', "x'"],
    ['newY', "y'"],
]


function getPoints2D(f, startX, startY, steps_count, alpha) {
    try {
        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        var prevX = Number(startX)
        var prevY = Number(startY)
        steps_count = Number(steps_count)
        alpha = Number(alpha)

        var points = {
            x: [prevX],
            y: [prevY],
            z: [math.evaluate(f, { 'x': startX, 'y': startY })]
        }
        // console.log("f=", f, "dfx=", dfx, "dfy=", dfy, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

        for (let i = 0; i < steps_count; i++) {
            // console.log("i=", i)

            var tmpX = math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var tmpY = math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })
            var nextX = math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': tmpX })
            var nextY = math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': tmpY })
            var z = math.evaluate(f, { 'x': nextX, 'y': nextY })

            // console.log('prevX=', prevX, ' prevY=', prevY, ' tmpX=', tmpX, ' tmpY=', tmpY, ' nextX=', nextX, ' nextY=', nextY )
            points.x.push(nextX)
            points.y.push(nextY)
            points.z.push(z)

            prevX = nextX
            prevY = nextY
        }

        // console.log("points = ", points)
        return points

    }
    catch (e) {
        console.log('error at getPoints2D(f, startX, startY, steps_count, alpha) => \n', e)
        return '0'
    }
}

function getGraph2D(data, points) {
    try {
        // console.log('getGraph2D - \n')
        // console.log('data = ', data, '\n')
        // console.log('points = ', points, '\n')

        var z = []

        for (let y = -10; y < 11; y += 1) {
            var new_y = []
            for (let x = -10; x < 11; x += 1) {
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
        const data_z2 = {
            type: 'scatter3d',
            mode: 'points',
            x: points.x,
            y: points.y,
            z: points.z,
            marker: { color: 'red' }
        };
        const layout = {
            xaxis: {
                range: [-5, 5]
            },
            yaxis: {
                range: [-5, 5]
            }
        }
        var config = { responsive: true }
        Plotly.newPlot('graph2-board', [data_z1, data_z2], layout, config);
    }
    catch (e) {
        console.log('error at getGraph2D(data, points) => \n', e)
        return '0'
    }
}

function getAnswers2D(header, rows, f, startX, startY, alpha) {
    try {
        let keys = header.map((ele) => ele[0]);
        let res = {}
        keys.forEach(key => res[key] = [])

        var dfx = getDev(f, 'x')
        var dfy = getDev(f, 'y')
        startX = Number(startX).toFixed(DIGITS)
        startY = Number(startY).toFixed(DIGITS)
        alpha = Number(alpha)

        var prevX = startX
        var prevY = startY

        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prevX,
                y: prevY,
                dx: Number(math.evaluate(dfx, { 'x': prevX, 'y': prevY })).toFixed(DIGITS),
                dy: Number(math.evaluate(dfy, { 'x': prevX, 'y': prevY })).toFixed(DIGITS),
                tmpX: null,
                tmpY: null,
                newX: null,
                newY: null,
            }
            ans.tmpX = Number(math.evaluate('alpha*('.concat(dfx).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)
            ans.newX = Number(math.evaluate('prevX-tmpX', { 'prevX': prevX, 'tmpX': ans.tmpX })).toFixed(DIGITS)
            ans.tmpY = Number(math.evaluate('alpha*('.concat(dfy).concat(')'), { 'alpha': alpha, 'x': prevX, 'y': prevY })).toFixed(DIGITS)
            ans.newY = Number(math.evaluate('prevY-tmpY', { 'prevY': prevY, 'tmpY': ans.tmpY })).toFixed(DIGITS)

            for (const [key, value] of Object.entries(ans)) {
                res[key].push(value)
            }

            prevX = ans.newX
            prevY = ans.newY

        }
        // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]
        // console.log('res=', res)
        return res
    }
    catch (e) {
        console.log('error at getAnswers2D(header, rows, f, startX, startY, alpha) => \n', e)
    }

}

function getData2D(f) {
    try {
        var data = {
            x: [],
            y: [],
            z: []
        }

        for (let y = -10; y < 11; y += 1) {
            var new_y = [[], []]
            for (let x = -10; x < 11; x += 1) {
                new_y[0].push(math.evaluate(f, { 'x': x, 'y': y }))
                new_y[1].push(x)
            };
            data.x.push(new_y[1])
            data.y.push(y)
            data.z.push(new_y[0])
        }

        return data
    }
    catch (e) {
        console.log('error at getData2D(f) => \n', e)
        return '0'
    }
}

export default function GradientDescent2D(props) {

    const { alphaType, buttonsType, generateQuestionTable} = props
    const getAlphaInput = (type) => {
        switch(type){
            case 'slider':
                return (
                    <span>
                        <br/>
                        <PrettoSlider
                            valueLabelDisplay="auto"
                            aria-label="pretto slider"
                            defaultValue={alpha}
                            step={0.05}
                            min={0}
                            max={10}
                            onChange={(event, value) => handleStates({ tck: false, dr: false, al: value })}
                        />
                    </span>
                );
            case 'input':
                return  <input type='text' value={alpha} style={{ height: '2rem', fontSize: '1.2rem' }} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, al: event.target.value })} />
            default:
                return null
        }
    }

    const getButtonsInput = (type) => {
        switch(type){
            case 'playGround':
            case 'hyperParameter': 
                return (
                    <div>
                        {button({ eventHandler: () => handleStates({ dr: true }), type: 'brush' })}
                        {button({ eventHandler: () => handleStates({ tck: false, dr: false, cnt: 0 }), type: 'stop' })}
                        {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                        {button({ eventHandler: () => handleStates({ tck: true, dr: true }), type: 'play' })}
                        <p>{count}</p>
                    </div>
                );
            case 'stepByStep':
                return (
                    <div>
                        {button({ eventHandler: () => handleStates({ tck: false, dr: true }), type: 'brush' })}
                        {button({ eventHandler: () => handleStates({ tck: false, dr: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                        {button({ eventHandler: () => handleStates({ tck: false, dr: false }), type: 'stop' })}
                        {button({ eventHandler: () => handleStates({ tck: false, dr: true, cnt: count + 1 }), type: 'next' })}
                    </div>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [startY, setStartY] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [data2D, setData2D] = React.useState({ x: [], y: [], z: [] })
    const [draw, setDraw] = React.useState(false)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, sy = startY, tck = ticking, cnt = count, d2D = data2D, dr = draw } =
            { fn: 'x^2', al: 1, sx: 0, sy: 0, tck: false, cnt: 0, d2D: { x: [], y: [], z: [] }, dr: false }) => {
        setFun(fn)
        setStartX(sx)
        setStartY(sy)
        setAlpha(al)
        setDraw(dr)
        setCount(cnt)
        setTicking(tck)

        if (dr) {
            (myfun !== '') ? setData2D(getData2D(myfun)) : setData2D(d2D)
        }
    }

    React.useEffect(() => {
        try {
            let points = null;
            if (draw) {
                points = getPoints2D(myfun, startX, startY, count, alpha);
                getGraph2D(data2D, points);
            }
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, startY, count, draw, data2D]);

    // For Initial plot when the page loads for the first time
    React.useEffect(() => {
        try {
            const timer = setTimeout(() => ticking && setCount(count + 1), 1e3)
            return () => clearTimeout(timer)
        }
        catch (e) {
            console.log("error at useEffect => \n", e)
        }

    });

    return (
        <div>
            <Box sx={{ width: "100%" }}>
                <MathJaxContext version={3} config={mathJaxConfig}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, }}>
                        <Grid item xs={12}>
                            <LeftItem>
                                <Typography sx={{ color: 'black', fontSize: '1rem' }}>
                                    <MathJax style={mathJaxStyle} inline>{"\\(f(x, y)\\)"}</MathJax> = <input type='text' value={myfun} style={{ width: '70%', height: '2rem', fontSize: '1.2rem'}} onChange={event => handleStates({ fn: event.target.value, tck: false, cnt: 0, dr: false })} />
                                    <br /><br />
                                    <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> = { getAlphaInput(alphaType) }
                                    <br /><br />
                                    Starting point (
                                    x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sx: event.target.value })} />,
                                    y = <input type='text' style={{ width: '5rem' }} value={startY} onChange={event => handleStates({ tck: false, dr: false, cnt: 0, sy: event.target.value })} />
                                    )
                                    <br /><br />
                                    The derivatives of the function are:<br/> 
                                    <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx} = \\)"}</MathJax>{getDev(myfun, 'x')}<br/><br/>
                                    <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dy} = \\)"}</MathJax>{getDev(myfun, 'y')}<br/>
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <CenterItem>
                                { generateQuestionTable ? <QuestionTable
                                    rowsNum = {5}
                                    headers = {HEADERS_2D}
                                    rowNumbersEnabled = {true}
                                    exampleEnabled = {true}
                                    example = {getExample(myfun, [{ 'v': 'x', 'val': startX }, { 'v': 'y', 'val': startY }], alpha)}
                                    correctAnswers = {getAnswers2D(HEADERS_2D, 6, myfun, startX, startY, alpha)}
                                    comparator = {(res, ans) => Number(ans) === Number(res)}
                                /> : null }
                                <div id='graph2-board'></div>
                            </CenterItem>
                            <CenterItem>
                                { getButtonsInput(buttonsType) }
                            </CenterItem>
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}