const ytPlay = require('../utilities/music/ytPlay')
const getUrlFromSearchTerm = require('../utilities/getUrlFromSearchTerm')
const { getData } = require('spotify-url-info')
const convertSpotifyToYt = require('../utilities/music/convertSpotifyToYt')
const addSongToQueue = require('../utilities/music/addSongToQueue')
const checkIfQueueIsEmpty = require('../utilities/music/checkIfQueueIsEmpty')
const getFirstElementOfQueue = require('../utilities/music/getFirstElementOfQueue')
const getYtInfo = require('../utilities/music/getYtInfo')

async function play(msg, searchTerm){
    let queueIsEmpty = await checkIfQueueIsEmpty()
    let url
    let playlist = false
    if(searchTerm.startsWith('https://')) {
        url = searchTerm
        if(searchTerm.indexOf('spotify') != -1){
            console.log('spotify link recieved')
            if(searchTerm.indexOf('playlist') == -1){
                await addSongToQueue(await convertSpotifyToYt(msg,url))
            }else{
                playlist = true
                msg.lineReply('Queueing music.')
                await getData(url)
                .then(async data => {
                // 'tracks' property only exists on a playlist data object
                if (data.tracks) {
                    const queueMsg = await msg.channel.send("Adding song to queue: ")
                    // handle playlist
                    const spotifyPlaylistItems = await data.tracks.items
                    for (let i = 0; i < spotifyPlaylistItems.length; i++) {
                        await addSongToQueue(await convertSpotifyToYt(msg,spotifyPlaylistItems[i].track.external_urls.spotify))
                        await queueMsg.edit(`Adding song to queue: \`\`${spotifyPlaylistItems[i].track.name}\`\` (${i+1}/${spotifyPlaylistItems.length})`)
                        if(i == 0){
                            ytPlay(msg, await getFirstElementOfQueue())
                        }
                    }
                    await queueMsg.delete()
                }    
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
        url = await getUrlFromSearchTerm(searchTerm,msg)
        await addSongToQueue(url)
    }

    if(queueIsEmpty && !playlist){
        ytPlay(msg, await getFirstElementOfQueue())
    }else if(!playlist){
        msg.lineReply("Added to queue!")
    }
    msg.react('????')
}

module.exports = play