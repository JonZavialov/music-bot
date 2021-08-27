const msgReply = require('../utilities/msgReply')

function ping(msg){
    msgReply(msg, "Pong!")
}

module.exports = ping