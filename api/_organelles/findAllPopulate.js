const isSuccess = require('./ribosomes/success-200-json')
const theseError = require('./ribosomes/error-json')
const filterToPopulate = require('./helpers/filterToPopulate')
const filterToPopulateArray = require('./helpers/filterToPopulateArray')

const removeStringIfHas = ( something ) => ( str ) =>
  !str.includes( something )

const removeFieldWithoutRef = ( paths ) => ( field ) => 
  paths[ field ].instance == 'ObjectID' ||
  paths[ field ].instance == 'Array'

const getFields = ( paths ) => 
  Object.keys( paths )
        .filter( removeIfStringHas( '_' ) )
        .filter( removeFieldWithoutRef( paths ) )

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


    // const fieldsToPopulate = (req.query.entities)
    //                             ? req.query
    //                                 .entities
    //                                 .split(',')
    //                                 .filter(filterToPopulate)
    //                             : '' //depois pegar automatico

module.exports = (Organism) => 
  (req, res) => {
    const thisFields = areToPopulate( req, getFields( Organism.schema.paths ) )

    return Organism.findOne( {} )
                    .populate( thisFields )
                    .exec()
                    .then( isSuccess( res ) )
                    .catch( theseError( res ) )
  }

