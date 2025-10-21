// utils/translation/translator.js
const translate = require('@vitalets/google-translate-api');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // cache de 1h

async function translateText(text, targetLang = 'pt') {
  const key = `${text}-${targetLang}`;
  const cached = cache.get(key);
  if (cached) return cached;

  try {
    const res = await translate(text, { to: targetLang });
    const result = {
      text: res.text,
      from: res.from.language.iso
    };

    cache.set(key, result);
    return result;
  } catch (err) {
    console.error('❌ Erro ao traduzir:', err);

    // fallback simples (mantém original se falhar)
    return { text, from: 'auto' };
  }
}

module.exports = { translateText };
