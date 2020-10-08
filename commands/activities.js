const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'activities',
    description: 'I\'ll just let you know what everyone is up to right now.',
    execute(message, args) {
        let users = message.channel.members.map(m => {
            return m.presence;
        });
        console.log(users)
    }
}