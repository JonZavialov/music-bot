const fs = require('fs')
const msgReply = require('./msgReply')

const ping = require('../commands/ping')

async function parseCommand(msg){
    const path = __dirname.substring(0, __dirname.length-9) + "commands\\commands.json"
    let rawdata = fs.readFileSync(path)
    let commands = JSON.parse(rawdata)
    
    let index
    if(msg.content.indexOf(' ') == -1){
        index = msg.content.length
    }else{
        index = msg.content.indexOf(' ')
    }
    
    const commandsList = Object.keys(commands)
    const firstWord = msg.content.substring(1,index)
   
    if(!commandsList.includes(firstWord)) return

    const commandArgs = commands[firstWord].args
    const amountOfSpaces = (msg.content.match(/ /g) || []).length
    
    if(commandArgs < amountOfSpaces){
        msgReply(msg, 'Too many arguements!')
        return
    }else if(commandArgs > amountOfSpaces){
        msgReply(msg, `Missing ${commandArgs-amountOfSpaces} arguements`)
        return
    }

    const args = msg.content.trim().split(/ +/g);

    let evalString = firstWord + "(msg,"
    for(let i = 1; i < commandArgs + 1; i++){
        let append = "'" + args[i] + "',"
        evalString += append
    }
    evalString = evalString.substring(0,evalString.length-1) + ")"
    eval(evalString)
}

module.exports = parseCommand