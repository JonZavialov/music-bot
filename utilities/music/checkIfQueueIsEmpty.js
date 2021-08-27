const fs = require('fs')

async function checkIfQueueIsEmpty(){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)

    if(queue[0] == undefined){
        return true
    }else{
        return false
    }
}

module.exports = checkIfQueueIsEmpty