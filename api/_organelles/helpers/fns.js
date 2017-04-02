const getKeysFromObj = ( obj ) => Object.keys( obj )
const toFlattened = ( a, b ) => a.concat(b)
const removeStringIfHas = ( something ) => ( str ) =>
  !str.includes( something )

const fns = {
  getKeysFromObj,
  toFlattened,
  removeStringIfHas
}

const getFns = ( list ) => 
  getKeysFromObj( fns )
    .filter( fn => list.includes( fn ) )
    .reduce( ( acc, cur ) => {
      console.log(`cur`, cur)
      const obj = { [cur]: fns[cur] }
      return Object.assign( {}, acc, obj)
    }, {})

module.exports = ( list = [] ) =>
  ( !list.length )
    ? fns
    : getFns( list )
