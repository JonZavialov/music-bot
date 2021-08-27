const fs = require('fs')

const ping = require('../commands/ping')
const join = require('../commands/join')
const leave = require('../commands/leave')
const play = require('../commands/play')
const help = require('../commands/help')
const shuffle = require('../commands/shuffle')
const clear = require('../commands/clear')
const skip = require('../commands/skip')
const pause = require('../commands/pause')
const resume = require('../commands/resume')

async function parseCommand(msg, prefix){
    const path = __dirname.substring(0, __dirname.length-9) + "commands\\commands.json"
    let rawdata = fs.readFileSync(path)
    let commands = JSON.parse(rawdata)
    
    const args = msg.content.trim().split(/ +/g);
    const commandsList = Object.keys(commands)

    const firstWord = args[0].substring(1,args[0].length)
    
    if(!commandsList.includes(firstWord)) return

    const commandArgs = commands[firstWord].args
    
    if(firstWord == "play" && args.length > 2){
        play(msg, msg.content.substring(prefix.length + 5, msg.content.length))
        return
    }

    if(commandArgs < args.length -1){
        msg.lineReply('Too many arguements!')
        return
    }else if(commandArgs > args.length -1){
        msg.lineReply(`Missing ${commandArgs-args.length+1} arguements`)
        return
    }

    let evalString = firstWord + "(msg,"
    for(let i = 1; i < commandArgs + 1; i++){
        let append = "'" + args[i] + "',"
        evalString += append
    }
    evalString = evalString.substring(0,evalString.length-1) + ")"
    eval(evalString)
}

module.exports = parseCommand