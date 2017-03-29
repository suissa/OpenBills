const FACTORY_MODULE_PATH = './../../_factories/module'

const name = require('./../../_config/module/get.name')(__filename)
const structure = require('./molecular.structure')
const molecule = { structure }

const isntUndefined = ( el ) => el !== undefined

const defineOrganelles = ( route ) => route.action
const defineMiddlewares = ( route ) => route.middleware

const getOrganelles = ( routes ) => routes.map( defineOrganelles )
const getMiddlewares = ( routes ) => 
  routes.map( defineMiddlewares ).filter( isntUndefined )

module.exports = (routes) => {
  const organelles = getOrganelles( routes )
  const middlewares = getMiddlewares( routes )
  const organism = { name, organelles, middlewares }
  const DNA = { organism, molecule }
  // console.log(`\t\t\t DNA`, DNA)
  const MODULE = require(FACTORY_MODULE_PATH)(DNA)
  const routesMounted = require('./routes')(routes, MODULE.organism)
  
  return routesMounted
}