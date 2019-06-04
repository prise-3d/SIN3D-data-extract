'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Data', mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date()
  },
  data: Object
}))
