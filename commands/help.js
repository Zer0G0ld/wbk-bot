// commands/help.js
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Mostra a lista de comandos disponíveis.',
    async execute(message, args, client) {
        const commandsList = Array.from(client.commands.values())
            .map(cmd => `🔹 **${process.env.PREFIX}${cmd.name}** — ${cmd.description}`)
            .join('\n');

        const embed = new EmbedBuilder()
            .setColor('#007bff')
            .setTitle('📜 Comandos WBK')
            .setDescription(commandsList)
            .setFooter({ text: 'WBK — Strength, Unity & Honor!', iconURL: message.guild.iconURL() })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
