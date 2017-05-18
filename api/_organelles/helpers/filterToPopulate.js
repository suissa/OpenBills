const fs = require('fs')
const CONFIG = require('../../_config/project.js')
const ATOMS = '/_atoms/'
const PATH = __filename.split(CONFIG.PROJECT_NAME + '/')[0] + CONFIG.PROJECT_NAME + ATOMS

const existsFile = ( file ) => fs.existsSync(file)

const filterToPopulate = ( field, i, arr ) => {
  let atomConfig = PATH + field.trim() + '.js'
  console.log( `\n\nfilterToPopulate field: `, field )
  console.log( `filterToPopulate atomConfig: `, atomConfig )
  console.log( `\nfilterToPopulate return: `, {  path: field.trim(), 
              model: require(atomConfig)['ref']
            } )
  if (existsFile(atomConfig)) {
    return {  path: field.trim(), 
              model: require(atomConfig)['ref']
            }
  }
}

module.exports = filterToPopulate