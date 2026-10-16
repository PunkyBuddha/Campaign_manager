/**
 * Grimório do Mestre - Módulo de Fichas de Jogadores (D&D 5e)
 * Gerenciamento 100% completo pela interface: alteração de nível com 1 clique,
 * editor detalhado de atributos, salvaguardas, 18 perícias oficiais, ataques, magias e inventário.
 */
const SheetsModule = {
  activeCharacterId: null,

  // Lista oficial das 18 perícias do D&D 5e e seus atributos base
  SKILLS_DEF: [
    { key: "athletics", name: "Atletismo", attr: "str" },
    { key: "acrobatics", name: "Acrobacia", attr: "dex" },
    { key: "sleightOfHand", name: "Prestidigitação", attr: "dex" },
    { key: "stealth", name: "Furtividade", attr: "dex" },
    { key: "arcana", name: "Arcanismo", attr: "int" },
    { key: "history", name: "História", attr: "int" },
    { key: "investigation", name: "Investigação", attr: "int" },
    { key: "nature", name: "Natureza", attr: "int" },
    { key: "religion", name: "Religião", attr: "int" },
    { key: "animalHandling", name: "Adestrar Animais", attr: "wis" },
    { key: "insight", name: "Intuição", attr: "wis" },
    { key: "medicine", name: "Medicina", attr: "wis" },
    { key: "perception", name: "Percepção", attr: "wis" },
    { key: "survival", name: "Sobrevivência", attr: "wis" },
    { key: "deception", name: "Enganação", attr: "cha" },
    { key: "intimidation", name: "Intimidação", attr: "cha" },
    { key: "performance", name: "Atuação", attr: "cha" },
    { key: "persuasion", name: "Persuasão", attr: "cha" }
  ],

  AVATAR_PRESETS: [
    { name: "Thorin / Jeremias", url: "assets/characters/thorin.jpg" },
    { name: "Lyra / Fiora", url: "assets/characters/lyra.jpg" },
    { name: "Kaelen / Fargo", url: "assets/characters/kaelen.jpg" },
    { name: "Varis / Andarna", url: "assets/characters/varis.jpg" },
    { name: "Guerreiro Anão", url: "assets/characters/dwarf_warrior_portrait_1792084269444.jpg" },
    { name: "Mago Elfo", url: "assets/characters/elf_wizard_portrait_1792084299799.jpg" },
    { name: "Ladino Humano", url: "assets/characters/rogue_portrait_1792084335446.jpg" },
    { name: "Clérigo Humano", url: "assets/characters/cleric_portrait_1792084383148.jpg" }
  ],

  init() {
    // Sincroniza automaticamente características de classe para personagens cadastrados
    if (typeof ClassEngine !== 'undefined') {
      const players = this.getAll();
      let hasChanges = false;
      players.forEach(p => {
        if (!p.traits || p.traits.length === 0 || !p.traits.some(t => t.isClassFeature || t.source)) {
          ClassEngine.applyClassProgression(p);
          hasChanges = true;
        }
      });
      if (hasChanges) {
        DB.set('players', players);
      }
    }
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
    if (typeof App !== 'undefined' && App.renderDashboard) {
      App.renderDashboard();
    }
  },

  delete(id) {
    const char = this.getById(id);
    const charName = char ? char.name : "personagem";
    if (!confirm(`Deseja realmente remover a ficha de "${charName}"?`)) return;
    const players = this.getAll().filter(p => p.id !== id);
    DB.set('players', players);
    this.closeModal();
    this.render();
    if (typeof App !== 'undefined' && App.renderDashboard) {
      App.renderDashboard();
    }
    App.showToast(`Ficha de "${charName}" removida.`);
  },

  calculateMod(score) {
    const val = typeof score === 'number' ? score : parseInt(score, 10) || 10;
    return Math.floor((val - 10) / 2);
  },

  formatMod(mod) {
    return mod >= 0 ? `+${mod}` : `${mod}`;
  },

  calculateProficiency(level) {
    const lvl = typeof level === 'number' ? level : parseInt(level, 10) || 1;
    if (lvl >= 17) return 6;
    if (lvl >= 13) return 5;
    if (lvl >= 9) return 4;
    if (lvl >= 5) return 3;
    return 2;
  },

  getSkillMod(char, skillDef) {
    const attrScore = (char.stats && char.stats[skillDef.attr]) || 10;
    const baseMod = this.calculateMod(attrScore);
    const hasProf = !!(char.skills && char.skills[skillDef.key]);
    const profBonus = char.proficiencyBonus || this.calculateProficiency(char.level);
    return baseMod + (hasProf ? profBonus : 0);
  },

  getSaveMod(char, attr) {
    const attrScore = (char.stats && char.stats[attr]) || 10;
    const baseMod = this.calculateMod(attrScore);
    const hasProf = !!(char.saves && char.saves[attr]);
    const profBonus = char.proficiencyBonus || this.calculateProficiency(char.level);
    return baseMod + (hasProf ? profBonus : 0);
  },

  /**
   * Altera o nível do personagem diretamente pela interface com 1 clique (+ ou -)
   * e adiciona automaticamente as novas características de classe/subclasse desbloqueadas.
   */
  changeLevel(id, delta) {
    const char = this.getById(id);
    if (!char) return;

    const oldLevel = char.level || 1;
    const newLevel = Math.max(1, Math.min(20, oldLevel + delta));
    if (newLevel === oldLevel) return;

    char.level = newLevel;
    char.proficiencyBonus = this.calculateProficiency(newLevel);

    // Aplica a progressão automática de classe, subclasse, dados de vida e magias via ClassEngine
    let newFeaturesList = [];
    if (typeof ClassEngine !== 'undefined') {
      const prog = ClassEngine.applyClassProgression(char);
      newFeaturesList = prog.newFeatures || [];
    } else {
      if (char.hitDice) {
        char.hitDice = char.hitDice.replace(/^\d+d/, `${newLevel}d`);
      } else {
        char.hitDice = `${newLevel}d8`;
      }
    }

    this.save(char);

    // Se o modal estiver aberto, atualiza-o em tempo real
    if (this.activeCharacterId === id) {
      this.openDetailModal(id);
    }

    if (delta > 0) {
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('critical');
      const bonusMsg = newFeaturesList.length > 0
        ? `\nNovos recursos desbloqueados: ${newFeaturesList.slice(0, 3).join(', ')}${newFeaturesList.length > 3 ? '...' : ''}!`
        : '';
      App.showToast(`⚔️ ${char.name} subiu para o Nível ${newLevel}! (Proficiência: +${char.proficiencyBonus}).${bonusMsg}`);
    } else {
      App.showToast(`${char.name} ajustado para o Nível ${newLevel}.`);
    }
  },

  /**
   * Sincroniza características e magias da classe diretamente a partir do modal de visualização
   */
  syncCharacterFeaturesFromModal(id) {
    const char = this.getById(id);
    if (!char) return;
    if (typeof ClassEngine !== 'undefined') {
      const prog = ClassEngine.applyClassProgression(char);
      this.save(char);
      this.openDetailModal(id);
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('spell');
      App.showToast(`⚡ Recursos de ${char.characterClass || 'classe'} sincronizados para o Nível ${char.level}!`);
    }
  },

  /**
   * Descanso Longo: Recupera todos os PVs e espaços de magia
   */
  restLong(id) {
    const char = this.getById(id);
    if (!char) return;

    char.hpCurrent = char.hpMax;
    char.hpTemp = 0;

    // Reseta espaços de magia gastos
    if (char.spellSlots) {
      Object.keys(char.spellSlots).forEach(lvl => {
        if (char.spellSlots[lvl]) {
          char.spellSlots[lvl].used = 0;
        }
      });
    }

    this.save(char);
    if (this.activeCharacterId === id) {
      this.openDetailModal(id);
    }
    if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('victory');
    App.showToast(`🌙 ${char.name} realizou um Descanso Longo! PVs e Magias 100% recuperados.`);
  },

  /**
   * Renderiza a grade de fichas dos jogadores
   */
  render() {
    const container = document.getElementById('players-grid');
    if (!container) return;

    const players = this.getAll();
    if (players.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🛡️</div>
          <h3>Nenhum herói cadastrado</h3>
          <p>Adicione as fichas dos seus jogadores ou restaure as fichas padrão para começar a gerenciar sua campanha.</p>
          <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1rem;">
            <button class="btn btn-primary" onclick="SheetsModule.openFullEditModal()">+ Criar Primeira Ficha</button>
            <button class="btn btn-secondary" onclick="SheetsModule.resetDefaultPlayers()">🔄 Carregar Heróis Padrão</button>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = players.map(p => {
      const hpPercent = Math.max(0, Math.min(100, Math.round((p.hpCurrent / p.hpMax) * 100)));
      let hpColor = 'var(--hp-green)';
      if (hpPercent <= 25) hpColor = 'var(--hp-red)';
      else if (hpPercent <= 50) hpColor = 'var(--hp-yellow)';

      const prof = p.proficiencyBonus || this.calculateProficiency(p.level);

      return `
        <div class="card character-card" onclick="SheetsModule.openDetailModal('${p.id}')">
          <div class="character-card-header">
            <img class="character-avatar" src="${p.avatar || 'assets/characters/thorin.jpg'}" alt="${p.name}" onerror="this.src='assets/banner.jpg'" />
            <div class="character-info">
              <div class="character-name-row">
                <h3 class="character-name">${p.name}</h3>
                ${p.inspiration ? '<span class="badge badge-gold" title="Inspiração Ativa">⭐ Inspiração</span>' : ''}
              </div>
              <div class="character-sub">${p.characterClass}${p.subclass ? ` (${p.subclass})` : ''} • ${p.race}</div>

              <!-- Seletor Rápido de Nível na Ficha -->
              <div class="level-stepper-wrap" onclick="event.stopPropagation()">
                <button type="button" class="level-btn" onclick="SheetsModule.changeLevel('${p.id}', -1)" title="Diminuir Nível">−</button>
                <span class="level-badge">Nível <strong>${p.level}</strong></span>
                <button type="button" class="level-btn" onclick="SheetsModule.changeLevel('${p.id}', 1)" title="Aumentar Nível">+</button>
                <span class="prof-badge" title="Bônus de Proficiência">+${prof} Prof</span>
              </div>

              <div class="character-player">Jogador: <strong>${p.playerName || 'Mestre'}</strong></div>
            </div>
          </div>

          <div class="character-stats-bar">
            <div class="stat-pill">
              <span class="stat-label">CA</span>
              <span class="stat-value gold">${p.ac}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Iniciativa</span>
              <span class="stat-value">${this.formatMod(p.initiativeMod !== undefined ? p.initiativeMod : this.calculateMod(p.stats.dex))}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Desloc.</span>
              <span class="stat-value">${p.speed}m</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Percepção</span>
              <span class="stat-value">${p.passivePerception || (10 + this.getSkillMod(p, { key: 'perception', attr: 'wis' }))}</span>
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
              ⚔️ Combate
            </button>
            <button class="btn btn-sm btn-outline" onclick="SheetsModule.openFullEditModal('${p.id}')">
              ✏️ Editar
            </button>
            <button class="btn btn-sm btn-secondary" onclick="SheetsModule.openDetailModal('${p.id}')">
              📜 Ficha
            </button>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * Abre o Modal Detalhado da Ficha Oficial D&D 5e
   */
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

    const prof = char.proficiencyBonus || this.calculateProficiency(char.level);

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
                <span class="badge badge-purple">${char.characterClass}${char.subclass ? ` (${char.subclass})` : ''}</span>
                <div class="level-stepper-wrap" style="margin: 0;">
                  <button type="button" class="level-btn" onclick="SheetsModule.changeLevel('${char.id}', -1)" title="Diminuir Nível">−</button>
                  <span class="level-badge">Nível <strong>${char.level}</strong></span>
                  <button type="button" class="level-btn" onclick="SheetsModule.changeLevel('${char.id}', 1)" title="Aumentar Nível">+</button>
                </div>
                <span class="badge badge-outline">${char.alignment || 'Neutro'}</span>
                <span class="badge badge-dark">Jogador: ${char.playerName || 'Mestre'}</span>
                ${char.inspiration ? '<span class="badge badge-gold">⭐ Inspiração Ativa</span>' : ''}
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
                <div class="vital-value" style="color: #c084fc;">+${prof}</div>
              </div>
              <div class="vital-box">
                <div class="vital-label">Deslocamento</div>
                <div class="vital-value">${char.speed}m</div>
              </div>
            </div>
          </div>

          <div class="sheet-actions-top">
            <button class="btn btn-sm btn-primary" onclick="SheetsModule.openFullEditModal('${char.id}')">✏️ Editar Ficha Completa</button>
            <button class="btn btn-sm btn-outline" onclick="SheetsModule.restLong('${char.id}')" title="Recupera 100% dos PVs e Espaços de Magia">🌙 Descanso Longo</button>
            <button class="btn btn-sm btn-combat" onclick="CombatModule.addFromPlayer('${char.id}')">⚔️ Combate</button>
            <button class="btn btn-sm btn-danger" onclick="SheetsModule.delete('${char.id}')">🗑️ Excluir</button>
          </div>
        </div>

        <!-- Painel de PV e Gestão Rápida de Dano / Cura -->
        <div class="sheet-hp-panel">
          <div class="sheet-hp-display">
            <div class="hp-info-row">
              <span>Pontos de Vida: <strong id="sheet-hp-val">${char.hpCurrent}</strong> / ${char.hpMax}</span>
              ${char.hpTemp > 0 ? `<span class="hp-temp">+${char.hpTemp} Temporários</span>` : ''}
              <span>Dados de Vida: <strong>${char.hitDice || `${char.level}d8`}</strong></span>
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

        <!-- Abas Internas da Ficha: Perícias & Salvaguardas, Ataques, Características, Magias, Inventário -->
        <div class="sheet-tabs-nav">
          <button class="sheet-tab-btn active" onclick="SheetsModule.switchSubTab('skills', this)">🎯 Perícias & Salvaguardas</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('attacks', this)">⚔️ Ataques & Ações</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('traits', this)">🌟 Características & Talentos</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('spells', this)">✨ Magias & Espaços</button>
          <button class="sheet-tab-btn" onclick="SheetsModule.switchSubTab('inventory', this)">🎒 Equipamento & Notas</button>
        </div>

        <!-- Aba de Perícias & Salvaguardas -->
        <div class="sheet-tab-content" id="subtab-skills">
          <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">🛡️ Testes de Resistência (Salvaguardas)</h4>
          <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem;">
            ${['str', 'dex', 'con', 'int', 'wis', 'cha'].map(a => {
              const label = { str: 'FOR', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' }[a];
              const saveMod = this.getSaveMod(char, a);
              const isProf = !!(char.saves && char.saves[a]);
              return `
                <div class="skill-pill-item" style="min-width: 130px;" onclick="DiceRoller.roll(20, 1, ${saveMod}); App.showToast('Rolou Salvaguarda de ${label} (${SheetsModule.formatMod(saveMod)})!')">
                  <div class="skill-pill-left">
                    <span class="skill-prof-dot ${isProf ? 'active' : ''}"></span>
                    <strong class="skill-name-label">${label}</strong>
                  </div>
                  <span class="skill-mod-val">${this.formatMod(saveMod)}</span>
                </div>
              `;
            }).join('')}
          </div>

          <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">🎯 18 Perícias Oficiais D&D 5e (Clique para Rolar d20)</h4>
          <div class="skills-detail-grid">
            ${this.SKILLS_DEF.map(s => {
              const mod = this.getSkillMod(char, s);
              const isProf = !!(char.skills && char.skills[s.key]);
              return `
                <div class="skill-pill-item" onclick="DiceRoller.roll(20, 1, ${mod}); App.showToast('Rolou ${s.name} (${SheetsModule.formatMod(mod)})!')">
                  <div class="skill-pill-left">
                    <span class="skill-prof-dot ${isProf ? 'active' : ''}"></span>
                    <div>
                      <div class="skill-name-label">${s.name}</div>
                      <div class="skill-attr-tag">${s.attr}</div>
                    </div>
                  </div>
                  <span class="skill-mod-val">${this.formatMod(mod)}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Aba de Ataques -->
        <div class="sheet-tab-content" id="subtab-attacks" style="display: none;">
          <div class="attacks-list">
            ${(char.attacks || []).map(atk => `
              <div class="attack-card">
                <div class="attack-header">
                  <strong>${atk.name}</strong>
                  <span class="badge badge-accent">${atk.bonus} para acertar</span>
                </div>
                <div class="attack-damage">${atk.damage}</div>
                <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem;">
                  <button class="btn btn-xs btn-primary" onclick="DiceRoller.rollFormula('1d20${atk.bonus}'); App.showToast('Ataque com ${atk.name}!')">
                    🎲 Rolar Ataque
                  </button>
                  ${atk.damage.match(/\d+d\d+/) ? `
                    <button class="btn btn-xs btn-outline" onclick="DiceRoller.rollFormula('${atk.damage.match(/[\dd+-]+/)[0]}'); App.showToast('Dano de ${atk.name}!')">
                      💥 Rolar Dano
                    </button>
                  ` : ''}
                </div>
              </div>
            `).join('') || '<p class="text-muted">Nenhum ataque cadastrado. Use o botão Editar Ficha para adicionar armas.</p>'}
          </div>
        </div>

        <!-- Aba de Características -->
        <div class="sheet-tab-content" id="subtab-traits" style="display: none;">
          <div style="display: flex; justify-content: flex-end; margin-bottom: 0.75rem;">
            <button class="btn btn-xs btn-accent" onclick="SheetsModule.syncCharacterFeaturesFromModal('${char.id}')">
              ⚡ Sincronizar Recursos da Classe (${char.characterClass || 'Classe'} Nv ${char.level})
            </button>
          </div>
          <div class="traits-list">
            ${(char.traits || []).map(t => `
              <div class="trait-item">
                <div class="trait-name">
                  ${t.name}
                  ${t.source ? `<span class="badge badge-accent" style="font-size: 0.72rem; margin-left: 0.5rem;">${t.source}</span>` : ''}
                </div>
                <div class="trait-desc">${t.desc}</div>
              </div>
            `).join('') || '<p class="text-muted">Nenhuma característica especial registrada.</p>'}
          </div>
        </div>

        <!-- Aba de Magias -->
        <div class="sheet-tab-content" id="subtab-spells" style="display: none;">
          <div class="spell-slots-tracker">
            <h4>Espaços de Magia por Círculo</h4>
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
              }).join('') || '<span class="text-muted">Este personagem não possui espaços de magia configurados. Edite a ficha para definir espaços do 1º ao 9º círculo.</span>'}
            </div>
          </div>

          <div class="character-spells-list">
            <h4>Grimório de Magias Conhecidas & Preparadas</h4>
            <div class="spells-grid-cards">
              ${(char.spells || []).map(sp => `
                <div class="spell-card-mini">
                  <div class="spell-card-mini-title">${sp.name}</div>
                  <div class="spell-card-mini-meta">${sp.level === 0 ? 'Truque' : sp.level + 'º Círculo'} • ${sp.school || 'Magia'}</div>
                  <div class="spell-card-mini-desc">${sp.desc}</div>
                </div>
              `).join('') || '<p class="text-muted">Nenhuma magia adicionada.</p>'}
            </div>
          </div>
        </div>

        <!-- Aba de Inventário & Notas -->
        <div class="sheet-tab-content" id="subtab-inventory" style="display: none;">
          <div class="inventory-section">
            <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">💰 Riqueza & Moedas</h4>
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
              <span class="badge badge-gold">PO: ${char.coins?.gp || 0}</span>
              <span class="badge badge-accent">PP: ${char.coins?.sp || 0}</span>
              <span class="badge badge-outline">PC: ${char.coins?.cp || 0}</span>
              <span class="badge badge-purple">PE: ${char.coins?.ep || 0}</span>
              <span class="badge badge-dark">PL: ${char.coins?.pp || 0}</span>
            </div>

            <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">🎒 Itens & Equipamentos</h4>
            <div class="inventory-box">${char.inventory ? char.inventory.replace(/\n/g, '<br>') : 'Mochila vazia.'}</div>

            <h4 style="color: var(--text-gold); margin-top: 1.25rem; margin-bottom: 0.5rem;">📜 Histórico & Anotações</h4>
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

    ['skills', 'attacks', 'traits', 'spells', 'inventory'].forEach(t => {
      const el = document.getElementById('subtab-' + t);
      if (el) el.style.display = t === tabName ? 'block' : 'none';
    });
  },

  adjustHP(id, amount) {
    const char = this.getById(id);
    if (!char) return;
    char.hpCurrent = Math.max(0, Math.min(char.hpMax, char.hpCurrent + amount));
    this.save(char);
    if (this.activeCharacterId === id) {
      this.openDetailModal(id);
    }
    App.showToast(`${char.name}: ${char.hpCurrent}/${char.hpMax} PV`);
  },

  applyCustomHP(id, type) {
    const input = document.getElementById('hp-custom-input');
    if (!input || !input.value) return;
    const val = parseInt(input.value, 10);
    if (isNaN(val) || val <= 0) return;

    if (type === 'damage') {
      this.adjustHP(id, -val);
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('slash');
    } else {
      this.adjustHP(id, val);
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('victory');
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
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('fireball');
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

  /**
   * Abre o Editor Completo de Ficha com abas e controle total
   */
  openFullEditModal(id) {
    const isEdit = !!id;
    const char = isEdit ? JSON.parse(JSON.stringify(this.getById(id))) : {
      id: 'char_' + Date.now(),
      name: '',
      playerName: '',
      race: 'Humano',
      characterClass: 'Guerreiro',
      subclass: '',
      level: 1,
      xp: 0,
      alignment: 'Neutro e Bom',
      background: '',
      inspiration: false,
      ac: 14,
      hpMax: 12,
      hpCurrent: 12,
      hpTemp: 0,
      hitDice: '1d10',
      speed: 9,
      initiativeMod: 0,
      passivePerception: 10,
      proficiencyBonus: 2,
      stats: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      saves: { str: false, dex: false, con: false, int: false, wis: false, cha: false },
      skills: {},
      attacks: [{ name: 'Espada Longa', bonus: '+4', damage: '1d8+2 Cortante' }],
      traits: [{ name: 'Estilo de Luta', desc: 'Defesa (+1 na CA quando usando armadura)' }],
      spells: [],
      spellSlots: {
        1: { max: 0, used: 0 },
        2: { max: 0, used: 0 },
        3: { max: 0, used: 0 }
      },
      coins: { gp: 10, sp: 0, cp: 0, ep: 0, pp: 0 },
      inventory: 'Mochila de aventureiro, rações, tochas.',
      notes: '',
      avatar: 'assets/characters/thorin.jpg'
    };

    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    // Amplia o modal temporariamente para edição rica
    const modalWindow = modal.querySelector('.modal-window');
    if (modalWindow) modalWindow.style.maxWidth = '880px';

    title.innerText = isEdit ? `Editar Ficha Completa: ${char.name}` : 'Criar Nova Ficha de Personagem';

    body.innerHTML = `
      <form id="full-char-form" onsubmit="SheetsModule.handleFullFormSubmit(event, '${char.id}', ${isEdit})">
        <div class="editor-tabs-nav">
          <button type="button" class="editor-tab-btn active" onclick="SheetsModule.switchEditorTab('basic', this)">1. Básico & Nível</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('vitals', this)">2. Vida & Defesa</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('stats', this)">3. Atributos & Salvaguardas</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('skills', this)">4. 18 Perícias D&D</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('attacks', this)">5. Ataques & Armas</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('traits', this)">6. Talentos & Habilidades</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('spells', this)">7. Magias & Espaços</button>
          <button type="button" class="editor-tab-btn" onclick="SheetsModule.switchEditorTab('inventory', this)">8. Riqueza & Mochila</button>
        </div>

        <!-- ABA 1: Identidade & Nível -->
        <div class="editor-tab-pane active" id="edtab-basic">
          <div class="form-grid-2">
            <div class="form-group">
              <label>Nome do Personagem *</label>
              <input type="text" id="ef-name" class="input" value="${char.name}" required placeholder="Ex: Jeremias" />
            </div>
            <div class="form-group">
              <label>Nome do Jogador</label>
              <input type="text" id="ef-player" class="input" value="${char.playerName || ''}" placeholder="Ex: Lucas" />
            </div>
          </div>

          <div class="form-grid-3">
            <div class="form-group">
              <label>Raça</label>
              <input type="text" id="ef-race" class="input" value="${char.race || ''}" placeholder="Ex: Meio-Orc, Elfo, Humano" />
            </div>
            <div class="form-group">
              <label>Classe (D&D 5e)</label>
              <select id="ef-class-select" class="select" onchange="SheetsModule.onEditorClassSelectChange()">
                ${['Bárbaro', 'Bardo', 'Clérigo', 'Druida', 'Guerreiro', 'Monge', 'Paladino', 'Patrulheiro', 'Ladino', 'Feiticeiro', 'Bruxo', 'Mago'].map(cName => {
                  const sel = (char.characterClass || '').toLowerCase().includes(cName.toLowerCase().slice(0, 4)) ? 'selected' : '';
                  return `<option value="${cName}" ${sel}>${cName}</option>`;
                }).join('')}
                <option value="custom" ${!['Bárbaro', 'Bardo', 'Clérigo', 'Druida', 'Guerreiro', 'Monge', 'Paladino', 'Patrulheiro', 'Ladino', 'Feiticeiro', 'Bruxo', 'Mago'].some(c => (char.characterClass || '').toLowerCase().includes(c.toLowerCase().slice(0, 4))) ? 'selected' : ''}>Outra / Personalizada</option>
              </select>
              <input type="text" id="ef-class-custom" class="input" value="${char.characterClass || ''}" placeholder="Nome da classe personalizada" style="display: none; margin-top: 0.35rem;" />
            </div>
            <div class="form-group">
              <label>Subclasse / Caminho</label>
              <select id="ef-subclass-select" class="select" onchange="SheetsModule.onEditorSubclassSelectChange()">
                <!-- Preenchido via populateSubclassSelect -->
              </select>
              <input type="text" id="ef-subclass-custom" class="input" value="${char.subclass || ''}" placeholder="Nome da subclasse personalizada" style="display: none; margin-top: 0.35rem;" />
            </div>
          </div>

          <div style="background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.3); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
            <div>
              <strong style="color: var(--text-gold); display: block; font-size: 0.9rem;">⚡ Auto-Preenchimento por Nível</strong>
              <small class="text-muted">Adiciona automaticamente todas as características oficiais da classe, subclasse, dados de vida e espaços de magia até o nível selecionado.</small>
            </div>
            <button type="button" class="btn btn-sm btn-accent" onclick="SheetsModule.syncEditorClassFeatures(true)">
              Sincronizar Recursos (Nv <span id="ef-sync-lvl-badge">${char.level || 1}</span>)
            </button>
          </div>

          <div class="form-grid-4">
            <div class="form-group">
              <label>Nível (1 a 20) *</label>
              <input type="number" id="ef-level" class="input" value="${char.level || 1}" min="1" max="20" required oninput="SheetsModule.onEditorLevelChange()" />
            </div>
            <div class="form-group">
              <label>XP (Experiência)</label>
              <input type="number" id="ef-xp" class="input" value="${char.xp || 0}" />
            </div>
            <div class="form-group">
              <label>Tendência</label>
              <input type="text" id="ef-alignment" class="input" value="${char.alignment || 'Neutro'}" placeholder="Ex: Caótico e Bom" />
            </div>
            <div class="form-group">
              <label>Inspiração</label>
              <select id="ef-inspiration" class="select">
                <option value="false" ${!char.inspiration ? 'selected' : ''}>Não</option>
                <option value="true" ${char.inspiration ? 'selected' : ''}>⭐ Sim (Ativa)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Avatar / Retrato do Personagem</label>
            <input type="text" id="ef-avatar" class="input" value="${char.avatar || 'assets/characters/thorin.jpg'}" placeholder="Caminho da imagem ou URL" />
            <div class="avatar-preset-row">
              ${this.AVATAR_PRESETS.map(av => `
                <img src="${av.url}" class="avatar-preset-thumb ${char.avatar === av.url ? 'selected' : ''}" title="${av.name}" onclick="document.getElementById('ef-avatar').value='${av.url}'; document.querySelectorAll('.avatar-preset-thumb').forEach(t=>t.classList.remove('selected')); this.classList.add('selected');" />
              `).join('')}
            </div>
          </div>
        </div>

        <!-- ABA 2: Vida & Defesa -->
        <div class="editor-tab-pane" id="edtab-vitals">
          <div class="form-grid-3">
            <div class="form-group">
              <label>Classe de Armadura (CA) *</label>
              <input type="number" id="ef-ac" class="input" value="${char.ac || 10}" required />
            </div>
            <div class="form-group">
              <label>PV Máximos *</label>
              <input type="number" id="ef-hp-max" class="input" value="${char.hpMax || 10}" required />
            </div>
            <div class="form-group">
              <label>PV Atuais *</label>
              <input type="number" id="ef-hp-current" class="input" value="${char.hpCurrent || 10}" required />
            </div>
          </div>

          <div class="form-grid-4">
            <div class="form-group">
              <label>PV Temporários</label>
              <input type="number" id="ef-hp-temp" class="input" value="${char.hpTemp || 0}" />
            </div>
            <div class="form-group">
              <label>Dados de Vida</label>
              <input type="text" id="ef-hitdice" class="input" value="${char.hitDice || `${char.level}d8`}" placeholder="Ex: 5d12, 3d8" />
            </div>
            <div class="form-group">
              <label>Deslocamento (metros)</label>
              <input type="number" step="0.5" id="ef-speed" class="input" value="${char.speed || 9}" />
            </div>
            <div class="form-group">
              <label>Bônus de Iniciativa</label>
              <input type="number" id="ef-init" class="input" value="${char.initiativeMod !== undefined ? char.initiativeMod : 0}" />
            </div>
          </div>
        </div>

        <!-- ABA 3: Atributos & Salvaguardas -->
        <div class="editor-tab-pane" id="edtab-stats">
          <p class="text-muted" style="margin-bottom: 0.75rem; font-size: 0.85rem;">
            Defina a pontuação de cada atributo (1 a 30) e marque as caixas das salvaguardas que o personagem tem proficiência:
          </p>
          <div class="form-grid-6">
            ${[
              { key: 'str', label: 'FORÇA', val: char.stats.str },
              { key: 'dex', label: 'DESTREZA', val: char.stats.dex },
              { key: 'con', label: 'CONSTITUIÇÃO', val: char.stats.con },
              { key: 'int', label: 'INTELIGÊNCIA', val: char.stats.int },
              { key: 'wis', label: 'SABEDORIA', val: char.stats.wis },
              { key: 'cha', label: 'CARISMA', val: char.stats.cha }
            ].map(a => `
              <div class="form-group" style="text-align: center;">
                <label style="font-size: 0.8rem; font-weight: 700;">${a.label}</label>
                <input type="number" id="ef-stat-${a.key}" class="input" value="${a.val || 10}" min="1" max="30" style="text-align: center; font-size: 1.1rem; font-weight: 700;" oninput="SheetsModule.updateEditorSkillsPreview()" />
                <label style="display: flex; align-items: center; justify-content: center; gap: 0.3rem; margin-top: 0.4rem; font-size: 0.72rem; cursor: pointer;">
                  <input type="checkbox" id="ef-save-${a.key}" ${char.saves && char.saves[a.key] ? 'checked' : ''} /> Prof. Salva
                </label>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ABA 4: 18 Perícias Oficiais D&D 5e -->
        <div class="editor-tab-pane" id="edtab-skills">
          <p class="text-muted" style="margin-bottom: 0.75rem; font-size: 0.85rem;">
            Marque as perícias treinadas pelo herói. O bônus final é calculado automaticamente somando o modificador do atributo com a proficiência do nível:
          </p>
          <div class="skills-form-grid" id="editor-skills-checklist">
            ${this.SKILLS_DEF.map(s => {
              const isChecked = !!(char.skills && char.skills[s.key]);
              const mod = this.getSkillMod(char, s);
              return `
                <div class="skill-form-item">
                  <label>
                    <input type="checkbox" id="ef-skill-${s.key}" ${isChecked ? 'checked' : ''} onchange="SheetsModule.updateEditorSkillsPreview()" />
                    <span>${s.name} <small class="text-muted">(${s.attr.toUpperCase()})</small></span>
                  </label>
                  <strong class="skill-mod-val" id="ef-skill-val-${s.key}">${this.formatMod(mod)}</strong>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ABA 5: Ataques & Armas -->
        <div class="editor-tab-pane" id="edtab-attacks">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <p class="text-muted" style="margin: 0; font-size: 0.85rem;">Armas, ataques desarmados e magias de ataque:</p>
            <button type="button" class="btn btn-xs btn-outline" onclick="SheetsModule.addEditorAttackRow()">+ Adicionar Ataque</button>
          </div>
          <div id="editor-attacks-list">
            ${(char.attacks && char.attacks.length > 0 ? char.attacks : [{ name: 'Ataque Básico', bonus: '+4', damage: '1d8+2' }]).map((atk, idx) => `
              <div class="dynamic-row" id="atk-row-${idx}">
                <input type="text" class="input input-sm atk-name" value="${atk.name}" placeholder="Nome da Arma/Ataque" />
                <input type="text" class="input input-sm atk-bonus" value="${atk.bonus}" placeholder="Bônus (+5)" />
                <input type="text" class="input input-sm atk-damage" value="${atk.damage}" placeholder="Dano (1d12+3 Cortante)" />
                <input type="text" class="input input-sm atk-range" value="${atk.range || 'Corpo a corpo 1,5m'}" placeholder="Alcance/Propriedades" />
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ABA 6: Talentos & Características -->
        <div class="editor-tab-pane" id="edtab-traits">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div>
              <p class="text-muted" style="margin: 0; font-size: 0.85rem;">Habilidades raciais, de classe e talentos especiais:</p>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-xs btn-accent" onclick="SheetsModule.syncEditorClassFeatures(true)">⚡ Auto-Preencher Classe (Nv <span id="ef-trait-sync-lvl">${char.level || 1}</span>)</button>
              <button type="button" class="btn btn-xs btn-outline" onclick="SheetsModule.addEditorTraitRow()">+ Adicionar Habilidade</button>
            </div>
          </div>
          <div id="editor-traits-list">
            ${(char.traits && char.traits.length > 0 ? char.traits : [{ name: 'Habilidade Especial', desc: 'Descrição do efeito', source: '' }]).map((t, idx) => `
              <div class="dynamic-trait-row" id="trait-row-${idx}">
                <input type="text" class="input input-sm trait-name" value="${t.name}" placeholder="Nome da Habilidade" />
                <input type="text" class="input input-sm trait-source" value="${t.source || ''}" placeholder="Origem (ex: ${char.characterClass || 'Classe'})" />
                <input type="text" class="input input-sm trait-desc" value="${t.desc}" placeholder="Descrição detalhada do poder/talento" />
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ABA 7: Magias & Espaços -->
        <div class="editor-tab-pane" id="edtab-spells">
          <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">Espaços de Magia por Círculo (Defina o Máximo de Espaços)</h4>
          <div class="spell-slots-grid-editor">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(lvl => {
              const slot = (char.spellSlots && char.spellSlots[lvl]) || { max: 0, used: 0 };
              return `
                <div class="spell-slot-cell">
                  <label>${lvl}º Círculo</label>
                  <div class="spell-slot-inputs">
                    <span>Máx:</span>
                    <input type="number" id="ef-slot-max-${lvl}" class="input input-sm" value="${slot.max}" min="0" max="9" style="width: 45px; text-align: center;" />
                    <span>Usados:</span>
                    <input type="number" id="ef-slot-used-${lvl}" class="input input-sm" value="${slot.used}" min="0" max="9" style="width: 45px; text-align: center;" />
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin: 1rem 0 0.5rem 0;">
            <h4 style="color: var(--text-gold); margin: 0;">Lista de Magias Conhecidas</h4>
            <button type="button" class="btn btn-xs btn-outline" onclick="SheetsModule.addEditorSpellRow()">+ Adicionar Magia</button>
          </div>
          <div id="editor-spells-list">
            ${(char.spells || []).map((sp, idx) => `
              <div class="dynamic-spell-row" id="spell-row-${idx}">
                <input type="text" class="input input-sm sp-name" value="${sp.name}" placeholder="Nome da Magia" />
                <input type="number" class="input input-sm sp-level" value="${sp.level !== undefined ? sp.level : 1}" placeholder="Círculo (0-9)" min="0" max="9" />
                <input type="text" class="input input-sm sp-school" value="${sp.school || 'Evocação'}" placeholder="Escola" />
                <input type="text" class="input input-sm sp-desc" value="${sp.desc || ''}" placeholder="Efeito / Descrição" />
                <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ABA 8: Riqueza, Equipamento & Notas -->
        <div class="editor-tab-pane" id="edtab-inventory">
          <h4 style="color: var(--text-gold); margin-bottom: 0.5rem;">💰 Moedas & Tesouro</h4>
          <div class="form-grid-6" style="margin-bottom: 1.25rem;">
            <div class="form-group" style="text-align: center;">
              <label>Ouro (PO)</label>
              <input type="number" id="ef-coin-gp" class="input" value="${char.coins?.gp || 0}" style="text-align: center;" />
            </div>
            <div class="form-group" style="text-align: center;">
              <label>Prata (PP)</label>
              <input type="number" id="ef-coin-sp" class="input" value="${char.coins?.sp || 0}" style="text-align: center;" />
            </div>
            <div class="form-group" style="text-align: center;">
              <label>Cobre (PC)</label>
              <input type="number" id="ef-coin-cp" class="input" value="${char.coins?.cp || 0}" style="text-align: center;" />
            </div>
            <div class="form-group" style="text-align: center;">
              <label>Electro (PE)</label>
              <input type="number" id="ef-coin-ep" class="input" value="${char.coins?.ep || 0}" style="text-align: center;" />
            </div>
            <div class="form-group" style="text-align: center;">
              <label>Platina (PL)</label>
              <input type="number" id="ef-coin-pp" class="input" value="${char.coins?.pp || 0}" style="text-align: center;" />
            </div>
          </div>

          <div class="form-group">
            <label>Mochila, Armas Secundárias & Itens Mágicos</label>
            <textarea id="ef-inventory" class="textarea" rows="4" placeholder="Itens transportados pelo personagem...">${char.inventory || ''}</textarea>
          </div>

          <div class="form-group">
            <label>Anotações da Campanha, Diário e Segredos</label>
            <textarea id="ef-notes" class="textarea" rows="4" placeholder="Ganchos de história, alianças, maldições...">${char.notes || ''}</textarea>
          </div>
        </div>

        <div class="form-actions" style="margin-top: 1.5rem;">
          <button type="button" class="btn btn-secondary" onclick="App.closeFormModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">💾 Salvar Ficha do Personagem</button>
        </div>
      </form>
    `;

    modal.classList.add('active');
    this.populateSubclassSelect(this.getEditorClassName(), char.subclass);
    const clsSelect = document.getElementById('ef-class-select');
    if (clsSelect && clsSelect.value === 'custom') {
      const customClsInput = document.getElementById('ef-class-custom');
      if (customClsInput) customClsInput.style.display = 'block';
    }
  },

  switchEditorTab(tabKey, btn) {
    document.querySelectorAll('.editor-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.querySelectorAll('.editor-tab-pane').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('edtab-' + tabKey);
    if (target) target.classList.add('active');
  },

  addEditorAttackRow() {
    const list = document.getElementById('editor-attacks-list');
    if (!list) return;
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    row.innerHTML = `
      <input type="text" class="input input-sm atk-name" placeholder="Nome da Arma/Ataque" />
      <input type="text" class="input input-sm atk-bonus" placeholder="Bônus (+5)" value="+5" />
      <input type="text" class="input input-sm atk-damage" placeholder="Dano (1d8+3)" value="1d8+3" />
      <input type="text" class="input input-sm atk-range" placeholder="Alcance/Propriedades" value="Corpo a corpo 1,5m" />
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
    `;
    list.appendChild(row);
  },

  addEditorTraitRow(trait = null) {
    const list = document.getElementById('editor-traits-list');
    if (!list) return;
    const tName = trait ? trait.name : '';
    const tSource = trait ? (trait.source || '') : '';
    const tDesc = trait ? trait.desc : '';
    const row = document.createElement('div');
    row.className = 'dynamic-trait-row';
    row.innerHTML = `
      <input type="text" class="input input-sm trait-name" placeholder="Nome da Habilidade" value="${tName}" />
      <input type="text" class="input input-sm trait-source" placeholder="Origem (ex: Bárbaro Nv 1)" value="${tSource}" />
      <input type="text" class="input input-sm trait-desc" placeholder="Descrição do poder/talento" value="${tDesc}" />
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
    `;
    list.appendChild(row);
  },

  addEditorSpellRow() {
    const list = document.getElementById('editor-spells-list');
    if (!list) return;
    const row = document.createElement('div');
    row.className = 'dynamic-spell-row';
    row.innerHTML = `
      <input type="text" class="input input-sm sp-name" placeholder="Nome da Magia" />
      <input type="number" class="input input-sm sp-level" placeholder="Círculo" value="1" min="0" max="9" />
      <input type="text" class="input input-sm sp-school" placeholder="Escola" value="Evocação" />
      <input type="text" class="input input-sm sp-desc" placeholder="Efeito / Descrição" />
      <button type="button" class="remove-btn" onclick="this.parentElement.remove()" title="Remover">✕</button>
    `;
    list.appendChild(row);
  },

  updateEditorProficiencyPreview() {
    this.updateEditorSkillsPreview();
  },

  updateEditorSkillsPreview() {
    const levelInput = document.getElementById('ef-level');
    const level = parseInt(levelInput ? levelInput.value : 1, 10) || 1;
    const prof = this.calculateProficiency(level);

    this.SKILLS_DEF.forEach(s => {
      const statInput = document.getElementById(`ef-stat-${s.attr}`);
      const score = parseInt(statInput ? statInput.value : 10, 10) || 10;
      const baseMod = this.calculateMod(score);
      const chk = document.getElementById(`ef-skill-${s.key}`);
      const isChecked = chk ? chk.checked : false;
      const total = baseMod + (isChecked ? prof : 0);

      const valEl = document.getElementById(`ef-skill-val-${s.key}`);
      if (valEl) valEl.innerText = this.formatMod(total);
    });
  },

  populateSubclassSelect(selectedClass, currentSubclass) {
    const subSelect = document.getElementById('ef-subclass-select');
    const customInput = document.getElementById('ef-subclass-custom');
    if (!subSelect) return;

    if (typeof ClassEngine === 'undefined') return;
    const subclasses = ClassEngine.getSubclassesForClass(selectedClass);

    subSelect.innerHTML = '';
    const optNone = document.createElement('option');
    optNone.value = '';
    optNone.textContent = '(Nenhuma ou Inicial)';
    subSelect.appendChild(optNone);

    let foundMatch = false;
    subclasses.forEach(subName => {
      const opt = document.createElement('option');
      opt.value = subName;
      opt.textContent = subName;
      if (currentSubclass && (currentSubclass.toLowerCase().includes(subName.toLowerCase()) || subName.toLowerCase().includes(currentSubclass.toLowerCase()))) {
        opt.selected = true;
        foundMatch = true;
      }
      subSelect.appendChild(opt);
    });

    const optCustom = document.createElement('option');
    optCustom.value = 'custom';
    optCustom.textContent = 'Outra / Personalizada...';
    if (!foundMatch && currentSubclass) {
      optCustom.selected = true;
      if (customInput) {
        customInput.style.display = 'block';
        customInput.value = currentSubclass;
      }
    }
    subSelect.appendChild(optCustom);
  },

  onEditorClassSelectChange() {
    const classSelect = document.getElementById('ef-class-select');
    const customInput = document.getElementById('ef-class-custom');
    if (!classSelect) return;

    let selectedClass = classSelect.value;
    if (selectedClass === 'custom') {
      if (customInput) customInput.style.display = 'block';
    } else {
      if (customInput) {
        customInput.style.display = 'none';
        customInput.value = selectedClass;
      }
    }

    const currentSub = this.getEditorSubclassName();
    this.populateSubclassSelect(selectedClass, currentSub);

    // Atualiza Dado de Vida de acordo com a nova classe
    const clsData = typeof ClassEngine !== 'undefined' ? ClassEngine.getClassData(selectedClass) : null;
    const level = parseInt(document.getElementById('ef-level')?.value, 10) || 1;
    const hitDiceInput = document.getElementById('ef-hitdice');
    if (hitDiceInput && clsData) {
      hitDiceInput.value = `${level}${clsData.hitDie}`;
    }

    // Auto sincroniza os recursos se a classe mudar
    this.syncEditorClassFeatures(false);
  },

  onEditorSubclassSelectChange() {
    const subSelect = document.getElementById('ef-subclass-select');
    const customInput = document.getElementById('ef-subclass-custom');
    if (!subSelect) return;

    if (subSelect.value === 'custom') {
      if (customInput) customInput.style.display = 'block';
    } else {
      if (customInput) {
        customInput.style.display = 'none';
        customInput.value = subSelect.value;
      }
    }
    this.syncEditorClassFeatures(false);
  },

  onEditorLevelChange() {
    const levelInput = document.getElementById('ef-level');
    const level = parseInt(levelInput ? levelInput.value : 1, 10) || 1;

    const syncBadge1 = document.getElementById('ef-sync-lvl-badge');
    if (syncBadge1) syncBadge1.textContent = level;
    const syncBadge2 = document.getElementById('ef-trait-sync-lvl');
    if (syncBadge2) syncBadge2.textContent = level;

    // Atualiza Dado de Vida
    const hitDiceInput = document.getElementById('ef-hitdice');
    if (hitDiceInput) {
      const clsName = this.getEditorClassName();
      const clsData = typeof ClassEngine !== 'undefined' ? ClassEngine.getClassData(clsName) : null;
      const die = clsData ? clsData.hitDie : 'd8';
      hitDiceInput.value = `${level}${die}`;
    }

    this.updateEditorProficiencyPreview();
    // Auto-atualiza os recursos para o novo nível
    this.syncEditorClassFeatures(false);
  },

  getEditorClassName() {
    const classSelect = document.getElementById('ef-class-select');
    const customInput = document.getElementById('ef-class-custom');
    if (classSelect && classSelect.value === 'custom') {
      return (customInput ? customInput.value.trim() : '') || 'Guerreiro';
    }
    return classSelect ? classSelect.value : (customInput ? customInput.value.trim() : '');
  },

  getEditorSubclassName() {
    const subSelect = document.getElementById('ef-subclass-select');
    const customInput = document.getElementById('ef-subclass-custom');
    if (subSelect && subSelect.value === 'custom') {
      return customInput ? customInput.value.trim() : '';
    }
    return subSelect ? subSelect.value : (customInput ? customInput.value.trim() : '');
  },

  syncEditorClassFeatures(showToast = false) {
    if (typeof ClassEngine === 'undefined') return;

    const className = this.getEditorClassName();
    const subclassName = this.getEditorSubclassName();
    const level = parseInt(document.getElementById('ef-level')?.value, 10) || 1;

    // Obtém características da classe até o nível
    const classFeatures = ClassEngine.getClassFeatures(className, subclassName, level);
    if (!classFeatures || classFeatures.length === 0) {
      if (showToast) App.showToast('Nenhuma característica oficial encontrada para ' + className);
      return;
    }

    // Coleta características customizadas (que o usuário possa ter adicionado manualmente)
    const list = document.getElementById('editor-traits-list');
    if (!list) return;

    const currentRows = Array.from(list.querySelectorAll('.dynamic-trait-row'));
    const customTraits = [];
    const classTraitNames = new Set(classFeatures.map(f => ClassEngine.normalize(f.name)));

    currentRows.forEach(row => {
      const name = row.querySelector('.trait-name')?.value.trim();
      const source = row.querySelector('.trait-source')?.value.trim();
      const desc = row.querySelector('.trait-desc')?.value.trim();
      if (name && !classTraitNames.has(ClassEngine.normalize(name))) {
        customTraits.push({ name, source, desc });
      }
    });

    // Reconstrói a lista com as características oficiais + customizadas
    list.innerHTML = '';
    // Adiciona traços customizados primeiro
    customTraits.forEach(t => this.addEditorTraitRow(t));
    // Adiciona todas as características oficiais até o nível
    classFeatures.forEach(cf => {
      this.addEditorTraitRow({
        name: cf.name,
        source: `${cf.source} Nv ${cf.level}`,
        desc: cf.desc
      });
    });

    // Sincroniza Espaços de Magia na Aba 7 se aplicável
    const slots = ClassEngine.calculateSpellSlots(className, subclassName, level);
    for (let c = 1; c <= 9; c++) {
      const maxInput = document.getElementById(`ef-slot-max-${c}`);
      if (maxInput && slots[c]) {
        maxInput.value = slots[c].max;
      }
    }

    if (showToast) {
      if (typeof AudioStudio !== 'undefined') AudioStudio.playSFX('spell');
      App.showToast(`⚡ ${classFeatures.length} características de ${className} sincronizadas para o Nível ${level}!`);
    }
  },

  handleFullFormSubmit(e, id, isEdit) {
    e.preventDefault();
    const existing = isEdit ? this.getById(id) : {};

    const level = parseInt(document.getElementById('ef-level').value, 10) || 1;
    const proficiencyBonus = this.calculateProficiency(level);

    // Coleta perícias treinadas
    const skills = {};
    this.SKILLS_DEF.forEach(s => {
      const chk = document.getElementById(`ef-skill-${s.key}`);
      if (chk && chk.checked) skills[s.key] = true;
    });

    // Coleta salvaguardas treinadas
    const saves = {};
    ['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(a => {
      const chk = document.getElementById(`ef-save-${a}`);
      if (chk && chk.checked) saves[a] = true;
    });

    // Coleta ataques da tabela dinâmica
    const attacks = [];
    document.querySelectorAll('#editor-attacks-list .dynamic-row').forEach(row => {
      const name = row.querySelector('.atk-name')?.value.trim();
      if (name) {
        attacks.push({
          name: name,
          bonus: row.querySelector('.atk-bonus')?.value.trim() || '+0',
          damage: row.querySelector('.atk-damage')?.value.trim() || '1d6',
          range: row.querySelector('.atk-range')?.value.trim() || 'Corpo a corpo 1,5m'
        });
      }
    });

    // Coleta talentos da lista dinâmica
    const traits = [];
    document.querySelectorAll('#editor-traits-list .dynamic-trait-row').forEach(row => {
      const name = row.querySelector('.trait-name')?.value.trim();
      const source = row.querySelector('.trait-source')?.value.trim() || '';
      const desc = row.querySelector('.trait-desc')?.value.trim() || '';
      if (name) {
        traits.push({
          name: name,
          source: source,
          desc: desc,
          isClassFeature: !!source
        });
      }
    });

    // Coleta espaços de magia
    const spellSlots = {};
    for (let l = 1; l <= 9; l++) {
      const maxVal = parseInt(document.getElementById(`ef-slot-max-${l}`)?.value, 10) || 0;
      const usedVal = parseInt(document.getElementById(`ef-slot-used-${l}`)?.value, 10) || 0;
      if (maxVal > 0) {
        spellSlots[l] = { max: maxVal, used: Math.min(maxVal, usedVal) };
      }
    }

    // Coleta magias conhecidas
    const spells = [];
    document.querySelectorAll('#editor-spells-list .dynamic-spell-row').forEach(row => {
      const name = row.querySelector('.sp-name')?.value.trim();
      if (name) {
        spells.push({
          name: name,
          level: parseInt(row.querySelector('.sp-level')?.value, 10) || 0,
          school: row.querySelector('.sp-school')?.value.trim() || 'Evocação',
          desc: row.querySelector('.sp-desc')?.value.trim() || ''
        });
      }
    });

    const characterClass = this.getEditorClassName();
    const subclass = this.getEditorSubclassName();

    const updatedChar = {
      ...existing,
      id: id || ('char_' + Date.now()),
      name: document.getElementById('ef-name').value.trim(),
      playerName: document.getElementById('ef-player').value.trim(),
      race: document.getElementById('ef-race').value.trim(),
      characterClass: characterClass,
      subclass: subclass,
      level: level,
      xp: parseInt(document.getElementById('ef-xp').value, 10) || 0,
      alignment: document.getElementById('ef-alignment').value.trim(),
      inspiration: document.getElementById('ef-inspiration').value === 'true',
      avatar: document.getElementById('ef-avatar').value.trim() || 'assets/characters/thorin.jpg',

      ac: parseInt(document.getElementById('ef-ac').value, 10) || 10,
      hpMax: parseInt(document.getElementById('ef-hp-max').value, 10) || 10,
      hpCurrent: parseInt(document.getElementById('ef-hp-current').value, 10) || 10,
      hpTemp: parseInt(document.getElementById('ef-hp-temp').value, 10) || 0,
      hitDice: document.getElementById('ef-hitdice').value.trim() || `${level}d8`,
      speed: parseFloat(document.getElementById('ef-speed').value) || 9,
      initiativeMod: parseInt(document.getElementById('ef-init').value, 10) || 0,
      proficiencyBonus: proficiencyBonus,

      stats: {
        str: parseInt(document.getElementById('ef-stat-str').value, 10) || 10,
        dex: parseInt(document.getElementById('ef-stat-dex').value, 10) || 10,
        con: parseInt(document.getElementById('ef-stat-con').value, 10) || 10,
        int: parseInt(document.getElementById('ef-stat-int').value, 10) || 10,
        wis: parseInt(document.getElementById('ef-stat-wis').value, 10) || 10,
        cha: parseInt(document.getElementById('ef-stat-cha').value, 10) || 10
      },
      saves: saves,
      skills: skills,
      attacks: attacks,
      traits: traits,
      spellSlots: spellSlots,
      spells: spells,

      coins: {
        gp: parseInt(document.getElementById('ef-coin-gp')?.value, 10) || 0,
        sp: parseInt(document.getElementById('ef-coin-sp')?.value, 10) || 0,
        cp: parseInt(document.getElementById('ef-coin-cp')?.value, 10) || 0,
        ep: parseInt(document.getElementById('ef-coin-ep')?.value, 10) || 0,
        pp: parseInt(document.getElementById('ef-coin-pp')?.value, 10) || 0
      },
      inventory: document.getElementById('ef-inventory').value,
      notes: document.getElementById('ef-notes').value
    };

    this.save(updatedChar);
    App.closeFormModal();
    if (this.activeCharacterId === updatedChar.id) {
      this.openDetailModal(updatedChar.id);
    }
    App.showToast(`Ficha de "${updatedChar.name}" salva com sucesso!`);
  },

  openCreateModal() {
    this.openFullEditModal(null);
  },

  /**
   * Exporta apenas as fichas em JSON
   */
  exportPlayers() {
    const players = this.getAll();
    const blob = new Blob([JSON.stringify(players, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fichas_dnd_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    App.showToast('Arquivo de fichas baixado com sucesso!');
  },

  /**
   * Importa fichas em JSON
   */
  importPlayers() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          const list = Array.isArray(data) ? data : [data];
          if (list.length === 0 || !list[0].name) {
            alert('Arquivo inválido: nenhuma ficha encontrada.');
            return;
          }
          DB.set('players', list);
          this.render();
          if (typeof App !== 'undefined' && App.renderDashboard) {
            App.renderDashboard();
          }
          App.showToast(`${list.length} ficha(s) importada(s) com sucesso!`);
        } catch (err) {
          alert('Erro ao carregar arquivo JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  },

  /**
   * Restaura os heróis iniciais da campanha
   */
  resetDefaultPlayers() {
    if (!confirm('Deseja restaurar as fichas padrão da campanha? As fichas atuais serão substituídas.')) return;
    if (typeof DEFAULT_PLAYERS !== 'undefined') {
      DB.set('players', JSON.parse(JSON.stringify(DEFAULT_PLAYERS)));
      this.render();
      if (typeof App !== 'undefined' && App.renderDashboard) {
        App.renderDashboard();
      }
      App.showToast('Heróis padrão restaurados!');
    }
  }
};
