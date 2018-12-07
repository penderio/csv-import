import {fromJS} from 'immutable'

const initialState = {
    cache: {
        CSVImport: {},
        Mapping: {},
        Field: {
            'fld1': {
                id: 'fld1',
                name: 'First name',
                typeId: 'singleLineText'
            },
            'fld2': {
                id: 'fld2',
                name: 'Email address',
                typeId: 'singleLineText'
            },
            'fld3': {
                id: 'fld3',
                name: 'Published',
                typeId: 'checkbox'
            },
            'fld4': {
                id: 'fld4',
                name: 'Friends',
                typeId: 'linkToAnotherRecord'
            }
        }
    }
}

export default (state = initialState, action) => {

    state = fromJS(state)

    switch (action.type) {

        case 'CREATE_CSV_IMPORT': {

            const {id, tableId, firstRowHeaders, merge, data, mappings} = action.payload

            mappings.forEach(({fieldId, enabled, columnId}) => {
                const mappingId = [id, fieldId].join('/')
                state = state.setIn(['cache', 'Mapping', mappingId], fromJS({
                    id: mappingId,
                    fieldId,
                    enabled,
                    columnId
                }))
            })

            state = state.setIn(['cache', 'CSVImport', id], fromJS({
                id,
                tableId,
                firstRowHeaders,
                merge,
                data,
                mappings: mappings.map(mapping => [id, mapping.fieldId].join('/'))
            }))

            break
        }

        case 'SET_TABLE_ID_IN_CSV_IMPORT': {

            const {id, tableId} = action.payload

            state = state.setIn(['cache', 'CSVImport', id, 'tableId'], tableId)

            break
        }

        case 'SET_MERGE_IN_CSV_IMPORT': {

            const {id, merge} = action.payload

            state = state.setIn(['cache', 'CSVImport', id, 'merge'], merge)

            break
        }

        case 'SET_FIRST_ROW_HEADERS_IN_CSV_IMPORT': {

            const {id, firstRowHeaders} = action.payload

            state = state.setIn(['cache', 'CSVImport', id, 'firstRowHeaders'], firstRowHeaders)

            break
        }

        case 'SET_DATA_IN_CSV_IMPORT': {

            const {id, data} = action.payload

            state = state.setIn(['cache', 'CSVImport', id, 'data'], fromJS(data))

            break
        }

        case 'SET_ENABLED_IN_MAPPING': {

            const {id, enabled} = action.payload

            state = state.setIn(['cache', 'Mapping', id, 'enabled'], enabled)

            break
        }

        case 'SET_COLUMN_ID_IN_MAPPING': {

            const {id, columnId} = action.payload

            state = state.setIn(['cache', 'Mapping', id, 'columnId'], columnId)

            break
        }

        default: {
            break
        }
    }

    return state.toJS()
}