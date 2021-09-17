const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const token = process.env.DISCORD_TOKEN

const prefix = '-'

client.once('ready', async () => {
    console.log('kick demi is a go')
})

client.on('guildMemberAdd', async member => {
    if (member.id === '455924243008585738') {
        console.log(`is demi!!!!`)
        member.kick();
        const channel = client.channels.cache.find(channel => channel.id === `874639389806956574`)
        channel.send(`I kicked demi because fuck demi`)
    } else if (!member.id === '455924243008585738') {
        console.log(`not demi not demi!!!`)
    }
})

client.on('messageCreate', async message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
     
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if(command === 'yes') {
            return message.channel.send('yes. i am ready to kick demi')
        }
})

client.login(token)