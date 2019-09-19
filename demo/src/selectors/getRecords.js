import parseJSON from '../parseJSON'
import textToBoolean from '../textToBoolean'
import textToLinkedItems from '../textToLinkedItems'
import textToNumber from '../textToNumber'

const defaultParser = value => value

const parsers = {
    checkbox: textToBoolean,
    linkToAnotherRecord: textToLinkedItems,
    multipleSelect: textToLinkedItems,
    attachment: textToLinkedItems,
    number: textToNumber,
}

export default ({ data, mappings, fields, visibleFieldOrder }) => {

    const fieldsById = fields.reduce((result, field) => {
        result[field.id] = field
        return result
    }, {})

    const mappingsByFieldId = mappings.reduce((result, mapping) => {
        result[mapping.fieldId] = mapping
        return result
    }, {})

    return data.map(row => {

        return visibleFieldOrder.reduce((result, id) => {

            const { columnId } = mappingsByFieldId[id]
            const { value: columnIndex } = parseJSON(columnId)
            const data = row[columnIndex]
            const { typeId } = fieldsById[id]
            const parser = parsers[typeId] || defaultParser
            console.log({
                typeId,
                parser
            })
            const value = parser(data)
            result[id] = value

            return result
        }, {})
    })
}