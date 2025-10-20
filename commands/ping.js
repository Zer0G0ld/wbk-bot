// commands/ping.js
// command: ping

module.exports = {
  name: 'ping',
  description: 'Checa se o bot está online.',
  execute(message, args, client) {
    message.channel.send('Pong! 🏓');
  }
}