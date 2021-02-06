import { prefix } from './config.json'
import { Client, Message, Command } from 'discord.js'
import { Player } from 'discord-player'

import { readdirSync } from 'fs'
import { join } from 'path'

import { msgEmbed } from './recyclable/msgembed'

const client: Client = new Client()
const player = new Player(client)

client.player = player

client.player
    .on('trackStart', (message, track) => {
        const title = `Now Playing ${track.title}`
        const embed = msgEmbed(track.url, title, track.description)

        message.channel.send(embed)
            .then(newMSG => newMSG.delete({
                timeout: 5000
            }))
    })
    .on('trackAdd', (message, track) => {
        const song = track.tracks[track.tracks.length - 1]
        const title = `Add to Queue ${song.title}`
        const embed = msgEmbed(song.url, title, song.description)
        message.channel.send(embed)
    })
    .on('queueEnd', (message, track) => {
        message.channel.send(`Queue END - ${track.tracks.length - 1} songs`)
            .then(newMSG => newMSG.delete({
                timeout: 5000
            }))
    })
    .on('botDisconnect', (message) => {
        message.channel.send('aaaaadios')
            .then(newMSG => newMSG.delete({
                timeout: 5000
            }))
    })
    .on('error', (err, message) => {
        message.channel.send(err)
    })
    .on('searchInvalidResponse', (message, query, tracks, err, collector) => {
        console.log(err)
    })

client.on('message', async (message: Message) => {
    const files = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'))

    for (const file of files) {
        const command: Command = require(`./commands/${file}`)

        if(message.content.startsWith(command.description) || message.content.startsWith(`${prefix}${command.name}`)){
            command.excute(client, message)
        }
    }
})

export { client }