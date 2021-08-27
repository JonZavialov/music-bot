const checkIfQueueIsEmpty = require("../utilities/music/checkIfQueueIsEmpty")
const getFirstElementOfQueue = require("../utilities/music/getFirstElementOfQueue")
const ytPlay = require("../utilities/music/ytPlay")

async function pause(msg){
    if(await checkIfQueueIsEmpty()){
        msg.lineReply("The queue is empty!")
        return
    }
    ytPlay(msg,await getFirstElementOfQueue())
    msg.react('👍')
}

module.exports = pause