// events/interactionCreate.js
const { translateText } = require('../utils/translation/translator');
const config = require('../utils/translation/config.json');
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isButton()) return;
    if (!interaction.customId.startsWith('translate_')) return;

    const message = interaction.message;
    const originalText = message.content;

    const result = await translateText(originalText, config.defaultLanguage);
    if (!result)
      return interaction.reply({ content: '❌ Erro ao traduzir.', ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('🌐 Tradução')
      .setDescription(result.text)
      .setFooter({
        text: `De: ${result.from.toUpperCase()} → ${config.defaultLanguage.toUpperCase()}`,
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: config.translationEphemeral,
    });
  },
};
