import { Client , Message, MessageEmbed } from 'discord.js'
import { getInfo } from 'ytdl-core'
import { prefix } from './config.json'

const client:Client = new Client

const fetch = require('node-fetch')
const ytdl = require('ytdl-core')
const { YOUTUBE_KEY } = process.env

client.on('message', async (message: Message) => {
    if (message.content.startsWith(`${prefix}play`)) {
        const msg = message.content
        if (message.member?.voice.channel) {
            const video = msg.split(`${prefix}play `)[1]
            const name = video.replace(' ' , '-')
            const id = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=${name}&key=${YOUTUBE_KEY}`)
                .then((res:any) => res.json())
                .then((data:any) => data.items[0].id.videoId)
                .catch((err:any) => console.log(err))

            let title;
            let url = `https://www.youtube.com/watch?v=${id}`

            const connection = await message.member.voice.channel.join();
            connection.play(ytdl(url, { filter: 'audioonly' }));

            title = await getInfo(url)
                .then(data => data.videoDetails.title)
                .catch(err => err)
            const embed = new MessageEmbed()
            embed.title = title
            embed.color = 0xff0000
            embed.url = url

            message.channel.send(embed)
        }else {
            message.channel.send('GO TO THE CHANNEL VOICE')
        }
    }

    if(message.content.startsWith(`${prefix}leave`)){
        message.member?.voice.channel?.leave()
    }
})

export { client }