/**
 * EcoClasifica HSE - Lógica del Juego
 * Manejo de estados, física de arrastre (Pointer Events), motor pedagógico y reportes.
 */

class WasteSortingGame {
  constructor() {
    this.currentMode = 'standard'; // 'standard' (3 canecas, 3 min) o 'hse' (5 canecas, 5 min)
    this.isPlaying = false;
    this.isPaused = false;
    
    // Puntuación y métricas
    this.score = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.streak = 0;
    this.maxStreak = 0;
    
    // Temporizador y límites
    this.roundDuration = 180; // 3 minutos para estándar (180s) / 5 minutos para HSE (300s)
    this.timeRemaining = this.roundDuration;
    this.elapsedSeconds = 0;
    this.timerInterval = null;
    
    // Cola y gestión de residuos (clasificar todos los residuos una vez)
    this.itemsQueue = [];
    this.totalItemsCount = 0;
    this.currentItemIndex = 0;
    this.activeItem = null;
    this.mistakesList = [];
    
    // Variables de Arrastre (Pointer Events)
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartY = 0;
    this.itemStartX = 0;
    this.itemStartY = 0;
    this.currentHoveredBin = null;

    // Elementos del DOM
    this.dom = {};
  }

  init() {
    this.cacheDom();
    this.bindEvents();
    this.updateModeUI();
    this.renderBins();
    this.populateHseMatrix();
  }

  cacheDom() {
    this.dom = {
      // HUD
      timerBar: document.getElementById('timerBar'),
      timerText: document.getElementById('timerText'),
      progressText: document.getElementById('progressText'),
      scoreSuccess: document.getElementById('scoreSuccess'),
      scoreError: document.getElementById('scoreError'),
      comboBadge: document.getElementById('comboBadge'),
      comboText: document.getElementById('comboText'),
      btnSwitchMode: document.getElementById('btnSwitchMode'),
      modeChipLabel: document.getElementById('modeChipLabel'),
      btnOpenMatrix: document.getElementById('btnOpenMatrix'),
      btnToggleAudio: document.getElementById('btnToggleAudio'),
      soundOnIco: document.getElementById('soundOnIco'),
      soundOffIco: document.getElementById('soundOffIco'),
      btnPauseGame: document.getElementById('btnPauseGame'),
      
      // Zona de juego
      activeWasteItem: document.getElementById('activeWasteItem'),
      itemSvgContainer: document.getElementById('itemSvgContainer'),
      itemNameLabel: document.getElementById('itemNameLabel'),
      floatingFeedbackLayer: document.getElementById('floatingFeedbackLayer'),
      binsDock: document.getElementById('binsDock'),
      
      // Modales
      modalWelcome: document.getElementById('modalWelcome'),
      btnStartGame: document.getElementById('btnStartGame'),
      modeCardBtns: document.querySelectorAll('.mode-card-btn'),
      
      modalMatrix: document.getElementById('modalMatrix'),
      btnCloseMatrix: document.getElementById('btnCloseMatrix'),
      btnReturnToGame: document.getElementById('btnReturnToGame'),
      matrixSearchInput: document.getElementById('matrixSearchInput'),
      matrixFilterPills: document.getElementById('matrixFilterPills'),
      matrixTableBody: document.getElementById('matrixTableBody'),
      
      modalGameOver: document.getElementById('modalGameOver'),
      gameOverTitle: document.getElementById('gameOverTitle'),
      gameOverSubtitle: document.getElementById('gameOverSubtitle'),
      statFinalTime: document.getElementById('statFinalTime'),
      statFinalScore: document.getElementById('statFinalScore'),
      statFinalCorrect: document.getElementById('statFinalCorrect'),
      statFinalAccuracy: document.getElementById('statFinalAccuracy'),
      reviewErrorsSection: document.getElementById('reviewErrorsSection'),
      reviewErrorsList: document.getElementById('reviewErrorsList'),
      btnPlayAgain: document.getElementById('btnPlayAgain'),
      btnChangeModeFromEnd: document.getElementById('btnChangeModeFromEnd')
    };
  }

