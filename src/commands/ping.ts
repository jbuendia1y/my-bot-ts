import { Command } from 'discord.js'

const commandEx:Command = {
    name : 'ping',
    description : '?ping',
    excute(message , args){
        message.channel.send('pong')
    }
}

module.exports = commandEx