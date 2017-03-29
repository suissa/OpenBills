const mongoose = require('mongoose')
const Organelles = require('./../_config/organism/organelles.default')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

const createCytoplasm = ( name, Molecule ) => 
  mongoose.model( name, Molecule )

const createCell = ( DNA, Organelles ) =>
  ( DNA.organelles.map ) // Array.isArray(DNA.organelles)
    ? ( DNA.middlewares.map ) // Array.isArray(DNA.middlewares)
        ? Transcript( DNA, Organelles, `with middlewares` )
        : Transcript( DNA, Organelles )
    : Organelles

const createOrganelles = ( Organism, organellesPath ) => 
( acc, name ) => { if ( acc ) 
  return Object.assign( acc, {
        [ name ]: require( organellesPath+name )( Organism )
      } )
  }

const Transcript = ( DNA, Organelles, middlewares = false ) => 
  ( middlewares )
    ? DNA.organelles.concat(Organelles)
    : DNA.organelles.concat(Organelles).concat(DNA.middlewares)

const Synthesis = ( DNA, Molecule ) => 
  createOrganelles( createCytoplasm( DNA.name, Molecule ), organellesPath )

const Mitosis = ( DNA, Molecule ) => ( Cell ) => 
  Cell.reduce( Synthesis( DNA, Molecule ), {name: DNA.name} )

const MakeLife = ( DNA, Molecule, Organelles ) => 
  Mitosis( DNA, Molecule )( createCell( DNA, Organelles ) )
    
module.exports = ( DNA, Molecule ) => MakeLife( DNA, Molecule, Organelles )

/**

Cytoplasm
Além de servir de meio das reações metabólicas vitais 
(glicólise anaeróbia e a síntese proteica), é onde se localizam 
as mitocôndrias e o citoesqueleto, este mantendo a consistência e 
a forma da célula. É também o local de armazenamento de substâncias 
químicas indispensáveis à vida.

https://pt.wikipedia.org/wiki/Citoplasma

*/

/**

IN:

DNA { name: 'Bill',
  organelles: 
   [ 'find',
     'find',
     'create',
     'getSchema',
     'findByFilter',
     'findAllPopulate',
     'findById',
     'findByIdPopulate',
     'update',
     'remove' ],
  middlewares: [ 'test' ] }

Molecule {
  obj: 
   { active: 
      { type: [Function: Boolean],
        ATOM_NAME: 'active',
        required: true,
        default: true },
     name: { type: [Function: String], ATOM_NAME: 'name' },
     type: 
      { type: [Function: String],
        ATOM_NAME: 'type',
        required: true,
        enum: [Object],
        default: 'mercado' },
     amount: { type: [Function: Number], ATOM_NAME: 'amount', min: 0 },
     deadline: { type: [Function: Date], ATOM_NAME: 'deadline' },
     interest: { type: [Function: Number], ATOM_NAME: 'interest', default: 0 },
     paid_at: { type: [Function: Date], ATOM_NAME: 'paid_at' },
     created_at: 
      { type: [Function: Date],
        ATOM_NAME: 'created_at',
        default: [Function: now] } },
  paths: 
   { active: 
      SchemaBoolean {
        path: 'active',
        instance: 'Boolean',
        validators: [Object],
        setters: [],
        getters: [],
        options: [Object],
        _index: null,
        isRequired: true,
        requiredValidator: [Function],
        originalRequiredValue: true,
        defaultValue: true },
     name: 
      SchemaString {
        enumValues: [],
        regExp: null,
        path: 'name',
        instance: 'String',
        validators: [],
        setters: [],
        getters: [],
        options: [Object],
        _index: null },
     type: 
      SchemaString {
        enumValues: [Object],
        regExp: null,
        path: 'type',
        instance: 'String',
        validators: [Object],
        setters: [],
        getters: [],
        options: [Object],
        _index: null,
        isRequired: true,
        requiredValidator: [Function],
        originalRequiredValue: true,
        enumValidator: [Function],
        defaultValue: 'mercado' },
     amount: 
      SchemaNumber {
        path: 'amount',
        instance: 'Number',
        validators: [Object],
        setters: [],
        getters: [],
        options: [Object],
        _index: null,
        minValidator: [Function] },
     deadline: 
      SchemaDate {
        path: 'deadline',
        instance: 'Date',
        validators: [],
        setters: [],
        getters: [],
        options: [Object],
        _index: null },
     interest: 
      SchemaNumber {
        path: 'interest',
        instance: 'Number',
        validators: [],
        setters: [],
        getters: [],
        options: [Object],
        _index: null,
        defaultValue: 0 },
     paid_at: 
      SchemaDate {
        path: 'paid_at',
        instance: 'Date',
        validators: [],
        setters: [],
        getters: [],
        options: [Object],
        _index: null },
     created_at: 
      SchemaDate {
        path: 'created_at',
        instance: 'Date',
        validators: [],
        setters: [],
        getters: [],
        options: [Object],
        _index: null,
        defaultValue: [Function: now] },
     _id: 
      ObjectId {
        path: '_id',
        instance: 'ObjectID',
        validators: [],
        setters: [Object],
        getters: [],
        options: [Object],
        _index: null,
        defaultValue: [Function: defaultId] } },
  subpaths: {},
  virtuals: { id: VirtualType { path: 'id', getters: [Object], setters: [], options: {} } },
  singleNestedPaths: {},
  nested: {},
  inherits: {},
  callQueue: 
   [ [ 'pre', [Object] ],
     [ 'pre', [Object] ],
     [ 'pre', [Object] ],
     [ 'pre', [Object] ] ],
  _indexes: [],
  methods: {},
  statics: {},
  tree: 
   { active: 
      { default: true,
        required: true,
        ATOM_NAME: 'active',
        type: [Function: Boolean] },
     name: { ATOM_NAME: 'name', type: [Function: String] },
     type: 
      { default: 'mercado',
        enum: [Object],
        required: true,
        ATOM_NAME: 'type',
        type: [Function: String] },
     amount: { min: 0, ATOM_NAME: 'amount', type: [Function: Number] },
     deadline: { ATOM_NAME: 'deadline', type: [Function: Date] },
     interest: { default: 0, ATOM_NAME: 'interest', type: [Function: Number] },
     paid_at: { ATOM_NAME: 'paid_at', type: [Function: Date] },
     created_at: 
      { default: [Function: now],
        ATOM_NAME: 'created_at',
        type: [Function: Date] },
     _id: { type: [Object], auto: true },
     id: VirtualType { path: 'id', getters: [Object], setters: [], options: {} } },
  query: {},
  childSchemas: [],
  s: 
   { hooks: Kareem { _pres: {}, _posts: {} },
     kareemHooks: 
      { count: true,
        find: true,
        findOne: true,
        findOneAndUpdate: true,
        findOneAndRemove: true,
        insertMany: true,
        update: true,
        updateMany: true,
        updateOne: true } },
  options: 
   { retainKeyOrder: false,
     typeKey: 'type',
     id: true,
     noVirtualId: false,
     _id: true,
     noId: false,
     validateBeforeSave: true,
     read: null,
     shardKey: null,
     autoIndex: null,
     minimize: true,
     discriminatorKey: '__t',
     versionKey: '__v',
     capped: false,
     bufferCommands: true,
     strict: true } }

*/

/** 

OUT:

MakeLife { name: 'Bill',
   find: [Function],
   create: [Function],
   getSchema: [Function],
   findByFilter: [Function],
   findAllPopulate: [Function],
   findById: [Function],
   findByIdPopulate: [Function],
   update: [Function],
   remove: [Function],
   findOne: [Function],
   test: [Function] }
*/