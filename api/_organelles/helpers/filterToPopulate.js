const fs = require('fs')
const CONFIG = require('../../_config/project.js')
const ATOMS = '/_atoms/atom-'
const PATH = __filename.split(CONFIG.PROJECT_NAME + '/')[0] + CONFIG.PROJECT_NAME + ATOMS

const existsFile = ( file ) => fs.existsSync(file)

const filterToPopulate = ( field, i, arr ) => {
    console.log(`field`, field)
  let atomConfig = PATH + field.trim() + '.js'

    console.log(`atomConfig`, atomConfig)
  if (existsFile(atomConfig)) {
      console.log('existsFile', {  path: field.trim(), 
                model: require(atomConfig)['ref']
              })
      return {  path: field.trim(), 
                model: require(atomConfig)['ref']
              }
            }
}

module.exports = filterToPopulate