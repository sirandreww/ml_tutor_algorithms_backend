import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

/**
 * Creates the header of the table
 * @param {Number} num The number of rows
 * @param {String[][]} formater [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @returns 
 */
function generateColumns(formater) {
    var columns = []
    for (let col = 0; col < formater.length; col++) {
        const [field, header] = formater[col];
        const editable = col !== 0

        columns.push({
            field: field, 
            headerName: header, 
            editable: editable, 
            sortable: false, 
            headerAlign: 'center', 
            flex: header.length, 
            align: 'center',
            cellClassName: 'super-app.default',
            headerClassName: 'super-app-theme--header',
        })
    }

    return columns
}

/**
 * Creates an empty rows of the table
 * @param {Number} num The number of rows
 * @param {String[][]} formater [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @param {Boolean} exampleEnabled if ture you must provide an example of the answer
 * @param {any[]} example if exampleEnabled is true the first line will be filled with the example answer (won't be editable), otherwise it will be ignored
 * @returns 
 */
function generateRows(num, formater, example, exampleEnabled, rowNumberingEnabled) {
    var rows = []
    var tmp = {}
    var currentRow = 0
    
    if (exampleEnabled) {
        tmp['id'] = currentRow
        
        for (let index = 0; index < formater.length; index++) {
            const [field, ] = formater[index];
            tmp[field] = (index === 0) ? currentRow + 1 : example[index]
        }

        rows.push(tmp)
        currentRow += 1
        num += 1
    }

    for (; currentRow < num; currentRow++) {
        tmp = {'id': currentRow}

        for (let index = 0; index < formater.length; index++) {
            const [field, ] = formater[index];
            tmp[field] = (index === 0 && rowNumberingEnabled) ? currentRow + 1 : null
        }    
        
        rows.push(tmp)
    }

    return rows
}

function identicalArrays(array1, array2) {
    // console.log('identicalArrays')
    // console.log('array1 = ', array1)
    // console.log('array2 = ', array2)

    if (array1.length !== array2.length) {
        return false
    }

    for (let i = 0; i < array1.length; i++) {
        // console.log('i = ', i)
        // console.log('array1[i] = ', array1[i])
        // console.log('array2[i] = ', array2[i])
        if(array1[i] !== array2[i]) {
            return false
        }
        
    }
    return true
}
/**
 * Table for users to enter their answers and it will check them automatically!
 * @param {Number} rowsNum The number of rows
 * @param {String[][]} headers [['field name', 'header name'],['field name', 'header name'],...], the first is the field name and the second is the header name (header name is what will be present to the user)
 * @param {Boolean} rowNumbersEnabled if ture the first column will be numbered automatically
 * @param {Boolean} exampleEnabled if ture you must provide an example of the answer
 * @param {any[]} example if exampleEnabled is true the first line will be filled with the example answer (won't be editable), otherwise it will be ignored
 * @param {{[Key: String]: any[]}} correctAnswers the key is the column header while the value is an array of the correct answers of that column (if exampleEnabled is true so include its answers).
 * @param {(,) => Boolean} comparator function to compare the input of the user to the answer, if not provided it compares via ===
 * @returns the desired table functionality
 */
class QuestionTable extends React.Component {

    compare(current, to) {
        return current === to
    }

    constructor(props) {
        super(props)
    
        this.state = {
            rowsNum: props.rowsNum,
            headers: props.headers,
            rowNumbersEnabled: props.rowNumbersEnabled,
            exampleEnabled: props.exampleEnabled,
            example: props.example,
            correctAnswers: props.correctAnswers,
            comparator: ('comparator' in props) ? props.comparator : this.compare 
        }

        // console.log('props.rowsNum = ', props.rowsNum)
        // console.log('props.headers = ', props.headers)
        // console.log('props.rowNumbersEnabled = ', props.rowNumbersEnabled)
        // console.log('props.exampleEnabled = ', props.exampleEnabled)
        // console.log('props.example = ', props.example)
        // console.log('props.correctAnswers = ', props.correctAnswers)
    }


    // Invoked immediately after a component and all its children componenets have been rendered to the DOM.
    // componentDidMount() {
    //
    // }

    // Dictates if the component should be re-render or not(returns true/false)
    shouldComponentUpdate(nextProps, nextState) {
        // console.log('shouldComponentUpdate')
        // console.log('nextProps = ', nextProps)
        // console.log('nextState = ', nextState)
        // console.log('this.state = ', this.state)
        // console.log('identicalArrays(this.state.example, nextProps.example) = ', identicalArrays(this.state.example, nextProps.example))
        // console.log('!identicalArrays(this.state.example, nextProps.example) = ', !identicalArrays(this.state.example, nextProps.example))
        return (!identicalArrays(this.state.example, nextProps.example))
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            rowsNum: nextProps.rowsNum,
            headers: nextProps.headers,
            rowNumbersEnabled: nextProps.rowNumbersEnabled,
            exampleEnabled: nextProps.exampleEnabled,
            example: nextProps.example,
            correctAnswers: nextProps.correctAnswers,
        });  
    }

    // Invoked before the re-render occures in order to save some information and returns is as a third paremeter to componentDidUpdate
    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //
    // }

    // Called after the render is finished in the re-render cycle.
    // componentDidUpdate(prevProps, prevState, snapshot) {
    // 
    // }

    render() {
        return (
            <Box sx={{
                justifyContent: 'space-between',
                alignItems: 'center',
                '& .default': {
                    backgroundColor: '#e8e8e8',
                    color: '#1a3e72',
                    fontSize: '1rem',
                    fontWeight: '600',
                },
                '& .correct': {
                    backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#1a3e72',
                    fontSize: '1rem',
                    fontWeight: '600',
                },
                '& .wrong': {
                    backgroundColor: '#d47483',
                    color: '#1a3e72',
                    fontSize: '1rem',
                    fontWeight: '600',
                },
                '& .super-app-theme--header': {
                    backgroundColor: 'rgb(60, 78, 118, 0.5)',
                    color: 'black',
                    fontSize: '1.2rem',
                    fontWeight: '1000',
                },
            }}
        >
            <DataGrid
                columns = { generateColumns(this.state.headers) }
                rows = { generateRows(this.state.rowsNum, this.state.headers, this.state.example, this.state.exampleEnabled, this.state.rowNumbersEnabled) }
                isCellEditable = { (params) => !this.state.exampleEnabled || params.row.id !== 0 }
                disableColumnMenu = { true }
                hideFooter = { true }
                autoHeight = { true }
                getCellClassName={(params) => {
                    //     console.log(
                    //         '\nparams.getValue(params.id, params.field)=', params.getValue(params.id, params.field),
                    //         '\ncorrectAnswers[params.field][params.id]=', correctAnswers[params.field][params.id],
                    //         '\nparams.id', params.id,
                    //         '\nparams.field', params.field,
                    //         '\nparams.headerName', params.headerName,
                    //         '\nequals? ', params.getValue(params.id, params.field) === correctAnswers[params.field][params.id]
                    //     )
                    if (params.getValue(params.id, params.field) === null || (this.state.exampleEnabled && params.id === 0) || (this.state.rowNumbersEnabled && params.field === this.state.headers[0][0])) {
                        return 'default';
                    }
                    if( this.state.comparator(params.getValue(params.id, params.field), this.state.correctAnswers[params.field][params.id]) ){
                        return 'correct'
                    }
                    else{
                        return 'wrong'
                    }
                }}
            />
        </Box>
        )
    }
}

export default QuestionTable