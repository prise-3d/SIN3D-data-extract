'use strict'

const path = require('path')
const { db, utils } = require('./lib')

const setup = async () => {
  const connection = await db.connect('mongodb://diran.univ-littoral.fr:27017/webexpe')

  const res = await db.Data.findCustom({
    msgId: 'EXPERIMENT_DATA'
  })

  console.log(res)
  console.log(`Found ${res.length} documents matching your request.`)

  const filePath = path.resolve(__dirname, 'searches', `search-${Date.now()}.json`)
  await utils.outputToFile(res, filePath, true)
  console.log(`Your search result was saved to ${filePath}`)

  await db.disconnect(connection)
}

setup()
