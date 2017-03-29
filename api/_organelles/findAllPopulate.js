const filterToPopulate = require('./helpers/filterToPopulate')

module.exports = (Organism) => 
  (req, res) => {
    // Callbacks Promise
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)

    const fields = Object
                    .keys(Organism.schema.paths)
                    .filter(field => !(field.includes('_')))
                    .filter(field => (Organism.schema.paths[field].instance == 'ObjectID'))
                    
    const fieldsToPopulate = fields.reduce( filterToPopulate, [] )
    console.log(`fields`, fields)
    console.log(`fieldsToPopulate`, fieldsToPopulate)
    return Organism.findOne( {} )
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

