module.exports = (a, b, c) => {
    
    try {
        return JSON.stringify(a, b, c)
    } catch (e) {
        // silent
        return null
    }
}