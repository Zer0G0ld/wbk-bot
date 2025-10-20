const { addXP } = require('../utils/xpManager');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot || !message.guild) return;

        const prefix = process.env.PREFIX;
        const isCommand = message.content.startsWith(prefix);

        // Ganha XP apenas por mensagens normais
        if (!isCommand) {
            const { leveledUp, newLevel } = addXP(message.guild.id, message.author.id, 10);
            if (leveledUp) {
                await message.channel.send(`🎉 **${message.author.username}** subiu para o **nível ${newLevel}!** Parabéns! 🥳`);
            }
            return;
        }

        // Processa comandos
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
