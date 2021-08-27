const ytPlay = require('./ytPlay')
const spdl = require('spdl-core')
const getUrlFromSearchTerm = require('../getUrlFromSearchTerm')

function spotifyPlay(msg, url){
    spdl.getInfo(url)
    .then(async(infos) => {
        const artistAndName = infos.artist + " " + infos.title
        url = await getUrlFromSearchTerm(artistAndName)
        ytPlay(msg, url)
        return
    })
    .catch(error => {
        console.log(error)
        msg.lineReply('Invalid URL!')
    })
}

module.exports = spotifyPlay