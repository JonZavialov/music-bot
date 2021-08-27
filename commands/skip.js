const clearQueue = require('../utilities/music/clearQueue')
const deleteEntryFromQueue = require('../utilities/music/deleteEntryFromQueue')
const getFirstElementOfQueue = require('../utilities/music/getFirstElementOfQueue')
const getLengthOfQueue = require('../utilities/music/getLengthOfQueue')
const pauseMusic = require('../utilities/music/pauseMusic')
const ytPlay = require('../utilities/music/ytPlay')

async function skip(msg){ 
    if(await getLengthOfQueue() == 1){
        pauseMusic(msg)
        clearQueue()
        msg.react('👍')
    }else{
        await pauseMusic(msg)
        await deleteEntryFromQueue(await getFirstElementOfQueue())
        ytPlay(msg, await getFirstElementOfQueue())
    }
}

module.exports = skip