'use strict'

const mongoose = require('mongoose')

const DataModel = mongoose.model('Data', mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date()
  },
  data: Object
}))

module.exports = {
  /**
   * Connect to MongoDB
   * @param {String} mongoConnectionString MongoDB connection string
   * @returns {Object} Connecion object
   */
  async connect(mongoConnectionString) {
    const connection = await mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useFindAndModify: false })
    mongoose.connection.on('error', err => console.log(err))
    return connection
  },

  /**
   * Disconnect from MongoDB
   * @param {Object} connectionObj Connecion object
   * @returns {Promise<void>} The connection was destroyed
   */
  disconnect(connectionObj) {
    return connectionObj.disconnect()
  },


  Model: DataModel,

  /**
   * Add a document
   * @param {Object} dataObj The new data document (only the data property!)
   * @returns {Promise<Object>} The newly inserted document
   */
  async add(dataObj) {
    const doc = await DataModel.create({ data: dataObj })
    // console.log(`New document was added. id=${doc.id}`)
    return doc
  },

  /**
   * Delete a document
   * @param {String} dataId The _id of the document to delete
   * @returns {Promise<void>} The document was deleted
   */
  async del(dataId) {
    const doc = await DataModel.findByIdAndDelete(dataId)
    // console.log(`A document was deleted. id=${doc.id}`)
  },

  /**
   * Update a document
   * @param {String} dataId The _id of the document to update
   * @param {Object} newDataObj The new data content of the document (only the data property!)
   * @returns {Promise<Object>} The newly updated document
   */
  async update(dataId, newDataObj) {
    const doc = await DataModel.findByIdAndUpdate(dataId, { $set: { data: newDataObj } }, { new: true })
    // console.log(`A document was updated. id=${doc.id}`)
    return doc
  },

  /**
   * Find a document
   * @param {String} dataId The _id of the document to find
   * @returns {Promise<Object>} The found document
   */
  findId(dataId) {
    return DataModel.findById(dataId)
  },

  find: DataModel.find,

  /**
   * Find data by any application parameter
   * @param {Object} obj Application properties
   * @param {String} [obj.msgId] Message ID (type of message)
   * @param {String} [obj.uuid] Unique uuid
   * @param {String} [obj.experimentName] Experiment name
   * @param {String} [obj.sceneName] Scene name
   * @param {String} [obj.userId] User ID
   * @param {String} [obj.experimentId] Experiment ID
   * @returns {Promise<Object[]>} Database query result
   */
  findCustom({ msgId, uuid, experimentName, sceneName, userId, experimentId }) {
    let search = {}
    if (msgId) search['data.msgId'] = msgId
    if (uuid) search['data.uuid'] = uuid
    if (experimentName) search['data.msg.experimentName'] = experimentName
    if (sceneName) search['data.msg.sceneName'] = sceneName
    if (userId) search['data.userId'] = userId
    if (experimentId) search['data.experimentId'] = experimentId
    return DataModel.find(search)
  }
}
