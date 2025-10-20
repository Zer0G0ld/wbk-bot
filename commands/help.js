// commands/help.js
const { EmbedBuilder } = require('discord.js');
const { getConfig } = require('../utils/config');

module.exports = {
    name: 'help',
    description: 'Mostra a lista de comandos disponíveis.',
    async execute(message, args, client) {
        const prefix = getConfig('prefix');
        const commandsList = Array.from(client.commands.values())
            .map(cmd => `🔹 **${prefix}${cmd.name}** — ${cmd.description}`)
            .join('\n');

        const embed = new EmbedBuilder()
            .setColor(getConfig('embedColors').help)
            .setTitle('📜 Comandos WBK')
            .setDescription(commandsList)
            .setFooter({ text: 'WBK — Strength, Unity & Honor!', iconURL: message.guild.iconURL() })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
