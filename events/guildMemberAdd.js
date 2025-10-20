const { title } = require('process');
const { EmbedBuilder } = require('../utils/embedBuilder');

module.exports = {
    name: 'guildMemberAdd',
    execute(member, client) {
      const channel = member.guild.systemChannel;
      if (!channel) return;

      const embed = EmbedBuilder ({
        title: `Bem-vindo(a), ${member.user.username}! ⚔️`,
        description: 'Prepare-se para o WBK! Leia #rules e escolha seu cargo em #roles.',
        color: 0x00ff00
      });

      channel.send({ embeds: [embed] });

      // Mais tarde dar XP inicial ao novo membro
      // const userData = await getUserData(member.id);
      // userData.xp += 50; // Dar 50 XP inicial
      // await userData.save();
    }
}