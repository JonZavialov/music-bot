const fs = require('fs')

async function deleteEntryFromQueue(entry){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)
    
    const index = queue.indexOf(entry);
    if (index > -1) {
        queue.splice(index, 1);
    }

    let data = JSON.stringify(queue, null, 2)
    await fs.writeFileSync(path, data)
}

module.exports = deleteEntryFromQueue