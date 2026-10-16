/**
 * Grimório do Mestre - Rastreador de Combate & Iniciativa
 */
const CombatModule = {
  // Lista padrão de condições do D&D 5e
  CONDITIONS: [
    { id: 'blinded', name: 'Cego', desc: 'Falha automática em testes que exigem visão. Ataques contra têm vantagem; ataques do alvo têm desvantagem.' },
    { id: 'charmed', name: 'Encantado', desc: 'Não pode atacar quem o encantou. O encantador tem vantagem em testes sociais contra o alvo.' },
    { id: 'deafened', name: 'Surdo', desc: 'Falha automática em testes que exigem audição.' },
    { id: 'frightened', name: 'Amedrontado', desc: 'Desvantagem em testes e ataques enquanto a fonte do medo estiver na linha de visão. Não pode se aproximar voluntariamente.' },
    { id: 'grappled', name: 'Agarrado', desc: 'Deslocamento reduzido a 0. A condição encerra se o agarrador ficar incapacitado.' },
    { id: 'incapacitated', name: 'Incapacitado', desc: 'Não pode realizar ações nem reações.' },
    { id: 'invisible', name: 'Invisível', desc: 'Impossível de ver sem magia. Ataques contra têm desvantagem; ataques do alvo têm vantagem.' },
    { id: 'paralyzed', name: 'Paralisado', desc: 'Incapacitado e não pode se mover ou falar. Falha automática em testes de FOR e DES. Ataques contra têm vantagem e a 1,5m são acertos críticos automáticos.' },
    { id: 'petrified', name: 'Petrificado', desc: 'Transformado em pedra. Peso multiplicado por 10. Resistência a todo dano; imune a veneno e doenças.' },
    { id: 'poisoned', name: 'Envenenado', desc: 'Desvantagem em jogadas de ataque e testes de habilidade.' },
    { id: 'prone', name: 'Caído (Prone)', desc: 'Só pode rastejar. Ataques do alvo têm desvantagem. Ataques contra a 1,5m têm vantagem; à distância têm desvantagem.' },
    { id: 'restrained', name: 'Contido', desc: 'Deslocamento 0. Ataques do alvo e testes de DES têm desvantagem. Ataques contra têm vantagem.' },
    { id: 'stunned', name: 'Atordoado', desc: 'Incapacitado, não pode se mover e fala com dificuldade. Falha automática em FOR e DES. Ataques contra têm vantagem.' },
    { id: 'unconscious', name: 'Inconsciente', desc: 'Incapacitado, cai prostrado, larga o que segurava. Falha automática em FOR e DES. Ataques a 1,5m são acertos críticos automáticos.' },
    { id: 'concentrating', name: 'Concentrando', desc: 'Mantendo uma magia ativa. Ao sofrer dano, deve passar em Salvaguarda de CON (CD 10 ou metade do dano sofrido).' }
  ],

  init() {
    this.render();
  },

  getState() {
    return DB.get('activeCombat', {
      round: 1,
      turnIndex: 0,
      combatants: [],
      logs: []
    });
  },

  saveState(state) {
    DB.set('activeCombat', state);
    this.render();
  },

  addFromPlayer(charId) {
    const char = SheetsModule.getById(charId);
    if (!char) return;

    const state = this.getState();
    // Evita duplicatas de jogadores
    if (state.combatants.some(c => c.refId === char.id && c.type === 'player')) {
      App.showToast(`${char.name} já está no combate.`);
      return;
    }

    const dexMod = SheetsModule.calculateMod(char.stats.dex);
    const initRoll = Math.floor(Math.random() * 20) + 1 + (char.initiativeMod !== undefined ? char.initiativeMod : dexMod);

    state.combatants.push({
      id: 'cb_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      refId: char.id,
      type: 'player',
      name: char.name,
      sub: `${char.characterClass} Nv ${char.level} (${char.playerName || 'Jogador'})`,
      avatar: char.avatar || 'assets/characters/thorin.jpg',
      ac: char.ac,
      hpMax: char.hpMax,
      hpCurrent: char.hpCurrent,
      initiative: initRoll,
      initiativeMod: char.initiativeMod !== undefined ? char.initiativeMod : dexMod,
      conditions: []
    });

    this.sortByInitiative(state);
    this.saveState(state);
    App.showToast(`${char.name} adicionado ao combate!`);
  },

  addAllParty() {
    const players = SheetsModule.getAll();
    if (players.length === 0) {
      App.showToast('Nenhum jogador cadastrado.');
      return;
    }
    players.forEach(p => this.addFromPlayer(p.id));
  },

  addFromMonster(monster, count = 1) {
    const state = this.getState();
    const hpNum = monster.hpMax || parseInt(String(monster.hp).match(/\d+/)?.[0] || '10', 10);
    const initMod = monster.initiativeMod !== undefined ? monster.initiativeMod : 0;

    for (let i = 1; i <= count; i++) {
      const name = count > 1 ? `${monster.name} #${i}` : monster.name;
      const initRoll = Math.floor(Math.random() * 20) + 1 + initMod;

      state.combatants.push({
        id: 'cb_m_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substr(2, 4),
        refId: monster.id,
        type: 'monster',
        name: name,
        sub: `ND ${monster.cr} • ${monster.rawType || monster.type}`,
        avatar: 'assets/banner.jpg',
        ac: monster.ac,
        hpMax: hpNum,
        hpCurrent: hpNum,
        initiative: initRoll,
        initiativeMod: initMod,
        monsterRef: monster,
        conditions: []
      });
    }

    this.sortByInitiative(state);
    this.saveState(state);
  },

  addCustomCombatant() {
    const name = prompt('Nome da Criatura / NPC:', 'Bandido Misterioso');
    if (!name) return;
    const acStr = prompt('Classe de Armadura (CA):', '13');
    const hpStr = prompt('Pontos de Vida Máximos (PV):', '22');
    const initStr = prompt('Valor de Iniciativa:', '12');

    const state = this.getState();
    state.combatants.push({
      id: 'cb_c_' + Date.now(),
      refId: null,
      type: 'npc',
      name: name,
      sub: 'NPC / Criatura Especial',
      avatar: 'assets/banner.jpg',
      ac: parseInt(acStr, 10) || 10,
      hpMax: parseInt(hpStr, 10) || 10,
      hpCurrent: parseInt(hpStr, 10) || 10,
      initiative: parseInt(initStr, 10) || 10,
      initiativeMod: 0,
      conditions: []
    });

    this.sortByInitiative(state);
    this.saveState(state);
  },

  sortByInitiative(state) {
    state.combatants.sort((a, b) => (b.initiative || 0) - (a.initiative || 0));
  },

  rollAllInitiatives() {
    const state = this.getState();
    if (state.combatants.length === 0) return;

    AudioStudio.playSFX('dice');
    state.combatants.forEach(c => {
      const d20 = Math.floor(Math.random() * 20) + 1;
      c.initiative = d20 + (c.initiativeMod || 0);
    });

    this.sortByInitiative(state);
    state.turnIndex = 0;
    state.round = 1;
    this.saveState(state);
    App.showToast('Iniciativa rolada para todos os combatentes!');
  },

  rollMonsterInitiatives() {
    const state = this.getState();
    AudioStudio.playSFX('dice');
    state.combatants.forEach(c => {
      if (c.type === 'monster' || c.type === 'npc') {
        const d20 = Math.floor(Math.random() * 20) + 1;
        c.initiative = d20 + (c.initiativeMod || 0);
      }
    });
    this.sortByInitiative(state);
    this.saveState(state);
    App.showToast('Iniciativa rolada para os monstros!');
  },

  nextTurn() {
    const state = this.getState();
    if (state.combatants.length === 0) return;

    state.turnIndex++;
    if (state.turnIndex >= state.combatants.length) {
      state.turnIndex = 0;
      state.round++;
      AudioStudio.playSFX('victory');
      App.showToast(`Início da Rodada ${state.round}!`);
    } else {
      AudioStudio.playSFX('dice');
    }
    this.saveState(state);
  },

  prevTurn() {
    const state = this.getState();
    if (state.combatants.length === 0) return;

    state.turnIndex--;
    if (state.turnIndex < 0) {
      if (state.round > 1) {
        state.round--;
        state.turnIndex = state.combatants.length - 1;
      } else {
        state.turnIndex = 0;
      }
    }
    this.saveState(state);
  },

  adjustHP(combatantId, amount) {
    const state = this.getState();
    const c = state.combatants.find(x => x.id === combatantId);
    if (!c) return;

    c.hpCurrent = Math.max(0, Math.min(c.hpMax, c.hpCurrent + amount));

    // Se for jogador, sincroniza também na ficha principal do jogador
    if (c.type === 'player' && c.refId) {
      const p = SheetsModule.getById(c.refId);
      if (p) {
        p.hpCurrent = c.hpCurrent;
        SheetsModule.save(p);
      }
    }

    if (amount < 0) AudioStudio.playSFX('slash');
    else AudioStudio.playSFX('victory');

    this.saveState(state);
  },

  setHPDirect(combatantId, newHP) {
    const state = this.getState();
    const c = state.combatants.find(x => x.id === combatantId);
    if (!c) return;
    const val = parseInt(newHP, 10);
    if (isNaN(val)) return;
    c.hpCurrent = Math.max(0, Math.min(c.hpMax, val));
    if (c.type === 'player' && c.refId) {
      const p = SheetsModule.getById(c.refId);
      if (p) {
        p.hpCurrent = c.hpCurrent;
        SheetsModule.save(p);
      }
    }
    this.saveState(state);
  },

  setInitiativeDirect(combatantId, newInit) {
    const state = this.getState();
    const c = state.combatants.find(x => x.id === combatantId);
    if (!c) return;
    const val = parseInt(newInit, 10);
    if (isNaN(val)) return;
    c.initiative = val;
    this.sortByInitiative(state);
    this.saveState(state);
  },

  toggleCondition(combatantId, condId) {
    const state = this.getState();
    const c = state.combatants.find(x => x.id === combatantId);
    if (!c) return;

    if (!c.conditions) c.conditions = [];
    const idx = c.conditions.indexOf(condId);
    if (idx >= 0) {
      c.conditions.splice(idx, 1);
    } else {
      c.conditions.push(condId);
    }
    this.saveState(state);
  },

  removeCombatant(combatantId) {
    const state = this.getState();
    state.combatants = state.combatants.filter(x => x.id !== combatantId);
    if (state.turnIndex >= state.combatants.length) {
      state.turnIndex = Math.max(0, state.combatants.length - 1);
    }
    this.saveState(state);
  },

  clearCombat() {
    if (!confirm('Deseja realmente limpar e resetar todo o encontro de combate?')) return;
    const state = {
      round: 1,
      turnIndex: 0,
      combatants: [],
      logs: []
    };
    this.saveState(state);
    App.showToast('Encontro de combate resetado.');
  },

  render() {
    const container = document.getElementById('combat-list');
    const roundBadge = document.getElementById('combat-round-badge');
    const currentTurnName = document.getElementById('combat-current-turn-name');
    if (!container) return;

    const state = this.getState();
    if (roundBadge) roundBadge.innerText = `Rodada ${state.round}`;

    if (state.combatants.length === 0) {
      if (currentTurnName) currentTurnName.innerText = 'Nenhum combate ativo';
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">⚔️</div>
          <h3>Campo de Batalha Vazio</h3>
          <p>Adicione os heróis da campanha e selecione criaturas no Bestiário para iniciar a ordem de iniciativa.</p>
          <div style="display: flex; gap: 10px; justify-content: center; margin-top: 15px;">
            <button class="btn btn-primary" onclick="CombatModule.addAllParty()">🛡️ Adicionar Todo o Grupo</button>
            <button class="btn btn-secondary" onclick="App.switchTab('bestiary')">🐉 Abrir Bestiário</button>
          </div>
        </div>
      `;
      return;
    }

    const activeCombatant = state.combatants[state.turnIndex] || state.combatants[0];
    if (currentTurnName) {
      currentTurnName.innerText = `Turno de: ${activeCombatant.name}`;
    }

    container.innerHTML = state.combatants.map((c, idx) => {
      const isActive = idx === state.turnIndex;
      const isDead = c.hpCurrent <= 0;
      const hpPercent = Math.max(0, Math.min(100, Math.round((c.hpCurrent / c.hpMax) * 100)));

      let hpColor = 'var(--hp-green)';
      if (isDead) hpColor = '#475569';
      else if (hpPercent <= 25) hpColor = 'var(--hp-red)';
      else if (hpPercent <= 50) hpColor = 'var(--hp-yellow)';

      return `
        <div class="combatant-card ${isActive ? 'is-active-turn' : ''} ${isDead ? 'is-dead' : ''} ${c.type}">
          ${isActive ? '<div class="active-turn-indicator">▶ TURNO ATUAL</div>' : ''}

          <div class="combatant-left">
            <div class="combatant-init-box">
              <span class="init-label">INIC.</span>
              <input type="number" class="init-input" value="${c.initiative || 0}" onchange="CombatModule.setInitiativeDirect('${c.id}', this.value)" />
            </div>

            <div class="combatant-main-info">
              <div class="combatant-title-row">
                <h4 class="combatant-name">${c.name}</h4>
                <span class="badge ${c.type === 'player' ? 'badge-accent' : 'badge-danger'}">
                  ${c.type === 'player' ? 'Jogador' : 'Inimigo'}
                </span>
                ${isDead ? '<span class="badge badge-dark">💀 Inconsciente / Morto</span>' : ''}
              </div>
              <div class="combatant-sub">${c.sub || ''}</div>

              <!-- Badges de Condições Ativas -->
              <div class="conditions-badges-row">
                ${(c.conditions || []).map(condId => {
                  const cond = CombatModule.CONDITIONS.find(x => x.id === condId);
                  return `
                    <span class="condition-badge" title="${cond ? cond.desc : ''}">
                      ⚠️ ${cond ? cond.name : condId}
                      <span class="remove-cond" onclick="CombatModule.toggleCondition('${c.id}', '${condId}')">×</span>
                    </span>
                  `;
                }).join('')}
                <select class="select select-xs cond-select" onchange="if(this.value){ CombatModule.toggleCondition('${c.id}', this.value); this.value=''; }">
                  <option value="">+ Condição...</option>
                  ${CombatModule.CONDITIONS.map(cd => `
                    <option value="${cd.id}">${cd.name}</option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>

          <div class="combatant-right">
            <div class="combatant-ac-box">
              <span class="ac-label">CA</span>
              <span class="ac-value">${c.ac}</span>
            </div>

            <div class="combatant-hp-box">
              <div class="hp-row-text">
                <span>PV:</span>
                <input type="number" class="hp-direct-input" value="${c.hpCurrent}" onchange="CombatModule.setHPDirect('${c.id}', this.value)" />
                <span>/ ${c.hpMax}</span>
              </div>
              <div class="hp-bar-bg" style="width: 130px; height: 8px;">
                <div class="hp-bar-fill" style="width: ${hpPercent}%; background-color: ${hpColor};"></div>
              </div>
            </div>

            <div class="combatant-hp-quick-btns">
              <button class="btn btn-xs btn-danger" onclick="CombatModule.adjustHP('${c.id}', -5)">-5</button>
              <button class="btn btn-xs btn-danger" onclick="CombatModule.adjustHP('${c.id}', -1)">-1</button>
              <button class="btn btn-xs btn-success" onclick="CombatModule.adjustHP('${c.id}', 1)">+1</button>
              <button class="btn btn-xs btn-success" onclick="CombatModule.adjustHP('${c.id}', 5)">+5</button>
            </div>

            <div class="combatant-actions-col">
              ${c.type === 'player' ? `
                <button class="btn btn-xs btn-outline" title="Ver Ficha" onclick="SheetsModule.openDetailModal('${c.refId}')">📜 Ficha</button>
              ` : (c.refId ? `
                <button class="btn btn-xs btn-outline" title="Ver Monstro" onclick="BestiaryModule.openDetailModal('${c.refId}')">📖 Info</button>
              ` : '')}
              <button class="btn btn-xs btn-danger" title="Remover do Combate" onclick="CombatModule.removeCombatant('${c.id}')">✕</button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};
