/**
 * Base de Datos de Residuos para el Juego HSE
 * Incluye todos los residuos de la matriz oficial (Imagen 2) + Residuos de uso diario más frecuentes.
 * Gráficos en formato vectorial SVG con efecto pegatina (sticker) de alta fidelidad.
 */

const WASTE_ITEMS = [
  // ==========================================
  // CANECA BLANCA: APROVECHABLES
  // ==========================================
  {
    id: "rollo_aluminio",
    name: "Rollo de aluminio",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "El papel o lámina de aluminio limpio y sin grasa es 100% reciclable y va en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="foilGrad" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="25%" stop-color="#d1d5db"/>
          <stop offset="50%" stop-color="#9ca3af"/>
          <stop offset="75%" stop-color="#e5e7eb"/>
          <stop offset="100%" stop-color="#6b7280"/>
        </linearGradient>
        <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#92400e"/>
          <stop offset="50%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
      </defs>
      <ellipse cx="35" cy="45" rx="14" ry="22" fill="#4b5563" transform="rotate(-25 35 45)"/>
      <ellipse cx="35" cy="45" rx="7" ry="12" fill="url(#coreGrad)" transform="rotate(-25 35 45)"/>
      <path d="M 35 24 L 130 52 L 125 95 L 30 67 Z" fill="url(#foilGrad)"/>
      <path d="M 30 67 Q 75 90 120 102 L 145 92 Q 95 75 35 24 Z" fill="#f3f4f6" opacity="0.65"/>
      <ellipse cx="127" cy="74" rx="14" ry="22" fill="url(#foilGrad)" transform="rotate(-25 127 74)"/>
      <path d="M 60 40 L 95 75 M 85 45 L 115 72 M 50 55 L 75 75" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
      <path d="M 120 70 L 140 105 L 115 110 Z" fill="#e5e7eb" opacity="0.9" stroke="#9ca3af" stroke-width="1"/>
    </svg>`
  },
  {
    id: "carton",
    name: "Cajas de cartón",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "El cartón debe estar limpio, seco y desarmado/plegado para ahorrar espacio en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="boxFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#d97706"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
        <linearGradient id="boxSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#b45309"/>
          <stop offset="100%" stop-color="#78350f"/>
        </linearGradient>
        <linearGradient id="boxTop" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <polygon points="80,15 140,40 80,65 20,40" fill="url(#boxTop)" stroke="#92400e" stroke-width="2"/>
      <polygon points="20,40 80,65 80,110 20,85" fill="url(#boxFront)" stroke="#92400e" stroke-width="2"/>
      <polygon points="80,65 140,40 140,85 80,110" fill="url(#boxSide)" stroke="#92400e" stroke-width="2"/>
      <!-- Cinta adhesiva -->
      <polygon points="75,20 85,25 85,110 75,110" fill="#fef3c7" opacity="0.6"/>
      <!-- Símbolo de reciclaje -->
      <circle cx="50" cy="78" r="14" fill="#ffffff" opacity="0.85"/>
      <path d="M 46 72 L 54 72 L 50 67 Z M 55 76 L 59 83 L 53 82 Z M 43 83 L 47 77 L 41 77 Z" fill="#15803d"/>
    </svg>`
  },
  {
    id: "papel",
    name: "Papel de archivo y hojas",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Hojas de papel impresas, cuadernos o documentos sin arrugar ni mojar van en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.2"/>
        </filter>
      </defs>
      <g filter="url(#pShadow)">
        <polygon points="40,25 110,20 130,95 60,105" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
        <polygon points="30,20 100,15 120,90 50,100" fill="#f8fafc" stroke="#94a3b8" stroke-width="2"/>
        <!-- Líneas de texto -->
        <line x1="45" y1="35" x2="95" y2="30" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        <line x1="48" y1="47" x2="105" y2="42" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        <line x1="50" y1="59" x2="108" y2="54" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        <line x1="52" y1="71" x2="90" y2="67" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        <line x1="54" y1="83" x2="102" y2="79" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: "vidrio",
    name: "Botella de vidrio limpia",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Botellas y frascos de vidrio vacíos y enjuagados se depositan en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#059669"/>
          <stop offset="35%" stop-color="#34d399"/>
          <stop offset="60%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#047857"/>
        </linearGradient>
      </defs>
      <!-- Cuello y tapa -->
      <rect x="73" y="15" width="14" height="8" rx="2" fill="#d97706" stroke="#92400e" stroke-width="1.5"/>
      <path d="M 75 23 L 75 42 Q 62 55 58 68 L 58 102 Q 58 110 80 110 Q 102 110 102 102 L 102 68 Q 98 55 85 42 L 85 23 Z" 
            fill="url(#glassGrad)" stroke="#065f46" stroke-width="2.5"/>
      <!-- Brillo de cristal -->
      <path d="M 65 65 Q 63 75 63 98" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.75"/>
      <ellipse cx="80" cy="80" rx="16" ry="12" fill="#fef3c7" opacity="0.9" stroke="#d97706" stroke-width="1"/>
      <text x="80" y="83" font-size="8" font-family="Arial" font-weight="bold" fill="#78350f" text-anchor="middle">VIDRIO</text>
    </svg>`
  },
  {
    id: "plastico",
    name: "Botella plástica (PET)",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Las botellas de plástico vacías, limpias y compactadas van siempre en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="petGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="30%" stop-color="#bae6fd"/>
          <stop offset="70%" stop-color="#7dd3fc"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect x="74" y="14" width="12" height="7" rx="2" fill="#2563eb"/>
      <path d="M 76 21 L 76 35 Q 64 45 62 58 L 62 100 Q 62 108 80 108 Q 98 108 98 100 L 98 58 Q 96 45 84 35 L 84 21 Z" 
            fill="url(#petGrad)" stroke="#0369a1" stroke-width="2"/>
      <!-- Etiqueta central -->
      <rect x="62" y="62" width="36" height="24" rx="2" fill="#22c55e" stroke="#15803d" stroke-width="1.5"/>
      <path d="M 70 74 L 80 67 L 90 74" stroke="#ffffff" stroke-width="2" fill="none"/>
      <!-- Brillo plástico -->
      <line x1="68" y1="40" x2="68" y2="98" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
    </svg>`
  },
  {
    id: "metal",
    name: "Residuos metálicos / Lata",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Latas de aluminio, perfiles y metales limpios son reciclables de alto valor en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="canBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#dc2626"/>
          <stop offset="35%" stop-color="#f87171"/>
          <stop offset="70%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#991b1b"/>
        </linearGradient>
        <linearGradient id="canRim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e5e7eb"/>
          <stop offset="50%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#9ca3af"/>
        </linearGradient>
      </defs>
      <!-- Cuerpo de la lata -->
      <ellipse cx="80" cy="30" rx="26" ry="9" fill="url(#canRim)" stroke="#6b7280" stroke-width="1.5"/>
      <rect x="54" y="30" width="52" height="66" fill="url(#canBody)" stroke="#991b1b" stroke-width="1.5"/>
      <ellipse cx="80" cy="96" rx="26" ry="9" fill="url(#canRim)" stroke="#6b7280" stroke-width="1.5"/>
      <!-- Anilla superior -->
      <ellipse cx="80" cy="30" rx="14" ry="5" fill="#4b5563"/>
      <ellipse cx="78" cy="29" rx="6" ry="2.5" fill="#e5e7eb"/>
      <!-- Gráfico de lata -->
      <path d="M 58 50 Q 80 65 102 50 Q 80 75 58 65" fill="#ffffff" opacity="0.85"/>
      <line x1="62" y1="35" x2="62" y2="90" stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
    </svg>`
  },
  {
    id: "tetrapak",
    name: "Envase Tetra Pak",
    category: "blanco",
    categoryName: "Aprovechables (Caneca Blanca)",
    tableCategory: "Residuos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Los envases de leche o jugo Tetra Pak enjuagados y escurridos van en la caneca BLANCA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tpFront" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
        <linearGradient id="tpSide" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#075985"/>
        </linearGradient>
      </defs>
      <!-- Tejado tetra pak -->
      <polygon points="50,40 85,25 110,38 75,52" fill="#0369a1"/>
      <polygon points="85,25 90,20 115,33 110,38" fill="#e2e8f0"/>
      <!-- Tapa plástica -->
      <ellipse cx="80" cy="35" rx="7" ry="4" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
      <!-- Caras del envase -->
      <polygon points="50,40 75,52 75,108 50,96" fill="url(#tpFront)" stroke="#0369a1" stroke-width="1.5"/>
      <polygon points="75,52 110,38 110,94 75,108" fill="url(#tpSide)" stroke="#0369a1" stroke-width="1.5"/>
      <!-- Decoración -->
      <circle cx="92" cy="65" r="9" fill="#ffffff" opacity="0.9"/>
      <text x="92" y="68" font-size="7" font-weight="bold" fill="#0369a1" text-anchor="middle">MILK</text>
    </svg>`
  },

  // ==========================================
  // CANECA NEGRA: NO APROVECHABLES
  // ==========================================
  {
    id: "restos_comida",
    name: "Restos de comida",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "Según la matriz operativa, los restos de comida cocinada y servida van en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Plato/Bandeja descartable -->
      <ellipse cx="80" cy="85" rx="55" ry="22" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="2"/>
      <ellipse cx="80" cy="83" rx="44" ry="16" fill="#f8fafc"/>
      <!-- Hueso de pollo/presa -->
      <path d="M 60 70 Q 75 50 95 65 Q 105 72 100 80 Q 80 85 60 70 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
      <circle cx="58" cy="74" r="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <circle cx="56" cy="66" r="5" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/>
      <!-- Manzana mordida o restos -->
      <path d="M 105 75 Q 115 60 122 75 Q 118 82 110 82 Z" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
      <!-- Fideos / sobras -->
      <path d="M 68 85 Q 75 92 88 84 Q 94 88 102 83" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "restos_barrido",
    name: "Restos de barrido",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "El polvo, tierra y residuos recogidos al barrer no se pueden reciclar y van en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Recogedor -->
      <polygon points="35,65 95,50 115,95 45,105" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
      <line x1="95" y1="50" x2="135" y2="20" stroke="#1e40af" stroke-width="7" stroke-linecap="round"/>
      <!-- Montón de tierra/polvo -->
      <path d="M 50 90 Q 70 70 95 85 Q 105 92 90 98 Q 65 102 50 90 Z" fill="#78350f" opacity="0.9"/>
      <!-- Partículas de polvo -->
      <circle cx="65" cy="80" r="2" fill="#451a03"/>
      <circle cx="80" cy="76" r="3" fill="#451a03"/>
      <circle cx="85" cy="85" r="2" fill="#451a03"/>
      <circle cx="72" cy="87" r="2.5" fill="#451a03"/>
    </svg>`
  },
  {
    id: "guantes_tapabocas",
    name: "Guantes y tapabocas",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "Los tapabocas y guantes de protección no biopeligrosos se disponen en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Tapabocas quirúrgico -->
      <rect x="50" y="45" width="60" height="38" rx="4" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <!-- Pliegues del tapabocas -->
      <line x1="50" y1="56" x2="110" y2="56" stroke="#0284c7" stroke-width="1.5"/>
      <line x1="50" y1="67" x2="110" y2="67" stroke="#0284c7" stroke-width="1.5"/>
      <!-- Bandas elásticas -->
      <path d="M 50 48 Q 25 64 50 80" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <path d="M 110 48 Q 135 64 110 80" fill="none" stroke="#94a3b8" stroke-width="2"/>
      <!-- Guante de látex doblado -->
      <path d="M 70 70 Q 95 65 110 80 Q 115 95 95 105 Q 75 100 70 70 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2" opacity="0.95"/>
    </svg>`
  },
  {
    id: "servilletas",
    name: "Servilletas usadas",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "Las servilletas con grasa o restos de comida contaminan el papel reciclable: van en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Servilleta arrugada -->
      <path d="M 45 65 Q 60 40 85 45 Q 115 35 110 65 Q 125 90 95 100 Q 60 105 45 85 Q 35 75 45 65 Z" 
            fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
      <!-- Pliegues de arrugas -->
      <path d="M 60 55 Q 75 70 85 65 Q 95 60 100 75" fill="none" stroke="#cbd5e1" stroke-width="2"/>
      <path d="M 55 75 Q 70 85 85 80" fill="none" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Manchas de grasa/comida -->
      <circle cx="75" cy="62" r="6" fill="#f59e0b" opacity="0.6"/>
      <circle cx="92" cy="78" r="7" fill="#ef4444" opacity="0.5"/>
    </svg>`
  },
  {
    id: "paquete_snacks",
    name: "Empaque de papas / snacks",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "Los empaques metalizados multicapa no se pueden reciclar convencionalmente: van en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="snackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f59e0b"/>
          <stop offset="40%" stop-color="#ef4444"/>
          <stop offset="100%" stop-color="#dc2626"/>
        </linearGradient>
      </defs>
      <!-- Bolsa arrugada de papas -->
      <polygon points="50,25 110,25 120,95 40,95" fill="url(#snackGrad)" stroke="#b91c1c" stroke-width="2.5"/>
      <!-- Sellado dentado superior e inferior -->
      <path d="M 50 25 L 110 25" stroke="#ffffff" stroke-width="3" stroke-dasharray="3,3"/>
      <path d="M 40 95 L 120 95" stroke="#ffffff" stroke-width="3" stroke-dasharray="3,3"/>
      <!-- Imagen papita -->
      <ellipse cx="80" cy="58" rx="18" ry="12" fill="#fde047" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="80" y="80" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">CHIPS</text>
    </svg>`
  },
  {
    id: "icopor",
    name: "Icopor sucio de comida",
    category: "negro",
    categoryName: "No Aprovechables (Caneca Negra)",
    tableCategory: "No aprovechables",
    modes: ["standard", "hse"],
    tip: "El poliestireno expandido (icopor) usado o con grasa no es reciclable y va en la caneca NEGRA.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Vaso o envase de icopor -->
      <polygon points="55,30 105,30 95,95 65,95" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2.5"/>
      <ellipse cx="80" cy="30" rx="25" ry="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <ellipse cx="80" cy="95" rx="15" ry="4" fill="#e2e8f0"/>
      <!-- Textura granulada y mancha de grasa -->
      <circle cx="75" cy="55" r="7" fill="#fbbf24" opacity="0.6"/>
      <circle cx="82" cy="70" r="5" fill="#fbbf24" opacity="0.5"/>
    </svg>`
  },

  // ==========================================
  // CANECA VERDE: ORGÁNICOS APROVECHABLES
  // ==========================================
  {
    id: "cascara_fruta",
    name: "Cáscara de plátano / frutas",
    category: "verde",
    categoryName: "Orgánicos (Caneca Verde)",
    tableCategory: "Orgánicos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Cáscaras de plátano, frutas y restos crudos generan abono/compost en la caneca VERDE.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fde047"/>
          <stop offset="70%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#a16207"/>
        </linearGradient>
      </defs>
      <!-- Tallo -->
      <path d="M 40 40 Q 45 35 50 38 L 52 46 Z" fill="#713f12" stroke="#451a03" stroke-width="1.5"/>
      <!-- Tiras de cáscara abierta -->
      <path d="M 50 38 Q 75 45 95 35 Q 115 30 125 50 Q 110 55 90 52 Q 65 52 50 45 Z" fill="url(#bananaGrad)" stroke="#854d0e" stroke-width="2"/>
      <path d="M 50 45 Q 70 70 100 85 Q 115 90 120 75 Q 105 70 85 60 Q 65 52 50 45 Z" fill="url(#bananaGrad)" stroke="#854d0e" stroke-width="2"/>
      <path d="M 48 44 Q 30 65 40 90 Q 55 88 55 75 Q 52 58 48 44 Z" fill="url(#bananaGrad)" stroke="#854d0e" stroke-width="2"/>
      <!-- Pecas marrones -->
      <circle cx="85" cy="46" r="2" fill="#713f12"/>
      <circle cx="98" cy="72" r="2.5" fill="#713f12"/>
      <circle cx="70" cy="62" r="1.8" fill="#713f12"/>
    </svg>`
  },
  {
    id: "restos_verdura",
    name: "Restos de verduras crudas",
    category: "verde",
    categoryName: "Orgánicos (Caneca Verde)",
    tableCategory: "Orgánicos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Tallos, hojas de lechuga y cortes de vegetales crudos son biomasa para la caneca VERDE.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Hoja de lechuga / verdura -->
      <path d="M 50 85 Q 35 55 55 35 Q 80 25 95 40 Q 120 30 125 60 Q 130 90 100 95 Q 75 100 50 85 Z" 
            fill="#4ade80" stroke="#16a34a" stroke-width="2.5"/>
      <!-- Nervaduras -->
      <path d="M 70 90 Q 85 65 90 42" fill="none" stroke="#bbf7d0" stroke-width="3" stroke-linecap="round"/>
      <path d="M 80 75 Q 65 65 58 55" fill="none" stroke="#bbf7d0" stroke-width="2" stroke-linecap="round"/>
      <path d="M 85 62 Q 105 58 112 50" fill="none" stroke="#bbf7d0" stroke-width="2" stroke-linecap="round"/>
      <!-- Trozo de zanahoria -->
      <polygon points="40,80 75,70 55,95" fill="#f97316" stroke="#c2410c" stroke-width="2"/>
    </svg>`
  },
  {
    id: "cascara_huevo",
    name: "Cáscaras de huevo",
    category: "verde",
    categoryName: "Orgánicos (Caneca Verde)",
    tableCategory: "Orgánicos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Aportan alto contenido de calcio para compostaje y recuperación de suelos en la caneca VERDE.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Mitad 1 de huevo quebrado -->
      <path d="M 40 75 Q 40 45 65 45 Q 85 45 85 75 L 75 68 L 65 77 L 55 69 Z" fill="#ffedd5" stroke="#ea580c" stroke-width="2"/>
      <!-- Mitad 2 de huevo quebrado -->
      <path d="M 80 85 Q 80 60 105 60 Q 125 60 125 85 L 115 78 L 105 87 L 95 79 Z" fill="#fed7aa" stroke="#c2410c" stroke-width="2"/>
      <!-- Pequeños fragmentos quebrados -->
      <polygon points="50,90 60,82 55,95" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>
      <polygon points="70,95 78,90 75,102" fill="#fed7aa" stroke="#ea580c" stroke-width="1.5"/>
    </svg>`
  },
  {
    id: "podas_jardin",
    name: "Hojas secas y restos de jardín",
    category: "verde",
    categoryName: "Orgánicos (Caneca Verde)",
    tableCategory: "Orgánicos Aprovechables",
    modes: ["standard", "hse"],
    tip: "Hojas caídas, flores marchitas y podas vegetales se transforman en abono en la caneca VERDE.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Hoja seca marrón -->
      <path d="M 45 80 Q 55 40 90 35 Q 115 50 105 85 Q 75 95 45 80 Z" fill="#b45309" stroke="#78350f" stroke-width="2"/>
      <path d="M 45 80 L 100 40" stroke="#fef3c7" stroke-width="2" stroke-linecap="round"/>
      <!-- Hoja verde tierna -->
      <path d="M 65 95 Q 80 65 115 65 Q 130 90 105 105 Q 85 105 65 95 Z" fill="#22c55e" stroke="#15803d" stroke-width="2"/>
      <path d="M 65 95 L 115 75" stroke="#dcfce7" stroke-width="2" stroke-linecap="round"/>
      <!-- Ramitas secas -->
      <line x1="30" y1="95" x2="60" y2="75" stroke="#78350f" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },

  // ==========================================
  // CANECA ROJA: RESIDUOS PELIGROSOS
  // ==========================================
  {
    id: "pilas",
    name: "Pilas y baterías",
    category: "peligrosos",
    categoryName: "Peligrosos (Caneca Roja)",
    tableCategory: "Peligrosos",
    modes: ["hse"],
    tip: "Las pilas contienen metales pesados (litio, mercurio). Exigen depósito especial en PELIGROSOS.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="batBody" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="40%" stop-color="#475569"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <!-- Pila 1 parada -->
      <rect x="55" y="30" width="28" height="65" rx="3" fill="url(#batBody)" stroke="#0f172a" stroke-width="2"/>
      <rect x="55" y="30" width="28" height="18" fill="#f59e0b" stroke="#0f172a" stroke-width="1.5"/>
      <rect x="65" y="24" width="8" height="6" rx="1" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
      <text x="69" y="44" font-size="12" font-weight="bold" fill="#0f172a" text-anchor="middle">+</text>
      <!-- Pila 2 inclinada -->
      <g transform="rotate(30 100 65)">
        <rect x="90" y="35" width="24" height="55" rx="3" fill="url(#batBody)" stroke="#0f172a" stroke-width="2"/>
        <rect x="90" y="35" width="24" height="15" fill="#ef4444" stroke="#0f172a" stroke-width="1.5"/>
        <rect x="98" y="30" width="8" height="5" rx="1" fill="#cbd5e1"/>
        <text x="102" y="47" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">+</text>
      </g>
    </svg>`
  },
  {
    id: "envases_pintura",
    name: "Envases de pintura / solventes",
    category: "peligrosos",
    categoryName: "Peligrosos (Caneca Roja)",
    tableCategory: "Peligrosos",
    modes: ["hse"],
    tip: "Los residuos de solventes, esmaltes e hidrocarburos son tóxicos e inflamables: van en PELIGROSOS.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bucketGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#94a3b8"/>
          <stop offset="50%" stop-color="#f8fafc"/>
          <stop offset="100%" stop-color="#64748b"/>
        </linearGradient>
      </defs>
      <!-- Cubeta de pintura -->
      <polygon points="50,40 110,40 102,98 58,98" fill="url(#bucketGrad)" stroke="#475569" stroke-width="2.5"/>
      <ellipse cx="80" cy="40" rx="30" ry="8" fill="#e2e8f0" stroke="#475569" stroke-width="2"/>
      <!-- Manija de alambre -->
      <path d="M 50 45 Q 80 15 110 45" fill="none" stroke="#334155" stroke-width="2.5"/>
      <!-- Pintura roja que gotea -->
      <ellipse cx="80" cy="40" rx="26" ry="6" fill="#ef4444"/>
      <path d="M 68 44 Q 68 65 72 65 Q 76 65 76 44 Z" fill="#ef4444"/>
      <path d="M 88 44 Q 88 78 92 78 Q 96 78 96 44 Z" fill="#ef4444"/>
      <!-- Símbolo de inflamable -->
      <polygon points="80,68 88,82 72,82" fill="#ef4444" stroke="#b91c1c" stroke-width="1"/>
      <text x="80" y="80" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">!</text>
    </svg>`
  },
  {
    id: "toner",
    name: "Toner y cartuchos de tinta",
    category: "peligrosos",
    categoryName: "Peligrosos (Caneca Roja)",
    tableCategory: "Peligrosos",
    modes: ["hse"],
    tip: "El polvillo de toner contiene polímeros y óxidos metálicos nocivos. Requiere caneca de PELIGROSOS.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Cartucho de toner láser -->
      <rect x="40" y="45" width="80" height="35" rx="5" fill="#1e293b" stroke="#0f172a" stroke-width="2.5"/>
      <!-- Cilindro fotosensible (verde/turquesa) -->
      <rect x="45" y="72" width="70" height="12" rx="4" fill="#06b6d4" stroke="#0891b2" stroke-width="1.5"/>
      <!-- Engranajes y manija -->
      <rect x="70" y="37" width="20" height="8" rx="2" fill="#475569"/>
      <circle cx="48" cy="55" r="5" fill="#64748b"/>
      <circle cx="112" cy="55" r="5" fill="#64748b"/>
      <text x="80" y="62" font-size="9" font-weight="bold" fill="#e2e8f0" text-anchor="middle">TONER BK</text>
    </svg>`
  },
  {
    id: "medicamentos",
    name: "Medicamentos vencidos",
    category: "peligrosos",
    categoryName: "Peligrosos (Caneca Roja / Punto Azul)",
    tableCategory: "Peligrosos",
    modes: ["hse"],
    tip: "Los fármacos vencidos no deben ir a la basura común ni al agua: van a PELIGROSOS / Punto Azul.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Frasco de jarabe/pastillas -->
      <rect x="50" y="45" width="30" height="50" rx="4" fill="#f87171" stroke="#dc2626" stroke-width="2"/>
      <rect x="58" y="38" width="14" height="7" rx="1" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
      <rect x="54" y="58" width="22" height="22" fill="#ffffff"/>
      <path d="M 65 63 L 65 75 M 59 69 L 71 69" stroke="#dc2626" stroke-width="3" stroke-linecap="round"/>
      <!-- Blíster de pastillas -->
      <rect x="90" y="45" width="35" height="50" rx="3" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="99" cy="56" r="4.5" fill="#38bdf8"/>
      <circle cx="116" cy="56" r="4.5" fill="#38bdf8"/>
      <circle cx="99" cy="70" r="4.5" fill="#ef4444"/>
      <circle cx="116" cy="70" r="4.5" fill="#ef4444"/>
      <circle cx="99" cy="84" r="4.5" fill="#22c55e"/>
      <circle cx="116" cy="84" r="4.5" fill="#22c55e"/>
    </svg>`
  },

  // ==========================================
  // CANECA ESPECIALES: RCD, RAEE, LUMINARIAS
  // ==========================================
  {
    id: "luminarias_led",
    name: "Luminarias LED y bombillos",
    category: "especiales",
    categoryName: "Especiales (Caneca Especiales)",
    tableCategory: "Especiales",
    modes: ["hse"],
    tip: "Los bombillos y luminarias LED tienen circuitos y gases especiales: requieren gestión de ESPECIALES.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Bulbo del bombillo -->
      <path d="M 60 45 Q 60 20 80 20 Q 100 20 100 45 Q 100 62 88 72 L 88 84 L 72 84 L 72 72 Q 60 62 60 45 Z" 
            fill="#fef08a" stroke="#eab308" stroke-width="2"/>
      <!-- Rosca metálica -->
      <rect x="73" y="84" width="14" height="12" rx="1" fill="#cbd5e1" stroke="#64748b" stroke-width="1.5"/>
      <line x1="73" y1="88" x2="87" y2="88" stroke="#475569" stroke-width="1.5"/>
      <line x1="73" y1="92" x2="87" y2="92" stroke="#475569" stroke-width="1.5"/>
      <!-- Contacto inferior -->
      <ellipse cx="80" cy="98" rx="4" ry="2" fill="#334155"/>
      <!-- Rayos de luz -->
      <line x1="80" y1="12" x2="80" y2="6" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
      <line x1="108" y1="28" x2="114" y2="24" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
      <line x1="52" y1="28" x2="46" y2="24" stroke="#facc15" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "madera",
    name: "Madera (Tablas y retazos)",
    category: "especiales",
    categoryName: "Especiales (Caneca Especiales)",
    tableCategory: "Especiales",
    modes: ["hse"],
    tip: "Estibas, tablas y retazos de carpintería son residuos voluminosos especiales para aprovechamiento térmico/reciclaje.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Tabla 1 horizontal -->
      <polygon points="35,60 115,35 130,50 50,75" fill="#d97706" stroke="#92400e" stroke-width="2"/>
      <polygon points="35,60 50,75 50,85 35,70" fill="#b45309" stroke="#78350f" stroke-width="2"/>
      <polygon points="50,75 130,50 130,60 50,85" fill="#92400e" stroke="#78350f" stroke-width="2"/>
      <!-- Vetas de la madera -->
      <path d="M 55 65 Q 85 48 115 42" stroke="#78350f" stroke-width="1.5" fill="none"/>
      <!-- Tabla 2 cruzada -->
      <polygon points="55,85 110,65 120,78 65,98" fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
    </svg>`
  },
  {
    id: "escombros",
    name: "RCD (Escombros y concreto)",
    category: "especiales",
    categoryName: "Especiales (Caneca Especiales)",
    tableCategory: "Especiales",
    modes: ["hse"],
    tip: "Residuos de Construcción y Demolición (RCD): ladrillos y hormigón requieren acopio ESPECIAL.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Ladrillo partido -->
      <polygon points="40,55 75,45 85,70 50,80" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
      <polygon points="75,45 95,50 105,75 85,70" fill="#c2410c" stroke="#9a3412" stroke-width="2"/>
      <polygon points="50,80 85,70 85,85 50,95" fill="#9a3412" stroke="#7c2d12" stroke-width="2"/>
      <!-- Trozo de concreto / roca -->
      <polygon points="85,60 115,55 125,85 95,95" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
      <polygon points="115,55 130,65 135,90 125,85" fill="#64748b" stroke="#475569" stroke-width="2"/>
      <!-- Grietas -->
      <path d="M 60 62 L 68 72 L 62 76" stroke="#ffffff" stroke-width="1.5" fill="none"/>
    </svg>`
  },
  {
    id: "raee",
    name: "RAEE (Aparatos eléctricos)",
    category: "especiales",
    categoryName: "Especiales (Caneca Especiales)",
    tableCategory: "Especiales",
    modes: ["hse"],
    tip: "Residuos de Aparatos Eléctricos y Electrónicos (cables, teclados, teléfonos): requieren canal ESPECIAL.",
    svg: `<svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg">
      <!-- Teléfono inteligente roto -->
      <rect x="45" y="30" width="38" height="65" rx="5" fill="#0f172a" stroke="#334155" stroke-width="2"/>
      <rect x="49" y="36" width="30" height="50" rx="2" fill="#1e293b"/>
      <!-- Pantalla quebrada -->
      <path d="M 52 42 L 65 58 L 60 72 L 75 80" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
      <!-- Cable con conector USB -->
      <path d="M 83 75 Q 115 50 110 85 Q 105 110 130 95" fill="none" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
      <rect x="125" y="88" width="14" height="10" rx="2" fill="#cbd5e1" stroke="#475569" stroke-width="1.5"/>
    </svg>`
  }
];

