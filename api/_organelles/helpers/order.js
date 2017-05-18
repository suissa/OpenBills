
const ord = {
  ASC: ( a, b, byFields, byOrder ) => {
    for (let field in byFields) {
        if (a[byFields[field]] < b[byFields[field]]) return -1
        if (a[byFields[field]] > b[byFields[field]]) return 1
    }
  },
  DESC: ( a, b, byFields, byOrder ) => {
    for (let field in byFields) {
      if (b[byFields[field]] < a[byFields[field]]) return -1
      if (b[byFields[field]] > a[byFields[field]]) return 1
    }
  }
}

module.exports = (a, b, byFields, byOrder) => 
    ord[byOrder](a, b, byFields, byOrder)