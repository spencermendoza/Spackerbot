// const Discord = require('discord.js');
// const client = new Discord.Client();
// const firebase = require('../Firebase');

module.exports = {
    name: 'databasewrite',
    description: 'nobody will ever read this',
    execute(message, args) {
        // firebase.writeTestBranch(args);
        console.log(args);
        message.channel.send('this should be working')
    }
}