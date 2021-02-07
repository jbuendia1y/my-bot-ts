import { Command } from 'discord.js'
import { prefix } from '../../config.json'

const command: Command = {
    name: 'pause',
    description: `${prefix}pause`,
    excute(client, message) {
        client.player.pause(message)
    }
}

module.exports = command