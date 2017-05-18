const isSuccess = require('./ribosomes/success-200-json')
const theseError = require('./ribosomes/error-json')
const FNS = require(`./helpers/fns`)()

const beginTestWith = ( arr , paths, fn ) => 
  FNS.getKeysFromObj( paths )
      .filter( fn.f )
      .reduce( FNS.toFlattened, [] )

const finishTestWith = ( arr , paths, fn ) => 
  arr.filter( el => fn.f( el ) )

const toFieldsWithRef = ( paths ) => ( arr, fn ) => 
  ( !arr.length )
    ? beginTestWith( arr , paths, fn )
    : finishTestWith( arr , paths, fn )

const reduceFieldsToPopulate = ( fields ) => 
  ( fields.length )
    ? fields.reduce( FNS.filterToPopulateArray, [] )
    : fields.reduce( FNS.filterToPopulate )

const reduceChoosenFieldsToPopulateArray = ( fields ) =>
  fields.filter( FNS.filterToPopulate  )

const areToPopulate = ( req, fields ) => 
  ( req.query.entities )
    ? reduceChoosenFieldsToPopulateArray( req.query.entities.split(',') )
    : reduceFieldsToPopulate( fields )

module.exports = (Organism) => 
  (req, res) => {
    const fns = [
      { f: FNS.removeStringIfHas( '_' ) },
      { f: FNS.removeFieldWithoutRef( Organism ) }
    ]
    const thisFields = areToPopulate( req, FNS.getFields( 
                                              Organism.schema.paths, 
                                              fns, 
                                              toFieldsWithRef ) )

    console.log( `req.query.entities: `, req.query.entities )
    return Organism.find( {} )
                    .populate( thisFields )
                    .exec()
                    .then( isSuccess( res ) )
                    .catch( theseError( res ) )
  }

