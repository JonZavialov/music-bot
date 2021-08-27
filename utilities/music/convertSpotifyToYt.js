const spdl = require('spdl-core')
const getUrlFromSearchTerm = require('../getUrlFromSearchTerm')

function convertSpotifyToYt(msg, url){
    let ytURL = spdl.getInfo(url)
    .then(async(infos) => {
        const artistAndName = infos.artist + " " + infos.title
        url = await getUrlFromSearchTerm(artistAndName)
        return url
    })
    .catch(error => {
        console.log(error)
        msg.lineReply('Invalid URL!')
    })
    return ytURL
}

module.exports = convertSpotifyToYt