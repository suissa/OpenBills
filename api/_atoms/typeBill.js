const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: `type`,
  VALIDATE: false
}
const PROPS = {
  type: String,
  required: true,
  enum: ['luz', 'agua', `internet`, `aluguel`, `mercado`, `animais`],
  default: 'mercado'
}

const atomConfig = Object.assign({}, DEFAULT, PROPS)
  // console.log('\n\n atomConfig', atomConfig)

module.exports = require('./../_factories/atom')(atomConfig)

