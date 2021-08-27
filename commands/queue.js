const fs = require('fs')
const checkIfQueueIsEmpty = require('../utilities/music/checkIfQueueIsEmpty')
const getYtInfo = require('../utilities/music/getYtInfo')

async function queue(msg){
    const path = __dirname.substring(0, __dirname.length-8) + "queue.json"
    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)
    
    let ytInfo
    let append
    let embedContent = "\`\`\`css\n\t⬐ current track\n"

    if(await checkIfQueueIsEmpty()){
        msg.lineReply("The queue is empty!")
        return
    }

    for(let i = 0; i < queue.length; i++){
        ytInfo = await getYtInfo(queue[i])
        append = `${i+1}) ${ytInfo.channel} - ${ytInfo.title}`

        if(append.length > 40){
            let shortened = append.substring(0,41)
            while(shortened.endsWith(' ')){ 
                shortened = shortened.substring(0,shortened.length-1)
            }
            append = shortened + "..."
        }

        embedContent += append + "\n"
        if(i==0){
            embedContent+="\t⬑ current track\n"
        }
    }
    embedContent += "\n\`\`\`"
    msg.lineReply(embedContent)
}

module.exports = queue