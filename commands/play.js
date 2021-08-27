const ytdl = require('ytdl-core')
var opus = require('node-opus')

function play(msg, url){
    msg.member.voice.channel.join().then(connection =>{
        const dispatcher = connection.play(ytdl(url))
        msg.react('👍')
    }).catch(err => console.log(err))
}

module.exports = play