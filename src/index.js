const Discord = require("discord.js");
const {ls_dir, get_ip} = require('./command.js');
const speak = require('./speak.js');

require('dotenv').config();

const token = process.env.DISCORD_BOT_TOKEN;
if(token === undefined) {
    console.log("Error fetching the bot's API token - see .env.example for the required environment variables.");
    process.exit();
}

const prefix = "!";
const bot = new Discord.Client();

bot.on("ready", () =>{
    console.log("Bot is ready");
})
bot.on('message', async (msg) => {
    if(!msg.content.startsWith(prefix)){
        console.log('Message from ' + msg.author + ' at timestamp ' + msg.createdTimestamp + ' did not have prefix');
        return;
    }

    console.log('Recieved command ' + msg.content.trim());
    const channel = msg.channel;
    if(msg.content.trim() == "!ls"){
        ls_dir();
    }
    else if(msg.content.trim() == "!ip"){
        console.log('Finding local IP address...');
        get_ip().then((result) => {
            const [ipv4, ipv6] = result;
            channel.send('ipv4 address: ' + ipv4);
            channel.send('ipv6 address: ' + ipv6);
        }).catch(error =>{
            console.log(error);
        })
    }
    else if(msg.content.trim() == "!speak"){
        speak(bot);
    }
});

bot.login(token);