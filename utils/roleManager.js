// utils/roleManager.js
module.exports = {
    name: 'messageCreate',
    execute: async (message, client) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(process.env.PREFIX)) return;

        const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply('Ocorreu um erro ao executar esse comando.');
        }
    }
};
