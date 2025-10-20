// commands/xp.js
const { EmbedBuilder } = require('discord.js');
const { getXP } = require('../utils/xpManager');
const { getConfig } = require('../utils/config');

module.exports = {
    name: 'xp',
    description: 'Mostra seu XP e nível atual.',
    async execute(message) {
        const userXP = getXP(message.guild.id, message.author.id);
        const nextXP = getConfig('levels').baseXP * Math.pow(userXP.level + 1, 2);
        const remaining = nextXP - userXP.xp;

        const progressPercent = Math.floor((userXP.xp / nextXP) * 100);
        const progressBar = '▓'.repeat(progressPercent / 10) + '░'.repeat(10 - progressPercent / 10);

        const embed = new EmbedBuilder()
            .setColor(getConfig('embedColors').xp)
            .setTitle(`💫 Progresso de ${message.author.username}`)
            .setDescription(`**Nível:** ${userXP.level}\n**XP Atual:** ${userXP.xp.toLocaleString('pt-BR')}\n**Próximo Nível em:** ${remaining.toLocaleString('pt-BR')} XP`)
            .addFields({ name: 'Progresso', value: `\`${progressBar}\` (${progressPercent}%)` })
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: 'Continue ativo para subir de nível!' })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
