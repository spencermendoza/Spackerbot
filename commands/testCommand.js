const firebase = require('../Firebase/firebase');

module.exports = {
    name: 'testcommand',
    description: 'this is a testing command, ignore this shit',
    execute(message, args) {
        console.log('why isnt this working')
        message.channel.send('message working?');
        firebase.writeTestBranch(args)
    }
}