import { Command, MessageEmbed } from 'discord.js'
import { prefix } from '../../config.json'
import fetch from 'node-fetch'

import { animeApi } from '../../interfaces/animeApi'

const command: Command = {
    name: 'search',
    description: `${prefix}search`,
    async excute(client, message) {
        const msg = message.content.split(`${prefix}search `)
        const search = msg[1]
        if (!msg[1]) {
            return message.channel.send('Enter a name')
        }

        let animes: animeApi;
        await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${search}`, {
            headers: {
                'Accept': "application/vnd.api+json",
                'Content-Type': "application/vnd.api+json"
            }
        })
            .then(res => res.json())
            .then((data: animeApi) => {
                animes = data
                const url = `https://www.youtube.com/watch?v=${animes.data[0].attributes.youtubeVideoId}`
                const embed = new MessageEmbed()
                embed.setTitle(animes.data[0].attributes.canonicalTitle)
                embed.setDescription(animes.data[0].attributes.description)
                embed.setURL(url)
                embed.setImage(animes.data[0].attributes.posterImage.small)
                embed.addField('Status' , animes.data[0].attributes.status , true)
                embed.addField('Episodes' , animes.data[0].attributes.episodeCount , true)
                message.channel.send(embed)
            })
    }
}

module.exports = command