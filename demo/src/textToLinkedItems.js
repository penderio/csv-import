const trim = require('lodash/trim')

export default input => {

    if (input === '') {
        return null
    }

    input = input.split(',').map(trim)

    if (!input.length) {
        return null
    }

    return input
}