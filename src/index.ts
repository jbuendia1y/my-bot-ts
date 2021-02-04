import { config } from 'dotenv'
config();

const { DISCORD_TOKEN } = process.env

import { client } from './events'

client.on('ready', () => {
    console.log('BOT READY')
})

client.login(DISCORD_TOKEN)