const fs = require('fs')

async function shuffle(msg){
    const path = __dirname.substring(0, __dirname.length-8) + "queue.json"

    let rawdata = await fs.readFileSync(path)
    let queue = JSON.parse(rawdata)

    for (var i = queue.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = queue[i]
        queue[i] = queue[j]
        queue[j] = temp
    }

    let data = JSON.stringify(queue, null, 2)
    await fs.writeFileSync(path, data)

    msg.lineReply('Done!')
    msg.react('👍')
}

module.exports = shuffle