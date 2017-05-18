const MODULES_PATH = __dirname+'/modules'
const db = require('./_config/db')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const compress = require('compression')
const favicon = require('serve-favicon')

// console.log('__dirname', __dirname)

const http = require('http').Server(app);

const io = require('socket.io').listen(5430);

const api = {}

app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(compress()) // Compress response data with gzip
  // app.use(favicon(__dirname + '/favicon.ico'))



io.sockets.on('connection', function (socket) {
  console.log('connection no socket')
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

app.use((req, res, next) => {
  res.io = io
  next()
})


/* Cria as rotas dinamicamente a partir dos módulos */
const modules = require('./_config/module/get.modules.js')(MODULES_PATH)
const getRoutes = require('./_config/routes/get.routes')
const createRoutes = require('./_config/routes/create.routes')(app)

const mapModules = ( modules ) => ( getRoutes ) => 
  modules.map( getRoutes )

const maped = mapModules( modules )( getRoutes ) 
console.log('maped', maped)

maped.reduce(createRoutes, app)

app.get('/ping', (req, res, next) => res.send('pong') )

app.listen(port, () => {
  console.log('---------------------------------------------------------------------------')
  console.log('Express server listening on port ' + port)
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd())
  console.log('---------------------------------------------------------------------------')
})
