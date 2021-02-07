import { Command } from 'discord.js'
import { prefix } from '../../config.json'

const command: Command = {
    name: 'resume',
    description: `${prefix}resume`,
    excute(client, message) {
        client.player.resume(message)
    }
}

module.exports = command