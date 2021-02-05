import { prefix } from './config.json'
import { Client, Message, MessageEmbed } from 'discord.js'
import { Player } from 'discord-player'

import { msgEmbed } from './recyclable/msgembed'

const client: Client = new Client()
const player = new Player(client)

player
    .on('trackStart', (message, track) => {
        const title = `Now Playing ${track.title}`
        const embed = msgEmbed(track.url, title, track.description)

        message.channel.send(embed)
    })
    .on('trackAdd', (message, track) => {
        const song = track.tracks[track.tracks.length - 1]
        const title = `Add to Queue ${song.title}`
        const embed = msgEmbed(song.url, title, song.description)
        message.channel.send(embed)
    })
    .on('queueEnd', (message, track) => {
        message.channel.send(`Queue END - ${track.tracks.length - 1} songs`)
    })
    .on('botDisconnect', (message) => {
        message.channel.send('aaaaadios')
    })
    .on('error', (err, message) => {
        message.channel.send(err)
    })
    .on('searchInvalidResponse', (message, query, tracks, err, collector) => {
        console.log(err)
    })

client.on('message', async (message: Message) => {
    const comand = message.content.toLocaleLowerCase()

    if (comand.startsWith(`${prefix}play`)) {
        const msg = message.content
        if (message.member?.voice.channel) {

            if (!msg.split(`${prefix}play`)[1]) {
                return message.channel.send('SET A SONG')
            }

            const video = msg.split(`${prefix}play `)[1]
            const name = video.replace(' ', '-')

            return player.play(message, name, true)
        }
        return message.channel.send('GO TO THE CHANNEL VOICE')
    }

    if (comand.startsWith(`${prefix}queue`) || comand.startsWith(`${prefix}q`)) {
        if (player.shuffle(message).tracks) {
            const embed = new MessageEmbed()
                .setColor('#2e86bb')
                .setTitle('Queue')
            for (const track of player.getQueue(message).tracks) {
                embed.addField(track.title , track.description , false)
            }
            message.channel.send(embed)
        }
    }

    if (comand.startsWith(`${prefix}skip`)) {
        player.skip(message)
    }

    if (comand.startsWith(`${prefix}leave`)) {
        player.stop(message)
    }

    if (comand.startsWith(`${prefix}pause`)) {
        player.pause(message)
    }

    if (comand.startsWith(`${prefix}resume`)) {
        player.resume(message)
    }
})

export { client }