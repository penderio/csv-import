import React from 'react'
import {css} from 'emotion'
import Dropzone from 'react-dropzone'
import Papa from 'papaparse'
import Select from './Select'
import PropTypes from 'prop-types'
import CheckboxField from './CheckboxField'
import RecordList from './RecordList'

export default class Index extends React.Component {

    static propTypes = {
        records: PropTypes.arrayOf(
            PropTypes.object.isRequired
        ).isRequired,
        fieldRenderer: PropTypes.func.isRequired,
        imported: PropTypes.bool.isRequired,
        onImport: PropTypes.func.isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired
            })
        ).isRequired,
        tables: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                fields: PropTypes.arrayOf(
                    PropTypes.string.isRequired
                ).isRequired
            })
        ),
        mappings: PropTypes.arrayOf(
            PropTypes.shape({
                fieldId: PropTypes.string.isRequired,
                columnId: PropTypes.string
            })
        ),
        tableId: PropTypes.string.isRequired,
        onTableIdChange: PropTypes.func.isRequired,
        merge: PropTypes.bool.isRequired,
        onMergeChange: PropTypes.func.isRequired,
        firstRowHeaders: PropTypes.bool.isRequired,
        onFirstRowHeadersChange: PropTypes.func.isRequired,
        onMappingEnabledChange: PropTypes.func.isRequired,
        onMappingColumnIdChange: PropTypes.func.isRequired,
    }

    render() {

        const {
            mappings,
            columns,
            tables,
            tableId,
            onTableIdChange,
            firstRowHeaders,
            onFirstRowHeadersChange,
            merge,
            onMergeChange,
            fieldRenderer,
            records,
            primaryFieldId,
            visibleFieldOrder,
            fields,
        } = this.props

        const fieldsById = fields.reduce((result, field) => {
            result[field.id] = field
            return result
        }, {})

        return (
            <div
                className={css`
                    width: 1200px;
                    height: 600px;
                    background-color: #fff;
                    position: relative;
                    border: 1px solid #d9d9d9;
                    border-radius: 6px;
                `}
            >
                {this.props.imported ? (
                    <div>
                        <div
                            className={css`
                        position: absolute;
                        top: 0;
                        left: 0;
                        bottom: 0;
                        width: 400px;
                        overflow-y: auto;
                        overflow-x: hidden;
                    `}
                        >
                            <div
                                className={css`
                            padding: 20px;
                        `}
                            >
                                <div
                                    className={css`
                                font-weight: bold;
                                margin-bottom: 8px;
                            `}
                                >
                                    Table
                                </div>
                                <Select
                                    id={'tableId'}
                                    description={'Pick a table...'}
                                    options={tables}
                                    value={tableId}
                                    onChange={onTableIdChange}
                                />
                                <div
                                    className={css`
                                margin-top: 16px;
                            `}
                                >
                                    <CheckboxField
                                        id={'merge'}
                                        title={'Merge with existing records'}
                                        value={merge}
                                        onChange={onMergeChange}
                                    />
                                </div>
                                <div
                                    className={css`
                                margin-top: 16px;
                            `}
                                >
                                    <CheckboxField
                                        id={'firstRowHeaders'}
                                        title={'First row of CSV file is headers'}
                                        value={firstRowHeaders}
                                        onChange={onFirstRowHeadersChange}
                                    />
                                </div>
                                <div
                                    className={css`
                                margin-top: 16px;
                            `}
                                >
                                    <div
                                        className={css`
                                font-weight: bold;
                                margin-bottom: 8px;
                            `}
                                    >
                                        Field mappings
                                    </div>
                                    {mappings.map(({id, fieldId, columnId, enabled}) => (
                                        <div
                                            key={fieldId}
                                            className={css`
                                        display: flex;
                                        align-items: center;
                                        border: 1px solid #d9d9d9;
                                        margin-bottom: 8px;
                                        border-radius: 4px;
                                        padding: 8px;
                                        height: 50px;
                                    `}
                                        >
                                            <div
                                                className={css`
                                            padding: 8px;
                                            width: 160px;
                                        `}
                                            >
                                                <CheckboxField
                                                    id={id}
                                                    title={fieldsById[fieldId]['name']}
                                                    value={enabled}
                                                    onChange={this.props.onMappingEnabledChange}
                                                />
                                            </div>
                                            {enabled ? (
                                                <div
                                                    className={css`
                                            padding-left: 8px;
                                            padding-right: 8px;
                                        `}
                                                >
                                                    ⬅️
                                                </div>
                                            ) : null}
                                            {enabled ? (
                                                <div
                                                    className={css`
                                                    flex-grow: 1;
                                                `}
                                                >
                                                    <Select
                                                        id={id}
                                                        description={'Choose a CSV column'}
                                                        options={columns}
                                                        value={columnId}
                                                        onChange={this.props.onMappingColumnIdChange}
                                                    />
                                                </div>
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div
                            className={css`
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        width: 800px;
                        overflow-x: hidden;
                        overflow-y: scroll;
                        background-color: #f9f9f9;
                    `}
                        >
                            <RecordList
                                primaryFieldId={primaryFieldId}
                                records={records}
                                fieldRenderer={fieldRenderer}
                                fields={fields}
                                visibleFieldOrder={visibleFieldOrder}
                            />
                        </div>
                    </div>
                ) : (
                    <Dropzone
                        onDrop={this.handleDrop}

                    >
                        csv import 😀
                    </Dropzone>
                )}
            </div>
        )
    }

    handleDrop = (acceptedFiles, rejectedFiles) => {

        acceptedFiles.forEach(file => {
            const reader = new FileReader()
            reader.onload = () => {
                const fileAsBinaryString = reader.result
                const result = Papa.parse(fileAsBinaryString)
                console.log('result', result)

                this.props.onImport({
                    data: result.data
                })
            }
            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')

            reader.readAsBinaryString(file)
        })
    }
}