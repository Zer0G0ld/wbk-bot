// commands/ranking.js
const { EmbedBuilder } = require('discord.js');
const { getTop10 } = require('../utils/xpManager');

module.exports = {
    name: 'ranking',
    description: 'Mostra o ranking dos 10 membros mais ativos do servidor.',
    async execute(message) {
        const top = getTop10(message.guild.id);

        if (!top.length)
            return message.reply('Ninguém tem XP ainda. Seja o primeiro a aparecer no ranking! 😎');

        const leaderboardArr = await Promise.all(top.map(async (u, i) => {
            let member = message.guild.members.cache.get(u.userId);
            if (!member) {
                try {
                    member = await message.guild.members.fetch(u.userId);
                } catch {
                    member = null;
                }
            }
            const name = member ? member.displayName : `Usuário desconhecido (${u.userId})`;
            const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '🔹';
            return `${medal} **${name}** — 🧠 ${u.xp.toLocaleString('pt-BR')} XP | 🏅 Nível ${u.level}`;
        }));

        const embed = new EmbedBuilder()
            .setColor('#ffcc00')
            .setTitle(`🏆 Ranking de Atividade - ${message.guild.name}`)
            .setDescription(leaderboardArr.join('\n'))
            .setFooter({ text: 'WBK — Strength, Unity & Honor!', iconURL: message.guild.iconURL() })
            .setTimestamp();

        await message.reply({ embeds: [embed] });
    }
};
