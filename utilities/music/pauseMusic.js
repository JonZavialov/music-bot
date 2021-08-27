const ytdl = require('ytdl-core')
const getFirstElementOfQueue = require('./getFirstElementOfQueue')

async function pauseMusic(msg){
    await msg.member.voice.channel.join().then(async(connection) =>{
        const dispatcher = connection.play(ytdl(getFirstElementOfQueue()))
        await dispatcher.pause()
    })
}

module.exports = pauseMusic