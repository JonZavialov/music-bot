async function join(msg){
    if(!msg.member.voice.channel){
        msg.lineReply("You're not in a voice channel!")
        return
    }
    
    msg.member.voice.channel.join().then(connection =>{
        msg.react('👍')
    }).catch(err => console.log(err))
}

module.exports = join