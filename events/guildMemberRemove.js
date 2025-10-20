// events/guildMemberRemove.js
module.exports = {
  name: 'guildMemberRemove',
  execute(member, client) {
    const channel = member.guild.systemChannel;
    if (!channel) return;

    channel.send(`${member.user.tag} deixou o servidor. 😢`);
  }
};