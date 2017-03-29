const fs = require('fs')
const CONFIG = require('../../_config/project.js')
const ATOMS = '/_atoms/'
const PATH = __filename.split(CONFIG.PROJECT_NAME + '/')[0] + CONFIG.PROJECT_NAME + ATOMS

const existsFile = (file) => fs.existsSync(file)


const accModified = ( acc, cur, atomConfig ) => {

    let populate = { path: cur.trim(), model: require(atomConfig)['ref'] }
    acc.push(populate)
    return acc
  }

const getAtomConfig = ( PATH, cur ) => PATH + cur.trim() + '.js'

const toPopulate = (acc, cur) => 
  ( existsFile( getAtomConfig( PATH, cur ) ) )
    ? accModified( acc, cur, getAtomConfig( PATH, cur ) )
    : acc

module.exports = toPopulate