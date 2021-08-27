const fs = require('fs')

async function getLengthOfQueue(){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)

    return queue.length
}

module.exports = getLengthOfQueue