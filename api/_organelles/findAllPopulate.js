const isSuccess = require('./ribosomes/success-200-json')
const theseError = require('./ribosomes/error-json')
const filterToPopulate = require('./helpers/filterToPopulate')
const filterToPopulateArray = require('./helpers/filterToPopulateArray')

const getFields = ( paths ) => 
  Object.keys( paths )
        .filter( field => !field.includes('_') )
        .filter( field => 
          paths[ field ].instance == 'ObjectID' ||
          paths[ field ].instance == 'Array' )

const reduceFieldsToPopulate = ( fields ) =>
  fields.reduce( filterToPopulateArray, [] )

const reduceFieldsToPopulateArray = ( fields ) =>
  fields.reduce( filterToPopulate )

const areToPopulate = ( fields ) =>
  ( fields.length > 1 )
    ? reduceFieldsToPopulate( fields )
    : reduceFieldsToPopulateArray( fields )

module.exports = (Organism) => 
  (req, res) => {
    const thisFields = areToPopulate( getFields( Organism.schema.paths ) )

    return Organism.findOne( {} )
                    .populate( thisFields )
                    .exec()
                    .then( isSuccess( res ) )
                    .catch( theseError( res ) )
  }

