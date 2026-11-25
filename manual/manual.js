/* Manual de Confirmsign (CFS_publico). Los fundamentos se leen de cfs-tokens.css en el momento: nada de valores escritos aquí. */
(function () {
  'use strict';

  // Lee todas las variables de diseño de las hojas cargadas.
  function variables() {
    var nombres = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var reglas; try { reglas = document.styleSheets[i].cssRules; } catch (e) { continue; }
      (function recorre(rs) {
        for (var j = 0; j < rs.length; j++) {
          var r = rs[j];
          if (r.style) { for (var k = 0; k < r.style.length; k++) { var p = r.style[k]; if (p.indexOf('--ttk-') === 0 && nombres.indexOf(p) < 0) { nombres.push(p); } } }
          if (r.cssRules) { recorre(r.cssRules); }
        }
      })(reglas);
    }
    var cs = getComputedStyle(document.documentElement);
    return nombres.map(function (n) { return { n: n, v: cs.getPropertyValue(n).trim() }; }).filter(function (x) { return x.v; });
  }
  function clasesTexto() {
    var out = [];
    for (var i = 0; i < document.styleSheets.length; i++) {
      var href = document.styleSheets[i].href || '';
      if (href.indexOf('cfs-tokens.css') < 0) { continue; }
      var rs = document.styleSheets[i].cssRules;
      for (var j = 0; j < rs.length; j++) { var m = /^\.(ttk-[a-z0-9-]+)$/.exec(rs[j].selectorText || ''); if (m && out.indexOf(m[1]) < 0) { out.push(m[1]); } }
    }
    return out;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function bonito(n) { return n.replace('--ttk-', '').replace(/-/g, ' '); }

  function ejemplo(html, nombre, oscuro) {
    return '<div class="m-lienzo' + (oscuro ? ' sobre-oscuro' : '') + '">' + html + '</div><p class="m-nombre">' + esc(nombre) + '</p><pre class="m-codigo">' + esc(html.replace(/></g, '>\n<')) + '</pre>';
  }

  var P = {};

  P.inicio = { grupo: 'Introducción', titulo: 'Qué es este manual', html: function () {
    return '<h1 class="acento-lima">Manual de Confirmsign</h1><p class="m-entradilla">El único manual de estilos y piezas de Confirmsign. Sale del de Tatanka (nexoTTK), que es el bueno: Madre y los demás entornos se igualan a él. Los colores, letras y medidas se leen del archivo de valores que se saca del Sketch; las piezas son las mismas que usa el nexo.</p>' +
      '<h2>Cómo se usa</h2><p>Cada entorno carga dos hojas: <b>cfs-tokens.css</b> (los valores) y <b>cfs-componentes.css</b> (las piezas). En cada pieza se ve cómo queda, sus variantes y el código para ponerla.</p>' +
      '<h2>De dónde sale</h2><p>Sketch «Tatanka_26 V2.0 UX» → valores (tokens) → este manual y el nexo. Lo que cambia en uno cambia en los otros en la misma tanda.</p>';
  } };

  P.color = { grupo: 'Fundamentos', titulo: 'Color', html: function () {
    var vs = variables().filter(function (x) { return /^(#|rgb)/i.test(x.v); });
    var paleta = vs.filter(function (x) { return x.n.indexOf('--ttk-paleta-') === 0; });
    var resto = vs.filter(function (x) { return x.n.indexOf('--ttk-paleta-') !== 0; });
    function rej(l) { return '<div class="m-rejilla">' + l.map(function (x) { return '<div class="m-muestra"><i style="background:var(' + x.n + ')"></i><span><b>' + esc(bonito(x.n)) + '</b>' + esc(x.v) + '</span></div>'; }).join('') + '</div>'; }
    return '<h1 class="acento-lima">Color</h1><p class="m-entradilla">La paleta: cada familia con cinco tonos. Debajo, los colores con nombre de uso. Todos salen de los tokens.</p><h2>Paleta</h2>' + rej(paleta) + '<h2>Por uso</h2>' + rej(resto);
  } };

  P.tipografia = { grupo: 'Fundamentos', titulo: 'Tipografía', html: function () {
    var h = '<h1 class="acento-lima">Tipografía</h1><p class="m-entradilla">Syne para títulos, Poppins para textos y Georgia en cursiva para el acento. Cada estilo de texto del Sketch es una clase.</p>';
    clasesTexto().forEach(function (c) {
      var d = document.createElement('div'); d.className = c; d.style.position = 'absolute'; d.style.visibility = 'hidden'; d.textContent = 'x'; document.body.appendChild(d);
      var cs = getComputedStyle(d); var info = cs.fontFamily.split(',')[0].replace(/"/g, '') + ' · ' + cs.fontSize + ' / ' + cs.lineHeight + ' · ' + cs.fontWeight; d.remove();
      h += '<div class="m-fila-letra"><div class="' + c + '">Firma y envía tus documentos con validez legal</div><small>.' + c + ' · ' + esc(info) + '</small></div>';
    });
    return h;
  } };

  function medidas(prefijo, titulo, texto, dibujo) {
    return { grupo: 'Fundamentos', titulo: titulo, html: function () {
      var vs = variables().filter(function (x) { return x.n.indexOf(prefijo) === 0 && !/var\(/.test(x.v); });
      return '<h1 class="acento-lima">' + titulo + '</h1><p class="m-entradilla">' + texto + '</p>' + vs.map(function (x) { return dibujo(x); }).join('');
    } };
  }
  P.espacios = medidas('--ttk-espacio-', 'Espacios', 'La escala de espacios. Márgenes y separaciones usan solo estos valores.', function (x) { return '<div class="m-medida"><i style="width:' + x.v + '"></i>' + esc(bonito(x.n)) + ' · ' + esc(x.v) + '</div>'; });
  P.radios = medidas('--ttk-radio-', 'Radios', 'Solo tres: pequeño para botones, campos y tarjetas; grande para cajas y banners; píldora para etiquetas y chips.', function (x) { return '<div class="m-medida"><div class="m-caja" style="border-radius:' + x.v + '">' + esc(x.v) + '</div>' + esc(bonito(x.n)) + '</div>'; });
  P.sombras = medidas('--ttk-sombra-', 'Sombras', 'Solo dos: tarjeta para lo apoyado en la página y flotante para lo que queda por encima.', function (x) { return '<div class="m-medida"><div class="m-caja" style="box-shadow:' + x.v + ';border:0">' + esc(bonito(x.n)) + '</div>' + esc(x.v) + '</div>'; });

  P.boton = { grupo: 'Componentes', titulo: 'Botón', html: function () {
    var claro = '<button class="boton boton-principal">Principal</button><button class="boton boton-secundario">Secundario</button><button class="boton boton-enviar">Enviar</button>';
    var tam = '<button class="boton boton-principal boton-pequeno">Pequeño</button><button class="boton boton-principal">Normal</button><button class="boton boton-principal boton-grande">Grande</button>';
    var est = '<button class="boton boton-principal" disabled>Desactivado</button><button class="boton boton-principal" aria-busy="true">En espera</button>';
    return '<h1 class="acento-lima">Botón</h1><p class="m-entradilla">Cuatro tipos (principal, secundario, enviar y flecha), tres tamaños y siempre en mayúsculas. El color lo decide el fondo: sobre claro, verde; sobre oscuro, lima. Enviar es rojo y solo para enviar.</p>' +
      '<h2>Tipos, sobre claro</h2>' + ejemplo(claro, 'boton boton-principal · boton-secundario · boton-enviar') +
      '<h2>Tipos, sobre oscuro</h2>' + ejemplo(claro, 'el contenedor lleva «sobre-oscuro»', true) +
      '<h2>Tamaños</h2>' + ejemplo(tam, 'boton-pequeno (24) · normal (40) · boton-grande (52)') +
      '<h2>Estados</h2>' + ejemplo(est, 'disabled · aria-busy="true"; al pasar y con el foco, pruébalo con el ratón y el teclado');
  } };

  P.campo = { grupo: 'Componentes', titulo: 'Campo y selector', html: function () {
    var c = '<input class="campo" placeholder="Escribe aquí"><input class="campo campo-grande" placeholder="Buscador (grande)"><select class="selector"><option>Selector</option><option>Otra opción</option></select><input class="campo" placeholder="Desactivado" disabled>';
    return '<h1 class="acento-lima">Campo y selector</h1><p class="m-entradilla">Una sola caja para todos los campos: fondo blanco, borde de 1 y radio pequeño. Con el foco, el borde pasa a noche.</p>' + ejemplo(c, 'campo · campo campo-grande · selector');
  } };

  P.casilla = { grupo: 'Componentes', titulo: 'Casilla', html: function () {
    var c = '<label><input type="checkbox" class="casilla"> Sin marcar</label><label><input type="checkbox" class="casilla" checked> Marcada</label><label><input type="checkbox" class="casilla" disabled> Desactivada</label>';
    return '<h1 class="acento-lima">Casilla</h1><p class="m-entradilla">Marcada en verde. Mismos estados que el campo.</p>' + ejemplo(c, 'casilla');
  } };

  P.chip = { grupo: 'Componentes', titulo: 'Chip', html: function () {
    var c = '<span class="chip" tabindex="0"><b>Sector</b> <span class="chip-valor">Banca</span></span><span class="chip" tabindex="0">Laboral</span><span class="chip" aria-disabled="true">Desactivado</span>';
    return '<h1 class="acento-lima">Chip</h1><p class="m-entradilla">Para filtros: 32 de alto y radio píldora.</p>' + ejemplo(c, 'chip · chip b · chip-valor');
  } };

  P.acento = { grupo: 'Componentes', titulo: 'Acento lima', html: function () {
    var c = '<h3 class="acento-lima" style="margin:0">Título de página</h3><h4 class="acento-lima-fino" style="margin:0">Título de apartado</h4>';
    return '<h1 class="acento-lima">Acento lima</h1><p class="m-entradilla">Raya lima delante de un título: gruesa para el título de página y fina para los apartados.</p>' + ejemplo(c, 'acento-lima · acento-lima-fino');
  } };

  P.carrusel = { grupo: 'Componentes', titulo: 'Cabecera de carrusel', html: function () {
    var c = '<div class="carrusel-cabecera" style="width:100%"><h3 class="carrusel-titulo" style="margin:0">Plantillas más usadas</h3><div class="carrusel-acciones"><a class="boton boton-secundario boton-pequeno" href="#carrusel">Ver todas</a><button class="boton boton-secundario boton-pequeno carrusel-flecha" aria-label="Anterior">‹</button><button class="boton boton-secundario boton-pequeno carrusel-flecha" aria-label="Siguiente">›</button></div></div>';
    return '<h1 class="acento-lima">Cabecera de carrusel</h1><p class="m-entradilla">Un solo carrusel para todo: título a la izquierda; a la derecha, «Ver todas» y dos flechas.</p>' + ejemplo(c, 'carrusel-cabecera · carrusel-titulo · carrusel-acciones · carrusel-flecha');
  } };

  P.tarjeta = { grupo: 'Componentes', titulo: 'Tarjeta de plantilla', html: function () {
    var c = '<a class="tarjeta-plantilla" href="#tarjeta" style="display:block;width:316px;padding:16px;border-radius:var(--ttk-radio-pequeno);box-shadow:var(--ttk-sombra-tarjeta);background:#fff;color:inherit;text-decoration:none"><span class="ttk-etiqueta-pastilla">Laboral</span><div style="font-family:var(--ttk-font-titulos);font-weight:700;font-size:18px;line-height:24px;margin-top:8px">Comunicación de vacaciones</div></a>';
    return '<h1 class="acento-lima">Tarjeta de plantilla</h1><p class="m-entradilla">Margen interior de 16. Al pasar el ratón o llegar con el teclado sube 4 y la sombra pasa a flotante. Si el equipo pide menos movimiento, solo cambia la sombra.</p>' + ejemplo(c, 'tarjeta-plantilla (el relleno de la tarjeta es de Tatanka)');
  } };

  P.tabla = { grupo: 'Componentes', titulo: 'Tabla', html: function () {
    var c = '<div class="tabla-marco" style="width:100%"><table class="tabla"><thead><tr><th>Tamaño</th><th class="tabla-num">Veces</th><th class="tabla-num">Parte del total</th><th>¿De la casa?</th></tr></thead><tbody>' +
      '<tr><td><b>14 px</b></td><td class="tabla-num">3.313</td><td class="tabla-num">44,6 %<span class="tabla-barra"><i style="width:45%"></i></span></td><td><span class="tabla-si">Sí</span><span class="tabla-sec">Pequeña</span></td></tr>' +
      '<tr><td><b>13 px</b></td><td class="tabla-num">4</td><td class="tabla-num">0,1 %<span class="tabla-barra no"><i style="width:1%"></i></span></td><td><span class="tabla-no">No, suelto</span></td></tr></tbody><tfoot><tr><td class="tabla-nota" colspan="4">Nota al pie de la tabla: de dónde salen los datos y cuándo se midieron.</td></tr></tfoot></table></div>';
    return '<h1 class="acento-lima">Tabla</h1><p class="m-entradilla">Marco con borde y radio de caja, cabecera gris en mayúsculas pequeñas, filas con aire, cifras a la derecha con su barrita y el estado como etiqueta verde o roja. La nota sobre los datos va dentro, como pie, en estilo nota. Solo pesos de la casa: normal y negrita.</p>' + ejemplo(c, 'tabla-marco · tabla · tabla-num · tabla-sec · tabla-si · tabla-no · tabla-barra');
  } };

  var orden = ['inicio', 'color', 'tipografia', 'espacios', 'radios', 'sombras', 'boton', 'campo', 'casilla', 'chip', 'acento', 'carrusel', 'tarjeta', 'tabla'];
  var menu = document.getElementById('m-menu'), pagina = document.getElementById('m-pagina');

  function pintaMenu(actual) {
    var g = '', h = '';
    orden.forEach(function (k) { if (P[k].grupo !== g) { g = P[k].grupo; h += '<h2>' + esc(g) + '</h2>'; } h += '<a href="#' + k + '"' + (k === actual ? ' aria-current="page"' : '') + '>' + esc(P[k].titulo) + '</a>'; });
    menu.innerHTML = h;
  }
  function ve() {
    var k = (location.hash || '#inicio').slice(1); if (!P[k]) { k = 'inicio'; }
    pintaMenu(k); pagina.innerHTML = P[k].html(); document.title = P[k].titulo + ' · Manual de Confirmsign';
    menu.classList.remove('abierto'); pagina.focus({ preventScroll: true }); window.scrollTo(0, 0);
  }
  document.querySelector('.m-menu-boton').addEventListener('click', function () { var a = menu.classList.toggle('abierto'); this.setAttribute('aria-expanded', a ? 'true' : 'false'); });
  window.addEventListener('hashchange', ve);
  if (document.readyState === 'complete') { ve(); } else { window.addEventListener('load', ve); }
})();
