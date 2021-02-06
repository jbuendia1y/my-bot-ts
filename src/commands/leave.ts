import { Command } from 'discord.js'
import { prefix } from '../config.json'

const command: Command = {
    name: 'leave',
    description: `${prefix}leave`,
    excute(client, message) {
        client.player.stop(message)
    }
}

module.exports = command