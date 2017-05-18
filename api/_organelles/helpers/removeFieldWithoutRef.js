module.exports = ( Organism ) => ( field ) => 
  Organism.schema.paths[ field ].instance == 'ObjectID' ||
  Organism.schema.paths[ field ].instance == 'Array'