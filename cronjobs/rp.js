const mongoose = require('mongoose');
var CronJob = require('cron').CronJob;
const cronString = '*/30 8-23 * * *';
var cron = new CronJob(cronString, run, null, false, 'Europe/Warsaw');

const lastMessageSchema = require.main.require('./schemes/lastMessageSchema.js')
const LastMessage = mongoose.model('lastMessage', lastMessageSchema, 'lastMessage')

let channel;
let connector;
let c;

exports.setup = async (client) => {
    channel = client.channels.cache.get('834861877636497461');
    
    connector = client.connector;
    c = client;
    cron.start();
};

async function run() {
    let users = await connector.then(async () => {
        return await LastMessage.find({});
    })

    let now = new Date();
    let message = "";

    users.forEach(user => {
        let old = new Date(user.date);
        let time = now.getTime() - old.getTime();
        time = Math.round(time/1000);
        if(time > 36000) {
            let mention = c.users.cache.get(user.userID);
            message += `<@${mention.id}> `;
        }
    });

    if(message != "") {
        message += " odpiszcie na rp frajerzy!!!";
        let msg = await channel.send(message);
        setTimeout(() => {
            msg.delete();
        }, 1500)
    }
}