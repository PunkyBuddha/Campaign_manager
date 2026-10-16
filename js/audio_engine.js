/**
 * Grimório do Mestre - Motor de Áudio & Ambiência (Web Audio API)
 * Funciona 100% offline com geradores de som procedurais e suporte a MP3 locais
 */
const AudioStudio = {
  ctx: null,
  masterGain: null,
  channels: {},
  customAudio: null,
  isMuted: false,

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      console.warn('Web Audio API não suportada neste navegador.');
      return;
    }
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  },

  resumeCtx() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  },

  setMasterVolume(val) {
    this.resumeCtx();
    if (!this.masterGain) return;
    const gain = Math.max(0, Math.min(1, val));
    this.masterGain.gain.setValueAtTime(gain, this.ctx.currentTime);
  },

  // -------------------------------------------------------------
  // Ambiência Procedural Offline (Chuva, Fogueira, Vento, etc.)
  // -------------------------------------------------------------
  toggleChannel(channelName) {
    this.resumeCtx();
    if (this.channels[channelName] && this.channels[channelName].active) {
      this.stopChannel(channelName);
      return false;
    } else {
      this.startChannel(channelName);
      return true;
    }
  },

  setChannelVolume(channelName, val) {
    this.resumeCtx();
    const ch = this.channels[channelName];
    if (ch && ch.gainNode) {
      ch.gainNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
  },

  stopChannel(name) {
    const ch = this.channels[name];
    if (ch && ch.active) {
      try {
        if (ch.stop) ch.stop();
        if (ch.gainNode) ch.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch (e) {
        console.error(e);
      }
      ch.active = false;
    }
  },

  startChannel(name, volume = 0.5) {
    this.stopChannel(name);
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);
    gainNode.connect(this.masterGain);

    let stopFunc = null;

    if (name === 'rain') {
      stopFunc = this._createRainGenerator(gainNode);
    } else if (name === 'fire') {
      stopFunc = this._createFireGenerator(gainNode);
    } else if (name === 'wind') {
      stopFunc = this._createWindGenerator(gainNode);
    } else if (name === 'drums') {
      stopFunc = this._createDrumsGenerator(gainNode);
    } else if (name === 'cavern') {
      stopFunc = this._createCavernGenerator(gainNode);
    }

    this.channels[name] = {
      active: true,
      gainNode,
      stop: stopFunc
    };
  },

  _createNoiseBuffer(type = 'white', seconds = 3) {
    const bufferSize = this.ctx.sampleRate * seconds;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      if (type === 'brown') {
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      } else if (type === 'pink') {
        data[i] = (lastOut + 0.05 * white) / 1.05;
        lastOut = data[i];
        data[i] *= 2.5;
      } else {
        data[i] = white * 0.5;
      }
    }
    return buffer;
  },

  _createRainGenerator(destGain) {
    const buffer = this._createNoiseBuffer('pink', 4);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(250, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(highpass);
    highpass.connect(destGain);
    noise.start();

    return () => {
      try { noise.stop(); noise.disconnect(); } catch (e) {}
    };
  },

  _createFireGenerator(destGain) {
    const buffer = this._createNoiseBuffer('brown', 3);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(destGain);
    noise.start();

    // Estalos periódicos de lenha
    const popInterval = setInterval(() => {
      if (!this.channels['fire'] || !this.channels['fire'].active) {
        clearInterval(popInterval);
        return;
      }
      if (Math.random() > 0.4) {
        this._playWoodPop(destGain);
      }
    }, 400);

    return () => {
      clearInterval(popInterval);
      try { noise.stop(); noise.disconnect(); } catch (e) {}
    };
  },

  _playWoodPop(destGain) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(250 + Math.random() * 600, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.18 + Math.random() * 0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(destGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  },

  _createWindGenerator(destGain) {
    const buffer = this._createNoiseBuffer('white', 4);
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(350, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    // LFO oscilante suave para simular uivos de vento
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime);
    lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    noise.connect(filter);
    filter.connect(destGain);
    noise.start();

    return () => {
      try { noise.stop(); lfo.stop(); noise.disconnect(); } catch (e) {}
    };
  },

  _createDrumsGenerator(destGain) {
    let step = 0;
    const interval = setInterval(() => {
      if (!this.channels['drums'] || !this.channels['drums'].active) {
        clearInterval(interval);
        return;
      }
      this._playDrumBeat(destGain, step % 2 === 0);
      step++;
    }, 700);

    return () => {
      clearInterval(interval);
    };
  },

  _playDrumBeat(destGain, isStrong) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const baseFreq = isStrong ? 85 : 65;
      osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(isStrong ? 0.6 : 0.35, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(destGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.42);
    } catch (e) {}
  },

  _createCavernGenerator(destGain) {
    const freqs = [110, 164.81, 220, 293.66]; // Corda mágica com harmônicos etéreos
    const oscs = [];

    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      g.gain.setValueAtTime(0.08, this.ctx.currentTime);
      osc.connect(g);
      g.connect(destGain);
      osc.start();
      oscs.push(osc);
    });

    return () => {
      oscs.forEach(o => {
        try { o.stop(); o.disconnect(); } catch (e) {}
      });
    };
  },

  // -------------------------------------------------------------
  // Efeitos Sonoros Instantâneos (SFX)
  // -------------------------------------------------------------
  playSFX(type) {
    this.resumeCtx();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;

    if (type === 'dice') {
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          try {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(500 + Math.random() * 400, this.ctx.currentTime);
            g.gain.setValueAtTime(0.2, this.ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.06);
          } catch (e) {}
        }, i * 65);
      }
    } else if (type === 'slash') {
      const buffer = this._createNoiseBuffer('white', 0.2);
      const src = this.ctx.createBufferSource();
      const filter = this.ctx.createBiquadFilter();
      const g = this.ctx.createGain();

      src.buffer = buffer;
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1000, t);
      filter.frequency.exponentialRampToValueAtTime(3000, t + 0.15);

      g.gain.setValueAtTime(0.5, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.2);

      src.connect(filter);
      filter.connect(g);
      g.connect(this.masterGain);
      src.start(t);
      src.stop(t + 0.22);
    } else if (type === 'fireball') {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.4);

      g.gain.setValueAtTime(0.6, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.45);

      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.5);
    } else if (type === 'critical') {
      // Fanfarra triunfante
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        setTimeout(() => {
          try {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            g.gain.setValueAtTime(0.35, this.ctx.currentTime);
            g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
            osc.connect(g);
            g.connect(this.masterGain);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.35);
          } catch (e) {}
        }, idx * 75);
      });
    } else if (type === 'miss') {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.4);
      g.gain.setValueAtTime(0.3, t);
      g.gain.exponentialRampToValueAtTime(0.01, t + 0.42);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.45);
    }
  },

  // -------------------------------------------------------------
  // Reprodutor de Músicas MP3/Áudio do Usuário
  // -------------------------------------------------------------
  playUserAudio(file) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    const url = URL.createObjectURL(file);
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.customAudio.volume = 0.7;
    this.customAudio.play();
    return this.customAudio;
  },

  pauseUserAudio() {
    if (this.customAudio) {
      this.customAudio.pause();
    }
  },

  setUserAudioVolume(val) {
    if (this.customAudio) {
      this.customAudio.volume = Math.max(0, Math.min(1, val));
    }
  }
};
