
module.exports = ( paths, fns, reducer ) => 
  fns.reduce( reducer( paths ), [] )