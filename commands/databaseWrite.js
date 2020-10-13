// const Discord = require('discord.js');
// const client = new Discord.Client();
const firebase = require('../Firebase/firebase');

module.exports = {
    name: 'testing writing to the database',
    description: 'nobody will ever read this',
    execute(message, args) {
        // firebase.writeTestBranch(args);
        // console.log(args);
        message.channel.send('this should be working')
    }
}