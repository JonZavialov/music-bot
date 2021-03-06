const fs = require('fs')

async function checkIfQueueIsEmpty(){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)

    return queue[0] == undefined
}

module.exports = checkIfQueueIsEmpty