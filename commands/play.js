const ytPlay = require('../utilities/music/ytPlay')
const spdl = require('spdl-core');
const getUrlFromSearchTerm = require('../utilities/getUrlFromSearchTerm')

async function play(msg, searchTerm){
    let url
    if(searchTerm.startsWith('https://')) {
        url = searchTerm
        if(searchTerm.indexOf('spotify') != -1){
            console.log('spotify link recieved')
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
        }else if(searchTerm.indexOf('youtube') != -1){
            console.log('youtube link recieved')
            ytPlay(msg, url)
        }else{
            msg.lineReply('Invalid URL!')
            return
        }
    }else{
        console.log('youtube search recieved')
        url = await getUrlFromSearchTerm(searchTerm)
        ytPlay(msg, url)
    }
}

module.exports = play