const parseJSON = require('./../parseJSON')

const defaultParser = value => value

const parsers = {
    checkbox: value => value === "1" || value === "true" || value === "yes",
    linkToAnotherRecord: value => value.split(',')
}

export default ({data, mappings, fields, visibleFieldOrder}) => {

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

            const {columnId} = mappingsByFieldId[id]
            const {value: columnIndex} = parseJSON(columnId)
            const data = row[columnIndex]
            const {typeId} = fieldsById[id]
            const parser = parsers[typeId] || defaultParser
            const value = parser(data)
            result[id] = value

            return result
        }, {})
    })
}