// events/messageCreate.js
const { addXP } = require('../utils/xpManager');
const { getConfig } = require('../utils/config');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        const prefix = getConfig('prefix'); // pega do config.json
        const defaultXP = getConfig('defaultXP'); // XP por mensagem
        const isCommand = message.content.startsWith(prefix);

        if (!isCommand) {
            const { leveledUp, newLevel } = addXP(message.guild.id, message.author.id, defaultXP);
            if (leveledUp) {
                await message.channel.send(`🎉 **${message.author.username}** subiu para o **nível ${newLevel}!** Parabéns! 🥳`);
            }
            return;
        }

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (err) {
            console.error(err);
            message.reply('❌ Ocorreu um erro ao executar esse comando.');
        }
    }
};
