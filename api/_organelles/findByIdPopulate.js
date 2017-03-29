const toPopulate = require('./helpers/toPopulate')

module.exports = (Organism) => 
  (req, res) => {
    const success = require('./ribosomes/success-200-json')(res)
    const error = require('./ribosomes/error-json')(res)

    const removeUnderlineFields = (field) => !field.includes('_')
    const removeNotObjectID = (field) => 
      Organism.schema.paths[field].instance === 'ObjectID' || 
      Organism.schema.paths[field].instance === 'Array'

    const fields = (req.query.entities)  
                            ? req.query.entities.split(',')
                            : Object
                                .keys(Organism.schema.paths)
                                .filter( removeUnderlineFields )
                                .filter( removeNotObjectID )
                    
    const query = {_id: req.params.id}
    const fieldsToPopulate = fields.reduce( toPopulate, [] )
    console.log(`fields`, fields)
    console.log(`fieldsToPopulate`, fieldsToPopulate)
    return Organism.findOne(query)
                .populate(fieldsToPopulate)
                .exec()
                .then(success)
                .catch(error)
  }

