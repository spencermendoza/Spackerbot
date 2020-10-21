const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
    name: 'activities',
    description: 'I\'ll just let you know what everyone is up to right now.',
    execute(message, args) {
        let members = message.channel.members.map(m => {
            let user = { name: m.user, status: m.user.presence.activities[0] }
            return user;
        });
        members.forEach(member => {
            if (member.status !== undefined) {
                console.log('activity: ', member.status.name)
                if (member.status.type === 'LISTENING') {
                    message.channel.send(`${member.name} is using ${member.status.name} to listen to ${member.status.state}`)
                } else if (member.status.type === 'PLAYING') {
                    message.channel.send(`${member.name} is playing ${member.status.name}`)
                }
            }
        })
        console.log('members: ', members)
    }
}