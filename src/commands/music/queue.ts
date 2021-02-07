import { Command, MessageEmbed } from "discord.js";
import { prefix } from "../../config.json";

const command: Command = {
    name: 'queue',
    description: `${prefix}q`,
    excute(client, message) {
        if (client.player.shuffle(message).tracks) {
            const embed = new MessageEmbed()
                .setColor('#2e86bb')
                .setTitle('Queue')
                .setImage(client.player.getQueue(message).tracks[0].thumbnail)
            for (const track of client.player.getQueue(message).tracks) {
                embed.addField(track.title, track.description, false)
            }
            message.channel.send(embed)
        }

    }
}

module.exports = command