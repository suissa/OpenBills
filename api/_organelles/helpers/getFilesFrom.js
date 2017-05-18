const fs = require('fs')
// getFilesFrom
module.exports = ( PATH ) => //console.log(`PATH`, PATH)
  fs.readdirSync( PATH )
    .filter( (file) => 
      !( file.startsWith('_') || 
          file.startsWith('.') ) )