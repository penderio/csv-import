import React from 'react'
import {connect} from 'react-redux'
import CSVImport from './../../src'
import getRecords from './selectors/getRecords'
import getColumns from './selectors/getColumns'
import CheckboxField from '@cmds/checkbox-field'
import AttachmentField from '@cmds/attachment-field'
import LongTextField from '@cmds/long-text-field'
import SingleLineTextField from '@cmds/single-line-text-field'
import SingleSelectField from '@cmds/single-select-field'
import MultipleSelectField from '@cmds/multiple-select-field'
import NumberField from '@cmds/number-field'
import LinkToAnotherRecordField from '@cmds/link-to-another-record-field'

const fieldRenderer = ({record}) => ({id, field, props}) => {

    const renderers = {
        singleLineText: ({props, cell}) => (
            <SingleLineTextField
                {...props}
                text={cell}
            />
        ),
        longText: ({props, cell}) => (
            <LongTextField
                {...props}
                longText={cell.longText}
            />
        ),
        checkbox: ({props, cell}) => (
            <CheckboxField
                {...props}
                checked={cell}
            />
        ),
        attachment: ({props, cell}) => (
            <AttachmentField
                {...props}
                attachments={cell.attachments}
            />
        ),
        linkToAnotherRecord: ({props, cell}) => (
            <LinkToAnotherRecordField
                {...props}
                records={cell.map(id => ({
                    id,
                    name: id
                }))}
            />
        ),
        multipleSelect: ({props, field, cell}) => (
            <MultipleSelectField
                {...props}
                optionIds={cell.optionIds}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        singleSelect: ({props, field, cell}) => (
            <SingleSelectField
                {...props}
                optionId={cell.optionId}
                options={field.options.options}
                optionOrder={field.options.optionOrder}
                coloredOptions={field.options.coloredOptions}
            />
        ),
        number: ({props, field, cell}) => (
            <NumberField
                {...props}
                number={cell.number}
                allowNegativeNumbers={field.options.allowNegativeNumbers}
                numberFormatId={field.options.numberFormatId}
                precisionId={field.options.precisionId}
            />
        )
    }

    const renderer = renderers[field.typeId]

    if (!renderer) {
        throw new Error(`Renderer for typeId '${field.typeId}' not found`)
    }

    const cell = record[field.id]

    return renderer({
        id,
        field,
        props,
        cell
    })
}

const Example = ({dispatch, tableId, merge, firstRowHeaders, imported, columns, mappings, records, fields, visibleFieldOrder}) => (
    <div>
        <CSVImport
            imported={imported}
            onImport={({data}) => {

                dispatch({
                    type: 'SET_DATA_IN_CSV_IMPORT',
                    payload: {
                        id: '1',
                        data
                    }
                })
            }}
            tables={[{
                id: 'tbl1',
                name: 'Table 1',
                fields: [
                    'fld1',
                    'fld2',
                    'fld3',
                    'fld4',
                    'fld5',
                    'fld6',
                    'fld7',
                    'fld8',
                    'fld9',
                ]
            }]}
            primaryFieldId={'fld1'}
            columns={columns}
            records={records}
            mappings={mappings}
            tableId={tableId}
            onTableIdChange={({id, value}) => {

                dispatch({
                    type: 'SET_TABLE_ID_IN_CSV_IMPORT',
                    payload: {
                        id: '1',
                        tableId: value
                    }
                })
            }}
            merge={merge}
            onMergeChange={({id, value}) => {

                dispatch({
                    type: 'SET_MERGE_IN_CSV_IMPORT',
                    payload: {
                        id: '1',
                        merge: value
                    }
                })
            }}
            firstRowHeaders={firstRowHeaders}
            onFirstRowHeadersChange={({id, value}) => {

                dispatch({
                    type: 'SET_FIRST_ROW_HEADERS_IN_CSV_IMPORT',
                    payload: {
                        id: '1',
                        firstRowHeaders: value
                    }
                })
            }}
            onMappingEnabledChange={({id, value}) => {

                dispatch({
                    type: 'SET_ENABLED_IN_MAPPING',
                    payload: {
                        id,
                        enabled: value
                    }
                })
            }}
            onMappingColumnIdChange={({id, value}) => {

                dispatch({
                    type: 'SET_COLUMN_ID_IN_MAPPING',
                    payload: {
                        id,
                        columnId: value
                    }
                })
            }}
            visibleFieldOrder={visibleFieldOrder}
            fields={fields}
            fieldRenderer={fieldRenderer}
        />
    </div>
)

export default connect((state, props) => {

    const csvImport = state.cache.CSVImport['1']
    const {tableId, merge, firstRowHeaders, data} = csvImport

    const records = [].concat(data)

    if (records.length && firstRowHeaders) {
        records.splice(0, 1)
    }

    const mappings = csvImport.mappings.map(id => {
        return state.cache.Mapping[id]
    })

    const fields = mappings.map(({fieldId}) => {
        return state.cache.Field[fieldId]
    })

    const visibleFieldOrder = mappings
        .filter(({enabled}) => enabled)
        .map(({fieldId}) => fieldId)

    return {
        tableId,
        merge,
        firstRowHeaders,
        imported: !!data,
        mappings,
        columns: getColumns(csvImport),
        records: getRecords({
            data: records,
            mappings,
            fields,
            visibleFieldOrder
        }),
        fields,
        visibleFieldOrder
    }

    console.log(r)

    return r
})(Example)