const ytdl = require('ytdl-core')
var opus = require('node-opus')

function ytPlay(msg, url){
    msg.member.voice.channel.join().then(connection =>{
        const dispatcher = connection.play(ytdl(url))
        msg.react('👍')
        msg.channel.send(`Playing ${url}`)
    }).catch(err => console.log(err))
}

module.exports = ytPlay