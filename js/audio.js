/**
 * Motor de Sonido Sintetizado con Web Audio API
 * Proporciona efectos de sonido arcade profesionales sin requerir archivos de audio externos.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.musicEnabled = false;
    this.musicInterval = null;
    this.musicStep = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.init();
      this.playChime();
    }
    return this.soundEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (this.musicEnabled) {
      this.init();
      this.startMusic();
    } else {
      this.stopMusic();
    }
    return this.musicEnabled;
  }

  // Tono con decaimiento suave
  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15, startTime = 0) {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime + startTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);

    gain.gain.setValueAtTime(gainValue, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + duration);
  }

  // Sonido de Acierto (Campanita feliz C-E-G-C)
  playCorrect() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.28, 0.2, idx * 0.05);
    });
  }

  // Sonido de Error (Buzzer educativo suave)
  playWrong() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(180, t);
    osc2.frequency.setValueAtTime(125, t);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.35);
    osc2.stop(t + 0.35);
  }

  // Sonido al levantar el residuo (Pop alegre)
  playGrab() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(650, t + 0.08);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.08);
  }

  // Sonido de abrir caneca (swoosh de tapa)
  playLidOpen() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);

    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  // Sonido de caída dentro de la caneca (tactile thud)
  playDrop() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.15);

    gain.gain.setValueAtTime(0.2, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.15);
  }

  // Racha o Combo (Fanfarria ascendente)
  playCombo() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 0.25, 0.22, idx * 0.06);
    });
  }

  // Fin del Juego / Victoria
  playVictory() {
    if (!this.soundEnabled) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.45, 0.25, idx * 0.1);
    });
  }

  playChime() {
    this.playTone(880, 'sine', 0.15, 0.1);
  }

  // Música suave de fondo estilo marimba / arcade
  startMusic() {
    if (this.musicInterval) clearInterval(this.musicInterval);
    const melody = [
      261.63, 329.63, 392.00, 523.25, // C4, E4, G4, C5
      349.23, 440.00, 523.25, 659.25, // F4, A4, C5, E5
      392.00, 493.88, 587.33, 783.99, // G4, B4, D5, G5
      523.25, 392.00, 329.63, 261.63  // C5, G4, E4, C4
    ];

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled) return;
      const note = melody[this.musicStep % melody.length];
      this.playTone(note, 'sine', 0.2, 0.04);
      this.musicStep++;
    }, 400);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }
}

// Instancia global
window.soundEngine = new SoundEngine();
