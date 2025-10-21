// commands/translate.js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../utils/translation/config.json');

module.exports = {
  name: 'translate',
  description: 'Envia uma mensagem com botão de tradução.',
  async execute(message, args) {
    if (!args.length) return message.reply('Digite algo para traduzir!');

    const text = args.join(' ');

    // Envia a mensagem primeiro
    const sentMessage = await message.channel.send({ content: text });

    // Cria o botão com customId dinâmico
    const button = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`translate_${sentMessage.id}`) // 🔹 único por mensagem
        .setEmoji('🔁') // ícone das duas setas
        .setStyle(ButtonStyle.Secondary)
    );

    // Adiciona o botão à mensagem enviada
    await sentMessage.edit({ components: [button] });
  },
};
