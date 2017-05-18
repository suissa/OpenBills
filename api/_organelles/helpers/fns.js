const files = require(`./getFilesFromWithExtension`)( __dirname, `.js` )
const fnNames = files.map( ( file ) => file.replace(`.js`, ``) )

const reducer = ( obj, fn ) => 
  Object.assign( {}, obj, { [fn]: require(`./${fn}`) })

const fns = fnNames.reduce( reducer, {})

const fnsToObject = ( fns ) => ( acc, cur ) => 
  Object.assign( {}, acc, { [cur]: fns[cur] } )

const getFns = ( list ) => 
  getKeysFromObj( fns )
    .filter( ifExistsIn( list ) )
    .reduce( fnsToObject( fns ), {})

module.exports = ( list = `all` ) =>
  ( list.map )
    ? getFns( list )
    : fns
