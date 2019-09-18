import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'
import RecordListItem from '@pndr/record-list-item'
import { AutoSizer, List } from 'react-virtualized'

class RecordList extends React.Component {

    static defaultProps = {
        defaultWidth: 100,
        defaultHeight: 100
    }

    render() {

        const { records } = this.props

        return (
            <AutoSizer defaultHeight={this.props.defaultHeight} defaultWidth={this.props.defaultWidth}>
                {({ width, height }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={records.length}
                        rowHeight={118}
                        rowRenderer={this.rowRenderer}
                        style={{
                            paddingTop: 16
                        }}
                    />
                )}
            </AutoSizer>
        )
    }

    rowRenderer = ({ index, style }) => {

        const { records, primaryFieldId, fields, fieldRenderer, visibleFieldOrder } = this.props

        const record = records[index]

        return (
            <div
                key={`record-${index}`}
                style={style}
                className={css`
                    padding-left: 16px;
                    padding-right: 16px;
                `}
            >
                <RecordListItem
                    recordId={`record-${index}`}
                    name={record[primaryFieldId]}
                    primaryFieldId={primaryFieldId}
                    fields={fields}
                    visibleFieldOrder={visibleFieldOrder}
                    fieldRenderer={fieldRenderer({ record })}
                />
            </div>
        )
    }
}

export default connect((state, props) => ({
    visibleFieldOrder: props.visibleFieldOrder.filter(id => id !== props.primaryFieldId)
}))(RecordList)