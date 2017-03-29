const CONFIG = require('./../project')

module.exports = (acc, atom) => {
  // console.log('\n\n\n\natom', atom)
  // console.log('acc', acc)
  let configAtom = require(CONFIG.ATOMS_PATH +  atom )
  // if
  acc[configAtom.ATOM_NAME] = (configAtom.ARRAY) ? [configAtom] : configAtom
  // console.log('configAtom', configAtom)
  return Object.assign({}, acc)
}