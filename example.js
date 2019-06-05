'use strict'

const path = require('path')
const { db, utils } = require('./lib')

const setup = async () => {
  // Connect to the database
  const connection = await db.connect('mongodb://diran.univ-littoral.fr:27017/webexpe')

  // Find every documents being experiment data
  const res = await db.findCustom({
    msgId: 'EXPERIMENT_DATA'
  })

  // Output to console (Do this if you want to pipe to another command!)
  console.log(res)

  console.log(`Found ${res.length} documents matching your request.`)

  // Save the results to a JSON file
  const filePath = path.resolve(__dirname, 'searches', `search-${Date.now()}.json`)

  // `res` = search results, `filePath` = output file, `true` = JSON will be pretty-printed (human-readable)
  await utils.outputToFile(res, filePath, true)
  console.log(`Your search results were saved to ${filePath}`)

  // Disconnect from the database
  await db.disconnect(connection)
}

setup()
