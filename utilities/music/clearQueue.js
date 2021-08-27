const fs = require('fs')

async function clearQueue(){
    const path = __dirname.substring(0, __dirname.length-15) + "queue.json"
    
    const queue = []

    let data = JSON.stringify(queue, null, 2)
    await fs.writeFileSync(path, data)
}

module.exports = clearQueue