module.exports = ( order ) => ( byFields, byOrder ) => (a, b) => 
  order( a, b, byFields, byOrder )