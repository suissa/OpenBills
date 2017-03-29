module.exports = ( Organism ) => 
  (route, i) => //console.log(`\n\t route`, route, Organism)
    ( Organism )
      ? ({
          path: route.path,
          method: route.method,
          action: Organism[route.action],
          middleware: Organism[route.middleware] || null
        })
      : ({
          path: route.path,
          method: route.method,
        })