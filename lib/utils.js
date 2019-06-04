'use strict'

const fs = require('fs-extra')

/**
 * Save a search result o to a JSON file
 * @param {Object[]} obj Your JavaScript object
 * @param {String} path Output path
 * @param {Boolean} prettyPrint Should the JSON be pretty-printed
 * @returns {Promise<void>} Newly created file path
 */
const outputToFile = async (obj, path, prettyPrint) => {
  await fs.ensureFile(path)
  await fs.outputJson(path, obj, { spaces: prettyPrint ? 2 : undefined })
}

module.exports = { outputToFile }
