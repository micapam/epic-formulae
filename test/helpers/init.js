const mongoose = require('mongoose')
const path = require('path')

process.env.TS_NODE_PROJECT = path.resolve('test/tsconfig.json')
process.env.NODE_ENV = 'development'

global.oclif = global.oclif || {}
global.oclif.columns = 80

mongoose.connect('mongodb://localhost/epicTest')
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', error => {
    console.warn(error)
  })

exports.mochaHooks = {
  async afterAll() {
    await mongoose.connection.close()
  },

  async beforeEach() {
    const collections = mongoose.connection.collections

    if (!collections.formulae) return

    await mongoose.connection.collections.formulae.deleteMany({})
  },
}
