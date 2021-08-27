const ytdl = require('ytdl-core')
var opus = require('node-opus')

const deleteEntryFromQueue = require('./deleteEntryFromQueue')
const checkIfQueueIsEmpty = require('./checkIfQueueIsEmpty')
const getFirstElementOfQueue = require('./getFirstElementOfQueue')

async function ytPlay(msg, url){
    msg.member.voice.channel.join().then(connection =>{
        const dispatcher = connection.play(ytdl(url))
        .on("finish", async() => {
            await deleteEntryFromQueue(url)
            let queueIsEmpty = await checkIfQueueIsEmpty()
            if(!queueIsEmpty){
                ytPlay(msg, await getFirstElementOfQueue())
            }
        })
        msg.react('👍')
        msg.channel.send(`Playing ${url}`)
    }).catch(err => console.log(err))
}

module.exports = ytPlay