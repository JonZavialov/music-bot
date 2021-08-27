async function leave(msg){
    let clientVoiceConnection = msg.guild.voice.channel
    
    if(!clientVoiceConnection){
        msg.lineReply("I'm not in a voice channel!")
        return
    }

    msg.member.voice.channel.leave()
    msg.react('👍')
}

module.exports = leave