import { MessageEmbed } from 'discord.js'

const msgEmbed = (url:string , title:string, description:string) => {

    const embed = new MessageEmbed()
    
    embed.setTitle(title)
    embed.setColor('#12547c')
    embed.setURL(url)
    embed.setDescription(description)

    return <any>embed
}

export { msgEmbed }