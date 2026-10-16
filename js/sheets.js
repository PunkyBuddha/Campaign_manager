/**
 * Grimório do Mestre - Módulo de Fichas de Jogadores (D&D 5e)
 */
const SheetsModule = {
  activeCharacterId: null,

  init() {
    this.render();
  },

  getAll() {
    return DB.get('players', []);
  },

  getById(id) {
    return this.getAll().find(p => p.id === id) || null;
  },

  save(character) {
    const players = this.getAll();
    const idx = players.findIndex(p => p.id === character.id);
    if (idx >= 0) {
      players[idx] = character;
    } else {
      players.push(character);
    }
    DB.set('players', players);
    this.render();
  },

  delete(id) {
    if (!confirm('Deseja realmente remover esta ficha de personagem?')) return;
    const players = this.getAll().filter(p => p.id !== id);
    DB.set('players', players);
    this.closeModal();
    this.render();
    App.showToast('Ficha de personagem removida.');
  },

  calculateMod(score) {
    return Math.floor((score - 10) / 2);
  },

  formatMod(mod) {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  },

  render() {
    const container = document.getElementById('players-grid');
    if (!container) return;

    const players = this.getAll();
    if (players.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🛡️</div>
          <h3>Nenhum herói cadastrado</h3>
          <p>Adicione as fichas dos seus jogadores para começar a gerenciar sua campanha.</p>
          <button class="btn btn-primary" onclick="SheetsModule.openCreateModal()">+ Criar Primeira Ficha</button>
        </div>
      `;
      return;
    }

    container.innerHTML = players.map(p => {
      const hpPercent = Math.max(0, Math.min(100, Math.round((p.hpCurrent / p.hpMax) * 100)));
      let hpColor = 'var(--hp-green)';
      if (hpPercent <= 25) hpColor = 'var(--hp-red)';
      else if (hpPercent <= 50) hpColor = 'var(--hp-yellow)';

      return `
        <div class="card character-card" onclick="SheetsModule.openDetailModal('${p.id}')">
          <div class="character-card-header">
            <img class="character-avatar" src="${p.avatar || 'assets/characters/thorin.jpg'}" alt="${p.name}" onerror="this.src='assets/banner.jpg'" />
            <div class="character-info">
              <div class="character-name-row">
                <h3 class="character-name">${p.name}</h3>
                ${p.inspiration ? '<span class="badge badge-gold" title="Inspiração Ativa">⭐ Inspiração</span>' : ''}
              </div>
              <div class="character-sub">${p.characterClass} Nv ${p.level} • ${p.race}</div>
              <div class="character-player">Jogador: <strong>${p.playerName || 'Desconhecido'}</strong></div>
            </div>
          </div>

          <div class="character-stats-bar">
            <div class="stat-pill">
              <span class="stat-label">CA</span>
              <span class="stat-value gold">${p.ac}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Iniciativa</span>
              <span class="stat-value">${this.formatMod(p.initiativeMod || this.calculateMod(p.stats.dex))}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Deslocamento</span>
              <span class="stat-value">${p.speed}m</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Percepção</span>
              <span class="stat-value">${p.passivePerception || 10}</span>
            </div>
          </div>

          <div class="hp-section">
            <div class="hp-text">
              <span>Pontos de Vida</span>
              <strong>${p.hpCurrent} / ${p.hpMax} ${p.hpTemp > 0 ? `<span class="hp-temp">+${p.hpTemp} temp</span>` : ''}</strong>
            </div>
            <div class="hp-bar-bg">
              <div class="hp-bar-fill" style="width: ${hpPercent}%; background-color: ${hpColor};"></div>
            </div>
          </div>

          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn btn-sm btn-combat" onclick="CombatModule.addFromPlayer('${p.id}')">
              ⚔️ Enviar ao Combate
            </button>
            <button class="btn btn-sm btn-secondary" onclick="SheetsModule.openDetailModal('${p.id}')">
              📜 Ver Ficha
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  openDetailModal(id) {
    const char = this.getById(id);
    if (!char) return;
    this.activeCharacterId = id;

    const modal = document.getElementById('sheet-modal');
    const content = document.getElementById('sheet-modal-content');
    if (!modal || !content) return;

    const strMod = this.calculateMod(char.stats.str);
    const dexMod = this.calculateMod(char.stats.dex);
    const conMod = this.calculateMod(char.stats.con);
    const intMod = this.calculateMod(char.stats.int);
    const wisMod = this.calculateMod(char.stats.wis);
    const chaMod = this.calculateMod(char.stats.cha);

    const prof = char.proficiencyBonus || 2;

    content.innerHTML = `
      <div class="sheet-container">
        <!-- Cabeçalho da Ficha D&D 5e -->
        <div class="sheet-header">
          <div class="sheet-avatar-wrap">
            <img class="sheet-avatar-img" src="${char.avatar || 'assets/characters/thorin.jpg'}" alt="${char.name}" onerror="this.src='assets/banner.jpg'" />
          </div>
          <div class="sheet-title-info">
            <div class="sheet-hero-row">
              <h2 class="sheet-hero-name">${char.name}</h2>
              <div class="sheet-badges">
                <span class="badge badge-accent">${char.race}</span>
                <span class="badge badge-purple">${char.characterClass} Nível ${char.level}</span>
                <span class="badge badge-outline">${char.alignment || 'Neutro'}</span>
                <span class="badge badge-dark">Jogador: ${char.playerName || 'Mestre'}</span>
              </div>
            </div>
            <div class="sheet-quick-vitals">
              <div class="vital-box">
                <div class="vital-label">Classe de Armadura (CA)</div>
                <div class="vital-value gold">${char.ac}</div>
              </div>
              <div class="vital-box">
                <div class="vital-label">Iniciativa</div>
                <div class="vital-value">${this.formatMod(char.initiativeMod !== undefined ? char.initiativeMod : dexMod)}</div>
              </div>
              <div class="vital-box">
                <div class="vital-label">Bônus Proficiência</div>
                <div class="vital-value">+${prof}</div>
              </div>
              <div class="vital-box">
                <div class="vital-label">Percepção Passiva</div>
                <div class="vital-value">${char.passivePerception || 10}</div>
              </div>
            </div>
          </div>
          <div class="sheet-actions-top">
            <button class="btn btn-sm btn-combat" onclick="CombatModule.addFromPlayer('${char.id}')">⚔️ Combate</button>
            <button class="btn btn-sm btn-secondary" onclick="SheetsModule.openEditModal('${char.id}')">✏️ Editar</button>
            <button class="btn btn-sm btn-danger" onclick="SheetsModule.delete('${char.id}')">🗑️ Excluir</button>
          </div>
        </div>

        <!-- PV e Dados de Vida -->
        <div class="sheet-hp-panel">
          <div class="sheet-hp-display">
            <div class="hp-info-row">
              <span>Pontos de Vida Atuais: <strong id="sheet-hp-val">${char.hpCurrent}</strong> / ${char.hpMax}</span>
              ${char.hpTemp > 0 ? `<span class="hp-temp">+${char.hpTemp} Temporários</span>` : ''}
              <span>Dados de Vida: <strong>${char.hitDice || '1d8'}</strong></span>
            </div>
            <div class="hp-bar-bg" style="height: 10px;">
              <div class="hp-bar-fill" id="sheet-hp-bar" style="width: ${Math.max(0, Math.min(100, (char.hpCurrent / char.hpMax) * 100))}%; background: var(--hp-green);"></div>
            </div>
          </div>
          <div class="hp-adjust-controls">
            <button class="btn btn-sm btn-danger" onclick="SheetsModule.adjustHP('${char.id}', -5)">-5 PV</button>
            <button class="btn btn-sm btn-danger" onclick="SheetsModule.adjustHP('${char.id}', -1)">-1 PV</button>
            <input type="number" id="hp-custom-input" class="input input-sm" placeholder="Qtd" style="width: 70px;" />
            <button class="btn btn-sm btn-danger" onclick="SheetsModule.applyCustomHP('${char.id}', 'damage')">Dano</button>
            <button class="btn btn-sm btn-success" onclick="SheetsModule.applyCustomHP('${char.id}', 'heal')">Curar</button>
            <button class="btn btn-sm btn-success" onclick="SheetsModule.adjustHP('${char.id}', 5)">+5 PV</button>
          </div>
        </div>

        <!-- Grade de Atributos Principais D&D 5e -->
        <div class="attributes-grid">
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${strMod}); App.showToast('Rolou Teste de FOR!')">
            <div class="attr-name">FORÇA</div>
            <div class="attr-mod">${this.formatMod(strMod)}</div>
            <div class="attr-score">${char.stats.str}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${dexMod}); App.showToast('Rolou Teste de DES!')">
            <div class="attr-name">DESTREZA</div>
            <div class="attr-mod">${this.formatMod(dexMod)}</div>
            <div class="attr-score">${char.stats.dex}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${conMod}); App.showToast('Rolou Teste de CON!')">
            <div class="attr-name">CONSTITUIÇÃO</div>
            <div class="attr-mod">${this.formatMod(conMod)}</div>
            <div class="attr-score">${char.stats.con}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${intMod}); App.showToast('Rolou Teste de INT!')">
            <div class="attr-name">INTELIGÊNCIA</div>
            <div class="attr-mod">${this.formatMod(intMod)}</div>
            <div class="attr-score">${char.stats.int}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${wisMod}); App.showToast('Rolou Teste de SAB!')">
            <div class="attr-name">SABEDORIA</div>
            <div class="attr-mod">${this.formatMod(wisMod)}</div>
            <div class="attr-score">${char.stats.wis}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
          <div class="attr-box" onclick="DiceRoller.roll(20, 1, ${chaMod}); App.showToast('Rolou Teste de CAR!')">
            <div class="attr-name">CARISMA</div>
            <div class="attr-mod">${this.formatMod(chaMod)}</div>
            <div class="attr-score">${char.stats.cha}</div>
            <div class="attr-roll-hint">🎲 Rolar d20</div>
          </div>
        </div>

        <!-- Abas Internas da Ficha: Ataques, Habilidades, Magias, Inventário -->
        <div class="sheet-tabs-nav">
          <button class="sheet-tab-btn active" onclick="SheetsModule.switchSubTab('attacks', this)">⚔️ Ataques & Ações</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('traits', this)">🌟 Características & Talentos</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('spells', this)">✨ Magias & Espaços</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('inventory', this)">🎒 Equipamento & Notas</button>
        </div>

        <div class="sheet-tab-content" id="subtab-attacks">
          <div class="attacks-list">
            ${(char.attacks || []).map(atk => `
              <div class="attack-card">
                <div class="attack-header">
                  <strong>${atk.name}</strong>
                  <span class="badge badge-accent">${atk.bonus} para acertar</span>
                </div>
                <div class="attack-damage">${atk.damage}</div>
                <button class="btn btn-xs btn-primary" onclick="DiceRoller.rollFormula('1d20${atk.bonus}'); App.showToast('Ataque com ${atk.name}!')">
                  🎲 Rolar Ataque
                </button>
              </div>
            `).join('') || '<p class="text-muted">Nenhum ataque cadastrado.</p>'}
          </div>
        </div>

        <div class="sheet-tab-content" id="subtab-traits" style="display: none;">
          <div class="traits-list">
            ${(char.traits || []).map(t => `
              <div class="trait-item">
                <div class="trait-name">${t.name}</div>
                <div class="trait-desc">${t.desc}</div>
              </div>
            `).join('') || '<p class="text-muted">Nenhuma característica especial registrada.</p>'}
          </div>
        </div>

        <div class="sheet-tab-content" id="subtab-spells" style="display: none;">
          <div class="spell-slots-tracker">
            <h4>Espaços de Magia</h4>
            <div class="slots-row">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
                const slot = (char.spellSlots && char.spellSlots[lvl]) || { max: 0, used: 0 };
                if (slot.max === 0) return '';
                return `
                  <div class="slot-badge">
                    <span>${lvl}º Círculo:</span>
                    <strong>${slot.max - slot.used} / ${slot.max}</strong>
                    <button class="btn btn-xs btn-outline" onclick="SheetsModule.useSpellSlot('${char.id}', ${lvl})">-1 Slot</button>
                    <button class="btn btn-xs btn-outline" onclick="SheetsModule.restoreSpellSlot('${char.id}', ${lvl})">+1 Slot</button>
                  </div>
                `;
              }).join('') || '<span class="text-muted">Este personagem não possui espaços de magia ativos no nível atual.</span>'}
            </div>
          </div>

          <div class="character-spells-list">
            <h4>Grimório de Magias Conhecidas</h4>
            <div class="spells-grid-cards">
              ${(char.spells || []).map(sp => `
                <div class="spell-card-mini">
                  <div class="spell-card-mini-title">${sp.name}</div>
                  <div class="spell-card-mini-meta">${sp.level === 0 ? 'Truque' : sp.level + 'º Nível'} • ${sp.school}</div>
                  <div class="spell-card-mini-desc">${sp.desc}</div>
                </div>
              `).join('') || '<p class="text-muted">Nenhuma magia adicionada.</p>'}
            </div>
          </div>
        </div>

        <div class="sheet-tab-content" id="subtab-inventory" style="display: none;">
          <div class="inventory-section">
            <h4>🎒 Itens & Equipamentos</h4>
            <div class="inventory-box">${char.inventory ? char.inventory.replace(/\n/g, '<br>') : 'Mochila vazia.'}</div>
            <h4 style="margin-top: 1rem;">📜 Histórico & Anotações</h4>
            <div class="inventory-box">${char.notes ? char.notes.replace(/\n/g, '<br>') : 'Sem anotações.'}</div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  switchSubTab(tabName, btn) {
    document.querySelectorAll('.sheet-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    ['attacks', 'traits', 'spells', 'inventory'].forEach(t => {
      const el = document.getElementById('subtab-' + t);
      if (el) el.style.display = t === tabName ? 'block' : 'none';
    });
  },

  adjustHP(id, amount) {
    const char = this.getById(id);
    if (!char) return;
    char.hpCurrent = Math.max(0, Math.min(char.hpMax, char.hpCurrent + amount));
    this.save(char);
    this.openDetailModal(id);
    App.showToast(`${char.name}: ${char.hpCurrent}/${char.hpMax} PV`);
  },

  applyCustomHP(id, type) {
    const input = document.getElementById('hp-custom-input');
    if (!input || !input.value) return;
    const val = parseInt(input.value, 10);
    if (isNaN(val) || val <= 0) return;

    if (type === 'damage') {
      this.adjustHP(id, -val);
      AudioStudio.playSFX('slash');
    } else {
      this.adjustHP(id, val);
      AudioStudio.playSFX('victory');
    }
    input.value = '';
  },

  useSpellSlot(id, level) {
    const char = this.getById(id);
    if (!char || !char.spellSlots || !char.spellSlots[level]) return;
    if (char.spellSlots[level].used < char.spellSlots[level].max) {
      char.spellSlots[level].used++;
      this.save(char);
      this.openDetailModal(id);
      AudioStudio.playSFX('fireball');
    }
  },

  restoreSpellSlot(id, level) {
    const char = this.getById(id);
    if (!char || !char.spellSlots || !char.spellSlots[level]) return;
    if (char.spellSlots[level].used > 0) {
      char.spellSlots[level].used--;
      this.save(char);
      this.openDetailModal(id);
    }
  },

  closeModal() {
    const modal = document.getElementById('sheet-modal');
    if (modal) modal.classList.remove('active');
    this.activeCharacterId = null;
  },

  openCreateModal() {
    this.openEditModal(null);
  },

  openEditModal(id) {
    const isEdit = !!id;
    const char = isEdit ? this.getById(id) : {
      id: 'char_' + Date.now(),
      name: '',
      playerName: '',
      race: 'Humano',
      characterClass: 'Guerreiro',
      level: 1,
      ac: 14,
      hpMax: 12,
      hpCurrent: 12,
      speed: 30,
      initiativeMod: 0,
      passivePerception: 10,
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      attacks: [{ name: 'Ataque Básico', bonus: '+3', damage: '1d8+2' }],
      traits: [],
      inventory: '',
      notes: ''
    };

    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    title.innerText = isEdit ? `Editar Ficha: ${char.name}` : 'Criar Nova Ficha de Personagem';
    body.innerHTML = `
      <form id="char-form" onsubmit="SheetsModule.handleFormSubmit(event, '${char.id}', ${isEdit})">
        <div class="form-row">
          <div class="form-group">
            <label>Nome do Personagem *</label>
            <input type="text" id="form-name" class="input" value="${char.name}" required />
          </div>
          <div class="form-group">
            <label>Nome do Jogador</label>
            <input type="text" id="form-player" class="input" value="${char.playerName || ''}" />
          </div>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label>Classe</label>
            <input type="text" id="form-class" class="input" value="${char.characterClass || ''}" required />
          </div>
          <div class="form-group">
            <label>Nível</label>
            <input type="number" id="form-level" class="input" value="${char.level || 1}" min="1" max="20" required />
          </div>
          <div class="form-group">
            <label>Raça</label>
            <input type="text" id="form-race" class="input" value="${char.race || ''}" required />
          </div>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label>Classe de Armadura (CA)</label>
            <input type="number" id="form-ac" class="input" value="${char.ac || 10}" required />
          </div>
          <div class="form-group">
            <label>Pontos de Vida Máximos (PV)</label>
            <input type="number" id="form-hp-max" class="input" value="${char.hpMax || 10}" required />
          </div>
          <div class="form-group">
            <label>PV Atual</label>
            <input type="number" id="form-hp-current" class="input" value="${char.hpCurrent || 10}" required />
          </div>
        </div>

        <h4>Atributos Principais (Valores de 1 a 30)</h4>
        <div class="form-row-6">
          <div class="form-group">
            <label>FOR</label>
            <input type="number" id="form-str" class="input" value="${char.stats.str}" min="1" max="30" />
          </div>
          <div class="form-group">
            <label>DES</label>
            <input type="number" id="form-dex" class="input" value="${char.stats.dex}" min="1" max="30" />
          </div>
          <div class="form-group">
            <label>CON</label>
            <input type="number" id="form-con" class="input" value="${char.stats.con}" min="1" max="30" />
          </div>
          <div class="form-group">
            <label>INT</label>
            <input type="number" id="form-int" class="input" value="${char.stats.int}" min="1" max="30" />
          </div>
          <div class="form-group">
            <label>SAB</label>
            <input type="number" id="form-wis" class="input" value="${char.stats.wis}" min="1" max="30" />
          </div>
          <div class="form-group">
            <label>CAR</label>
            <input type="number" id="form-cha" class="input" value="${char.stats.cha}" min="1" max="30" />
          </div>
        </div>

        <div class="form-group">
          <label>Equipamento & Itens</label>
          <textarea id="form-inventory" class="textarea" rows="3">${char.inventory || ''}</textarea>
        </div>

        <div class="form-group">
          <label>Anotações da Campanha</label>
          <textarea id="form-notes" class="textarea" rows="3">${char.notes || ''}</textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="App.closeFormModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">💾 Salvar Personagem</button>
        </div>
      </form>
    `;

    modal.classList.add('active');
  },

  handleFormSubmit(e, id, isEdit) {
    e.preventDefault();
    const existing = isEdit ? this.getById(id) : {};

    const char = {
      ...existing,
      id: id || ('char_' + Date.now()),
      name: document.getElementById('form-name').value.trim(),
      playerName: document.getElementById('form-player').value.trim(),
      characterClass: document.getElementById('form-class').value.trim(),
      level: parseInt(document.getElementById('form-level').value, 10) || 1,
      race: document.getElementById('form-race').value.trim(),
      ac: parseInt(document.getElementById('form-ac').value, 10) || 10,
      hpMax: parseInt(document.getElementById('form-hp-max').value, 10) || 10,
      hpCurrent: parseInt(document.getElementById('form-hp-current').value, 10) || 10,
      speed: existing.speed || 30,
      initiativeMod: existing.initiativeMod || 0,
      passivePerception: existing.passivePerception || 10,
      stats: {
        str: parseInt(document.getElementById('form-str').value, 10) || 10,
        dex: parseInt(document.getElementById('form-dex').value, 10) || 10,
        con: parseInt(document.getElementById('form-con').value, 10) || 10,
        int: parseInt(document.getElementById('form-int').value, 10) || 10,
        wis: parseInt(document.getElementById('form-wis').value, 10) || 10,
        cha: parseInt(document.getElementById('form-cha').value, 10) || 10
      },
      inventory: document.getElementById('form-inventory').value,
      notes: document.getElementById('form-notes').value,
      attacks: existing.attacks || [{ name: 'Ataque Padrão', bonus: '+3', damage: '1d8+2' }],
      traits: existing.traits || [],
      spells: existing.spells || [],
      spellSlots: existing.spellSlots || {},
      avatar: existing.avatar || 'assets/characters/thorin.jpg'
    };

    this.save(char);
    App.closeFormModal();
    App.showToast(`Personagem "${char.name}" salvo com sucesso!`);
  }
};
