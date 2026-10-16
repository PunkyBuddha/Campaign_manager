/**
 * Grimório do Mestre - Controlador Principal da Aplicação
 */
const App = {
  activeTab: 'dashboard',

  init() {
    // 1. Inicializa o banco de dados
    DB.init();

    // 2. Preenche o seletor de campanhas no topo
    this.renderCampaignSelector();

    // 3. Inicializa os módulos
    SheetsModule.init();
    BestiaryModule.init();
    CombatModule.init();
    MapsModule.init();

    // 4. Renderiza o painel do mestre (dashboard)
    this.renderDashboard();

    // 5. Renderiza a bandeja de dados
    this.renderDiceTray();

    // 6. Configura atalhos globais
    this.setupShortcuts();

    // 7. Renderiza biblioteca de magias e itens
    this.renderSpellsAndItems();
  },

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Pressionar 'D' ou 'd' fora de inputs abre a bandeja de dados
      if ((e.key === 'd' || e.key === 'D') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        this.toggleDiceDrawer();
      }
      // Esc fecha modais
      if (e.key === 'Escape') {
        this.closeAllModals();
      }
    });
  },

  closeAllModals() {
    this.closeFormModal();
    SheetsModule.closeModal();
    BestiaryModule.closeModal();
    const diceDrawer = document.getElementById('dice-drawer');
    if (diceDrawer) diceDrawer.classList.remove('active');
  },

  closeFormModal() {
    const modal = document.getElementById('form-modal');
    if (modal) modal.classList.remove('active');
  },

  switchTab(tabName) {
    this.activeTab = tabName;
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });

    document.querySelectorAll('.tab-page').forEach(page => {
      page.style.display = page.id === `tab-${tabName}` ? 'block' : 'none';
    });

    if (tabName === 'dashboard') this.renderDashboard();
    else if (tabName === 'sheets') SheetsModule.render();
    else if (tabName === 'bestiary') BestiaryModule.render();
    else if (tabName === 'combat') CombatModule.render();
    else if (tabName === 'maps') MapsModule.renderActiveMap();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderCampaignSelector() {
    const select = document.getElementById('global-campaign-select');
    if (!select) return;

    const campaigns = DB.get('campaigns', []);
    const activeId = DB.get('activeCampaignId');

    select.innerHTML = campaigns.map(c => `
      <option value="${c.id}" ${c.id === activeId ? 'selected' : ''}>⚔️ ${c.name}</option>
    `).join('');
  },

  switchCampaign(campaignId) {
    DB.set('activeCampaignId', campaignId);
    this.renderCampaignSelector();
    this.renderDashboard();
    MapsModule.loadCampaignMaps();
    this.showToast('Campanha alterada com sucesso!');
  },

  renderDashboard() {
    const campaign = DB.getActiveCampaign();
    if (!campaign) return;

    const bannerImg = document.getElementById('dash-banner-img');
    const titleEl = document.getElementById('dash-campaign-title');
    const levelEl = document.getElementById('dash-campaign-level');
    const descEl = document.getElementById('dash-campaign-desc');
    const notesArea = document.getElementById('dash-notes-textarea');
    const partyContainer = document.getElementById('dash-party-summary');

    if (bannerImg) bannerImg.src = campaign.banner || 'assets/banner.jpg';
    if (titleEl) titleEl.innerText = campaign.name;
    if (levelEl) levelEl.innerText = `${campaign.status} • ${campaign.levelRange}`;
    if (descEl) descEl.innerText = campaign.description;
    if (notesArea) notesArea.value = campaign.notes || '';

    // Renderiza resumo rápido do grupo no dashboard
    if (partyContainer) {
      const players = SheetsModule.getAll();
      if (players.length === 0) {
        partyContainer.innerHTML = '<p class="text-muted">Nenhum jogador no grupo ainda.</p>';
      } else {
        partyContainer.innerHTML = players.map(p => {
          const hpPct = Math.round((p.hpCurrent / p.hpMax) * 100);
          return `
            <div class="dash-hero-pill" onclick="SheetsModule.openDetailModal('${p.id}')">
              <img src="${p.avatar || 'assets/characters/thorin.jpg'}" alt="${p.name}" onerror="this.src='assets/banner.jpg'" />
              <div class="dash-hero-info">
                <strong>${p.name}</strong>
                <small>${p.characterClass} Nv ${p.level} • CA ${p.ac} • PV ${p.hpCurrent}/${p.hpMax}</small>
                <div class="hp-bar-bg" style="height: 5px; margin-top: 3px;">
                  <div class="hp-bar-fill" style="width: ${hpPct}%; background: ${hpPct <= 25 ? 'var(--hp-red)' : 'var(--hp-green)'};"></div>
                </div>
              </div>
            </div>
          `;
        }).join('');
      }
    }
  },

  saveDashboardNotes() {
    const notesArea = document.getElementById('dash-notes-textarea');
    if (!notesArea) return;
    const campaign = DB.getActiveCampaign();
    if (!campaign) return;
    campaign.notes = notesArea.value;
    DB.saveActiveCampaign(campaign);
    this.showToast('Anotações da campanha salvas!');
  },

  // -------------------------------------------------------------
  // Bandeja de Dados Universal
  // -------------------------------------------------------------
  toggleDiceDrawer() {
    const drawer = document.getElementById('dice-drawer');
    if (drawer) {
      drawer.classList.toggle('active');
      if (drawer.classList.contains('active')) {
        this.renderDiceHistoryUI();
      }
    }
  },

  renderDiceTray() {
    window.renderDiceHistoryUI = () => {
      const list = document.getElementById('dice-history-list');
      if (!list) return;
      const history = DiceRoller.getHistory();
      if (history.length === 0) {
        list.innerHTML = '<p class="text-muted" style="text-align: center; padding: 1rem;">Nenhuma rolagem recente.</p>';
        return;
      }
      list.innerHTML = history.slice(0, 20).map(h => `
        <div class="dice-history-item ${h.isNat20 ? 'nat-20' : ''} ${h.isNat1 ? 'nat-1' : ''}">
          <div class="dice-history-left">
            <span class="dice-hist-formula">${h.formula}</span>
            <small class="dice-hist-time">${h.timestamp}</small>
          </div>
          <div class="dice-history-right">
            <span class="dice-hist-total">${h.total}</span>
          </div>
        </div>
      `).join('');
    };
  },

  quickRollDice(sides) {
    const modInput = document.getElementById('dice-tray-mod');
    const mod = parseInt(modInput?.value || '0', 10) || 0;
    const advMode = document.querySelector('input[name="dice-adv-mode"]:checked')?.value || 'normal';
    const result = DiceRoller.roll(sides, 1, mod, advMode);

    const banner = document.getElementById('dice-result-banner');
    if (banner) {
      banner.innerHTML = `
        <div class="dice-pop-anim">
          <span class="dice-banner-formula">${result.formula} =</span>
          <span class="dice-banner-score ${result.isNat20 ? 'gold' : ''} ${result.isNat1 ? 'crimson' : ''}">${result.total}</span>
          ${result.isNat20 ? '<span class="badge badge-gold">Acerto Crítico!</span>' : ''}
          ${result.isNat1 ? '<span class="badge badge-danger">Falha Crítica!</span>' : ''}
        </div>
      `;
    }
  },

  // -------------------------------------------------------------
  // Biblioteca de Magias e Itens
  // -------------------------------------------------------------
  renderSpellsAndItems() {
    this.filterSpells();
    this.filterItems();
  },

  filterSpells() {
    const search = (document.getElementById('spells-search')?.value || '').toLowerCase().trim();
    const lvlFilter = document.getElementById('spells-level-filter')?.value || 'ALL';
    const container = document.getElementById('spells-results-grid');
    if (!container) return;

    const spellNameMap = {
      "acid splash": "Espirro Ácido",
      "blade ward": "Proteção contra Lâminas",
      "booming blade": "Lâmina Estrondosa",
      "chill touch": "Toque Gélido",
      "control flames": "Controlar Chamas",
      "create bonfire": "Criar Fogueira",
      "dancing lights": "Luzes Dançantes",
      "druidcraft": "Artifício de Druida",
      "eldritch blast": "Rajada Mística",
      "fire bolt": "Raio de Fogo",
      "friends": "Amizade",
      "frostbite": "Queimadura de Frio",
      "green-flame blade": "Lâmina da Chama Esmeralda",
      "guidance": "Orientação",
      "gust": "Rajada de Vento",
      "light": "Luz",
      "lightning lure": "Isca Elétrica",
      "mage hand": "Mãos Mágicas",
      "magic stone": "Pedra Mágica",
      "mending": "Consertar",
      "message": "Mensagem",
      "minor illusion": "Ilusão Menor",
      "mold earth": "Moldar Terra",
      "poison spray": "Borrifada Venenosa",
      "prestidigitation": "Prestidigitação",
      "produce flame": "Produzir Chama",
      "ray of frost": "Raio de Gelo",
      "resistance": "Resistência",
      "sacred flame": "Chama Sagrada",
      "shape water": "Moldar Água",
      "shillelagh": "Bordão Mágico (Shillelagh)",
      "shocking grasp": "Toque Chocante",
      "spare the dying": "Poupar os Moribundos",
      "sword burst": "Explosão de Espadas",
      "thaumaturgy": "Taumaturgia",
      "thorn whip": "Chicote de Espinhos",
      "thunderclap": "Estrondo de Trovão",
      "true strike": "Golpe Certeiro",
      "vicious mockery": "Zombaria Viciosa",
      "absorb elements": "Absorver Elementos",
      "alarm": "Alarme",
      "animal friendship": "Amizade Animal",
      "armor of agathys": "Armadura de Agathys",
      "arms of hadar": "Braços de Hadar",
      "bane": "Perdição",
      "beast bond": "Vínculo com Besta",
      "bless": "Bênção",
      "burning hands": "Mãos Flamejantes",
      "catapult": "Catapulta",
      "charm person": "Enfeitiçar Pessoa",
      "chromatic orb": "Esfera Cromática",
      "color spray": "Leque Cromático",
      "command": "Comando",
      "compelled duel": "Duelo Compelido",
      "comprehend languages": "Compreender Idiomas",
      "create or destroy water": "Criar ou Destruir Água",
      "cure wounds": "Curar Ferimentos",
      "detect evil and good": "Detectar o Bem e Mal",
      "detect magic": "Detectar Magia",
      "detect poison and disease": "Detectar Veneno e Doença",
      "disguise self": "Disfarçar-se",
      "dissonant whispers": "Sussurros Dissonantes",
      "divine favor": "Favor Divino",
      "ensnaring strike": "Ataque Enredante",
      "entangle": "Emaranhar",
      "expeditious retreat": "Recuo Acelerado",
      "faerie fire": "Fogo das Fadas",
      "false life": "Vida Falsa",
      "feather fall": "Queda Suave",
      "find familiar": "Encontrar Familiar",
      "fog cloud": "Nuvem de Névoa",
      "goodberry": "Fruto Bom (Goodberry)",
      "grease": "Área Escorregadia (Graxa)",
      "guiding bolt": "Raio Guiador",
      "healing word": "Palavra Curativa",
      "hellish rebuke": "Repreensão Infernal",
      "heroism": "Heroísmo",
      "hex": "Bruxaria (Hex)",
      "hunter's mark": "Marca do Caçador",
      "identify": "Identificação",
      "inflict wounds": "Infligir Ferimentos",
      "mage armor": "Armadura Arcana",
      "magic missile": "Mísseis Mágicos",
      "protection from evil and good": "Proteção contra o Bem e Mal",
      "sanctuary": "Santuário",
      "shield": "Escudo Arcano",
      "shield of faith": "Escudo da Fé",
      "silent image": "Imagem Silenciosa",
      "sleep": "Sono",
      "thunderwave": "Onda Trovejante",
      "witch bolt": "Raio de Bruxa",
      "blindness/deafness": "Cegueira/Surdez",
      "blur": "Desfoque",
      "darkness": "Escuridão",
      "darkvision": "Visão no Escuro",
      "flaming sphere": "Esfera Flamejante",
      "heat metal": "Esquentar Metal",
      "hold person": "Imobilizar Pessoa",
      "invisibility": "Invisibilidade",
      "knock": "Arrombar",
      "lesser restoration": "Restauração Menor",
      "levitate": "Levitação",
      "misty step": "Passo Nebuloso",
      "mirror image": "Imagens Espelhadas",
      "moonbeam": "Raio Lunar",
      "scorching ray": "Raio Ardente",
      "see invisibility": "Ver o Invisível",
      "shatter": "Despedaçar",
      "silence": "Silêncio",
      "spiritual weapon": "Arma Espiritual",
      "suggestion": "Sugestão",
      "web": "Teia",
      "animate dead": "Animar os Mortos",
      "bestow curse": "Rogar Maldição",
      "call lightning": "Convocar Relâmpago",
      "counterspell": "Contramagia",
      "dispel magic": "Dissipar Magia",
      "fear": "Medo",
      "fireball": "Bola de Fogo",
      "fly": "Voo",
      "gaseous form": "Forma Gasosa",
      "haste": "Velocidade",
      "hypnotic pattern": "Padrão Hipnótico",
      "lightning bolt": "Relâmpago",
      "major image": "Imagem Maior",
      "mass healing word": "Palavra Curativa em Massa",
      "revivify": "Reviver",
      "sleet storm": "Tempestade de Granizo",
      "slow": "Lentidão",
      "spirit guardians": "Guardiões Espirituais",
      "stinking cloud": "Nuvem Fétida",
      "tiny hut": "Pequena Cabana de Leomund",
      "vampiric touch": "Toque Vampírico",
      "water walk": "Andar na Água",
      "banishment": "Banimento",
      "blight": "Definhar",
      "dimension door": "Porta Dimensional",
      "greater invisibility": "Invisibilidade Maior",
      "ice storm": "Tempestade de Gelo",
      "polymorph": "Metamorfose",
      "stoneskin": "Pele de Pedra",
      "wall of fire": "Muralha de Fogo",
      "cloudkill": "Nuvem Assassina",
      "cone of cold": "Cone de Frio",
      "greater restoration": "Restauração Maior",
      "hold monster": "Imobilizar Monstro",
      "mass cure wounds": "Curar Ferimentos em Massa",
      "raise dead": "Reviver os Mortos",
      "teleportation circle": "Círculo de Teletransporte",
      "wall of force": "Muralha de Energia",
      "chain lightning": "Corrente de Relâmpagos",
      "disintegrate": "Desintegrar",
      "heal": "Cura Completa",
      "sunbeam": "Raio Solar",
      "true seeing": "Visão Verdadeira",
      "delayed blast fireball": "Bola de Fogo Controlada",
      "finger of death": "Dedo da Morte",
      "fire storm": "Tempestade de Fogo",
      "plane shift": "Viagem Planar",
      "resurrection": "Ressurreição",
      "reverse gravity": "Inverter a Gravidade",
      "teleport": "Teletransporte",
      "antimagic field": "Campo Antimagia",
      "earthquake": "Terremoto",
      "sunburst": "Explosão Solar",
      "gate": "Portal Dimensional",
      "meteor swarm": "Chuva de Meteoros",
      "power word kill": "Palavra de Poder: Matar",
      "time stop": "Parar o Tempo",
      "true resurrection": "Ressurreição Verdadeira",
      "wish": "Desejo"
    };

    const schoolMap = {
      "Evocation": "Evocação",
      "Abjuration": "Abjuração",
      "Conjuration": "Conjuração",
      "Divination": "Adivinhação",
      "Enchantment": "Encantamento",
      "Illusion": "Ilusão",
      "Necromancy": "Necromancia",
      "Transmutation": "Transmutação"
    };

    const spells = typeof SPELLS_DATABASE !== 'undefined' ? SPELLS_DATABASE : [];
    const filtered = spells.filter(s => {
      const ptName = (spellNameMap[s.name.toLowerCase()] || '').toLowerCase();
      const enName = s.name.toLowerCase();
      if (search && !enName.includes(search) && !ptName.includes(search) && !s.desc.toLowerCase().includes(search)) {
        return false;
      }
      if (lvlFilter !== 'ALL' && s.level.toString() !== lvlFilter) return false;
      return true;
    }).slice(0, 30);

    container.innerHTML = filtered.map(s => {
      const ptName = spellNameMap[s.name.toLowerCase()] || s.name;
      const schoolPt = schoolMap[s.school] || s.school;
      const showOrig = ptName !== s.name;
      return `
        <div class="card spell-catalog-card">
          <div class="spell-catalog-header">
            <h4>${ptName}</h4>
            <span class="badge badge-purple">${s.level === 'Truque' || s.level === '0' ? 'Truque' : s.level + 'º Círculo'}</span>
          </div>
          ${showOrig ? `<div style="font-size: 0.8rem; color: var(--text-muted); font-style: italic; margin-top: -0.2rem; margin-bottom: 0.35rem;">(${s.name})</div>` : ''}
          <div class="spell-catalog-meta">
            <span>Escola: <strong>${schoolPt}</strong></span> • 
            <span>Tempo: <strong>${s.castingTime.replace('action', 'ação').replace('Bonus', 'Bônus')}</strong></span> • 
            <span>Alcance: <strong>${s.range.replace('Self', 'Pessoal').replace('Touch', 'Toque')}</strong></span>
          </div>
          <div class="spell-catalog-desc">${s.desc.length > 220 ? s.desc.slice(0, 220) + '...' : s.desc}</div>
        </div>
      `;
    }).join('') || '<p class="text-muted">Nenhuma magia encontrada.</p>';
  },

  filterItems() {
    const search = (document.getElementById('items-search')?.value || '').toLowerCase().trim();
    const rarityFilter = document.getElementById('items-rarity-filter')?.value || 'ALL';
    const container = document.getElementById('items-results-grid');
    if (!container) return;

    const items = typeof ITEMS_DATABASE !== 'undefined' ? ITEMS_DATABASE : [];
    const filtered = items.filter(it => {
      if (search && !it.name.toLowerCase().includes(search) && !it.desc.toLowerCase().includes(search)) return false;
      if (rarityFilter !== 'ALL' && it.rarity !== rarityFilter) return false;
      return true;
    }).slice(0, 30);

    container.innerHTML = filtered.map(it => `
      <div class="card item-catalog-card">
        <div class="item-catalog-header">
          <h4>${it.name}</h4>
          <span class="badge badge-accent">${it.rarity}</span>
        </div>
        <div class="item-catalog-meta">
          <span>Tipo: <strong>${it.type}</strong></span> • 
          <span>${it.attunement ? 'Sintonização Obrigatória' : 'Sem Sintonização'}</span>
        </div>
        <div class="item-catalog-desc">${it.desc.length > 220 ? it.desc.slice(0, 220) + '...' : it.desc}</div>
      </div>
    `).join('') || '<p class="text-muted">Nenhum item mágico encontrado.</p>';
  },

  // -------------------------------------------------------------
  // Toast Notifier
  // -------------------------------------------------------------
  showToast(message) {
    let toast = document.getElementById('app-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'app-toast';
      toast.className = 'app-toast';
      document.body.appendChild(toast);
    }
    toast.innerText = message;
    toast.classList.add('visible');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 3200);
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
