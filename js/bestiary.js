/**
 * Grimório do Mestre - Bestiário & Base de Dados de Monstros (D&D 5e)
 * Gerencia mais de 1.000 criaturas D&D 5e 100% traduzidas para o Português,
 * com consulta bilingue (Português/Inglês), fichas oficiais, rolagem de dados e combate imediato.
 */
const BestiaryModule = {
  currentPage: 1,
  pageSize: 24,
  filteredMonsters: [],
  activeMonster: null,

  init() {
    this.applyFilters();
  },

  getAll() {
    const base = typeof MONSTERS_DATABASE !== 'undefined' ? MONSTERS_DATABASE : [];
    const custom = DB.get('customMonsters', []);
    const merged = [...custom, ...base];

    // Traduz dinamicamente todos os monstros com o motor MonsterTranslator
    if (typeof MonsterTranslator !== 'undefined') {
      return merged.map(m => MonsterTranslator.translateMonster(m));
    }
    return merged;
  },

  getById(id) {
    return this.getAll().find(m => m.id === id) || null;
  },

  applyFilters() {
    const search = (document.getElementById('monster-search')?.value || '').toLowerCase().trim();
    const typeFilter = document.getElementById('monster-type-filter')?.value || 'ALL';
    const crFilter = document.getElementById('monster-cr-filter')?.value || 'ALL';
    const sourceFilter = document.getElementById('monster-source-filter')?.value || 'ALL';

    const all = this.getAll();
    this.filteredMonsters = all.filter(m => {
      // Busca bilingue por Nome em Português ou Nome em Inglês
      if (search) {
        const namePt = (m.name || '').toLowerCase();
        const nameEn = (m.nameEn || '').toLowerCase();
        const typeStr = (m.rawType || m.type || '').toLowerCase();
        const matchesSearch = namePt.includes(search) || nameEn.includes(search) || typeStr.includes(search);
        if (!matchesSearch) return false;
      }

      // Filtro de Tipo em Português
      if (typeFilter !== 'ALL' && m.type !== typeFilter) {
        return false;
      }

      // Filtro de ND (Nível de Desafio / CR)
      if (crFilter !== 'ALL') {
        const crStr = String(m.cr);
        if (crFilter === 'high') {
          const highCRs = ['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','30'];
          if (!highCRs.includes(crStr)) return false;
        } else if (crStr !== crFilter) {
          return false;
        }
      }

      // Filtro de Fonte / Livro
      if (sourceFilter !== 'ALL') {
        const src = (m.source || '').toLowerCase();
        const filt = sourceFilter.toLowerCase();
        if (!src.includes(filt)) return false;
      }

      return true;
    });

    this.currentPage = 1;
    this.render();
  },

  render() {
    const container = document.getElementById('monsters-grid');
    const pagination = document.getElementById('monsters-pagination');
    const countLabel = document.getElementById('monsters-count-label');
    if (!container) return;

    const total = this.filteredMonsters.length;
    if (countLabel) {
      countLabel.innerText = `${total} criatura${total !== 1 ? 's' : ''} encontrada${total !== 1 ? 's' : ''}`;
    }

    if (total === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">🐉</div>
          <h3>Nenhuma criatura encontrada</h3>
          <p>Tente ajustar os filtros de busca (você pode buscar tanto em português quanto em inglês).</p>
        </div>
      `;
      if (pagination) pagination.innerHTML = '';
      return;
    }

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = this.filteredMonsters.slice(startIdx, startIdx + this.pageSize);

    container.innerHTML = pageItems.map(m => {
      const showOrig = m.nameEn && m.nameEn.toLowerCase() !== m.name.toLowerCase();
      return `
        <div class="card monster-card" onclick="BestiaryModule.openDetailModal('${m.id}')">
          <div class="monster-card-top">
            <div>
              <h3 class="monster-name">${m.name}</h3>
              ${showOrig ? `<div class="monster-orig-name" style="font-size: 0.78rem; color: var(--text-muted); font-style: italic;">(${m.nameEn})</div>` : ''}
              <div class="monster-sub" style="margin-top: 0.2rem;">${m.size} • ${m.rawType || m.type}</div>
            </div>
            <div class="cr-badge" title="Nível de Desafio">ND ${m.cr}</div>
          </div>

          <div class="monster-quick-stats">
            <div class="stat-pill">
              <span class="stat-label">CA</span>
              <span class="stat-value gold">${m.ac}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">PV</span>
              <span class="stat-value">${m.hp}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">Inic.</span>
              <span class="stat-value">${m.initiativeMod >= 0 ? '+' + m.initiativeMod : m.initiativeMod}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-label">XP</span>
              <span class="stat-value">${m.exp || '—'}</span>
            </div>
          </div>

          <div class="monster-source-badge">
            <small>📖 ${m.source || 'Manual dos Monstros'}</small>
          </div>

          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn btn-sm btn-combat" onclick="BestiaryModule.promptAddToCombat('${m.id}')">
              ⚔️ Adicionar ao Combate
            </button>
            <button class="btn btn-sm btn-secondary" onclick="BestiaryModule.openDetailModal('${m.id}')">
              📜 Ficha Oficial
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Paginação
    const totalPages = Math.ceil(total / this.pageSize);
    if (pagination) {
      if (totalPages <= 1) {
        pagination.innerHTML = '';
      } else {
        pagination.innerHTML = `
          <button class="btn btn-sm btn-outline" ${this.currentPage === 1 ? 'disabled' : ''} onclick="BestiaryModule.goToPage(${this.currentPage - 1})">
            ◀ Anterior
          </button>
          <span class="pagination-info">Página <strong>${this.currentPage}</strong> de <strong>${totalPages}</strong></span>
          <button class="btn btn-sm btn-outline" ${this.currentPage === totalPages ? 'disabled' : ''} onclick="BestiaryModule.goToPage(${this.currentPage + 1})">
            Próxima ▶
          </button>
        `;
      }
    }
  },

  goToPage(p) {
    this.currentPage = p;
    this.render();
    window.scrollTo({ top: 300, behavior: 'smooth' });
  },

  /**
   * Abre o Modal Oficial de Estatísticas (Statblock) 100% em Português
   */
  openDetailModal(id) {
    const m = this.getById(id);
    if (!m) return;
    this.activeMonster = m;

    const modal = document.getElementById('monster-modal');
    const content = document.getElementById('monster-modal-content');
    if (!modal || !content) return;

    const dexScore = m.dex || (10 + (m.initiativeMod || 0) * 2);
    const dexMod = Math.floor((dexScore - 10) / 2);

    const showOrig = m.nameEn && m.nameEn.toLowerCase() !== m.name.toLowerCase();

    content.innerHTML = `
      <div class="statblock-dnd">
        <div class="statblock-header">
          <h2 class="statblock-title">${m.name}</h2>
          ${showOrig ? `<div style="font-size: 0.9rem; color: #94a3b8; font-style: italic; margin-bottom: 0.25rem;">Nome original: ${m.nameEn}</div>` : ''}
          <div class="statblock-meta">${m.size} • ${m.rawType || m.type}, ${m.alignment || 'qualquer alinhamento'}</div>
          <div class="statblock-source">📖 Fonte: ${m.source || 'Manual dos Monstros'}</div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-vitals">
          <div><strong>Classe de Armadura:</strong> ${m.ac}</div>
          <div><strong>Pontos de Vida:</strong> ${m.hp}</div>
          <div><strong>Deslocamento:</strong> ${m.speed || '9m (6 quadrados)'}</div>
        </div>

        <div class="statblock-divider"></div>

        <!-- Grade de Atributos com Rolagem de Teste ao Clicar -->
        <div class="statblock-ability-table">
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${m.stats ? SheetsModule.calculateMod(m.stats.str) : 0}); App.showToast('Rolou Teste de FOR de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">FOR</span>
            <span class="stat-col-val">${m.stats?.str || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.str)) : '+0'})</span>
          </div>
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${dexMod}); App.showToast('Rolou Teste de DES de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">DES</span>
            <span class="stat-col-val">${dexScore} (${SheetsModule.formatMod(dexMod)})</span>
          </div>
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${m.stats ? SheetsModule.calculateMod(m.stats.con) : 0}); App.showToast('Rolou Teste de CON de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">CON</span>
            <span class="stat-col-val">${m.stats?.con || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.con)) : '+0'})</span>
          </div>
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${m.stats ? SheetsModule.calculateMod(m.stats.int) : 0}); App.showToast('Rolou Teste de INT de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">INT</span>
            <span class="stat-col-val">${m.stats?.int || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.int)) : '+0'})</span>
          </div>
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${m.stats ? SheetsModule.calculateMod(m.stats.wis) : 0}); App.showToast('Rolou Teste de SAB de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">SAB</span>
            <span class="stat-col-val">${m.stats?.wis || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.wis)) : '+0'})</span>
          </div>
          <div class="stat-col" style="cursor: pointer;" onclick="DiceRoller.roll(20, 1, ${m.stats ? SheetsModule.calculateMod(m.stats.cha) : 0}); App.showToast('Rolou Teste de CAR de ${m.name}!')" title="Clique para rolar d20">
            <span class="stat-col-label">CAR</span>
            <span class="stat-col-val">${m.stats?.cha || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.cha)) : '+0'})</span>
          </div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-attributes">
          <div><strong>Nível de Desafio (ND):</strong> ${m.cr} (${m.exp || '—'} XP)</div>
          <div><strong>Bônus de Iniciativa:</strong> ${m.initiativeMod >= 0 ? '+' + m.initiativeMod : m.initiativeMod}</div>
          <div><strong>Sentidos:</strong> ${m.senses || `Percepção passiva ${10 + Math.max(0, dexMod)}`}</div>
          <div><strong>Idiomas:</strong> ${m.languages || 'Nenhum'}</div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-section">
          <h3>Ações & Ataques</h3>
          ${m.actions && m.actions.length > 0 ? m.actions.map(a => `
            <div class="statblock-action">
              <strong><em>${a.name}.</em></strong> ${a.desc}
              <div style="display: flex; gap: 0.4rem; margin-top: 0.35rem;">
                ${a.attackBonus ? `
                  <button class="btn btn-xs btn-primary" onclick="DiceRoller.rollFormula('1d20${a.attackBonus}'); App.showToast('Ataque de ${m.name}: ${a.name}!')">
                    🎲 Rolar Ataque (${a.attackBonus})
                  </button>
                ` : ''}
              </div>
            </div>
          `).join('') : `
            <div class="statblock-action">
              <strong><em>Ataque com Arma Corpo a Corpo.</em></strong> +${Math.max(2, dexMod + 2)} para acertar, alcance 1,5m, um alvo. Acerto: 1d6 + ${dexMod} de dano físico.
              <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
                <button class="btn btn-xs btn-primary" onclick="DiceRoller.rollFormula('1d20+${Math.max(2, dexMod + 2)}'); App.showToast('Ataque de ${m.name}!')">
                  🎲 Rolar Ataque (+${Math.max(2, dexMod + 2)})
                </button>
                <button class="btn btn-xs btn-outline" onclick="DiceRoller.rollFormula('1d6+${dexMod}'); App.showToast('Dano de ${m.name}!')">
                  💥 Rolar Dano (1d6+${dexMod})
                </button>
              </div>
            </div>
          `}
        </div>

        <div class="statblock-modal-actions">
          <button class="btn btn-combat" onclick="BestiaryModule.promptAddToCombat('${m.id}')">
            ⚔️ Adicionar ao Combate
          </button>
          <button class="btn btn-secondary" onclick="BestiaryModule.closeModal()">
            Fechar
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  closeModal() {
    const modal = document.getElementById('monster-modal');
    if (modal) modal.classList.remove('active');
  },

  promptAddToCombat(id) {
    const m = this.getById(id);
    if (!m) return;
    const countStr = prompt(`Quantos "${m.name}" deseja adicionar ao encontro de combate?`, '1');
    if (!countStr) return;
    const count = parseInt(countStr, 10);
    if (isNaN(count) || count <= 0) return;

    CombatModule.addFromMonster(m, count);
    App.showToast(`${count}x ${m.name} adicionado ao combate!`);
  },

  openCreateModal() {
    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    const modalWindow = modal.querySelector('.modal-window');
    if (modalWindow) modalWindow.style.maxWidth = '640px';

    title.innerText = 'Cadastrar Nova Criatura no Bestiário';
    body.innerHTML = `
      <form id="monster-form" onsubmit="BestiaryModule.handleCreateSubmit(event)">
        <div class="form-row">
          <div class="form-group">
            <label>Nome do Monstro *</label>
            <input type="text" id="mform-name" class="input" required placeholder="Ex: Dragão Vermelho Jovem" />
          </div>
          <div class="form-group">
            <label>Nível de Desafio (ND / CR) *</label>
            <input type="text" id="mform-cr" class="input" required placeholder="Ex: 1/4, 2, 10" />
          </div>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label>Tamanho</label>
            <select id="mform-size" class="select">
              <option value="Miúdo">Miúdo</option>
              <option value="Pequeno">Pequeno</option>
              <option value="Médio" selected>Médio</option>
              <option value="Grande">Grande</option>
              <option value="Enorme">Enorme</option>
              <option value="Gargantuesco">Gargantuesco</option>
            </select>
          </div>
          <div class="form-group">
            <label>Tipo</label>
            <select id="mform-type" class="select">
              <option value="Humanoide" selected>Humanoide</option>
              <option value="Besta">Besta</option>
              <option value="Dragão">Dragão</option>
              <option value="Morto-vivo">Morto-vivo</option>
              <option value="Monstruosidade">Monstruosidade</option>
              <option value="Corruptor">Corruptor</option>
              <option value="Aberração">Aberração</option>
              <option value="Elemental">Elemental</option>
              <option value="Gigante">Gigante</option>
              <option value="Fada">Fada</option>
              <option value="Constructo">Constructo</option>
              <option value="Limo">Limo</option>
              <option value="Planta">Planta</option>
            </select>
          </div>
          <div class="form-group">
            <label>Fonte / Livro</label>
            <input type="text" id="mform-source" class="input" placeholder="Manual dos Monstros, Homebrew..." />
          </div>
        </div>

        <div class="form-row-3">
          <div class="form-group">
            <label>Classe de Armadura (CA) *</label>
            <input type="text" id="mform-ac" class="input" required placeholder="Ex: 15 (armadura natural)" />
          </div>
          <div class="form-group">
            <label>Pontos de Vida (PV) *</label>
            <input type="text" id="mform-hp" class="input" required placeholder="Ex: 45 (7d8+14)" />
          </div>
          <div class="form-group">
            <label>Modificador de Iniciativa</label>
            <input type="number" id="mform-init" class="input" value="0" />
          </div>
        </div>

        <div class="form-group">
          <label>Ações & Ataques</label>
          <textarea id="mform-actions" class="textarea" rows="3" placeholder="Ex: Cimitarra: +4 para acertar, alcance 1,5m. Dano: 1d6+2 cortante."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="App.closeFormModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">🐉 Cadastrar Monstro</button>
        </div>
      </form>
    `;

    modal.classList.add('active');
  },

  handleCreateSubmit(e) {
    e.preventDefault();
    const hpStr = document.getElementById('mform-hp').value.trim();
    let hpNum = 10;
    const hpMatch = hpStr.match(/^(\d+)/);
    if (hpMatch) hpNum = parseInt(hpMatch[1], 10);

    const monster = {
      id: 'custom_' + Date.now(),
      name: document.getElementById('mform-name').value.trim(),
      nameEn: document.getElementById('mform-name').value.trim(),
      cr: document.getElementById('mform-cr').value.trim(),
      size: document.getElementById('mform-size').value,
      type: document.getElementById('mform-type').value,
      source: document.getElementById('mform-source').value.trim() || 'Criação do Mestre',
      ac: document.getElementById('mform-ac').value.trim(),
      hp: hpStr,
      hpMax: hpNum,
      initiativeMod: parseInt(document.getElementById('mform-init').value, 10) || 0,
      actions: [{ name: 'Ação Principal', desc: document.getElementById('mform-actions').value || 'Ataque padrão' }]
    };

    const custom = DB.get('customMonsters', []);
    custom.unshift(monster);
    DB.set('customMonsters', custom);

    App.closeFormModal();
    this.applyFilters();
    App.showToast(`Monstro "${monster.name}" cadastrado com sucesso!`);
  },

  openBulkImportModal() {
    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    const modalWindow = modal.querySelector('.modal-window');
    if (modalWindow) modalWindow.style.maxWidth = '640px';

    title.innerText = 'Importar Monstros em Lote (JSON)';
    body.innerHTML = `
      <div>
        <p class="text-muted" style="margin-bottom: 1rem;">
          Cole abaixo um array JSON com as criaturas que você deseja adicionar ao seu banco de dados pessoal:
        </p>
        <textarea id="bulk-json-input" class="textarea" rows="10" placeholder='[
  {
    "name": "Dragão de Obsidiana",
    "cr": "15",
    "size": "Enorme",
    "type": "Dragão",
    "ac": "19",
    "hp": "210 (17d12+85)",
    "initiativeMod": 2,
    "source": "Anotações Pessoais"
  }
]'></textarea>
        <div class="form-actions" style="margin-top: 1rem;">
          <button type="button" class="btn btn-secondary" onclick="App.closeFormModal()">Cancelar</button>
          <button type="button" class="btn btn-primary" onclick="BestiaryModule.handleBulkImport()">📥 Importar Criaturas</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  handleBulkImport() {
    const input = document.getElementById('bulk-json-input');
    if (!input || !input.value.trim()) return;

    try {
      const data = JSON.parse(input.value.trim());
      const list = Array.isArray(data) ? data : [data];

      const custom = DB.get('customMonsters', []);
      let count = 0;

      list.forEach((item, idx) => {
        if (!item.name) return;
        const hpNum = item.hpMax || parseInt(String(item.hp).match(/\d+/)?.[0] || '10', 10);
        custom.unshift({
          id: 'custom_import_' + Date.now() + '_' + idx,
          name: item.name,
          nameEn: item.nameEn || item.name,
          cr: item.cr || '1',
          size: item.size || 'Médio',
          type: item.type || 'Humanoide',
          source: item.source || 'Importação do Mestre',
          ac: item.ac || '10',
          hp: String(item.hp || '10'),
          hpMax: hpNum,
          initiativeMod: item.initiativeMod !== undefined ? item.initiativeMod : 0,
          actions: item.actions || []
        });
        count++;
      });

      DB.set('customMonsters', custom);
      App.closeFormModal();
      this.applyFilters();
      App.showToast(`${count} criaturas importadas com sucesso!`);
    } catch (e) {
      alert('Erro ao interpretar JSON: ' + e.message);
    }
  }
};
