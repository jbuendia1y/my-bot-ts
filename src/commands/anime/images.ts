import { Command } from 'discord.js'
import { prefix } from "../../config.json";

const gis = require('g-i-s')

const command: Command = {
    name: 'img',
    description: `${prefix}img`,
    excute(client, message) {
        const args = message.content.split(`${prefix}img `);
        const search = args[1]

        if (args.length == 1) {
            return message.channel.send('Please enter a argument')
        }
        gis(search, (err: any, results: any) => {
            if (err) {
                return message.channel.send(err);
            }
            const images:any[] = JSON.parse(JSON.stringify(results, null, '  '))
            const n = Math.round(Math.random() * ((images.length - 1) - 0) + 0)
            message.channel.send(images[n].url)
        })
    }
}

module.exports = command