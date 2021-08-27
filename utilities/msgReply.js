function msgReply(msg, content){
    msg.channel.send({ content: content, reply: { messageReference: msg.id }})
}

module.exports = msgReply