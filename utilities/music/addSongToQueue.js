const fs = require('fs')

async function addSongToQueue(url){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)
    
    queue.push(url)

    let data = JSON.stringify(queue, null, 2)
    await fs.writeFileSync(path, data)
}

module.exports = addSongToQueue