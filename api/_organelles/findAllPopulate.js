const filterToPopulate = require('./helpers/filterToPopulate')
const filterToPopulateArray = require('./helpers/filterToPopulateArray')

const reduceFieldsToPopulate = ( fields ) =>
  fields.reduce( filterToPopulateArray, [] )

const reduceFieldsToPopulateArray = ( fields ) =>
  fields.reduce( filterToPopulate )

module.exports = (Organism) => 
  (req, res) => {
    // Callbacks Promise
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)
    const paths = Organism.schema.paths
    const fields = Object
                    .keys(paths)
                    .filter(field => !(field.includes('_')))
                    .filter(field => 
                      paths[field].instance == 'ObjectID' ||
                      paths[field].instance == 'Array' )

    const thisFields = ( fields.length > 1 )
                          ? reduceFieldsToPopulate( fields )
                          : reduceFieldsToPopulateArray( fields )

    return Organism.findOne( {} )
      .populate( thisFields )
      .exec()
      .then( success )
      .catch( error )
  }

