const stringifyJSON = require('./../stringifyJSON')

export default (state) => {

    const {data} = state

    if (!data) return []

    const {firstRowHeaders} = state

    return data[0].map((name, i) => ({
        id: stringifyJSON({value: i}),
        name: firstRowHeaders ? name : `Column ${i + 1}`
    }))
}