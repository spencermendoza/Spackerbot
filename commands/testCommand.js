const firebase = require('../Firebase/');

module.exports = {
    name: 'testcommand',
    description: 'this is a testing command, ignore this shit',
    execute(message, args) {
        // var game = args.join('');
        firebase.returnPlayerList(args);
    }
}