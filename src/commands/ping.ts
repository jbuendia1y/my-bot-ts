import { Command } from 'discord.js'

const commandEx:Command = {
    name : 'ping',
    description : '?ping',
    excute(client , message){
        if(message.content.startsWith('?ping')){
            message.channel.send('pong')
        }
    }
}

module.exports = commandEx