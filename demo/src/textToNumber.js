const toNumber = require('lodash/toNumber')
const isNaN = require('lodash/isNaN')

export default item => {

    const number = item === '' ? null : toNumber(item)

    if (isNaN(number)) {
        return null
    }

    return number
}