# EcoClasifica HSE - Juego Web de Clasificación de Residuos

Videojuego web interactivo desarrollado con estética visual de videojuego casual (estilo *mobile casual game*) diseñado para la capacitación, concientización y evaluación en la segregación de residuos bajo el código de colores de la **Resolución 2184 de 2019** (Colombia) y la **Matriz Integral de Gestión HSE Corporativa**.

---

## 🎮 Características del Juego

1. **Diseño Visual de Alta Fidelidad**:
   - Escenario ilustrado tipo parque/calle urbana con faroles, avisos de *Sentido Verde*, acera, asfalto y conos viales.
   - Residuos en formato pegatina (*sticker*) con borde troquelado blanco, línea discontinua de corte, sombra suave y etiqueta identificativa.
   - Canecas tipo contenedor con ruedas, tapa interactiva con apertura al pasar el residuo (*hover/drag-over*), nervaduras, logos oficiales y títulos.
   - Barra superior (HUD) con cápsula de tiempo estilo píldora con gradiente, medalla de aciertos (hoja verde), medalla de errores (caja rosa con cruz), racha/combo (*flame badge*) y botón de sonido.

2. **Mecánicas de Interacción Dual**:
   - **Arrastrar y Soltar (*Drag & Drop*)**: Compatible con ratón en computadores de escritorio y gestos táctiles en pantallas móviles/tablets mediante la API nativa de *Pointer Events*.
   - **Clic Rápido (*Tap-to-Classify*)**: Permite hacer clic o tocar directamente la caneca para clasificar el residuo al instante, ideal para partidas dinámicas.

3. **Modos de Juego Adaptativos**:
   - **Modo Estándar (3 Canecas)**: Idéntico a la imagen de referencia. Utiliza el punto ecológico nacional:
     - 🟢 **Verde**: Orgánicos aprovechables (cáscaras de frutas, verduras, abonos, podas).
     - ⚪ **Blanco**: Residuos aprovechables (plástico, cartón, papel, vidrio, metales, rollo de aluminio).
     - ⚫ **Negro**: No aprovechables (restos de comida, servilletas usadas, barrido, tapabocas, empaques de snacks).
   - **Modo Integral HSE (5 Canecas)**: Incluye la totalidad de la matriz corporativa para áreas industriales y operativas:
     - 🔴 **Peligrosos**: Pilas, envases de pintura/solventes, toner, medicamentos vencidos.
     - 🟠 **Especiales**: Luminarias LED, madera/estibas, RCD (escombros), RAEE (aparatos eléctricos y electrónicos).

4. **Motor Pedagógico y Reporte Final**:
   - Cada acierto otorga puntos y tiempo extra (+2 s).
   - Cada error aplica una penalización pedagógica con mensaje emergente que indica en qué caneca debía depositarse.
   - Modal de fin de partida con puntaje, aciertos, fallos, porcentaje de precisión (%) y un desglose detallado de los errores cometidos con consejos ambientales para repasar.

5. **Matriz Oficial HSE Integrada**:
   - Botón de consulta rápida en el HUD con la tabla exacta de la organización (idéntica a la Imagen 2).
   - Buscador en tiempo real y filtros por categoría.

6. **Efectos de Sonido Sintetizados (Web Audio API)**:
   - Campanas armónicas para aciertos, buzzer suave para fallos, sonido de apertura de tapa y fanfarria de fin de juego.
   - Funciona sin necesidad de archivos de audio externos (100% autónomo y sin fallos de red).

---

## 📁 Estructura del Proyecto

```text
Juego Residuos HSE/
├── assets/
│   └── background.jpg       # Fondo escénico optimizado en alta resolución
├── css/
│   └── styles.css           # Estilos modernos, diseño responsivo 16:9 y animaciones
├── js/
│   ├── audio.js             # Motor de audio con Web Audio API sintetizada
│   ├── items-data.js        # Base de datos de residuos, gráficos vectoriales SVG y tips HSE
│   └── game.js              # Lógica de juego, físicas de arrastre, HUD y modales
├── index.html               # Estructura semántica principal del juego
└── README.md                # Documentación del proyecto
```

---

## 🚀 Cómo Ejecutar

El juego es **100% estático y autocontenido** (HTML, CSS y JavaScript Vanilla). No requiere instalación de dependencias ni procesos de compilación.

### Opción 1: Servidor Local
Si tienes Python instalado, puedes ejecutar en la terminal:
```bash
python -m http.server 8085
```
Luego abre tu navegador en: [http://localhost:8085](http://localhost:8085)

### Opción 2: Apertura Directa
Haz doble clic sobre el archivo `index.html` para abrirlo directamente en Google Chrome, Microsoft Edge, Mozilla Firefox o cualquier navegador moderno.
