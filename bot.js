const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences], partials: [Partials.Message, Partials.Channel, Partials.User, Partials.GuildMember]})
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

        if (command == "enable") {
            if (args[0] == "kick") {
                fs.readFile('./config.json', 'utf-8', function(e, d) {
                    if (e) throw e;
                    var j = JSON.parse(d);
                    j.kick = true;
                    j.monitor = false;
                    fs.writeFileSync('./config.json', JSON.stringify(j), 'utf8');
                    message.reply("successfully updated")
                })
            } else if (args[0] == "monitor") {
                fs.readFile('./config.json', 'utf-8', function(e, d) {
                    if (e) throw e;
                    var j = JSON.parse(d);
                    j.kick = false;
                    j.monitor = true
                    fs.writeFileSync('./config.json', JSON.stringify(j), 'utf8');
                    message.reply("successfully updated")
                })
            }
        } else if (command == "demistatus") {
            const user = await message.guild.members.fetch("455924243008585738");
            var statuses = {
                "online": "online",
                "dnd": "do not disturb",
                "idle": "idled"
            }

            if (user.presence == null) currentStatus = "offline"
            else currentStatus = statuses[user.presence.status] 

            const embed = new EmbedBuilder()
            .setTitle("Demi Status")
            .setDescription(`Demi is currently in '${currentStatus}'.`)

            message.reply({ content: 'demi is bad', embeds: [embed]})
        }
})

client.login(token)