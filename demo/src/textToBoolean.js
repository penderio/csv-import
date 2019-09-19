const trim = require('lodash/trim')

export default input => {

    input = input.toLowerCase() // 'Yes ' -> 'yes '
    input = trim(input) // 'yes ' -> 'yes'

    return ['yes', 'true', 'checked'].includes(input) ? true : null
}