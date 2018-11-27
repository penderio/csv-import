module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'CSVImport',
      externals: {
        react: 'React'
      }
    }
  }
}
