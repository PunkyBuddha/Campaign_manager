/**
 * Grimório do Mestre - Gerenciador de Armazenamento Local (DB)
 */
const DB = {
  get(key, fallback = null) {
    try {
      const data = localStorage.getItem('rpg_master_' + key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.error('Erro ao ler ' + key, e);
      return fallback;
    }
  },

  set(key, val) {
    try {
      localStorage.setItem('rpg_master_' + key, JSON.stringify(val));
      return true;
    } catch (e) {
      console.error('Erro ao salvar ' + key, e);
      return false;
    }
  },

  init() {
    // Inicializa campanhas padrão se não existirem
    if (!this.get('campaigns')) {
      this.set('campaigns', typeof DEFAULT_CAMPAIGNS !== 'undefined' ? DEFAULT_CAMPAIGNS : []);
    }
    if (!this.get('activeCampaignId')) {
      this.set('activeCampaignId', 'camp_phandelver');
    }
    // Inicializa jogadores se não existirem
    if (!this.get('players')) {
      this.set('players', typeof DEFAULT_PLAYERS !== 'undefined' ? DEFAULT_PLAYERS : []);
    }
    // Inicializa monstros customizados
    if (!this.get('customMonsters')) {
      this.set('customMonsters', []);
    }
    // Inicializa combate ativo
    if (!this.get('activeCombat')) {
      this.set('activeCombat', {
        round: 1,
        turnIndex: 0,
        combatants: [],
        logs: []
      });
    }
    // Inicializa histórico de dados
    if (!this.get('diceHistory')) {
      this.set('diceHistory', []);
    }
  },

  getActiveCampaign() {
    const campaigns = this.get('campaigns', []);
    const activeId = this.get('activeCampaignId', 'camp_phandelver');
    return campaigns.find(c => c.id === activeId) || campaigns[0] || null;
  },

  saveActiveCampaign(updated) {
    const campaigns = this.get('campaigns', []);
    const idx = campaigns.findIndex(c => c.id === updated.id);
    if (idx >= 0) {
      campaigns[idx] = updated;
    } else {
      campaigns.push(updated);
    }
    this.set('campaigns', campaigns);
  },

  exportAllBackup() {
    const backup = {
      exportDate: new Date().toISOString(),
      version: '2.0',
      activeCampaignId: this.get('activeCampaignId'),
      campaigns: this.get('campaigns'),
      players: this.get('players'),
      customMonsters: this.get('customMonsters'),
      activeCombat: this.get('activeCombat'),
      diceHistory: this.get('diceHistory')
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grimorio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  importBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.campaigns) this.set('campaigns', data.campaigns);
      if (data.activeCampaignId) this.set('activeCampaignId', data.activeCampaignId);
      if (data.players) this.set('players', data.players);
      if (data.customMonsters) this.set('customMonsters', data.customMonsters);
      if (data.activeCombat) this.set('activeCombat', data.activeCombat);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  },

  resetAllToDefaults() {
    localStorage.removeItem('rpg_master_campaigns');
    localStorage.removeItem('rpg_master_activeCampaignId');
    localStorage.removeItem('rpg_master_players');
    localStorage.removeItem('rpg_master_customMonsters');
    localStorage.removeItem('rpg_master_activeCombat');
    localStorage.removeItem('rpg_master_diceHistory');
    this.init();
  }
};
