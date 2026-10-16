/**
 * Grimório do Mestre - Bestiário & Base de Dados de Monstros (D&D 5e)
 * Gerencia mais de 1.000 criaturas pré-carregadas + monstros customizados pelo usuário
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
    return [...custom, ...base];
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
      // Busca por nome ou tipo
      if (search) {
        const matchesName = m.name.toLowerCase().includes(search);
        const matchesType = (m.rawType || m.type || '').toLowerCase().includes(search);
        if (!matchesName && !matchesType) return false;
      }
      // Filtro de Tipo
      if (typeFilter !== 'ALL' && m.type !== typeFilter) {
        return false;
      }
      // Filtro de ND (CR)
      if (crFilter !== 'ALL') {
        if (crFilter === 'high' && !['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','30'].includes(m.cr.toString())) return false;
        else if (crFilter !== 'high' && m.cr.toString() !== crFilter) return false;
      }
      // Filtro de Fonte
      if (sourceFilter !== 'ALL' && (!m.source || !m.source.includes(sourceFilter))) {
        return false;
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
          <p>Tente ajustar os filtros de busca ou cadastre um novo monstro.</p>
        </div>
      `;
      if (pagination) pagination.innerHTML = '';
      return;
    }

    const startIdx = (this.currentPage - 1) * this.pageSize;
    const pageItems = this.filteredMonsters.slice(startIdx, startIdx + this.pageSize);

    container.innerHTML = pageItems.map(m => {
      return `
        <div class="card monster-card" onclick="BestiaryModule.openDetailModal('${m.id}')">
          <div class="monster-card-top">
            <div>
              <h3 class="monster-name">${m.name}</h3>
              <div class="monster-sub">${m.size} • ${m.rawType || m.type}</div>
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
            <small>📖 ${m.source || 'SRD 5e'}</small>
          </div>

          <div class="card-actions" onclick="event.stopPropagation()">
            <button class="btn btn-sm btn-combat" onclick="BestiaryModule.promptAddToCombat('${m.id}')">
              ⚔️ Adicionar ao Combate
            </button>
            <button class="btn btn-sm btn-secondary" onclick="BestiaryModule.openDetailModal('${m.id}')">
              📜 Ficha Completa
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

  openDetailModal(id) {
    const m = this.getById(id);
    if (!m) return;
    this.activeMonster = m;

    const modal = document.getElementById('monster-modal');
    const content = document.getElementById('monster-modal-content');
    if (!modal || !content) return;

    const dexScore = m.dex || (10 + (m.initiativeMod || 0) * 2);
    const dexMod = Math.floor((dexScore - 10) / 2);

    content.innerHTML = `
      <div class="statblock-dnd">
        <div class="statblock-header">
          <h2 class="statblock-title">${m.name}</h2>
          <div class="statblock-meta">${m.size} ${m.rawType || m.type}, ${m.alignment || 'qualquer alinhamento'}</div>
          <div class="statblock-source">Fonte: ${m.source || 'Livro dos Monstros'}</div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-vitals">
          <div><strong>Classe de Armadura:</strong> ${m.ac}</div>
          <div><strong>Pontos de Vida:</strong> ${m.hp}</div>
          <div><strong>Deslocamento:</strong> ${m.speed || '9m (6 sq)'}</div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-ability-table">
          <div class="stat-col">
            <span class="stat-col-label">FOR</span>
            <span class="stat-col-val">${m.stats?.str || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.str)) : '+0'})</span>
          </div>
          <div class="stat-col">
            <span class="stat-col-label">DES</span>
            <span class="stat-col-val">${dexScore} (${SheetsModule.formatMod(dexMod)})</span>
          </div>
          <div class="stat-col">
            <span class="stat-col-label">CON</span>
            <span class="stat-col-val">${m.stats?.con || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.con)) : '+0'})</span>
          </div>
          <div class="stat-col">
            <span class="stat-col-label">INT</span>
            <span class="stat-col-val">${m.stats?.int || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.int)) : '+0'})</span>
          </div>
          <div class="stat-col">
            <span class="stat-col-label">SAB</span>
            <span class="stat-col-val">${m.stats?.wis || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.wis)) : '+0'})</span>
          </div>
          <div class="stat-col">
            <span class="stat-col-label">CAR</span>
            <span class="stat-col-val">${m.stats?.cha || 10} (${m.stats ? SheetsModule.formatMod(SheetsModule.calculateMod(m.stats.cha)) : '+0'})</span>
          </div>
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-attributes">
          <div><strong>Nível de Desafio:</strong> ${m.cr} (${m.exp || '—'} XP)</div>
          <div><strong>Bônus de Iniciativa:</strong> ${m.initiativeMod >= 0 ? '+' + m.initiativeMod : m.initiativeMod}</div>
          ${m.senses ? `<div><strong>Sentidos:</strong> ${m.senses}</div>` : '<div><strong>Sentidos:</strong> Percepção passiva ' + (10 + Math.max(0, dexMod)) + '</div>'}
          ${m.languages ? `<div><strong>Idiomas:</strong> ${m.languages}</div>` : ''}
        </div>

        <div class="statblock-divider"></div>

        <div class="statblock-section">
          <h3>Ações & Ataques</h3>
          ${m.actions && m.actions.length > 0 ? m.actions.map(a => `
            <div class="statblock-action">
              <strong><em>${a.name}.</em></strong> ${a.desc}
              ${a.attackBonus ? `
                <button class="btn btn-xs btn-primary" onclick="DiceRoller.rollFormula('1d20${a.attackBonus}'); App.showToast('Ataque de ${m.name}: ${a.name}!')">
                  🎲 Rolar ${a.name} (${a.attackBonus})
                </button>
              ` : ''}
            </div>
          `).join('') : `
            <div class="statblock-action">
              <strong><em>Ataque Corpo a Corpo.</em></strong> Ataque com arma: +${Math.max(2, dexMod + 2)} para acertar, alcance 1,5m, um alvo. Dano: 1d6 + ${dexMod} dano físico.
              <button class="btn btn-xs btn-primary" style="margin-left: 8px;" onclick="DiceRoller.rollFormula('1d20+${Math.max(2, dexMod + 2)}'); App.showToast('Ataque de ${m.name}!')">
                🎲 Rolar Ataque
              </button>
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
            <input type="text" id="mform-source" class="input" placeholder="Manual dos Monstros, Homebrew, etc." />
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
      cr: document.getElementById('mform-cr').value.trim(),
      size: document.getElementById('mform-size').value,
      type: document.getElementById('mform-type').value,
      source: document.getElementById('mform-source').value.trim() || 'Manual do Mestre',
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
