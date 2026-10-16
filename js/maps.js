/**
 * Grimório do Mestre - Visualizador de Mapas & Pins de História
 */
const MapsModule = {
  activeMapId: null,
  zoom: 1,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  isAddingPin: false,

  init() {
    this.setupEventListeners();
    this.loadCampaignMaps();
  },

  getCurrentCampaign() {
    return DB.getActiveCampaign();
  },

  getMapsList() {
    const campaign = this.getCurrentCampaign();
    const campaignMaps = campaign ? (campaign.maps || []) : [];
    const worldMap = {
      id: 'map_world_general',
      title: 'Mundo Conhecido (Aethelgard)',
      imageUrl: 'assets/maps/world_map.jpg',
      pins: []
    };
    return [...campaignMaps, worldMap];
  },

  loadCampaignMaps() {
    const maps = this.getMapsList();
    const select = document.getElementById('map-select');
    if (!select) return;

    select.innerHTML = maps.map(m => `
      <option value="${m.id}" ${m.id === this.activeMapId ? 'selected' : ''}>${m.title}</option>
    `).join('');

    if (!this.activeMapId && maps.length > 0) {
      this.activeMapId = maps[0].id;
    }

    this.renderActiveMap();
  },

  selectMap(mapId) {
    this.activeMapId = mapId;
    this.resetView();
    this.renderActiveMap();
  },

  getActiveMap() {
    const maps = this.getMapsList();
    return maps.find(m => m.id === this.activeMapId) || maps[0] || null;
  },

  resetView() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.updateTransform();
  },

  zoomIn() {
    this.zoom = Math.min(4, this.zoom + 0.25);
    this.updateTransform();
  },

  zoomOut() {
    this.zoom = Math.max(0.5, this.zoom - 0.25);
    this.updateTransform();
  },

  updateTransform() {
    const target = document.getElementById('map-viewport-content');
    const zoomLabel = document.getElementById('map-zoom-label');
    if (target) {
      target.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    }
    if (zoomLabel) {
      zoomLabel.innerText = `${Math.round(this.zoom * 100)}%`;
    }
  },

  setupEventListeners() {
    const viewport = document.getElementById('map-viewport');
    if (!viewport) return;

    // Pan com o mouse
    viewport.addEventListener('mousedown', (e) => {
      if (this.isAddingPin) return;
      if (e.target.closest('.map-pin')) return;
      this.isDragging = true;
      this.dragStartX = e.clientX - this.panX;
      this.dragStartY = e.clientY - this.panY;
      viewport.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      this.panX = e.clientX - this.dragStartX;
      this.panY = e.clientY - this.dragStartY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      this.isDragging = false;
      if (viewport) viewport.style.cursor = this.isAddingPin ? 'crosshair' : 'grab';
    });

    // Zoom com a roda do mouse
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      this.zoom = Math.max(0.5, Math.min(4.0, this.zoom + delta));
      this.updateTransform();
    }, { passive: false });

    // Clique para adicionar Pin
    const mapImg = document.getElementById('map-image');
    if (mapImg) {
      mapImg.addEventListener('click', (e) => {
        if (!this.isAddingPin) return;
        const rect = mapImg.getBoundingClientRect();
        const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
        const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
        this.openCreatePinModal(xPercent, yPercent);
      });
    }
  },

  toggleAddPinMode() {
    this.isAddingPin = !this.isAddingPin;
    const btn = document.getElementById('btn-toggle-pin-mode');
    const viewport = document.getElementById('map-viewport');
    if (btn) {
      btn.classList.toggle('active', this.isAddingPin);
      btn.innerText = this.isAddingPin ? '📍 Clique no Mapa para Inserir Pin' : '📍 Adicionar Pin';
    }
    if (viewport) {
      viewport.style.cursor = this.isAddingPin ? 'crosshair' : 'grab';
    }
    if (this.isAddingPin) {
      App.showToast('Clique em qualquer ponto do mapa para fixar uma anotação.');
    }
  },

  renderActiveMap() {
    const currentMap = this.getActiveMap();
    if (!currentMap) return;

    const img = document.getElementById('map-image');
    const pinsContainer = document.getElementById('map-pins-layer');
    const titleEl = document.getElementById('map-current-title');

    if (img) {
      img.src = currentMap.imageUrl;
    }
    if (titleEl) {
      titleEl.innerText = currentMap.title;
    }

    if (pinsContainer) {
      pinsContainer.innerHTML = (currentMap.pins || []).map(pin => {
        let pinIcon = '📍';
        let pinColorClass = 'pin-gold';
        if (pin.category?.includes('Cidade')) { pinIcon = '🏰'; pinColorClass = 'pin-blue'; }
        else if (pin.category?.includes('Masmorra') || pin.category?.includes('Covil')) { pinIcon = '💀'; pinColorClass = 'pin-red'; }
        else if (pin.category?.includes('Tesouro')) { pinIcon = '💎'; pinColorClass = 'pin-gold'; }
        else if (pin.category?.includes('Magia') || pin.category?.includes('Enigma')) { pinIcon = '🔮'; pinColorClass = 'pin-purple'; }

        return `
          <div class="map-pin ${pinColorClass}" style="left: ${pin.x}%; top: ${pin.y}%;" onclick="MapsModule.openPinDetailModal('${pin.id}')" title="${pin.title}">
            <div class="pin-marker">${pinIcon}</div>
            <div class="pin-tooltip">${pin.title}</div>
          </div>
        `;
      }).join('');
    }
  },

  openPinDetailModal(pinId) {
    const map = this.getActiveMap();
    if (!map) return;
    const pin = (map.pins || []).find(p => p.id === pinId);
    if (!pin) return;

    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    title.innerText = `Ponto de Interesse: ${pin.title}`;
    body.innerHTML = `
      <div class="pin-detail-view">
        <div class="pin-category-badge badge badge-accent">${pin.category || 'Geral'}</div>

        <div class="pin-desc-box">
          <h4>Descrição Pública (Para os Jogadores)</h4>
          <p>${pin.desc || 'Nenhuma descrição fornecida.'}</p>
        </div>

        <div class="pin-secret-box">
          <h4>🔒 Anotações Secretas do Mestre</h4>
          <p>${pin.secret || 'Sem segredos anotados para este local.'}</p>
        </div>

        <div class="form-actions" style="margin-top: 1.5rem;">
          <button class="btn btn-danger" onclick="MapsModule.deletePin('${pin.id}')">🗑️ Remover Pin</button>
          <button class="btn btn-secondary" onclick="App.closeFormModal()">Fechar</button>
        </div>
      </div>
    `;

    modal.classList.add('active');
  },

  openCreatePinModal(x, y) {
    this.isAddingPin = false;
    this.toggleAddPinMode();

    const modal = document.getElementById('form-modal');
    const title = document.getElementById('form-modal-title');
    const body = document.getElementById('form-modal-body');
    if (!modal || !title || !body) return;

    title.innerText = 'Inserir Novo Pin no Mapa';
    body.innerHTML = `
      <form onsubmit="MapsModule.handleCreatePinSubmit(event, ${x}, ${y})">
        <div class="form-group">
          <label>Nome do Local / Ponto de Interesse *</label>
          <input type="text" id="pin-form-title" class="input" required placeholder="Ex: Caverna dos Goblins, Torre Abandonada" />
        </div>

        <div class="form-group">
          <label>Categoria</label>
          <select id="pin-form-cat" class="select">
            <option value="Cidade / Assentamento">🏰 Cidade / Assentamento</option>
            <option value="Masmorra / Covil" selected>💀 Masmorra / Covil</option>
            <option value="Perigo / Combate">⚔️ Perigo / Combate</option>
            <option value="Enigma / Magia">🔮 Enigma / Magia</option>
            <option value="Tesouro">💎 Tesouro</option>
            <option value="Ponto Histórico">📜 Ponto Histórico</option>
          </select>
        </div>

        <div class="form-group">
          <label>Descrição Pública (Aparente)</label>
          <textarea id="pin-form-desc" class="textarea" rows="3" placeholder="O que os jogadores avistam ao se aproximar deste local..."></textarea>
        </div>

        <div class="form-group">
          <label>🔒 Anotações Secretas do Mestre (Apenas você vê)</label>
          <textarea id="pin-form-secret" class="textarea" rows="3" placeholder="Encontros ocultos, monstros, armadilhas, senhas e tesouros guardados..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-secondary" onclick="App.closeFormModal()">Cancelar</button>
          <button type="submit" class="btn btn-primary">📍 Fixar Pin</button>
        </div>
      </form>
    `;

    modal.classList.add('active');
  },

  handleCreatePinSubmit(e, x, y) {
    e.preventDefault();
    const currentMap = this.getActiveMap();
    if (!currentMap) return;

    if (!currentMap.pins) currentMap.pins = [];

    const newPin = {
      id: 'pin_' + Date.now(),
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      title: document.getElementById('pin-form-title').value.trim(),
      category: document.getElementById('pin-form-cat').value,
      desc: document.getElementById('pin-form-desc').value.trim(),
      secret: document.getElementById('pin-form-secret').value.trim()
    };

    currentMap.pins.push(newPin);

    // Salva na campanha ativa
    const campaign = this.getCurrentCampaign();
    if (campaign && campaign.maps) {
      const mapIdx = campaign.maps.findIndex(m => m.id === currentMap.id);
      if (mapIdx >= 0) {
        campaign.maps[mapIdx] = currentMap;
        DB.saveActiveCampaign(campaign);
      }
    }

    App.closeFormModal();
    this.renderActiveMap();
    App.showToast(`Pin "${newPin.title}" fixado com sucesso!`);
  },

  deletePin(pinId) {
    if (!confirm('Deseja realmente remover este ponto de interesse?')) return;
    const currentMap = this.getActiveMap();
    if (!currentMap) return;

    currentMap.pins = (currentMap.pins || []).filter(p => p.id !== pinId);
    const campaign = this.getCurrentCampaign();
    if (campaign && campaign.maps) {
      const mapIdx = campaign.maps.findIndex(m => m.id === currentMap.id);
      if (mapIdx >= 0) {
        campaign.maps[mapIdx] = currentMap;
        DB.saveActiveCampaign(campaign);
      }
    }

    App.closeFormModal();
    this.renderActiveMap();
    App.showToast('Pin removido do mapa.');
  },

  toggleFullscreen() {
    const el = document.getElementById('map-viewport-wrapper');
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => alert(`Erro ao entrar em tela cheia: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  },

  handleCustomMapUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const title = prompt('Nome para o novo mapa:', file.name.replace(/\.[^/.]+$/, ''));
      if (!title) return;

      const campaign = this.getCurrentCampaign();
      if (!campaign.maps) campaign.maps = [];

      const newMap = {
        id: 'map_custom_' + Date.now(),
        title: title,
        imageUrl: e.target.result,
        pins: []
      };

      campaign.maps.push(newMap);
      DB.saveActiveCampaign(campaign);
      this.loadCampaignMaps();
      this.selectMap(newMap.id);
      App.showToast(`Mapa "${title}" carregado e salvo!`);
    };
    reader.readAsDataURL(file);
  }
};
