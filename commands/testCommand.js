const firebase = require('../Firebase/');
// var firebase = require('../firebase.json');
// var admin = require('firebase-admin');


// admin.initializeApp({
//     credential: admin.credential.cert(firebase)
// })

// const db = app.database();

module.exports = {
    name: 'testcommand',
    description: 'this is a testing command, ignore this shit',
    execute(message, args) {
        message.reply('I hope this works')
        console.log(args)
        firebase.logTheValue(args);
        // db.collection(`activities`).add({
        //     'games': `${args}`
        // })
    }
}