import {applyMiddleware, createStore} from 'redux'
import logger from 'redux-logger'
import reducers from './reducers'
import stringifyJSON from './stringifyJSON'

const store = createStore(
    reducers,
    applyMiddleware(logger)
)

store.dispatch({
    type: 'CREATE_CSV_IMPORT',
    payload: {
        id: '1',
        tableId: 'tbl1',
        firstRowHeaders: false,
        merge: false,
        data: null,
        mappings: [{
            fieldId: 'fld1',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld2',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld3',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld4',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld5',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld6',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld7',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }, {
            fieldId: 'fld8',
            enabled: false,
            columnId: stringifyJSON({value: 0})
        }]
    }
})

export default store