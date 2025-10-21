// events/messageCreate.js
const { addXP } = require('../utils/xpManager');
const { getConfig } = require('../utils/config');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../utils/translation/config.json');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    if (message.author.bot || !message.guild) return;

    const prefix = getConfig('prefix');
    const defaultXP = getConfig('defaultXP');
    const isCommand = message.content.startsWith(prefix);

    // Se não for comando → ganha XP + botão de tradução
    if (!isCommand) {
      // 🎯 Sistema de XP
      const { leveledUp, newLevel } = addXP(
        message.guild.id,
        message.author.id,
        defaultXP
      );

      if (leveledUp) {
        await message.channel.send(
          `🎉 **${message.author.username}** subiu para o **nível ${newLevel}!** Parabéns! 🥳`
        );
      }

      // 🌐 Adiciona o botão de tradução
      try {
        const translateButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`translate_${message.id}`)
            .setEmoji('🔁') // ícone de duas setas opostas
            .setStyle(ButtonStyle.Secondary)
        );

        // Envia a mensagem do usuário + botão
        await message.channel.send({
          content: message.content,
          components: [translateButton],
        });

        // (Opcional) Deleta a original pra evitar duplicidade
        await message.delete().catch(() => {});
      } catch (err) {
        console.error('❌ Erro ao adicionar botão de tradução:', err);
      }

      return;
    }

    // ⚙️ Sistema de comandos
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
  },
};
