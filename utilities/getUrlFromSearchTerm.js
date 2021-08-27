const ytsr = require('ytsr')

async function getUrlFromSearchTerm(term,msg){
    const searchResults = await ytsr(term, { limit: 1 })
    if(!searchResults.items[0]){
        msg.lineReply("No videos found!")
        return
    }
    url = searchResults.items[0].url
    return url
}

module.exports = getUrlFromSearchTerm