// Configuración de las canecas del juego
const BINS_CONFIG = {
  verde: {
    id: "verde",
    name: "ORGÁNICOS",
    subtitle: "Aprovechables",
    badge: "Orgánicos",
    color: "#16a34a",
    lidColor: "#15803d",
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="bin-ico"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A9.7 9.7 0 0 0 12 21a9.9 9.9 0 0 0 7.7-3.7 9.8 9.8 0 0 0 2.3-7.3H20A8 8 0 0 1 12 18a8.07 8.07 0 0 1-4.7-1.5C9.4 12.8 13.4 9.6 19 8.2V6c-7.3 0-11 5-11 5s3.5-7 10-7V2C9 2 5 8 5 8h2a9.7 9.7 0 0 1 5-5c4.7 0 8.3 3.3 9 7.8A10 10 0 0 0 22 8Z"/></svg>`,
    description: "Restos de comida cruda, cáscaras de frutas y verduras, restos de poda y abonos."
  },
  blanco: {
    id: "blanco",
    name: "APROVECHABLES",
    subtitle: "Reciclaje Limpio",
    badge: "Aprovechables",
    color: "#f8fafc",
    lidColor: "#e2e8f0",
    textColor: "#1e293b",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="bin-ico"><path d="M4.5 9.5 8 6l3.5 3.5H9v4.5a3 3 0 0 0 3 3h2v2h-2a5 5 0 0 1-5-5V9.5H4.5ZM19.5 14.5 16 18l-3.5-3.5H15V10a3 3 0 0 0-3-3h-2V5h2a5 5 0 0 1 5 5v4.5h2.5Z"/></svg>`,
    description: "Plástico, cartón, papel, vidrio, metales y aluminio limpios y secos."
  },
  negro: {
    id: "negro",
    name: "NO APROVECHABLES",
    subtitle: "Ordinarios",
    badge: "No Aprovechables",
    color: "#1e293b",
    lidColor: "#0f172a",
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="bin-ico"><path d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12Z"/></svg>`,
    description: "Papel higiénico, servilletas usadas, barrido, tapabocas y empaques metalizados."
  },
  peligrosos: {
    id: "peligrosos",
    name: "PELIGROSOS",
    subtitle: "Riesgo Químico",
    badge: "Peligrosos",
    color: "#dc2626",
    lidColor: "#b91c1c",
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="bin-ico"><path d="M12 2 1 21h22L12 2Zm0 3.5 8.5 14.5H3.5L12 5.5ZM11 10v4h2v-4h-2Zm0 6v2h2v-2h-2Z"/></svg>`,
    description: "Pilas, pinturas, solventes, toners, medicamentos vencidos y químicos."
  },
  especiales: {
    id: "especiales",
    name: "ESPECIALES",
    subtitle: "RCD / RAEE",
    badge: "Especiales",
    color: "#ea580c",
    lidColor: "#c2410c",
    textColor: "#ffffff",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor" class="bin-ico"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z"/></svg>`,
    description: "Luminarias LED, madera, escombros (RCD), y aparatos electrónicos (RAEE)."
  }
};
