import { Command } from 'discord.js'
import { prefix } from "../../config.json";

const gis = require('g-i-s')

const command: Command = {
    name: 'img',
    description: `${prefix}images`,
    excute(client, message) {
        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift()?.toLowerCase();
        if (args.length == 0) {
            return message.channel.send('Please enter a argument')
        }
        gis(args[0], (err: any, results: any) => {
            if (err) {
                return message.channel.send(err);
            }
            const images = JSON.parse(JSON.stringify(results, null, '  '))
            const n = Math.round(Math.random() * (10 - 0) + 0)
            message.channel.send(images[n].url)
        })
    }
}

module.exports = command