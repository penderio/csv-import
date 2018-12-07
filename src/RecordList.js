import React from 'react'
import {css} from 'emotion'
import RecordListItem from '@cmds/record-list-item'

export default class RecordList extends React.Component {

    render() {

        const {records, fields, fieldRenderer, primaryFieldId} = this.props

        const visibleFieldOrder = this.props.visibleFieldOrder.filter(id => id !== primaryFieldId)

        return (
            <div
                className={css`
                    padding-left: 16px;
                    padding-top: 16px;
                    padding-right: 16px;
                `}
            >
                {records.map((record, index) => (
                    <div
                        key={`record-${index}`}
                        className={css`
                            margin-bottom: 16px;
                        `}
                    >
                        <RecordListItem
                            recordId={`record-${index}`}
                            name={record[primaryFieldId] || 'Unnamed record'}
                            primaryFieldId={primaryFieldId}
                            fields={fields}
                            visibleFieldOrder={visibleFieldOrder}
                            fieldRenderer={fieldRenderer({record})}
                        />
                    </div>
                ))}
            </div>
        )
    }
}