module.exports = ( Organism ) => (req, res, next) => {  
  console.log(`middleware test`)
  next()
}