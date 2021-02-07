import { Command } from 'discord.js'
import { prefix } from "../../config.json";

const command: Command = {
    name: 'skip',
    description: `${prefix}skip`,
    excute(client, message) {
        client.player.skip(message)
    }
}

module.exports = command