import { MessageEmbed } from 'discord.js'

const msgEmbed = (url:string , title:string , color : any) => {

    const embed = new MessageEmbed()
    
    embed.title = title
    embed.color = color
    embed.url = url

    return embed
}

export { msgEmbed }