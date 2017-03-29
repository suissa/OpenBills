module.exports = ( app ) => ( app, route ) => // console.log('app route', app)
  {
    if ( app ) return app.use( route.path, require(route.module) )
  }