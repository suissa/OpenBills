module.exports = ( routes, Organism ) => {
  const createRouteConfig = require(factory + 'route.config')( Organism )
  // console.log(`Organism`, Organism)
  // console.log(`routes.map(createRouteConfig)`, routes.map(createRouteConfig))
  return routes.map( createRouteConfig )
}

const factory = '../../../_factories/'

