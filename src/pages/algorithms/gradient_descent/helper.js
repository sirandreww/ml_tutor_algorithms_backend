import { create, all } from 'mathjs';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

export const math = create(all, {})
export const DIGITS = 2

export const PrettoSlider = styled(Slider)({
    width: '30%',
    height: 8,
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: '#1976d2',
        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
});

export function getDev(f, v) {
    try {
        return math.derivative(f, v).toString()
    }
    catch (e) {
        console.log('error at getDev(f,v) => \n', e)
        return '0'
    }
}


export function getExample(f, vars, alpha) {
    try {
        alpha = Number(alpha)
        var prevs = {}
        vars.forEach(ele => prevs[ele.v] = Number(ele.val).toFixed(DIGITS))

        var vs = []
        var devs = []
        var tmps = []
        var nexts = []

        for (let index = 0; index < vars.length; index++) {
            let { v, val } = vars[index];
            val = Number(val).toFixed(DIGITS)

            let df = getDev(f, v)
            let dev = Number(math.evaluate(df, prevs)).toFixed(DIGITS)
            let tmp = Number(math.evaluate('alpha*dev', { 'alpha': alpha, 'dev': dev })).toFixed(DIGITS)
            let next = Number(math.evaluate('v-tmp', { 'v': val, 'tmp': tmp })).toFixed(DIGITS)

            vs.push(val)
            devs.push(dev)
            tmps.push(tmp)
            nexts.push(next)
        }
        // console.log('getExample=', ['', ...vs, ...devs, ...tmps, ...nexts])
        return ['', ...vs, ...devs, ...tmps, ...nexts]
    }
    catch (e) {
        console.log('error at getExample(f, vars, alpha) => \n', e)
        return '0'
    }
}
