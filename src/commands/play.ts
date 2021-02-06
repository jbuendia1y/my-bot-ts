import { Command } from 'discord.js'
import { prefix } from '../config.json'

const commandEx: Command = {
    name: 'play',
    description: `${prefix}play`,
    excute(client, message) {
        if (message.member?.voice.channel) {
            const msg = message.content
            if (!msg.split(`${prefix}play`)[1]) {
                return message.channel.send('SET A SONG')
            }

            const video = msg.split(`${prefix}play `)[1]
            const name = video.replace(' ', '-')

            return client.player.play(message, name, true).then(res => res)
        }
        return message.channel.send('GO TO THE CHANNEL VOICE')
    }
}

module.exports = commandEx