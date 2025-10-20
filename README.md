# wbk-bot

## Linguagens
Node.js

## Bibliotecas
discord.js
dotenv
sqlite
moment.js
node-cron

## Funcionalidades mínimas
1. XP automático por mensagem
- Cada mensagem gera XP
- XP aleatório ou fico
- Evitar spam (cooldown por usuário)

2. Level up
- Cada nível precisa de uma quantidade de XP (ex.: Level x 100)
- Mensagem automática quando o jogador sobe de nível

3. Ranking / Leaderboard
- !rank → mostra nível e XP do usuário
- !top10 → lista os 10 jogadores com mais XP

4. Roles automáticas
- R1, R2, R3 (ou apenas R3, se decidir)
- Adiciona role quando o jogador atinge o nível necessário

5. Mensagens de boas-vindas
- Pode incluir XP bônus inicial
- Link para regras, canais importantes

## Funcionalidades avançadas
- XP bônus por eventos, rally, doações na aliança
- Logs de XP e níveis em um canal específico (#logs-xp)
- Integração com comandos de equipe (ex.: !guild-stats)
- Dashboard web para ver rankings e estatísticas

## Estrutura do projeto

```bash
WBK-Bot/
│
├─ index.js               # Entrada principal do bot
├─ config/
│   ├─ config.json        # Configurações globais (prefixo, cores, XP, roles)
│   └─ roles.json         # Mapping de roles (R1, R2, R3)
├─ commands/              # Comandos do bot
│   ├─ rank.js            # Mostra rank do usuário
│   ├─ top10.js           # Mostra leaderboard
│   ├─ help.js            # Lista comandos
│   └─ xp.js              # Ajusta XP manualmente (admin)
├─ events/                # Eventos do Discord
│   ├─ messageCreate.js   # Mensagens (para XP)
│   ├─ guildMemberAdd.js  # Boas-vindas
│   └─ ready.js           # Quando o bot inicializa
├─ database/              # Banco de dados
│   ├─ db.js              # Conexão com SQLite ou MongoDB
│   └─ schema.sql         # Estrutura inicial do DB
├─ utils/                 # Funções auxiliares
│   ├─ xpManager.js       # Gerenciamento de XP e levels
│   ├─ roleManager.js     # Gerenciamento automático de roles
│   ├─ embedBuilder.js    # Criação de embeds personalizados
│   └─ logger.js          # Logs do bot
├─ assets/                # Emojis, imagens, gifs, ícones
└─ .env                   # Token do bot, configs sensíveis
```