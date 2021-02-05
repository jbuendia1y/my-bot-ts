import { Client, Message } from 'discord.js'
import { prefix } from './config.json'
import { msgEmbed } from './recyclable/msgembed'
import { Player } from 'discord-player'

const client: Client = new Client()
const player = new Player(client)

player.on('trackStart', (message, track) => {
    const title = `Now Playing ${track.title}`
    const embed = msgEmbed(track.url, title, track.description)

    message.channel.send(embed)
})

player.on('trackAdd', (message, track) => {
    const song = track.tracks[track.tracks.length - 1]
    const title = `Add to Queue ${song.title}`
    const embed = msgEmbed(song.url, title, song.description)
    message.channel.send(embed)
})
    .on('queueEnd', (message, track) => {
        message.channel.send(`Queue END - ${track.tracks.length - 1} songs`)
    })
    .on('botDisconnect',(message)=>{
        message.channel.send('aaaaadios')
    })

client.on('message', async (message: Message) => {
    if (message.content.startsWith(`${prefix}play`)) {
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

    if (message.content.startsWith(`${prefix}queue`) || message.content.startsWith(`${prefix}q`)) {
        if (player.getQueue(message).tracks) {
            for (const track of player.getQueue(message).tracks) {
                message.channel.send(`${track.durationMS} - ${track.duration}`)
                return message.channel.send(msgEmbed(track.url, track.title, track.description))
            }
        }
        return message.channel.send('0 Songs')
    }

    if (message.content.startsWith(`${prefix}leave`)) {
        message.member?.voice.channel?.leave()
    }
})

export { client }