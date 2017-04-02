const isSuccess = require('./ribosomes/success-200-json')
const theseError = require('./ribosomes/error-json')
const filterToPopulate = require('./helpers/filterToPopulate')
const filterToPopulateArray = require('./helpers/filterToPopulateArray')

const FNS = require(`./helpers/fns`)()
// console.log(`FNS`, FNS)
const getKeysFromObj = ( obj ) => Object.keys( obj )

const toFlattened = ( a, b ) => a.concat(b)

const removeStringIfHas = ( something ) => ( str ) =>
  !str.includes( something )

const removeFieldWithoutRef = ( Organism ) => ( field ) => 
  Organism.schema.paths[ field ].instance == 'ObjectID' ||
  Organism.schema.paths[ field ].instance == 'Array'

const beginTestWith = ( arr , paths, fn ) => 
  getKeysFromObj( paths ).filter( fn.f ).reduce( toFlattened, [])

const fisihTestWith = ( arr , paths, fn ) => 
  arr.filter( el => fn.f( el ))

const getFields = ( paths, fns ) => 
  fns.reduce( ( arr, fn ) => 
    ( !arr.length )
      ? beginTestWith( arr , paths, fn )
      : fisihTestWith( arr , paths, fn )
  , [] )

const reduceFieldsToPopulate = ( fields ) =>
  fields.reduce( filterToPopulateArray, [] )

const reduceFieldsToPopulateArray = ( fields ) =>
  fields.reduce( filterToPopulate )

const areToPopulate = ( req, fields ) => 
  ( req.query.entities )
    ? req.query
          .entities
          .split(',')
          .filter( filterToPopulate( req ) )
    : ( fields.length > 1 )
        ? reduceFieldsToPopulate( fields )
        : reduceFieldsToPopulateArray( fields )


module.exports = (Organism) => 
  (req, res) => {
    const paths = Organism.schema.paths
    const fns = [
      { f: removeStringIfHas( '_' ) },
      { f: removeFieldWithoutRef( Organism ) }
    ]
    const thisFields = areToPopulate( req, 
                                      getFields( paths, fns ) )

    return Organism.findOne( {} )
                    .populate( thisFields )
                    .exec()
                    .then( isSuccess( res ) )
                    .catch( theseError( res ) )
  }

