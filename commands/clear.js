const clearQueue = require('../utilities/music/clearQueue')

function clear(msg){
    clearQueue()
    msg.lineReply('Done!')
    msg.react('👍')
}

module.exports = clear