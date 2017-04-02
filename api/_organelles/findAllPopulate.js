const filterToPopulate = require('./helpers/filterToPopulate')
const filterToPopulateArray = require('./helpers/filterToPopulateArray')

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
                    
    console.log(`fields`, fields)


    const fieldsToPopulate = ( fields.length > 1 )
                                ? fields.reduce( filterToPopulateArray, [] )
                                : fields.reduce( filterToPopulate )

    console.log(`fieldsToPopulate`, fieldsToPopulate)
    return Organism.findOne( {} )
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

