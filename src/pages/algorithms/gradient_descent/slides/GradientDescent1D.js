// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import functionPlot from "function-plot";
import { button, LeftItem, CenterItem, RightItem, mathJaxConfig, mathJaxStyle } from 'pages/algorithms/dashboard/utils'
import Typography from '@mui/material/Typography';
import QuestionTable from 'pages/algorithms/dashboard/QuestionTable';
import { PrettoSlider, getDev, getExample, math, DIGITS } from 'pages/algorithms/gradient_descent/helper';
import { MathJax, MathJaxContext } from "better-react-mathjax";
// --------------------------------------------------------

export const HEADERS_1D = [
    ['step', 'Step'],
    ['x', 'x'],
    ['dx', "f'(x)"],
    ['tmpX', "alpha * f'(x)"],
    ['newX', "x'"],
]

function getPoints1D(f, startX, steps_count, alpha) {
    var points = [[startX, math.evaluate(f, { 'x': startX })]]
    var df = getDev(f, 'x')
    // console.log("f=", f, "df=", df, " startX=", startX, " steps_count=", steps_count, " alpha=", alpha)

    startX = Number(startX)
    steps_count = Number(steps_count)
    alpha = Number(alpha)


    var prev = startX
    for (let i = 0; i < steps_count; i++) {
        // console.log("i=", i)
        var tmp = math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })
        // console.log("alpha*df = ", tmp) 
        var next = math.evaluate('prev-tmp', { 'prev': prev, 'tmp': tmp })
        // console.log("next = ", next)
        points.push([next, math.evaluate(f, { 'x': next })])
        prev = next
    }

    // console.log('points=', points)
    return points
}

function getGraph1D(f, points) {
    var width = 800;
    var height = 500;
    // console.log("points= \n", points)
    // console.log("f= \n", f)

    functionPlot({
        target: '#graph-board',
        width,
        height,
        xAxis: { domain: [-(math.abs(points[0][0]) + 2), math.abs(points[0][0]) + 2], label: 'x' },
        yAxis: { domain: [-(math.abs(points[0][1]) + 2), math.abs(points[0][1]) + 2], label: 'f(x)' },
        title: f,
        grid: true,
        data: [
            {
                fn: f,
                derivative: {
                    fn: getDev(f, 'x'),
                    updateOnMouseMove: true
                },
            },
            {
                points: points,
                fnType: 'points',
                graphType: 'polyline',
            }
        ]
    });
}

function getAnswers1D(header, rows, f, startX, alpha) {
    try {
        let keys = header.map((ele) => ele[0]);
        let res = {}
        keys.forEach(key => res[key] = [])

        var df = getDev(f, 'x')
        startX = Number(startX)
        alpha = Number(alpha)

        var prev = startX
        for (let i = 0; i < rows; i++) {
            var ans = {
                step: i,
                x: prev,
                dx: Number(math.evaluate(df, { 'x': prev })).toFixed(DIGITS),
                tmpX: null,
                newX: null,
            }
            ans.tmpX = Number(math.evaluate('alpha*('.concat(df).concat(')'), { 'alpha': alpha, 'x': prev })).toFixed(DIGITS)
            ans.newX = Number(math.evaluate('prev-tmp', { 'prev': prev, 'tmp': ans.tmpX })).toFixed(DIGITS)

            for (const [key, value] of Object.entries(ans)) {
                res[key].push(value)
            }

            prev = ans.newX

        }
        // ['', x, math.evaluate(df, {'x': x}), dfx, math.evaluate('x-tmp', {'x': x, 'tmp': dfx})]

        return res
    }
    catch (e) {
        console.log('error at getAnswers1D(header, rows, f, startX, alpha) => \n', e)
    }
}

export default function GradientDescent1D(props) {

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
                            max={2}
                            onChange={(event, value) => handleStates({ tck: false, dr: false, al: value })}
                        />
                    </span>
                );
            case 'input':
                return <input type='text' value={alpha} style={{ height: '2rem', fontSize: '1.2rem' }} onChange={event => handleStates({ tck: false, cnt: 0, al: event.target.value })} />
            default:
                return null
        }
    }

    const getButtonsInput = (type) => {
        switch(type){
            case 'playGround':
            case 'hyperParameter': 
                return (
                    <RightItem>
                        {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                        {button({ eventHandler: () => handleStates({ tck: false }), type: 'pause' })}
                        {button({ eventHandler: () => handleStates({ tck: true }), type: 'play' })}
                        <p>{count}</p>
                    </RightItem>
                );
            case 'stepByStep':
                return (
                    <CenterItem>
                        {button({ eventHandler: () => handleStates({ tck: false, cnt: (count <= 0) ? 0 : count - 1 }), type: 'prev' })}
                        {button({ eventHandler: () => handleStates({ tck: false, cnt: 0 }), type: 'stop' })}
                        {button({ eventHandler: () => handleStates({ tck: false, cnt: count + 1 }), type: 'next' })}
                    </CenterItem>
                );
            default:
                return null
        }
    }

    const [myfun, setFun] = React.useState('x^2')
    const [alpha, setAlpha] = React.useState(1)
    const [startX, setStartX] = React.useState('0')
    const [ticking, setTicking] = React.useState(false)
    const [count, setCount] = React.useState(0)

    const handleStates = (
        { fn = myfun, al = alpha, sx = startX, tck = ticking, cnt = count } =
            { fn: 'x^2', al: 1, sx: 0, tck: false, cnt: 0 }) => {
        setFun(fn)
        setStartX(sx)
        setAlpha(al)
        setCount(cnt)
        setTicking(tck)
    }

    React.useEffect(() => {
        try {
            let points = getPoints1D(myfun, startX, count, alpha)
            getGraph1D(myfun, points)
        }
        catch (e) {
            console.log("error at useEffect on parameters changes => \n", e)
        }
    }, [myfun, alpha, startX, count]);

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
                                    <MathJax style={mathJaxStyle} inline>{"\\(f(x)\\)"}</MathJax> = <input type='text' value={myfun} style={{ width: '70%', height: '2rem', fontSize: '1.2rem' }} onChange={event => handleStates({ tck: false, cnt: 0, fn: event.target.value })} />
                                    <br /><br />
                                    <MathJax style={mathJaxStyle} inline>{"\\(\\alpha\\)"}</MathJax> = { getAlphaInput(alphaType) }
                                    <br /><br />
                                    Starting point (x = <input type='text' style={{ width: '5rem' }} value={startX} onChange={event => handleStates({ tck: false, cnt: 0, sx: event.target.value })} />)
                                    <br /><br />
                                    The derivative of the function is:<br/>  
                                    <MathJax style={mathJaxStyle} inline>{"\\(\\frac{df}{dx} = \\)"}</MathJax> {getDev(myfun, 'x')}<br/>
                                </Typography>
                            </LeftItem>
                        </Grid>
                        <Grid item xs={12}>
                            <CenterItem>
                                {generateQuestionTable ? (<QuestionTable
                                    rowsNum = {5}
                                    headers = {HEADERS_1D}
                                    exampleEnabled = {true}
                                    rowNumbersEnabled = {true}
                                    example = {getExample(myfun, [{ 'v': 'x', 'val': startX }], alpha)}
                                    correctAnswers = {getAnswers1D(HEADERS_1D, 6, myfun, startX, alpha)}
                                    comparator = {(res, ans) => Number(ans) === Number(res)}
                                />) : null
                                }
                                <div id='graph-board'></div>
                            </CenterItem>
                            { getButtonsInput(buttonsType) }
                        </Grid>
                    </Grid>
                </MathJaxContext>
            </Box>
        </div>
    );
}