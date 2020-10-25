
const app = require('firebase/app');
const auth = require('firebase/auth');
const database = require('firebase/database');
const Discord = require('discord.js');
const client = new Discord.Client();

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

//The following three functions accept a user object and then do things with it
//runs handleUserCheck and if false runs addUser
const userHandler = (user) => {
    handleUserCheck(user);
}

//Adds a new endpoint for the user in the database
const addUser = (user) => {
    this.db.ref(`users/${user.username}`).set(user);
}

//Checks if a user exists as an endpoint in the db already
const handleUserCheck = (user) => {
    var exists;
    var userEndpoint = this.db.ref(`users/${user.username}`);
    userEndpoint.once('value')
        .then(function (snapshot) {
            exists = snapshot.exists();
            if (exists) {
                console.log('this user is in the db already')
            } else {
                addUser(user)
            }
        })
}

//following three functions accept an activity object and then do things with it
//Runs handleActivityCheck and if false runs addActivity
const activityHandler = (activity, user) => {
    console.log('activityHandler runs handleActivityCheck')
    handleActivityCheck(activity, user);
}

//checks if an activity is in the db, if so, checks if a user is in the activity list,
//else, creates an endpoint for the activity and adds the user to it
const handleActivityCheck = (activity, user) => {
    console.log('handleActivityCheck runs')
    var exists;
    var activityName = removeSpaces(activity.name).toLowerCase();
    var activityEndpoint = this.db.ref(`activities/${activityName}`)
    activityEndpoint.once('value')
        .then(function (snapshot) {
            exists = snapshot.exists();
            console.log('exists: ', exists)
            if (exists) {
                console.log('this activity is in the db already, running handleExistingActivity')
                // handleExistingActivity(activityName, user);
                checkPlayerInActivity(activityName, user)
            } else {
                console.log('this activity is not on the db yet, running addActivity')
                // addActivity(activityName, user);
                addNewPlayerToExistingActivity(activityName, user)
            }
        }).catch(error => {
            console.log(error)
        })
}

//checks if a user is on the list for the activity
// const handleExistingActivity = (activity, user) => {
//     console.log('running handleExistingActivity now')
//     checkPlayerInActivity(activity, user);
// }

//checks if a player is on the list for an activity, if so does nothing,
//else, adds player to the list
const checkPlayerInActivity = (activity, user) => {
    console.log('running checkPlayerInActivity')
    var exists;
    playerEndpointInActivity = this.db.ref(`activities/${activity}/${user}`);
    playerEndpointInActivity.once('value')
        .then(function (snapshot) {
            exists = snapshot.exists();
            if (exists) {
                console.log('this player is already on this activity\'s list')
                return;
            } else {
                console.log('this player is not already on the list, running addNewPlayerToExistingActivity')
                addNewPlayerToExistingActivity(activity, user);
            }
        })
}

//adds players to the list of users under an activity
const addNewPlayerToExistingActivity = (activity, user) => {
    this.db.ref(`activities/${activity}/${user}`).set(`users/${user}`);
}

const returnPlayerList = async function (args) {
    var exists;
    var gameName = args.join('');
    var playerList = [];
    gameName = removeSpaces(gameName).toLowerCase()
    console.log('returning data at endpoint: ', gameName)
    var playerList = this.db.ref(`activities/${gameName}/`)
    playerList.once('value')
        .then(function (snapshot) {
            exists = snapshot.exists()
            console.log('new exists: ', exists)
            snapshot.forEach(function (childSnapshot) {
                // var key = childSnapshot.key;
                // var childData = childSnapshot.val();
                var player = { key: childSnapshot.key, data: childSnapshot.val() }
                console.log(player)
                playerList.push(player);
                console.log('player: ', playerList)
            })
        })
}

//lol just take a guess
const removeSpaces = (string) => {
    var newString = string.split(" ").join("");
    return newString;
}

exports.userHandler = userHandler;
exports.activityHandler = activityHandler;
exports.returnPlayerList = returnPlayerList;