import { MessageEmbed } from 'discord.js'

const msgEmbed = (url:string , title:string, description:string) => {

    const embed = new MessageEmbed()
    
    embed.title = title
    embed.color = 0xff0000
    embed.url = url
    embed.description = description

    return <any>embed
}

export { msgEmbed }