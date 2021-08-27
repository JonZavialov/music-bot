const ytsr = require('ytsr')

async function getUrlFromSearchTerm(term){
    const searchResults = await ytsr(term, { limit: 1 })
    url = searchResults.items[0].url
    return url
}

module.exports = getUrlFromSearchTerm