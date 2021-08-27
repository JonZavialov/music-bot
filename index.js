const msgReply = require('./utilities/msgReply')
const parseCommand = require('./utilities/parseCommand')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const fs = require('fs');
const { exec } = require('child_process');

let rawdata = fs.readFileSync('./config.json')
let config = JSON.parse(rawdata)
const token = config.token
const prefix = config.prefix

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    client.user.setActivity('Moderating The Bryson Coalition')
})

client.on('message', msg => {
    if(msg.author.id == '880617388222062642') return

    if(msg.content.startsWith(prefix)){
        parseCommand(msg)
    }
})

client.login(token)