  bindEvents() {
    // Selección de modo en modal de bienvenida
    this.dom.modeCardBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.dom.modeCardBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentMode = btn.dataset.mode;
        this.updateModeUI();
        this.renderBins(); // Actualiza las canecas visuales de inmediato
      });
    });

    // Iniciar juego
    this.dom.btnStartGame.addEventListener('click', () => {
      this.dom.modalWelcome.classList.remove('active');
      window.soundEngine.init();
      this.startGame();
    });

    // Cambiar modo desde el HUD
    this.dom.btnSwitchMode.addEventListener('click', () => {
      this.toggleMode();
    });

    // Audio
    this.dom.btnToggleAudio.addEventListener('click', () => {
      const isEnabled = window.soundEngine.toggleSound();
      this.dom.soundOnIco.classList.toggle('hidden', !isEnabled);
      this.dom.soundOffIco.classList.toggle('hidden', isEnabled);
    });

    // Pausa / Reinicio
    this.dom.btnPauseGame.addEventListener('click', () => {
      this.togglePause();
    });

    // Modal Matriz HSE
    this.dom.btnOpenMatrix.addEventListener('click', () => {
      this.openMatrixModal();
    });
    this.dom.btnCloseMatrix.addEventListener('click', () => {
      this.closeMatrixModal();
    });
    this.dom.btnReturnToGame.addEventListener('click', () => {
      this.closeMatrixModal();
    });

    // Buscador y filtros de la matriz
    this.dom.matrixSearchInput.addEventListener('input', () => {
      this.filterMatrixTable();
    });
    this.dom.matrixFilterPills.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-pill')) {
        this.dom.matrixFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        this.filterMatrixTable();
      }
    });

    // Fin de partida
    this.dom.btnPlayAgain.addEventListener('click', () => {
      this.dom.modalGameOver.classList.remove('active');
      this.startGame();
    });
    this.dom.btnChangeModeFromEnd.addEventListener('click', () => {
      this.dom.modalGameOver.classList.remove('active');
      this.dom.modalWelcome.classList.add('active');
    });

    // Interacción Drag & Drop con Pointer Events
    this.setupPointerDrag();
  }

  // ==========================================
  // CONFIGURACIÓN DE MODOS Y CANECAS
  // ==========================================
  toggleMode() {
    this.currentMode = (this.currentMode === 'standard') ? 'hse' : 'standard';
    this.updateModeUI();
    this.renderBins();
    this.startGame();
  }

  updateModeUI() {
    const isStandard = (this.currentMode === 'standard');
    this.dom.modeChipLabel.textContent = isStandard ? "3 Canecas (Estándar)" : "5 Canecas (Integral HSE)";
    this.dom.binsDock.className = `bins-dock ${isStandard ? 'mode-3-bins' : 'mode-5-bins'}`;
  }

  renderBins() {
    this.dom.binsDock.innerHTML = '';
    
    // Canecas según el modo:
    // Estándar (3 canecas): Verde (Orgánicos), Blanco (Aprovechables), Negro (No aprovechables)
    // HSE (5 canecas): Verde, Blanco, Negro, Peligrosos (Roja), Especiales (Naranja)
    const binKeys = (this.currentMode === 'standard')
      ? ['verde', 'blanco', 'negro']
      : ['verde', 'blanco', 'negro', 'peligrosos', 'especiales'];

    binKeys.forEach(key => {
      const conf = BINS_CONFIG[key];
      if (!conf) return;

      const binEl = document.createElement('div');
      binEl.className = `bin-container bin-${conf.id}`;
      binEl.dataset.binId = conf.id;
      binEl.title = `${conf.name} - ${conf.description}`;

      binEl.innerHTML = `
        <div class="bin-lid">
          <div class="bin-lid-handle"></div>
        </div>
        <div class="bin-body">
          <div class="bin-ribs"></div>
          <div class="bin-emblem">
            ${conf.icon}
          </div>
          <div class="bin-labels">
            <span class="bin-main-title">${conf.name}</span>
            <span class="bin-sub-title">${conf.subtitle}</span>
          </div>
        </div>
        <div class="bin-wheels">
          <div class="bin-wheel"></div>
          <div class="bin-wheel"></div>
        </div>
      `;

      // Clic directo en la caneca (Tap-to-Classify)
      binEl.addEventListener('click', () => {
        if (!this.isPlaying || this.isPaused || !this.activeItem) return;
        this.evaluateDeposit(conf.id, binEl);
      });

      this.dom.binsDock.appendChild(binEl);
    });
  }

  // ==========================================
  // ARRASTRE Y SOLTAR (POINTER EVENTS ENGINE)
  // ==========================================
  setupPointerDrag() {
    const item = this.dom.activeWasteItem;

    item.addEventListener('pointerdown', (e) => {
      if (!this.isPlaying || this.isPaused || !this.activeItem) return;
      e.preventDefault();
      
      this.isDragging = true;
      item.setPointerCapture(e.pointerId);
      item.classList.add('is-dragging');
      window.soundEngine.playGrab();

      const rect = item.getBoundingClientRect();
      this.itemStartX = rect.left + rect.width / 2;
      this.itemStartY = rect.top + rect.height / 2;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;
    });

    item.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      e.preventDefault();

      const deltaX = e.clientX - this.dragStartX;
      const deltaY = e.clientY - this.dragStartY;

      // Trasladar el elemento arrastrado
      item.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.12) rotate(${deltaX * 0.05}deg)`;

      // Comprobar colisión con las canecas
      this.checkBinHover(e.clientX, e.clientY);
    });

    const endDrag = (e) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      item.classList.remove('is-dragging');
      try {
        item.releasePointerCapture(e.pointerId);
      } catch (err) {}

      // Si se soltó sobre una caneca válida
      if (this.currentHoveredBin) {
        const binId = this.currentHoveredBin.dataset.binId;
        const targetBin = this.currentHoveredBin;
        this.clearBinHover();
        item.style.transform = '';
        this.evaluateDeposit(binId, targetBin);
      } else {
        // Regresar al centro con animación
        this.clearBinHover();
        item.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
        item.style.transform = 'translate(0px, 0px)';
        setTimeout(() => {
          item.style.transition = '';
        }, 250);
      }
    };

    item.addEventListener('pointerup', endDrag);
    item.addEventListener('pointercancel', endDrag);
  }

  checkBinHover(x, y) {
    const bins = this.dom.binsDock.querySelectorAll('.bin-container');
    let hovered = null;

    bins.forEach(bin => {
      const rect = bin.getBoundingClientRect();
      if (
        x >= rect.left - 15 &&
        x <= rect.right + 15 &&
        y >= rect.top - 30 &&
        y <= rect.bottom + 15
      ) {
        hovered = bin;
      }
    });

    if (hovered !== this.currentHoveredBin) {
      this.clearBinHover();
      if (hovered) {
        hovered.classList.add('drag-over');
        window.soundEngine.playLidOpen();
      }
      this.currentHoveredBin = hovered;
    }
  }

  clearBinHover() {
    if (this.currentHoveredBin) {
      this.currentHoveredBin.classList.remove('drag-over');
      this.currentHoveredBin = null;
    }
  }

  // ==========================================
  // EVALUACIÓN DEL DEPÓSITO Y PROGRESIÓN
  // ==========================================
  evaluateDeposit(chosenBinId, binElement) {
    if (!this.activeItem) return;

    const isCorrect = (chosenBinId === this.activeItem.category);
    
    // Animación de rebote de la caneca
    binElement.classList.add('intake-bounce');
    setTimeout(() => {
      binElement.classList.remove('intake-bounce');
    }, 450);

    if (isCorrect) {
      this.handleSuccess(binElement);
    } else {
      this.handleMistake(chosenBinId, binElement);
    }

    // Avanzar al siguiente residuo de la cola
    this.currentItemIndex++;

    if (this.currentItemIndex < this.totalItemsCount) {
      // Mostrar el siguiente residuo
      this.spawnCurrentItem();
      this.updateHud();
    } else {
      // ¡Completó todos los residuos del juego!
      this.updateHud();
      setTimeout(() => {
        this.endGame(true);
      }, 500);
    }
  }

  handleSuccess(binElement) {
    this.successCount++;
    this.streak++;
    if (this.streak > this.maxStreak) this.maxStreak = this.streak;

    // Bonificación de puntaje por acierto y racha
    const streakBonus = Math.min(this.streak * 20, 160);
    const addedPoints = 100 + streakBonus;
    this.score += addedPoints;

    // Sonidos
    window.soundEngine.playDrop();
    window.soundEngine.playCorrect();
    if (this.streak >= 3) {
      window.soundEngine.playCombo();
    }

    // Feedback Flotante
    const binRect = binElement.getBoundingClientRect();
    const stageRect = document.getElementById('gameStage').getBoundingClientRect();
    const posX = binRect.left - stageRect.left + binRect.width / 2 - 40;
    const posY = binRect.top - stageRect.top - 20;

    const msg = this.streak >= 3 ? `+${addedPoints} ¡Combo x${this.streak}!` : `+${addedPoints} ✓ ¡Correcto!`;
    this.showFloatingFeedback(msg, posX, posY, 'float-success');
  }

  handleMistake(chosenBinId, binElement) {
    this.errorCount++;
    this.streak = 0;
    this.score = Math.max(0, this.score - 25);

    // Registrar error para el reporte final pedagógico
    const correctConfig = BINS_CONFIG[this.activeItem.category];
    this.mistakesList.push({
      item: this.activeItem.name,
      chosen: BINS_CONFIG[chosenBinId] ? BINS_CONFIG[chosenBinId].name : chosenBinId,
      correct: correctConfig.name,
      tip: this.activeItem.tip
    });

    // Sonidos
    window.soundEngine.playWrong();

    // Feedback Flotante
    const binRect = binElement.getBoundingClientRect();
    const stageRect = document.getElementById('gameStage').getBoundingClientRect();
    const posX = binRect.left - stageRect.left + binRect.width / 2 - 80;
    const posY = binRect.top - stageRect.top - 20;

    const msg = `✖ Era en ${correctConfig.name}`;
    this.showFloatingFeedback(msg, posX, posY, 'float-error');
  }

  showFloatingFeedback(text, x, y, className) {
    const el = document.createElement('div');
    el.className = `float-msg ${className}`;
    el.textContent = text;
    el.style.left = `${Math.max(20, Math.min(window.innerWidth - 180, x))}px`;
    el.style.top = `${Math.max(40, y)}px`;

    this.dom.floatingFeedbackLayer.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1100);
  }

  // ==========================================
  // CICLO DEL JUEGO Y COLA DE RESIDUOS
  // ==========================================
  startGame() {
    this.resetGame();
    this.isPlaying = true;
    this.isPaused = false;
    
    // Asegurar que las canecas correspondientes al modo estén renderizadas
    this.updateModeUI();
    this.renderBins();

    // Preparar y barajar todos los residuos del modo seleccionado
    this.prepareItemPool();

    // Cargar el primer residuo
    this.spawnCurrentItem();

    // Actualizar HUD
    this.updateHud();

    // Iniciar cronómetro de tiempo
    this.startTimer();
  }

  resetGame() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.score = 0;
    this.successCount = 0;
    this.errorCount = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.currentItemIndex = 0;
    this.elapsedSeconds = 0;
    this.mistakesList = [];
  }

  prepareItemPool() {
    let pool = [];
    if (this.currentMode === 'standard') {
      // 17 residuos cotidianos correspondientes a Blanco, Verde y Negro
      pool = WASTE_ITEMS.filter(item => item.modes.includes('standard'));
      this.roundDuration = 180; // 3 minutos máximos
    } else {
      // 25 residuos de toda la matriz HSE (incluyendo Peligrosos y Especiales)
      pool = [...WASTE_ITEMS];
      this.roundDuration = 300; // 5 minutos máximos
    }

    // Barajado aleatorio Fisher-Yates para presentar todos los residuos sin repetir
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    this.itemsQueue = pool;
    this.totalItemsCount = pool.length;
    this.currentItemIndex = 0;
    this.timeRemaining = this.roundDuration;
    this.elapsedSeconds = 0;
  }

  spawnCurrentItem() {
    if (!this.isPlaying) return;

    const chosen = this.itemsQueue[this.currentItemIndex];
    if (!chosen) return;
    this.activeItem = chosen;

    // Inyectar en el sticker
    this.dom.itemSvgContainer.innerHTML = chosen.svg;
    this.dom.itemNameLabel.textContent = chosen.name;

    // Animación de entrada
    const itemCard = this.dom.activeWasteItem;
    itemCard.style.transform = 'scale(0.5)';
    itemCard.style.opacity = '0';
    
    requestAnimationFrame(() => {
      itemCard.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease';
      itemCard.style.transform = 'scale(1)';
      itemCard.style.opacity = '1';
      setTimeout(() => {
        itemCard.style.transition = '';
      }, 300);
    });
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = setInterval(() => {
      if (this.isPaused) return;

      this.elapsedSeconds++;
      this.timeRemaining = Math.max(0, this.roundDuration - this.elapsedSeconds);
      
      this.updateTimerDisplay();

      // Si se agota el tiempo límite máximo
      if (this.timeRemaining <= 0) {
        this.endGame(false);
      }
    }, 1000);
  }

  updateTimerDisplay() {
    // Barra de tiempo muestra el porcentaje consumido hacia el límite
    const pct = Math.max(0, (this.timeRemaining / this.roundDuration) * 100);
    this.dom.timerBar.style.width = `${pct}%`;

    // Minutos y segundos transcurridos
    const elapMins = Math.floor(this.elapsedSeconds / 60);
    const elapSecs = this.elapsedSeconds % 60;
    const elapStr = `${String(elapMins).padStart(2, '0')}:${String(elapSecs).padStart(2, '0')}`;

    // Límite máximo
    const limitMins = Math.floor(this.roundDuration / 60);
    const limitSecs = this.roundDuration % 60;
    const limitStr = `${String(limitMins).padStart(2, '0')}:${String(limitSecs).padStart(2, '0')}`;

    this.dom.timerText.textContent = `${elapStr} / ${limitStr}`;

    // Alerta visual si queda menos de 30 segundos
    if (this.timeRemaining <= 30) {
      this.dom.timerBar.style.background = 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)';
    } else {
      this.dom.timerBar.style.background = 'linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #3b82f6 100%)';
    }
  }

  updateHud() {
    // Progreso de residuos (ej: 1 / 17)
    const currentNum = Math.min(this.currentItemIndex + 1, this.totalItemsCount);
    this.dom.progressText.textContent = `${currentNum} / ${this.totalItemsCount}`;

    // Aciertos y errores
    this.dom.scoreSuccess.textContent = this.successCount;
    this.dom.scoreError.textContent = this.errorCount;

    // Racha / Combo
    if (this.streak >= 2) {
      this.dom.comboBadge.classList.remove('hidden');
      this.dom.comboText.textContent = `x${this.streak}`;
    } else {
      this.dom.comboBadge.classList.add('hidden');
    }

    this.updateTimerDisplay();
  }

  togglePause() {
    if (!this.isPlaying) return;
    this.isPaused = !this.isPaused;
    this.dom.btnPauseGame.title = this.isPaused ? "Reanudar" : "Pausar";
    if (this.isPaused) {
      this.dom.itemNameLabel.textContent = "⏸ Juego en Pausa";
    } else if (this.activeItem) {
      this.dom.itemNameLabel.textContent = this.activeItem.name;
    }
  }

  endGame(completedAll) {
    this.isPlaying = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    window.soundEngine.playVictory();

    // Formatear tiempo empleado
    const mins = Math.floor(this.elapsedSeconds / 60);
    const secs = this.elapsedSeconds % 60;
    const timeFormatted = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;

    // Precisión
    const totalProcessed = Math.max(1, this.successCount + this.errorCount);
    const accuracy = Math.round((this.successCount / totalProcessed) * 100);

    // Bonificación de velocidad por terminar antes del límite
    if (completedAll && this.timeRemaining > 0) {
      const speedBonus = this.timeRemaining * 10;
      this.score += speedBonus;
      this.dom.gameOverTitle.textContent = "🏆 ¡Clasificación Completada!";
      this.dom.gameOverSubtitle.textContent = `¡Excelente agilidad! Clasificaste los ${this.totalItemsCount} residuos en ${timeFormatted} (+${speedBonus} pts por velocidad).`;
    } else {
      this.dom.gameOverTitle.textContent = "⏰ ¡Tiempo Límite Alcanzado!";
      this.dom.gameOverSubtitle.textContent = `Lograste clasificar ${this.currentItemIndex} de ${this.totalItemsCount} residuos en ${timeFormatted}.`;
    }

    this.dom.statFinalTime.textContent = timeFormatted;
    this.dom.statFinalScore.textContent = this.score;
    this.dom.statFinalCorrect.textContent = `${this.successCount} / ${this.totalItemsCount}`;
    this.dom.statFinalAccuracy.textContent = `${accuracy}%`;

    // Mostrar repaso de errores si los hubo
    if (this.mistakesList.length > 0) {
      this.dom.reviewErrorsSection.classList.remove('hidden');
      this.dom.reviewErrorsList.innerHTML = '';
      
      const seen = new Set();
      this.mistakesList.forEach(m => {
        if (!seen.has(m.item)) {
          seen.add(m.item);
          const li = document.createElement('li');
          li.className = 'review-item';
          li.innerHTML = `
            <strong>${m.item}</strong> ➔ Va en <strong>${m.correct}</strong> (Elegiste: ${m.chosen}).
            <br><span style="color:#475569;">${m.tip}</span>
          `;
          this.dom.reviewErrorsList.appendChild(li);
        }
      });
    } else {
      this.dom.reviewErrorsSection.classList.add('hidden');
    }

    // Abrir modal de resultados
    this.dom.modalGameOver.classList.add('active');
  }

  // ==========================================
  // MATRIZ DE RESIDUOS HSE (TABLA IMAGEN 2)
  // ==========================================
  populateHseMatrix() {
    this.filterMatrixTable();
  }

  filterMatrixTable() {
    const query = this.dom.matrixSearchInput.value.toLowerCase().trim();
    const activePill = this.dom.matrixFilterPills.querySelector('.filter-pill.active');
    const filterCat = activePill ? activePill.dataset.filter : 'all';

    this.dom.matrixTableBody.innerHTML = '';

    const filtered = WASTE_ITEMS.filter(item => {
      const matchQuery = item.name.toLowerCase().includes(query) || item.tip.toLowerCase().includes(query);
      const matchCat = (filterCat === 'all') || (item.category === filterCat);
      return matchQuery && matchCat;
    });

    if (filtered.length === 0) {
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="7" style="text-align:center; padding: 24px; color:#64748b;">No se encontraron residuos con ese criterio.</td>`;
      this.dom.matrixTableBody.appendChild(row);
      return;
    }

    filtered.forEach(item => {
      const row = document.createElement('tr');
      
      const checkNegro = (item.category === 'negro') ? `<span class="matrix-check-x check-negro">X</span>` : '';
      const checkBlanco = (item.category === 'blanco') ? `<span class="matrix-check-x check-blanco">X</span>` : '';
      const checkVerde = (item.category === 'verde') ? `<span class="matrix-check-x check-verde">X</span>` : '';
      const checkPeligrosos = (item.category === 'peligrosos') ? `<span class="matrix-check-x check-peligrosos">X</span>` : '';
      const checkEspeciales = (item.category === 'especiales') ? `<span class="matrix-check-x check-especiales">X</span>` : '';

      row.innerHTML = `
        <td><strong>${item.name}</strong></td>
        <td style="text-align:center;">${checkNegro}</td>
        <td style="text-align:center;">${checkBlanco}</td>
        <td style="text-align:center;">${checkVerde}</td>
        <td style="text-align:center;">${checkPeligrosos}</td>
        <td style="text-align:center;">${checkEspeciales}</td>
        <td><small>${item.tip}</small></td>
      `;
      this.dom.matrixTableBody.appendChild(row);
    });
  }

  openMatrixModal() {
    if (this.isPlaying && !this.isPaused) {
      this.togglePause();
    }
    this.dom.modalMatrix.classList.add('active');
  }

  closeMatrixModal() {
    this.dom.modalMatrix.classList.remove('active');
  }
}

// Inicializar al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  window.game = new WasteSortingGame();
  window.game.init();
});
