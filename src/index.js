require('dotenv').config();
const { Client, IntentsBitField, CategoryChannelChildManager, SlashCommandBuilder } = require('discord.js');
const{ RegisterCommands } = require('./register-commands')


const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`)
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping'){
        interaction.reply('Pong!');
    } else if (interaction.commandName === 'ban'){
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
    
        if (user) {
          try {
            await interaction.guild.members.ban(user, { reason: reason || 'No reason provided' });
            await interaction.reply(`User ${user.tag} has been banned. Reason: ${reason || 'No reason provided'}`);
          } catch (error) {
            console.error(error);
            await interaction.reply('There was an error trying to ban that user.');
          }
        } else {
          await interaction.reply('You need to specify a user to ban!');
        }
      }
    });

client.login(process.env.TOKEN)