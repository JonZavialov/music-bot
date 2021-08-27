const ytPlay = require('../utilities/music/ytPlay')
const getUrlFromSearchTerm = require('../utilities/getUrlFromSearchTerm')
const { getData } = require('spotify-url-info')
const convertSpotifyToYt = require('../utilities/music/convertSpotifyToYt')
const addSongToQueue = require('../utilities/music/addSongToQueue')
const checkIfQueueIsEmpty = require('../utilities/music/checkIfQueueIsEmpty')
const getFirstElementOfQueue = require('../utilities/music/getFirstElementOfQueue')

async function play(msg, searchTerm){
    let queueIsEmpty = await checkIfQueueIsEmpty()
    let url
    if(searchTerm.startsWith('https://')) {
        url = searchTerm
        if(searchTerm.indexOf('spotify') != -1){
            console.log('spotify link recieved')
            if(searchTerm.indexOf('playlist') == -1){
                await addSongToQueue(msg, await convertSpotifyToYt(msg,url))
            }else{
                msg.lineReply('Queueing music. This takes up to a minute. (I have shitty wifi)')
                await getData(url)
                .then(async data => {
                // 'tracks' property only exists on a playlist data object
                if (data.tracks) {
                    // handle playlist
                    const spotifyPlaylistItems = await data.tracks.items
                    for (let i = 0; i < spotifyPlaylistItems.length; i++) {
                        await addSongToQueue(await convertSpotifyToYt(msg,spotifyPlaylistItems[i].track.external_urls.spotify))
                    }}
                })
            }
        }else if(searchTerm.indexOf('youtube') != -1){
            console.log('youtube link recieved')
            await addSongToQueue(url)
        }else{
            msg.lineReply('Invalid URL!')
        }
    }else{
        console.log('youtube search recieved')
        url = await getUrlFromSearchTerm(searchTerm)
        await addSongToQueue(url)
    }

    if(queueIsEmpty){
        ytPlay(msg, await getFirstElementOfQueue())
    }else{
        msg.lineReply("Added to queue!")
    }
    msg.react('👍')
}

module.exports = play