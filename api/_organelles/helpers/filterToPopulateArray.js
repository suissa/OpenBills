const fs = require('fs')
const CONFIG = require('../../_config/project.js')
const ATOMS = '/_atoms/'
const PATH = __filename.split(CONFIG.PROJECT_NAME + '/')[0] + CONFIG.PROJECT_NAME + ATOMS

const existsFile = ( file ) => fs.existsSync(file)

const filterToPopulate = ( arr, field, i ) => {

  let atomConfig = PATH + field.trim() + '.js'
  
  if ( existsFile( atomConfig ) ) {
    arr.push( { path: field.trim(), 
                model: require(atomConfig)['ref'] } )
    return arr
  }
  
}

module.exports = filterToPopulate