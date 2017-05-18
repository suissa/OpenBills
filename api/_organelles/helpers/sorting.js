module.exports = ( ordering, table, byFields, byOrder = `DESC` ) => 
  table.sort( ordering( byFields, byOrder ) )