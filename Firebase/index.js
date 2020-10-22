const app = require('firebase/app');
const auth = require('firebase/auth');
const database = require('firebase/database');
// import app from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/database'

const config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measuremendId: process.env.MEASUREMENT_ID,
}

app.initializeApp(config);

this.auth = app.auth();
this.db = app.database();

const logTheValue = (args) => {
    console.log('is this working?', args);
    this.db.ref(`activities`).set(args)

}
// module.exports = Firebase;
exports.logTheValue = logTheValue;