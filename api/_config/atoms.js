const VALIDATE_TYPE = 'Mongoose'
const VALIDATE_FACTORY = 'factory' +VALIDATE_TYPE+ 'Validate'
const VALIDATE_FACTORY_PATH = './../_hadrons/' + VALIDATE_FACTORY

module.exports = (_file) => {
  const ATOM_NAME = _file
                      .toLowerCase()
                      .split(`_atoms/`)[1]
                      .split(`.js`)[0]
                      
  const ATOM_PATH = _file
                      .toLowerCase()
  // console.log(`_config/atoms: `, ATOM_NAME, ATOM_PATH)                  
  return {
    ATOM_NAME,
    ATOM_PATH,
    VALIDATE_FACTORY_PATH
  }
}