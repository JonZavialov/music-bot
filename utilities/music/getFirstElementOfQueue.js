const fs = require('fs')

async function getFirstElementOfQueue(){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)

    return queue[0]
}

module.exports = getFirstElementOfQueue