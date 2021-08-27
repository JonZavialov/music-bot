const parseCommand = require('./utilities/parseCommand')
const clearQueue = require('./utilities/music/clearQueue')

const Discord = require('discord.js')
require('discord-reply')
const client = new Discord.Client()
const fs = require('fs')

let rawdata = fs.readFileSync('./config.json')
let config = JSON.parse(rawdata)
const token = config.token
const prefix = config.prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('Moderating The Bryson Coalition')
    clearQueue()
})

client.on('message', msg => {
    if(msg.author.id == '880617388222062642') return

    if(msg.content.startsWith(prefix)){
        parseCommand(msg, prefix)
    }
})

client.login(token)