
document.addEventListener('DOMContentLoaded', () => {

  const ham = document.getElementById('ham');
  const nav = document.getElementById('navMobile');
  const cerrar = document.getElementById('navCerrar');

  if (!ham || !nav || !cerrar) return;

  const links = nav.querySelectorAll('.nav-mobile-link');

  function abrirMenu() {
    ham.classList.add('activo');
    nav.classList.add('activo');
    document.body.style.overflow = 'hidden';
  }

  function cerrarMenu() {
    ham.classList.remove('activo');
    nav.classList.remove('activo');
    document.body.style.overflow = '';
  }

  ham.addEventListener('click', abrirMenu);

  cerrar.addEventListener('click', cerrarMenu);

  links.forEach(link => {
    link.addEventListener('click', cerrarMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      cerrarMenu();
    }
  });

});

// canasta.js – lógica del formulario
document.addEventListener('DOMContentLoaded', () => {

  // ===== AUTOCOMPLETAR CIUDAD =====
  const ciudadInput = document.getElementById('ciudad');
  const sugerencias = document.getElementById('sugerencias');
  if (ciudadInput && sugerencias) {
    ciudadInput.addEventListener('input', () => {
      const val = ciudadInput.value.trim().toLowerCase();
      if (val.length > 0) {
        sugerencias.removeAttribute('hidden');
        document.querySelectorAll('.ticket__sug-item').forEach(btn => {
          const match = btn.dataset.val.toLowerCase().includes(val);
          btn.style.display = match ? '' : 'none';
        });
      } else {
        sugerencias.setAttribute('hidden', '');
      }
    });

    document.querySelectorAll('.ticket__sug-item').forEach(btn => {
      btn.addEventListener('click', () => {
        ciudadInput.value = btn.dataset.val;
        sugerencias.setAttribute('hidden', '');
      });
    });

    document.addEventListener('click', (e) => {
      if (!ciudadInput.contains(e.target) && !sugerencias.contains(e.target)) {
        sugerencias.setAttribute('hidden', '');
      }
    });
  }

  // ===== PREVIEW DE FOTO =====
  const fotoInput = document.getElementById('foto-tienda');
  const fotoPreview = document.getElementById('foto-preview');
  const fotoPreviewImg = document.getElementById('foto-preview-img');
  const removeFoto = document.getElementById('remove-foto');
  const uploadLabelText = document.getElementById('upload-label-text');

  if (fotoInput) {
    fotoInput.addEventListener('change', () => {
      const file = fotoInput.files[0];
      if (file) {
        const url = URL.createObjectURL(file);
        fotoPreviewImg.src = url;
        fotoPreview.removeAttribute('hidden');
        uploadLabelText.textContent = file.name.length > 22
          ? file.name.substring(0, 22) + '...'
          : file.name;
      }
    });

    removeFoto?.addEventListener('click', () => {
      fotoInput.value = '';
      fotoPreview.setAttribute('hidden', '');
      fotoPreviewImg.src = '';
      uploadLabelText.textContent = 'Subir foto (opcional)';
    });
  }

  function clasificarCanasta(productos) {

  const total = productos.length;

  // SOLO UNA categoría seleccionada
  if (total === 1) {

    // SOLO cárnicos o SOLO abarrotes → marrón
    if (
      productos.includes('carnicos') ||
      productos.includes('abarrotes')
    ) {
      return {
        tipo:        'marron',
        nombre:      'Canasta Despensa',
        subtipo:     'Alimentos básicos del diario',
        descripcion: 'Una tienda completa que abastece la despensa del hogar. Aquí se encuentra desde lo fresco hasta lo indispensable de la alacena.',
        imgSrc:      'IMG/despensa.png',
        imgAlt:      'Canasta Despensa'
      };
    }

    // SOLO frutas/verduras
    return {
      tipo:        'verde',
      nombre:      'Canasta Cosecha',
      subtipo:     'Frutas · Vegetales · Condimentos',
      descripcion: 'Entre frutas frescas, verduras y productos del campo, se convierte en un punto cercano para quienes encuentran en lo simple una parte esencial de la vida del barrio.',
      imgSrc:      'IMG/cosecha.png',
      imgAlt:      'Canasta Cosecha'
    };
  }

  // DOS categorías → marrón
  if (total === 2) {
    return {
      tipo:        'marron',
      nombre:      'Canasta Despensa',
      subtipo:     'Alimentos básicos',
      descripcion: 'Una tienda completa que abastece la despensa del hogar. Aquí se encuentra desde lo fresco hasta lo indispensable de la alacena.',
      imgSrc:      'IMG/despensa.png',
      imgAlt:      'Canasta Despensa'
    };
  }

  // TRES categorías → amarillo
  return {
    tipo:        'amarillo',
    nombre:      'Canasta Variedades',
    subtipo:     'Variedades · Surtida',
    descripcion: 'Más que un lugar para comprar, esta tienda hace parte de la rutina del barrio. Entre alimentos, productos básicos y objetos para el día a día se genera un espacio cercano donde las personas se encuentran.',
    imgSrc:      'IMG/variedades.png',
    imgAlt:      'Canasta Variedades'
  };
}

  // ===== MOSTRAR RESULTADO =====
  function mostrarResultado(datos) {
    const { clasificacion, nombreTienda, ciudad, nombre } = datos;
    const contenedor = document.getElementById('resultado-canasta');
    if (!contenedor) return;

    contenedor.className = `resultado-canasta resultado-canasta--${clasificacion.tipo}`;

    contenedor.innerHTML = `
      <div class="resultado-canasta__header">
        <p class="resultado-canasta__intro">
          Gracias, <strong>${nombre}</strong>, por registrar tu tienda de confianza
          para que sea oficialmente una miniplaza en la ciudad.
        </p>
        <p class="resultado-canasta__tipo-label">${clasificacion.subtipo}</p>
        <h3 class="resultado-canasta__nombre">${clasificacion.nombre}</h3>
        <div class="resultado-canasta__img-wrap">
          <img src="${clasificacion.imgSrc}" alt="${clasificacion.imgAlt}">
        </div>
        <p class="resultado-canasta__descripcion">${clasificacion.descripcion}</p>
      </div>
      <div class="resultado-canasta__datos">
        <div class="resultado-canasta__dato">
          <span>La tienda <strong>${nombreTienda || 'registrada'}</strong> es de tipo <strong>${clasificacion.nombre}</strong></span>
        </div>
        ${ciudad ? `<div class="resultado-canasta__dato">📍 <span>Ciudad: <strong>${ciudad}</strong></span></div>` : ''}
      </div>
    `;

    contenedor.removeAttribute('hidden');
    contenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ===== ENVÍO DEL FORMULARIO =====
  const btnEnviar = document.getElementById('btn-enviar');

  btnEnviar?.addEventListener('click', () => {
    const nombre        = document.getElementById('nombre')?.value.trim();
    const nombreTienda  = document.getElementById('tienda-favorita')?.value.trim();
    const ciudad        = document.getElementById('ciudad')?.value.trim();
    const productos = [
  ...document.querySelectorAll(
    'input[name="verduras"]:checked, input[name="carnes"]:checked, input[name="abarrotes"]:checked'
  )
].map(cb => cb.value.toLowerCase());

    // Validación mínima
    if (!nombre) {
      alert('Por favor escribe tu nombre o apodo para continuar.');
      document.getElementById('nombre')?.focus();
      return;
    }
    if (productos.length === 0) {
      alert('Selecciona al menos un tipo de producto que vende la tienda.');
      return;
    }

    // Animación del botón
    btnEnviar.disabled = true;
    const textoOriginal = btnEnviar.innerHTML;
    btnEnviar.innerHTML = `
      <span class="ticket__btn-registrar__icono" aria-hidden="true">🧺</span>
      Registrando...
      <span class="ticket__btn-registrar__flecha" aria-hidden="true">⏳</span>
    `;

    setTimeout(() => {
      const clasificacion = clasificarCanasta(productos);
      mostrarResultado({ clasificacion, nombreTienda, ciudad, nombre });

      // Resetear campos pero mantener el resultado visible
      document.querySelectorAll('.ticket__input, .ticket__textarea, .ticket__select')
              .forEach(el => { el.value = ''; });
      document.querySelectorAll('input[type="checkbox"]')
              .forEach(cb => { cb.checked = false; });
      if (fotoPreview) fotoPreview.setAttribute('hidden', '');

      btnEnviar.disabled = false;
      btnEnviar.innerHTML = `
        <span class="ticket__btn-registrar__icono" aria-hidden="true">🧺</span>
        Registrar otra tienda
        <span class="ticket__btn-registrar__flecha" aria-hidden="true">→</span>
      `;
    }, 1200);
  });

});
/* ================================================================
   galeria.js
   Funcionalidades:
   1. Flip de fotos al hacer click (muestra curaduría)
   2. Popup de Postales  (selección múltiple + agregar al carrito)
   3. Popup de Sellos    (selección múltiple + agregar al carrito)
   4. Popup de Carrito   (listado, eliminar items, ir a WhatsApp)
   5. Badge dinámico en botón comprar
================================================================ */

'use strict';

// ── NÚMERO DE WHATSAPP ──────────────────────────────────────────
// Cambia por el número real con código de país, sin espacios ni +
const WHATSAPP_NUMERO = '573001234567';

// ── DATOS DE PRODUCTOS ──────────────────────────────────────────
const POSTALES = [
  { id: 'p1', nombre: 'De la canasta a la mesa',       img: 'IMG/A1.png', precio: '$5.000' },
  { id: 'p2', nombre: 'Manos que organizan',         img: 'IMG/B1.png', precio: '$5.000' },
  { id: 'p3', nombre: 'Frutas en canasta',          img: 'IMG/C1.png', precio: '$5.000' },
  { id: 'p4', nombre: 'La tienda del barrio',     img: 'IMG/D1.png', precio: '$5.000' },
  { id: 'p5', nombre: 'Colores del mercado',         img: 'IMG/E1.png', precio: '$5.000' },
  { id: 'p6', nombre: 'Productos cotidianos',     img: 'IMG/F1.png', precio: '$5.000' },
];

const SELLOS = [
  { id: 's1', nombre: 'Frutas & Verduras', img: 'IMG/sello_1.png', precio: '$8.000' },
  { id: 's2', nombre: 'Panadería',         img: 'IMG/sello_2.png', precio: '$8.000' },
  { id: 's3', nombre: 'Lácteos',           img: 'IMG/sello_3.png', precio: '$8.000' },
  { id: 's4', nombre: 'Abarrotes',         img: 'IMG/sello_4.png', precio: '$8.000' },
  { id: 's5', nombre: 'Carnes',            img: 'IMG/sello_5.png', precio: '$8.000' },
  { id: 's6', nombre: 'Bebidas',           img: 'IMG/sello_6.png', precio: '$8.000' },
];

// ── ESTADO DEL CARRITO ──────────────────────────────────────────
const carrito = [];        // Array de { id, nombre, tipo, precio }

// ── REFERENCIAS AL DOM ──────────────────────────────────────────
const badge          = document.getElementById('carrito-badge');
const btnComprar     = document.getElementById('btn-comprar');
const popupPostales  = document.getElementById('popup-postales');
const popupSellos    = document.getElementById('popup-sellos');
const popupCarrito   = document.getElementById('popup-carrito');
const gridPostales   = document.getElementById('grid-postales');
const gridSellos     = document.getElementById('grid-sellos');
const selPostales    = document.getElementById('sel-postales');
const selSellos      = document.getElementById('sel-sellos');
const carritoLista   = document.getElementById('carrito-lista');
const carritoVacio   = document.getElementById('carrito-vacio');
const carritoFooter  = document.getElementById('carrito-footer');
const carritoTotal   = document.getElementById('carrito-total');
const btnWhatsapp    = document.getElementById('btn-whatsapp');

// ══════════════════════════════════════════════════════════════════
// 1. FLIP DE FOTOS
// ══════════════════════════════════════════════════════════════════
document.querySelectorAll('.foto-card').forEach(card => {
  const descripcion = card.dataset.descripcion || '';

  // Inyectar texto de curaduría en el reverso
  const textoBack = card.querySelector('.foto-card__curatorial');
  if (textoBack && descripcion) textoBack.textContent = descripcion;

  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

  // Accesibilidad: teclado
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Ver descripción: ${descripcion.substring(0, 40)}…`);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

// ══════════════════════════════════════════════════════════════════
// 2. RENDERIZADO DE GRIDS EN POPUPS
// ══════════════════════════════════════════════════════════════════
function renderGrid(contenedor, items, tipoTexto) {
  contenedor.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'popup-item';
    div.dataset.id = item.id;
    div.innerHTML = `
      <div class="popup-item__img">
        <img src="${item.img}" alt="${item.nombre}"
             onerror="this.parentElement.style.background='#d4c9a8'; this.style.display='none'">
      </div>
      <p class="popup-item__nombre">${item.nombre}</p>
      <p class="popup-item__precio">${item.precio}</p>
    `;

    div.addEventListener('click', () => {
      div.classList.toggle('seleccionado');
      actualizarContadorPopup(contenedor, tipoTexto);
    });

    contenedor.appendChild(div);
  });
}

function actualizarContadorPopup(contenedor, tipoTexto) {
  const count = contenedor.querySelectorAll('.popup-item.seleccionado').length;
  const el = tipoTexto === 'postales' ? selPostales : selSellos;
  if (el) el.textContent = count;
}

renderGrid(gridPostales, POSTALES, 'postales');
renderGrid(gridSellos,   SELLOS,   'sellos');

// ══════════════════════════════════════════════════════════════════
// 3. APERTURA Y CIERRE DE POPUPS
// ══════════════════════════════════════════════════════════════════
function abrirPopup(popup) {
  popup.classList.add('abierto');
  document.body.style.overflow = 'hidden';
  // Focus al primer elemento interactivo
  const primer = popup.querySelector('button, [tabindex]');
  if (primer) primer.focus();
}

function cerrarPopup(popup) {
  popup.classList.remove('abierto');
  document.body.style.overflow = '';
}

function cerrarTodos() {
  [popupPostales, popupSellos, popupCarrito].forEach(p => p && cerrarPopup(p));
}

// Botones de los productos
document.querySelectorAll('[data-producto]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tipo = btn.dataset.producto;
    if (tipo === 'postales') abrirPopup(popupPostales);
    if (tipo === 'sellos')   abrirPopup(popupSellos);
  });
});

// Botón comprar → abre carrito
btnComprar.addEventListener('click', () => {
  renderCarrito();
  abrirPopup(popupCarrito);
});

// Botones de cierre (✕)
document.querySelectorAll('[data-cierra]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.cierra;
    const popup = document.getElementById(id);
    if (popup) cerrarPopup(popup);
  });
});

// Click fuera del popup cierra
[popupPostales, popupSellos, popupCarrito].forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) cerrarPopup(overlay);
  });
});

// Escape cierra
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarTodos();
});

// ══════════════════════════════════════════════════════════════════
// 4. AGREGAR AL CARRITO
// ══════════════════════════════════════════════════════════════════
function agregarSeleccionados(grid, listaBase, tipo) {
  const seleccionados = grid.querySelectorAll('.popup-item.seleccionado');

  if (seleccionados.length === 0) {
    mostrarToast('Selecciona al menos un producto primero');
    return;
  }

  let agregados = 0;
  seleccionados.forEach(item => {
    const id   = item.dataset.id;
    const dato = listaBase.find(d => d.id === id);
    if (!dato) return;

    // Evitar duplicados
    const existe = carrito.some(c => c.id === id);
    if (!existe) {
      carrito.push({ id: dato.id, nombre: dato.nombre, tipo, precio: dato.precio });
      agregados++;
    }
    item.classList.remove('seleccionado');
  });

  // Resetear contadores
  if (tipo === 'postales' && selPostales) selPostales.textContent = '0';
  if (tipo === 'sellos'   && selSellos)   selSellos.textContent   = '0';

  actualizarBadge();
  cerrarTodos();

  const msg = agregados > 0
    ? `¡${agregados} producto${agregados > 1 ? 's' : ''} agregado${agregados > 1 ? 's' : ''} a la canasta!`
    : 'Esos productos ya estaban en tu canasta';
  mostrarToast(msg);
}

document.getElementById('agregar-postales').addEventListener('click', () => {
  agregarSeleccionados(gridPostales, POSTALES, 'Postal');
});

document.getElementById('agregar-sellos').addEventListener('click', () => {
  agregarSeleccionados(gridSellos, SELLOS, 'Sello');
});

// ══════════════════════════════════════════════════════════════════
// 5. BADGE DEL BOTÓN COMPRAR
// ══════════════════════════════════════════════════════════════════
function actualizarBadge() {
  badge.textContent = carrito.length;
  badge.classList.remove('bump');
  // forzar reflow para re-disparar la animación
  void badge.offsetWidth;
  badge.classList.add('bump');
}

// ══════════════════════════════════════════════════════════════════
// 6. RENDER DEL CARRITO
// ══════════════════════════════════════════════════════════════════
function renderCarrito() {
  carritoLista.innerHTML = '';

  if (carrito.length === 0) {
    carritoVacio.hidden  = false;
    carritoFooter.hidden = true;
    carritoTotal.textContent = '0';
    return;
  }

  carritoVacio.hidden  = true;
  carritoFooter.hidden = false;
  carritoTotal.textContent = carrito.length;

  carrito.forEach(item => {
    const div = document.createElement('div');
    div.className = 'carrito__item';
    div.innerHTML = `
      <span class="carrito__item-nombre">${item.nombre}</span>
      <span class="carrito__item-tipo">${item.tipo}</span>
      <span class="carrito__item-precio">${item.precio}</span>
      <button class="carrito__item-quitar" data-id="${item.id}" aria-label="Quitar ${item.nombre}">✕</button>
    `;
    carritoLista.appendChild(div);
  });

  // Botones quitar
  carritoLista.querySelectorAll('.carrito__item-quitar').forEach(btn => {
    btn.addEventListener('click', () => {
      const id  = btn.dataset.id;
      const idx = carrito.findIndex(c => c.id === id);
      if (idx > -1) carrito.splice(idx, 1);
      actualizarBadge();
      renderCarrito();
    });
  });

  // Actualizar link de WhatsApp
  actualizarWhatsapp();
}

// ══════════════════════════════════════════════════════════════════
// 7. LINK DE WHATSAPP
// ══════════════════════════════════════════════════════════════════
function actualizarWhatsapp() {
  if (!btnWhatsapp) return;

  const lineas = carrito.map(
    (item, i) => `${i + 1}. ${item.tipo}: ${item.nombre} - ${item.precio}`
  );

  const mensaje = [
    '¡Hola! Quiero adquirir los siguientes productos de *Tradición en Canasta*:',
    '',
    ...lineas,
    '',
    `Total de productos: ${carrito.length}`,
    '',
    '¿Me pueden confirmar disponibilidad? 🌿'
  ].join('\n');

  const url = `https://wa.me/${3103982677}?text=${encodeURIComponent(mensaje)}`;
  btnWhatsapp.href = url;
}

// ══════════════════════════════════════════════════════════════════
// 8. TOAST NOTIFICATION
// ══════════════════════════════════════════════════════════════════
function mostrarToast(mensaje) {
  // Crear o reutilizar el toast
  let toast = document.getElementById('galeria-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'galeria-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    Object.assign(toast.style, {
      position:     'fixed',
      bottom:       '28px',
      left:         '50%',
      transform:    'translateX(-50%)',
      background:   'var(--color-caja-vino)',
      color:        'var(--color-titulo-principal)',
      fontFamily:   'var(--fuente-textos)',
      fontSize:     '0.85rem',
      padding:      '12px 24px',
      borderRadius: '50px',
      zIndex:       '9999',
      boxShadow:    '0 4px 20px rgba(0,0,0,0.25)',
      whiteSpace:   'nowrap',
      opacity:      '0',
      transition:   'opacity 0.3s ease',
      pointerEvents:'none',
    });
    document.body.appendChild(toast);
  }

  toast.textContent = mensaje;
  toast.style.opacity = '1';

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.style.opacity = '0';
  }, 2800);
}

// ══════════════════════════════════════════════════════════════════
// 9. INICIALIZAR CARRITO
// ══════════════════════════════════════════════════════════════════
actualizarBadge();
carritoVacio.hidden  = false;
carritoFooter.hidden = true;