const ytPlay = require('../utilities/music/ytPlay')
const getUrlFromSearchTerm = require('../utilities/getUrlFromSearchTerm')
const { getData } = require('spotify-url-info')
const spotifyPlay = require('../utilities/music/spotifyPlay')

async function play(msg, searchTerm){
    let url
    if(searchTerm.startsWith('https://')) {
        url = searchTerm
        if(searchTerm.indexOf('spotify') != -1){
            console.log('spotify link recieved')
            if(searchTerm.indexOf('playlist') == -1){
                spotifyPlay(msg,url)
                return
            }else{
                getData(url)
                .then(async data => {
                // 'tracks' property only exists on a playlist data object
                if (data.tracks) {
                    // handle playlist
                    const spotifyPlaylistItems = await data.tracks.items
                    for (let i = 0; i < spotifyPlaylistItems.length; i++) {
                        //add song to queue
                    }}
                })
            }
        }else if(searchTerm.indexOf('youtube') != -1){
            console.log('youtube link recieved')
            ytPlay(msg, url)
            return
        }else{
            msg.lineReply('Invalid URL!')
            return
        }
    }else{
        console.log('youtube search recieved')
        url = await getUrlFromSearchTerm(searchTerm)
        ytPlay(msg, url)
        return
    }
}

module.exports = play