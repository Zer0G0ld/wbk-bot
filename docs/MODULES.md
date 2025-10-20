# Documentação WBK Bot - Módulos

Este documento detalha a estrutura, funcionalidades e fluxo de cada módulo do WBK Bot, explicando o porquê da organização atual.

---

## 1️⃣ Commands

Localizados em `commands/`, cada comando é isolado em um arquivo para modularidade, facilitando manutenção e adição de novos comandos.

### Estrutura mínima de um comando:

- `name`: nome do comando
- `description`: descrição
- `execute(message, args, client)`: função principal

```js
module.exports = {
    name: 'nomeDoComando',
    description: 'Descrição do comando',
    async execute(message, args, client) { /* lógica do comando */ }
};
```

### Comandos atuais:

* **xp.js**
  Mostra o XP atual do usuário, nível, progresso e XP restante para o próximo nível, utilizando o `xpManager.js` e `EmbedBuilder`.

* **ranking.js**
  Exibe o ranking de membros mais ativos do servidor. Pega os dados do `xpManager.js` e gera embed com medalhas e estilo uniforme.

* **help.js**
  Lista todos os comandos disponíveis, gerando embed de forma padronizada.

* **ping.js**
  Checa se o bot está online.

* **rank.js**
  (opcional) Pode servir para mostrar informações de nível/XP individual detalhado.

**Por que isolamos os comandos:**

* Facilita a manutenção e adição de novos comandos sem mexer no core do bot.
* Cada comando é independente, tornando o bot escalável.

---

## 2️⃣ Events

Localizados em `events/`. Eventos são funções disparadas pelo Discord.js quando algo acontece no servidor.

### Eventos atuais:

* **messageCreate.js**

  * Captura mensagens e dispara comandos se o prefixo for usado.
  * Adiciona XP ao usuário quando envia mensagens regulares.
  * Por que: centraliza a lógica de comandos e XP, evitando duplicação.

* **guildMemberAdd.js**

  * Mensagem de boas-vindas para novos membros.
  * Por que: aumenta engajamento e dá instruções iniciais.

* **guildMemberRemove.js**

  * Mensagem de despedida ou log de saída.
  * Por que: registro de atividades e manutenção de logs.

* **ready.js**

  * Inicialização do bot e logs de status.
  * Por que: garante que o bot está pronto para interações e carrega configurações iniciais.

---

## 3️⃣ Utils

Funções auxiliares reutilizáveis, separadas para não poluir comandos ou eventos.

* **xpManager.js**

  * Funções: `addXP`, `getXP`, `getLevel`, `getTop10`.
  * Lida com cálculo de XP, níveis, ranking e persistência em JSON.
  * Por que: mantém lógica de gamificação centralizada e independente do restante do bot.

* **embedBuilder.js**

  * Cria embeds estilizados uniformemente (cores, rodapé, timestamp).
  * Por que: padroniza a aparência das mensagens enviadas pelo bot.

* **logger.js**

  * Centraliza logs de atividades e erros.
  * Por que: facilita depuração e monitoramento do bot.

* **roleManager.js**

  * Gerencia roles automaticamente com base em eventos ou níveis.
  * Por que: modulariza funções de gerenciamento de permissões e roles.

---

## 4️⃣ Database

* Localização: `database/xp.json`
* Estrutura: `{ guildId: { userId: { xp: Number } } }`
* Cache interno em memória para performance, com salvamento a cada 500ms.
* Por que: usar JSON simples mantém o bot leve e portátil sem depender de banco externo.

---

## 5️⃣ Estrutura e fluxo geral do bot

1. **Evento**: `messageCreate` → verifica se é comando ou mensagem normal.
2. **XP Manager**: atualiza XP do usuário e calcula nível, verificando se houve `leveledUp`.
3. **Comando**: executa função correspondente do arquivo em `commands/`.
4. **Embed Builder**: cria mensagem estilizada para o usuário com informações de XP, ranking, etc.
5. **Envio**: bot envia a resposta ao canal ou usuário via `message.reply()`.

**Resumo do fluxo:**

* Tudo começa com um evento do Discord.
* Se for mensagem normal, apenas XP é adicionado.
* Se for comando, o arquivo do comando é chamado, usando funções utilitárias quando necessário.
* A resposta final é sempre enviada como embed ou texto padronizado.
