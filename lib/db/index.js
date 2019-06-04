'use strict'

const mongoose = require('mongoose')
const Data = require('./Data')

module.exports = {
  /**
   * Connect to MongoDB
   * @param {String} mongoConnectionString MongoDB connection string
   * @returns {Object} Connecion object
   */
  async connect(mongoConnectionString) {
    const connection = await mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useFindAndModify: false })
    mongoose.connection.on('error', err => console.log(err))
    console.log('The database connection was established.')
    return connection
  },

  /**
   * Disconnect from MongoDB
   * @param {Object} connectionObj Connecion object
   * @returns {Promise<void>} The connection was destroyed
   */
  async disconnect(connectionObj) {
    await connectionObj.disconnect()
    console.log('The database connection was destroyed.')
  },
  Data
}
