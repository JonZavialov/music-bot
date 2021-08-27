const ytdl = require('ytdl-core')
var opus = require('node-opus')

const deleteEntryFromQueue = require('./deleteEntryFromQueue')
const checkIfQueueIsEmpty = require('./checkIfQueueIsEmpty')
const getFirstElementOfQueue = require('./getFirstElementOfQueue')
const createYtEmbed = require('../createYtEmbed')
const getYtInfo = require('./getYtInfo')

async function ytPlay(msg, url){
    msg.member.voice.channel.join().then(async(connection) =>{
        const dispatcher = connection.play(ytdl(url))
        .on("finish", async() => {
            await deleteEntryFromQueue(url)
            let queueIsEmpty = await checkIfQueueIsEmpty()
            if(!queueIsEmpty){
                ytPlay(msg, await getFirstElementOfQueue())
            }
        })
        msg.react('👍')
        const embed = await createYtEmbed(await getYtInfo(url))
        msg.channel.send(await embed)
    }).catch(err => console.log(err))
}

module.exports = ytPlay