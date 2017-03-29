const CONFIG_PATH = './../_config/atoms/'

const REQUIRED = require(CONFIG_PATH + 'fields-required')
const OPTIONAL = require(CONFIG_PATH + 'fields-optional')
const FIELDS_REMOVE = require(CONFIG_PATH + 'fields-remove')

const filterOptionals = ( OPTIONAL ) => ( field ) => 
  OPTIONAL.includes( field )

const reduceToObject = ( acc, cur ) => 
  Object.assign(acc, {
    [Object.keys(cur)[0]]: cur[Object.keys(cur)[0]]
  })

const createRequired = (CONFIG) => 
  CONFIG.VALIDATE_FACTORY_PATH
    ? ({type: CONFIG.type,
        validate: require(CONFIG.VALIDATE_FACTORY_PATH)(CONFIG.ATOM_NAME.toUpperCase()) 
      })
    : ({type: CONFIG.type})

const createOptionalField = ( CONFIG ) => ( option, i ) => 
  Object.assign({}, {[option]: CONFIG[option]})

const createOptional = (CONFIG) => 
  Object.keys(CONFIG)
        .filter( filterOptionals( OPTIONAL ) )
        .map( createOptionalField( CONFIG ) )
        .reduce( reduceToObject, {} )

const createField = (CONFIG) => 
  Object.assign( {}, createRequired( CONFIG ), createOptional( CONFIG ) )

module.exports = createField

