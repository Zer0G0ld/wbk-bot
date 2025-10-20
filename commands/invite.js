// commands/invite.js
module.exports = {
    name: 'invite',
    description: 'Gera um link de convite temporário para o servidor.',
    async execute(message) {
        if (!message.guild) return;

        try {
            // Gera o convite: expira em 1 dia (86400s), uso ilimitado (0)
            const invite = await message.channel.createInvite({
                maxAge: 86400, // 1 dia em segundos
                maxUses: 0,    // 0 = ilimitado
                unique: true   // gera link único
            });

            await message.reply(`✅ Feito! Ele tem duração de 1 dia.\nAqui está seu convite temporário: ${invite.url}`);
        } catch (err) {
            console.error(err);
            message.reply('❌ Não foi possível criar o convite. Verifique minhas permissões.');
        }
    }
};
