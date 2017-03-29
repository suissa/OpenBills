const CONFIG = require( './config' )
const ROUTER_PATH = './routes/'
const ROUTES_CONFIG = require( './routes.config.js' )
const ROUTES = require( './config.module.routes' )( ROUTES_CONFIG )

const ROUTER = require( ROUTER_PATH + CONFIG.ROUTER )
const PATH = ROUTER_PATH + CONFIG.ROUTES

module.exports = require( PATH )( ROUTES, ROUTER )
