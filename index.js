const { MessageEmbed } = require('discord.js');
// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Token for bot
const { token } = require('./config.json');
const greetings = ["Hi", "morning", "afternoon", "evening",
    "pleasure to meet you", "Hey", "whats up", "hi", "hello", "hey", "Hello"];

const botGreetings = ["Hi Human :smile:", "It’s a pleasure to meet you Human! :smile:", "Hey Human! :smile:", "What’s up Human! :smile:", "Hello Human! :smile:", "Have a great day Human! :smile:"];

var weather = require('weather-js');
const discordEmoji = require('discord-emoji')

// Create a new client instance
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

// When the client is ready, run this code
client.once('ready', () => {
    console.log('Ready!');
});


client.on("messageCreate", message => {
    if (message.author.bot) {
        // Do nothing
        return;
    }

    for (var i = 0; i < greetings.length; i++) {
        if (message.content.includes(greetings[i])) {
            var response = Math.floor((Math.random() * botGreetings.length));
            message.reply(botGreetings[response]);
            break;
        }
    }

    if (message.content.includes("!w")) {

        weather.find({ search: message.content.substring(message.content.indexOf(' ') + 1), degreeType: 'C' }, function (err, result) {
            let location = result[0].location;
            if (err) return message.channel.send(err)
            if (!location) return message.channel.send("Please enter a valid location! ");
            if (result === undefined || result.length === 0) return message.channel.send("You didn't specify a valid location");

            let current = result[0].current;
        
            const exampleEmbed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(`Weather Information for ${current.observationpoint}`)
                .setDescription(`**${current.skytext}**`)
                .setThumbnail('https://icons.iconarchive.com/icons/papirus-team/papirus-apps/512/weather-icon.png')
                .addFields(
                    { name: 'Temperature:', value: current.temperature + " \u00B0 C", inline: true },
                    { name: 'Feels like:', value: current.feelslike + " \u00B0 C", inline: true },
                    { name: 'Date:', value: current.date, inline: true},
                    { name: 'Wind Speed:', value: current.windspeed, inline: true },
                    { name: 'Humidity:', value: `${current.humidity}%`, inline: true },
                    { name: 'Time Zone:', value: `UTC ${location.timezone}`, inline: true },
                )
            message.reply({ embeds: [exampleEmbed] });
      
        });
    }

});

// Login to Discord with your client's token
client.login(token);
