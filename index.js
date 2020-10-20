const Discord = require('discord.js');
require('dotenv').config();
const client = new Discord.Client();
const firebase = require('./Firebase/firebase');
// const token = require('./token.js');
const prefix = '!';
const fs = require('fs');

client.once('ready', () => {
    var now = new Date();
    console.log('this bot is online at: ', now);
})

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

client.on('message', msg => {
    var commandObjs = client.commands;
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const commands = commandObjs.map(c => {
        return c.name;
    });

    for (let i = 0; i < commands.length; i++) {
        if (command === 'commandlist') {
            client.commands.get(command).execute(msg, commandObjs);
            break;
        } else if (command === commands[i]) {
            client.commands.get(command).execute(msg, args);
        }
    }
})

client.on('message', msg => {
    if (msg.content === 'this thing working?') {
        msg.reply('I better be!');
    } else if (msg.content === 'this is weird because I\'m having a conversation with myself') {
        msg.reply('yeah it\'s almost like you\'re going crazy')
    } else if (msg.content === 'lol it\'s super easy. Took me like five minutes to get to just this') {
        msg.reply('you fuckin weirdo')
    } else if (msg.content === 'think you can find me a job?') {
        msg.reply('Jesus Christ couldn\'t find you a job in this economy')
    } else if (msg.content === 'time to get ready for work. see ya, spackerbot') {
        msg.reply('goodbye daddy youre the best')
    }
})

client.login();