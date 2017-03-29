const mongoose = require( 'mongoose' )
const CONFIG_PATH = './../_config/module'
const TYPES = require(`${CONFIG_PATH}/frontend.types.js`)
const TYPES_REFS = ['ObjectID', 'Array']
const INPUTS = ['password','email']
const fieldWanted = `data-ref`

const toFlattened = ( a, b ) => a.concat(b)
const removeUnderlineFields = ( field ) => !field.includes('_')

const fromConfigToSchema = ( Organism ) => ( field ) => 
  ({ type: Organism.schema.paths[field].instance,
    name: field
  })

const createComponent = ( Organism, TYPES, field, api, ref ) => 
  Object.assign( {}, TYPES[ field.type ], 
                { name: field.name,
                  model: Organism.modelName,
                  'data-api': api,
                  'data-ref': ref })

const createSchematoArray = ( Organism, TYPES, field ) => {
  const ref = Organism.schema
                      .paths[ field.name ]
                      .options.type[ 0 ].ref
  const api = `/api/${ref.toLowerCase()}s`

  return createComponent( Organism, TYPES, field, api, ref )
}

const createSchematoObjectId = ( Organism, TYPES, field ) => {
  const ref = Organism.schema
                      .paths[ field.name ]
                      .options.ref
  const api = `/api/${ref.toLowerCase()}s`

  return createComponent( Organism, TYPES, field, api, ref )
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
    : Object.assign({name: field.name}, TYPES['Array'])

const transformToHTMLTypes = ( TYPES, INPUTS ) => ( field ) => 
  ( INPUTS.includes(field.name) )
    ? Object.assign({}, TYPES[field.name], field)
    : Object.assign({}, TYPES[field.type], field)

const hasDataRef = ( component ) => 
  (component['data-ref']) ? component : false

const getPopulatePromises = ( fieldWanted ) => ( component ) => {
  if ( hasDataRef( component ) ) {
    const Model = mongoose.model( component[fieldWanted] )
    const fieldName = component.name
    const populate = Model.find({}).exec()
    return { fieldName , populate }
  }
}

const hasEnum = ( Organism ) => ( field ) => 
  ( Organism.schema.paths[field].enumValues &&
    Organism.schema.paths[field].enumValues.length > 0 )

const populateEnum = ( Organism ) => ( name ) => 
  ({ name, enum: Organism.schema.paths[name].enumValues })

const transformEnumToSelect = ( enums ) => ( component ) => {

  return enums.map( _enum => {
    if ( _enum.name === component.name){
      const populate = _enum.enum
      const _component = Object.assign( {}, component, 
                                        { element: 'select', 
                                          type: 'enum',
                                          populate } )
      console.log('_component', _component)
      component = Object.assign( {}, component, _component  )
    }
    console.log('component', component)
    return component
  })
}

const getEnums = ( Organism ) => 
  Object.keys( Organism.schema.paths )
        .filter( hasEnum( Organism ) )
        .map( populateEnum( Organism )  )

const getSchema = ( Organism, TYPES, INPUTS, ENUMS ) => 
  Object.keys( Organism.schema.paths )
        .filter( removeUnderlineFields )
        .map( fromConfigToSchema( Organism ) )
        .map( fromSchemaToComponent( Organism, TYPES )  )
        .map( transformToHTMLTypes( TYPES, INPUTS ) )
        .map( transformEnumToSelect( ENUMS ) )
        .reduce( toFlattened, [] )

const getRefs = ( schema ) =>
  schema.filter( hasDataRef )
        .map( getPopulatePromises( fieldWanted ) )


const populateRef = ( field, component ) => ( obj ) =>
  ( obj.name === field )
    ? component
    : obj

const promiseThen = ( schema, res ) => ( data ) => {

  const component = { 
    field: 'department', 
    element: "select",
    type: "normal",
    name: "department",
    populate: data[0] 
  }
  
  const schemaFull = schema.map( populateRef( 'department', component ) )

  return res.json( schemaFull )
}

const promisesToPopulate = ( REFS ) => REFS.map( obj => obj.populate ) 
const promiseCatch = ( err ) => console.log('err', err)


module.exports = ( Organism ) => ( req, res ) => {

  const ENUMS = getEnums( Organism )
  const SCHEMA = getSchema( Organism, TYPES, INPUTS, ENUMS )
  const REFS = getRefs( SCHEMA )

  return Promise.all( promisesToPopulate( REFS ) )
                .then( promiseThen( SCHEMA, res ) )
                .catch( promiseCatch )
}



