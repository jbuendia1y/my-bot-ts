import { Client, Message } from 'discord.js'
import { getInfo } from 'ytdl-core'
import { prefix } from './config.json'
import { msgEmbed } from './recyclable/msgembed'

const client: Client = new Client

const fetch = require('node-fetch')
const ytdl = require('ytdl-core')
const { YOUTUBE_KEY } = process.env

client.on('message', async (message: Message) => {
    if (message.content.startsWith(`${prefix}play`)) {
        const msg = message.content
        if (message.member?.voice.channel) {

            if (!msg.split(`${prefix}play`)[1]) {
                return message.channel.send('SET A SONG')
            }
            const id = message.guild?.id
            const video = msg.split(`${prefix}play `)[1]
            const name = video.replace(' ', '-')

            //YOUTUBE API
            const url = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&q=${name}&key=${YOUTUBE_KEY}`)
                .then((res: any) => res.json())
                .then((data: any) => `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`)
                .catch((err: any) => console.log(err))

            //SET TITLE
            const title = await getInfo(url)
                .then(data => data.videoDetails.title)
                .catch(err => err)

            //CONNECTION
            const connection = await message.member.voice.channel.join();
            connection.play(ytdl(url, { filter: 'audioonly' })).on('finish',()=>{
                message.channel.send('finished')
            })

            //MESSAGE
            const embed = msgEmbed(url , title , 0xff0000)

            return message.channel.send(embed)
        }
        return message.channel.send('GO TO THE CHANNEL VOICE')
    }

    if (message.content.startsWith(`${prefix}leave`)) {
        message.member?.voice.channel?.leave()
    }
})

export { client }