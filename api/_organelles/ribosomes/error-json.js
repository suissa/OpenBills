module.exports = ( req, res ) => 
  ( err ) => res.json( Object.assign( {type: 'error'}, err ) )