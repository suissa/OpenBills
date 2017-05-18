const success = `./ribosomes/success-200-json`
const error = `./ribosomes/error-json`
const fromOrganelles = `_organelles/`

const getEnzyme = ( file ) => 
  file.split( fromOrganelles )[1].split('.js')[0]

const getSubstrate = ( req ) => req.query || {}

module.exports = (Organism) => 
  (req, res) => {
    const substrate = getSubstrate( req )
    const enzyme = getEnzyme( __filename )
    const catalyze = require( `./../_enzymes/${enzyme}` )
    const convertToProduct = require( success )(req, res)
    const inhibitor = require( error )(req, res)
    console.log(substrate)
    return catalyze( Organism, substrate )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }

