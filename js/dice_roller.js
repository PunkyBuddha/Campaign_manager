/**
 * Grimório do Mestre - Rolador Universal de Dados RPG
 */
const DiceRoller = {
  roll(dieType, count = 1, mod = 0, advantageMode = 'normal') {
    // advantageMode: 'normal', 'advantage', 'disadvantage'
    const rolls = [];
    AudioStudio.playSFX('dice');

    if (dieType === 20 && (advantageMode === 'advantage' || advantageMode === 'disadvantage')) {
      const r1 = Math.floor(Math.random() * 20) + 1;
      const r2 = Math.floor(Math.random() * 20) + 1;
      const chosen = advantageMode === 'advantage' ? Math.max(r1, r2) : Math.min(r1, r2);
      const total = chosen + mod;

      if (chosen === 20) AudioStudio.playSFX('critical');
      else if (chosen === 1) AudioStudio.playSFX('miss');

      const resultObj = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        formula: `1d20 (${advantageMode === 'advantage' ? 'Vantagem' : 'Desvantagem'}) ${mod >= 0 ? '+' : ''}${mod}`,
        dieType: 20,
        rolls: [r1, r2],
        chosenRoll: chosen,
        discardedRoll: advantageMode === 'advantage' ? Math.min(r1, r2) : Math.max(r1, r2),
        advantageMode,
        mod,
        total,
        isNat20: chosen === 20,
        isNat1: chosen === 1
      };
      this._saveHistory(resultObj);
      return resultObj;
    }

    let subtotal = 0;
    for (let i = 0; i < count; i++) {
      const val = Math.floor(Math.random() * dieType) + 1;
      rolls.push(val);
      subtotal += val;
    }

    const total = subtotal + mod;
    const isNat20 = dieType === 20 && count === 1 && rolls[0] === 20;
    const isNat1 = dieType === 20 && count === 1 && rolls[0] === 1;

    if (isNat20) AudioStudio.playSFX('critical');
    else if (isNat1) AudioStudio.playSFX('miss');

    const resultObj = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      formula: `${count}d${dieType}${mod !== 0 ? (mod > 0 ? ' +' + mod : ' ' + mod) : ''}`,
      dieType,
      rolls,
      mod,
      total,
      isNat20,
      isNat1
    };

    this._saveHistory(resultObj);
    return resultObj;
  },

  rollFormula(formula) {
    // Ex: "2d6+3", "1d20-1", "1d8"
    formula = formula.trim().toLowerCase();
    const match = formula.match(/^(\d*)d(\d+)(?:\s*([+-])\s*(\d+))?$/);
    if (!match) {
      return this.roll(20, 1, 0);
    }
    const count = parseInt(match[1] || '1', 10);
    const die = parseInt(match[2], 10);
    const sign = match[3] === '-' ? -1 : 1;
    const mod = match[4] ? parseInt(match[4], 10) * sign : 0;
    return this.roll(die, count, mod);
  },

  _saveHistory(result) {
    const history = DB.get('diceHistory', []);
    history.unshift(result);
    if (history.length > 50) history.pop();
    DB.set('diceHistory', history);

    // Atualiza a interface da bandeja se estiver aberta
    if (window.renderDiceHistoryUI) {
      window.renderDiceHistoryUI();
    }
  },

  getHistory() {
    return DB.get('diceHistory', []);
  },

  clearHistory() {
    DB.set('diceHistory', []);
    if (window.renderDiceHistoryUI) {
      window.renderDiceHistoryUI();
    }
  }
};
