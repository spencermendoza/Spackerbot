const { DiscordAPIError } = require('discord.js');
const firebase = require('../Firebase/');
const Discord = require('discord.js');

module.exports = {
    name: 'testcommand',
    description: 'this is a testing command, ignore this shit',
    execute(message, args) {
        var gameName = [];
        for (let i = 0; i < args.length; i++) {
            gameName.push(args[i].charAt(0).toUpperCase() + args[i].slice(1));
        }
        var editedGameName = gameName.join(' ');
        firebase.returnPlayerList(args).then(result => {
            console.log('result: ', result)
            var info = firebase.returnPlayerInfo(result)
            console.log('info: ', info)
            Promise.all(info).then((values) => {
                var userList = values.map(value => {
                    return value.id;
                })
                // var newEmbedMessage = new Discord.MessageEmbed()
                //     .setColor('pink')
                //     .setTitle(`Players who have played ${editedGameName}:`)
                //     .addField('Players: ', userList.map(u => {
                //         return `<@${u}>`
                //     }))
                //     .setFooter('let me know if you are getting tagged by this message')
                // message.channel.send(newEmbedMessage)
                message.channel.send(`These players have played ${editedGameName}:`)
                values.forEach(value => {
                    message.channel.send(`<@${value.id}>`);
                })
            })
        })
    }
}