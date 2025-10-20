# **Documentação do Módulo de Tradução - WBK Bot**

## 1️⃣ Objetivo

Criar um sistema de tradução que permita:

1. Traduzir mensagens enviadas pelo bot.
2. Traduzir mensagens de membros do servidor.
3. Tornar a tradução interativa usando **botões**, evitando poluição do chat.

---

## 2️⃣ Dependências

Para traduzir mensagens, você precisará de:

* **Node.js**
* **Discord.js v15** (já usado no bot)
* Uma biblioteca de tradução, por exemplo:

  * [`@vitalets/google-translate-api`](https://www.npmjs.com/package/@vitalets/google-translate-api) (gratuita)
  * Ou qualquer API de tradução de sua preferência (DeepL, Google Cloud Translate, etc.)

Instalação:

```bash
npm install @vitalets/google-translate-api
```

---

## 3️⃣ Estrutura de arquivos sugerida

```
wbk-bot/
├── commands/
│   └── translate.js        # Comando principal para tradução
├── utils/
│   └── translator.js       # Funções de tradução
├── events/
│   └── interactionCreate.js # Evento para lidar com botões
```

---

## 4️⃣ Configuração opcional

Você pode criar variáveis no `config.json` ou `roles.json` para:

```json
{
  "defaultLanguage": "pt",
  "translationButtonLabel": "🌐 Traduzir",
  "translationEphemeral": true
}
```

* `defaultLanguage`: idioma padrão para tradução do bot.
* `translationButtonLabel`: texto do botão que aparece na mensagem.
* `translationEphemeral`: define se a tradução só aparece para quem clicou.

---

## 5️⃣ Fluxo do módulo

1. Usuário ou bot envia mensagem que pode ser traduzida.
2. Bot envia **botão de tradução** junto com a mensagem.
3. Usuário clica no botão.
4. Evento `interactionCreate` é disparado.
5. Bot identifica o botão e chama função de tradução (`translator.js`).
6. Bot responde com a mensagem traduzida (**ephemeral** ou pública).

---

## 6️⃣ Exemplo de implementação

**utils/translator.js**

```js
const translate = require('@vitalets/google-translate-api');

async function translateText(text, targetLang = 'pt') {
    try {
        const res = await translate(text, { to: targetLang });
        return res.text;
    } catch (err) {
        console.error('Erro ao traduzir:', err);
        return null;
    }
}

module.exports = { translateText };
```

**commands/translate.js**

```js
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { translateText } = require('../utils/translator');
const config = require('../utils/config').getConfig();

module.exports = {
    name: 'translate',
    description: 'Envia uma mensagem do bot com botão de tradução.',
    async execute(message, args) {
        if (!args.length) return message.reply('Digite algo para traduzir!');

        const text = args.join(' ');

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('translate')
                .setLabel(config.translationButtonLabel || '🌐 Traduzir')
                .setStyle(ButtonStyle.Primary)
        );

        await message.channel.send({ content: text, components: [button] });
    }
};
```

**events/interactionCreate.js**

```js
const { translateText } = require('../utils/translator');
const config = require('../utils/config').getConfig();

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'translate') return;

        const translated = await translateText(interaction.message.content, config.defaultLanguage || 'pt');
        if (!translated) return interaction.reply({ content: '❌ Erro na tradução.', ephemeral: true });

        interaction.reply({ content: `🌐 Tradução: ${translated}`, ephemeral: config.translationEphemeral });
    }
};
```

---

## 7️⃣ Observações

* Tradução **não é automática**, é disparada pelo usuário clicando no botão.
* Mensagens traduzidas podem ser **ephemeral** para não poluir o chat.
* O botão pode ser adicionado em **qualquer mensagem do bot**.
* Futuramente você pode salvar o idioma preferido do usuário no banco e usar automaticamente.


----

# **Opções de bibliotecas e APIs de tradução para WBK Bot**

## 1️⃣ Gratuitas e Simples

### **1. `@vitalets/google-translate-api`**

* **Descrição:** Biblioteca não oficial que utiliza o Google Translate sem precisar de API Key.
* **Prós:**

  * Gratuita.
  * Fácil de instalar e usar (`npm install @vitalets/google-translate-api`).
  * Suporta muitos idiomas.
* **Contras:**

  * Não é oficial, portanto pode quebrar se o Google alterar o endpoint.
  * Limites de uso não documentados, depende de scraping.

### **2. `translate`**

* **Descrição:** Biblioteca Node.js que permite tradução com vários motores, incluindo Google, Yandex e LibreTranslate.
* **Prós:**

  * Suporta múltiplos serviços.
  * Pode trocar de backend sem mudar muito o código.
* **Contras:**

  * Alguns backends requerem API Key.
  * Dependendo do serviço gratuito, pode ter limite de requisições.

### **3. `LibreTranslate` (via biblioteca ou API REST)**

* **Descrição:** API de tradução gratuita e open-source.
* **Prós:**

  * Open source, pode hospedar seu próprio servidor.
  * Sem necessidade de conta oficial.
* **Contras:**

  * Limite de requisições na versão pública.
  * Tradução pode ser menos precisa que Google/DeepL.

---

## 2️⃣ APIs Oficiais (mais confiáveis, algumas pagas)

### **1. Google Cloud Translate**

* **Descrição:** API oficial do Google Translate.
* **Prós:**

  * Confiável, rápida e precisa.
  * Suporte oficial e manutenção garantida.
* **Contras:**

  * Pago após o free-tier.
  * Requer criar projeto no Google Cloud e usar API Key.
  * Integração um pouco mais complexa (`@google-cloud/translate`).

### **2. DeepL API**

* **Descrição:** API oficial do DeepL, excelente qualidade de tradução.
* **Prós:**

  * Tradução muito natural.
  * Suporta tradução de textos grandes.
* **Contras:**

  * Gratuito apenas para teste limitado.
  * Pago para uso em larga escala.
  * Requer autenticação com API Key.

### **3. Microsoft Translator (Azure Cognitive Services)**

* **Descrição:** API oficial da Microsoft.
* **Prós:**

  * Boa integração com outros serviços Azure.
  * Suporte corporativo e alta disponibilidade.
* **Contras:**

  * Pago após free-tier.
  * Necessário criar conta no Azure e obter chave de API.

---

## 3️⃣ Estratégia para o WBK Bot

* **Curto prazo / teste:** `@vitalets/google-translate-api` é suficiente, rápida de integrar, gratuita.
* **Médio prazo / confiabilidade:** `LibreTranslate` ou `translate` com backend gratuito.
* **Produção / uso intensivo:** Google Cloud Translate, DeepL ou Microsoft Translator para garantir estabilidade e qualidade.

---

## 4️⃣ Recomendação de Estrutura

Mesmo usando bibliotecas diferentes, você pode criar **um módulo `translator.js`** padronizado:

```text
utils/
└── translator.js  # Wrapper genérico que chama a biblioteca/API configurada
```

* Dessa forma, mudar de biblioteca ou API depois é simples.
* O comando `$translate` e o botão interativo continuam funcionando sem alterar nada fora do módulo.
