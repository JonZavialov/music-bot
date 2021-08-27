const fs = require('fs')

async function help(msg){
    const path = __dirname.substring(0, __dirname.length) + "\\commands.json"

    let rawdata = await fs.readFileSync(path)
    let commands = JSON.parse(rawdata)
    
    let helpString = ""
    let helpKey
    let helpDesc
    let helpArgs
    let helpAliases

    keys = Object.keys(commands)
    
    for(let i = 0; i < keys.length; i++){
        helpKey = keys[i]
        helpDesc = commands[helpKey].desc
        helpArgs = commands[helpKey].args
        helpAliases = commands[helpKey].aliases

        helpString += `\`\`${helpKey}\`\`: ${helpDesc} \`\`arguements: ${helpArgs}\`\`,\`\`alias: ${helpAliases}\`\`\n`
    }

    msg.lineReply(helpString)
}

module.exports = help