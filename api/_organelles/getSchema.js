const CONFIG_PATH = './../_config/module'
const TYPES = require(`${CONFIG_PATH}/frontend.types.js`)
const TYPES_REFS = ['ObjectID', 'Array']
const INPUTS = ['password','email']

const removeUnderlineFields = ( field ) => !field.includes('_')

const fromConfigToSchema = ( Organism ) => ( field ) => //Organism.schema.paths[field].enumValues
  ( Organism.schema.paths[field].enumValues && 
    Organism.schema.paths[field].enumValues.length )
    ? ({  name: field,
          type: Organism.schema.paths[field].instance,
          populate: Organism.schema.paths[field].enumValues })
    : ({  name: field,
          type: Organism.schema.paths[field].instance })

const createSchematoArray = ( Organism, TYPES, field ) => 
  Object.assign( {}, 
                TYPES[ field.type ], 
                { name: field.name, 
                  'ref': Organism.schema.paths[ field.name ]
                                      .options.type[ 0 ].ref })

const createSchematoObjectId = ( Organism, TYPES, field ) => 
  Object.assign( {}, 
                TYPES[ field.type ], 
                { name: field.name, 
                  'ref': Organism.schema.paths[ field.name ]
                                      .options.ref })

const createSchemaToString = ( Organism, TYPES, field ) => {
  console.log('createSchemaToString')
  console.log(`${field}`, Organism.schema.paths[field].enumValues)
  // ( Organism.schema.paths[field].enumValues.length )
  //   ? Object.assign({name: field.name}, TYPES['Array'])
  //   : Object.assign({name: field.name}, TYPES['String'])
}

const createSchemaToOthers = ( Organism, TYPES, field ) => 
  (  field.populate )
    ? Object.assign( { name: field.name, populate: field.populate  }, 
                      TYPES[`Enum`] )
    : Object.assign( { name: field.name }, 
                      TYPES[field.type] )

const fromSchemaToComponent = ( Organism, TYPES ) => ( field ) => 
  ( TYPES[field.type] )
    ? ( TYPES_REFS.includes(field.type) )
      ? ( Organism.schema.paths[ field.name ].options.type.map )
        ? createSchematoArray( Organism, TYPES, field )
        : createSchematoObjectId( Organism, TYPES, field )
      : createSchemaToOthers( Organism, TYPES, field )
    : createSchemaToString( Organism, TYPES, field )
    // : Object.assign({name: field.name}, TYPES['String'])


const transformToHTMLTypes = ( TYPES, INPUTS ) => ( field ) => 
  ( INPUTS.includes(field.name) )
    ? Object.assign(field, TYPES[field.name])
    : Object.assign(field, TYPES[field.type])

const getFieldsToPopulate = ( field ) => (field.element === 'select')

module.exports = ( Organism ) => ( req, res ) => {

  const schema = Object
                  .keys( Organism.schema.paths )
                  .filter( removeUnderlineFields )
                  .map( fromConfigToSchema( Organism ) )
                  .map( fromSchemaToComponent( Organism, TYPES )  )
                  .map( transformToHTMLTypes( TYPES, INPUTS ) )

  // const schemaPopulated = schema.filter(getFieldsToPopulate)
 // console.log('Organism.schema.paths["supervisor"]', 
 //  Organism.schema.paths["supervisor"].options.type[0].ref)
 console.log('\n\n schema: ', schema)
  return res.json(schema)
}