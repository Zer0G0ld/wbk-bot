// utils/xpManager.js
const fs = require('fs');
const path = require('path');

const XP_PATH = path.join(__dirname, '../database/xp.json');
if (!fs.existsSync(XP_PATH)) fs.writeFileSync(XP_PATH, JSON.stringify({}));

let cache = null;
let saveTimeout = null;

function load() {
    if (cache) return cache;
    try {
        cache = JSON.parse(fs.readFileSync(XP_PATH, 'utf8'));
    } catch {
        cache = {};
    }
    return cache;
}

function save(force = false) {
    if (saveTimeout && !force) return;
    saveTimeout = setTimeout(() => {
        fs.writeFileSync(XP_PATH, JSON.stringify(cache, null, 2));
        saveTimeout = null;
    }, 500);
}

function getLevel(xp) {
    return Math.floor(0.1 * Math.sqrt(xp));
}

function getNextLevelXP(level) {
    return Math.floor(Math.pow((level + 1) / 0.1, 2));
}

function addXP(guildId, userId, amount = 10) {
    const data = load();
    if (!data[guildId]) data[guildId] = {};
    if (!data[guildId][userId]) data[guildId][userId] = { xp: 0 };

    const user = data[guildId][userId];
    const oldXP = user.xp;
    const newXP = oldXP + amount;

    const oldLevel = getLevel(oldXP);
    const newLevel = getLevel(newXP);
    const leveledUp = newLevel > oldLevel;

    user.xp = newXP;
    save();

    return { xp: newXP, level: newLevel, newLevel, leveledUp };
}

function getXP(guildId, userId) {
    const data = load();
    const xp = data[guildId]?.[userId]?.xp ?? 0;
    const level = getLevel(xp);
    const nextLevelXP = getNextLevelXP(level);
    const remaining = nextLevelXP - xp;
    return { xp, level, nextLevelXP, remaining };
}

function getTop10(guildId, limit = 10) {
    const data = load();
    const guildData = data[guildId] || {};
    return Object.entries(guildData)
        .sort(([, a], [, b]) => b.xp - a.xp)
        .slice(0, limit)
        .map(([userId, info], i) => ({
            rank: i + 1,
            userId,
            xp: info.xp,
            level: getLevel(info.xp)
        }));
}

module.exports = { addXP, getXP, getLevel, getTop10 };
