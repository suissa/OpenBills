
const getPageByQuery = ( query ) =>
  query.page || 0

const getURIFromReq = ( req ) =>
  `${req.protocol}://${req.get('host')}${req.baseUrl}`

const getEnzyme = ( file ) => 
  file.split( fromOrganelles )[1].split('.js')[0]

const getTotalPages = ( totalPages = 10 ) => ( data ) => 
  Math.floor( data.length / totalPages )

const getLinks = ( fullUrl ) => ( query ) => ({
  first: fullUrl + '?page=' + getPageByQuery(query),
  previous: fullUrl + '?page=' + getPageByQuery(query),
  next: fullUrl + '?page=' + getPageByQuery(query),
  last: fullUrl + '?page=' + getPageByQuery(query)
})


const getPagination = ( fullUrl, query ) => ( data ) => ({
  links: [ getLinks( fullUrl )( query ) ],
  page: getPageByQuery( query ),
  total_pages: getTotalPages( data ),
  total_elements: data.length,
  page_size: 5
})

const getQueryFromReq = ( req ) => 
  req.query

const getFieldsFromReq = ( req ) => 
  ( req.query.fields )
    ? req.query.fields.replace( `,`, ` ` )
    : ''

const getQuery = ( { order, limit, page } = query ) =>
  console.log({ order, limit, page })
//  (
// {
//   query: {
//       order,
//       limit,
//       page,
//   }
// })
module.exports = ( req, res ) => ( data ) => {
  console.log('req ===> ', req)
  const fullUrl = getURIFromReq( req )
  const select = getFieldsFromReq( req ) // String
  const query = getQueryFromReq( req ) // Object
  const pagination = getPagination( fullUrl, query )( data ) // Object
  console.log({
      data,
      pagination,
      query
    })
  // res.json(  )
}

