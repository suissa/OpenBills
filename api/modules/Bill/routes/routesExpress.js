module.exports = ( Routes, router ) => //console.log(` Routes`, Routes)
  // ( Routes )
    Routes.map( (route, i) => 
      ( route.action )
        ? ( route.middleware )
            ? router[route.method](route.path, route.middleware, route.action) 
            : router[route.method](route.path, route.action) 
        : false
    ).filter( route => !!route)
    // : console.log(`Fodeo Routes`, Routes)
