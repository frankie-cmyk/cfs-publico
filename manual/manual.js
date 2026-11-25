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

  P.colorcomp = { grupo: 'Fundamentos', titulo: 'Paleta', html: function () {
    return '<h1 class="acento-lima">Paleta</h1><p class="m-entradilla">Como un pintor sin dinero: cinco pigmentos y sus tonos aclarados, más crema y papel. 27 colores en total.</p>' + '<h2>Noche</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#001524"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#001524</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#334450"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#334450</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#66737C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#66737C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#99A1A7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#99A1A7</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#CCD0D3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#CCD0D3</span></div></div><h2>Verde</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#357A38"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#357A38</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#5D9560"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#5D9560</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#86AF88"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#86AF88</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#AECAAF"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#AECAAF</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#D7E4D7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#D7E4D7</span></div></div><h2>Lima</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#DBE64C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#DBE64C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E2EB70"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#E2EB70</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E9F094"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#E9F094</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F1F5B7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#F1F5B7</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F8FADB"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F8FADB</span></div></div><h2>Rojo</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E00307"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#E00307</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E63539"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#E63539</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#EC686A"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#EC686A</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F39A9C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#F39A9C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F9CDCD"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F9CDCD</span></div></div><h2>Naranja</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#C75519"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#C75519</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#D27747"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#D27747</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#DD9975"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#DD9975</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E9BBA3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#E9BBA3</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F4DDD1"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F4DDD1</span></div></div><h2>Crema y papel</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F9EFE3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>Crema</b><br>#F9EFE3</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#FDFBF8"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>Papel (en lugar del blanco)</b><br>#FDFBF8</span></div></div><h2>Lo que se junta</h2><p class="m-entradilla">Azul y verde petróleo pasan a noche; los cinco cremas, a crema y papel; el blanco, a papel. Los nombres viejos siguen funcionando.</p>';
  } };

  P.graficas = { grupo: 'Fundamentos', titulo: 'Colores de las gráficas', html: function () {
    var S = ['--ttk-paleta-noche-800', '--ttk-paleta-verde-800', '--ttk-paleta-lima-800', '--ttk-paleta-naranja-800', '--ttk-paleta-noche-400', '--ttk-paleta-verde-400', '--ttk-paleta-lima-400', '--ttk-paleta-naranja-400'];
    var col = function (i) { return 'var(' + S[i] + ')'; };
    function ley(n) { return '<div style="display:flex;flex-wrap:wrap;gap:12px;margin:8px 0 0;font-size:12px">' + n.map(function (t, i) { return '<span style="display:inline-flex;align-items:center;gap:6px"><i style="width:10px;height:10px;border-radius:50%;background:' + col(i) + '"></i>' + t + '</span>'; }).join('') + '</div>'; }
    // Líneas: evolución de seis normas
    var normas = ['RGPD', 'ISO 22301', 'ISO 27001', 'NIS2', 'ENS', 'eIDAS'], fin = [90, 63, 55, 50, 44, 39], ini = [60, 40, 48, 43, 37, 33];
    var W = 640, H = 220, l = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;max-width:640px;display:block">';
    for (var g = 0; g <= 4; g++) { var y = 20 + g * 45; l += '<line x1="30" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="var(--ttk-linea-clara)"/><text x="0" y="' + (y + 4) + '" font-size="11" fill="var(--ttk-texto-gris)">' + (100 - g * 25) + '</text>'; }
    normas.forEach(function (n, i) { var pts = []; for (var k = 0; k <= 10; k++) { var v = ini[i] + (fin[i] - ini[i]) * Math.min(1, k / 3); pts.push((40 + k * 58) + ',' + (200 - v * 1.8)); } l += '<polyline fill="none" stroke-width="3" stroke-linejoin="round" stroke="' + col(i) + '" points="' + pts.join(' ') + '"/>'; });
    l += '</svg>' + ley(normas);
    // Barras: facturación de cinco años
    var anos = ['2022', '2023', '2024', '2025', '2026'], b = '<svg viewBox="0 0 640 200" style="width:100%;max-width:640px;display:block">', meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun'];
    meses.forEach(function (m, j) { anos.forEach(function (a, i) { var h = 40 + ((i * 37 + j * 23) % 110); var x = 20 + j * 102 + i * 17; b += '<rect x="' + x + '" y="' + (170 - h) + '" width="14" height="' + h + '" rx="2" fill="' + col(i) + '"/>'; }); b += '<text x="' + (20 + j * 102 + 30) + '" y="188" font-size="11" fill="var(--ttk-texto-gris)">' + m + '</text>'; });
    b += '<line x1="10" x2="630" y1="170" y2="170" stroke="var(--ttk-linea-clara)"/></svg>' + ley(anos);
    // Dona: reparto en cuatro partes
    var partes = [['Banca', 45], ['Seguros', 25], ['Laboral', 18], ['Otros', 12]], ang = 0, d = '<svg viewBox="0 0 200 200" style="width:200px;display:block">';
    partes.forEach(function (p, i) { var a0 = ang, a1 = ang + p[1] / 100 * 2 * Math.PI; ang = a1; var r = 80, x0 = 100 + r * Math.sin(a0), y0 = 100 - r * Math.cos(a0), x1 = 100 + r * Math.sin(a1), y1 = 100 - r * Math.cos(a1); d += '<path d="M' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + (a1 - a0 > Math.PI ? 1 : 0) + ' 1 ' + x1 + ' ' + y1 + '" fill="none" stroke-width="32" stroke="' + col(i) + '"/>'; });
    d += '</svg>' + ley(partes.map(function (p) { return p[0] + ' ' + p[1] + ' %'; }));
    var orden = '<div style="display:flex;gap:8px;flex-wrap:wrap">' + S.map(function (v, i) { return '<div style="width:72px;font-size:12px;line-height:16px"><i style="display:block;height:40px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:var(' + v + ')"></i><b>' + (i + 1) + '</b> ' + v.replace('--ttk-paleta-', '').replace('-', ' ') + '</div>'; }).join('') + '</div>';
    return '<h1 class="acento-lima">Colores de las gráficas</h1><p class="m-entradilla">Las series van siempre en este orden: los 800 de noche, verde, lima y naranja; si hay más de cuatro, siguen los 400. El rojo no se usa en series: se guarda para lo que está mal.</p>' + orden +
      '<h2>Líneas · seis normas</h2>' + l + '<h2>Barras · cinco años</h2>' + b + '<h2>Dona · cuatro partes</h2>' + d;
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
    var c = '<div class="tabla-marco" style="width:100%"><table class="tabla tabla-tarjetas"><thead><tr><th>Tamaño</th><th class="tabla-num">Veces</th><th class="tabla-num">Parte del total</th><th>¿De la casa?</th></tr></thead><tbody>' +
      '<tr><td><b>14 px</b></td><td class="tabla-num">3.313</td><td class="tabla-num">44,6 %<span class="tabla-barra"><i style="width:45%"></i></span></td><td><span class="tabla-si">Sí</span><span class="tabla-sec">Pequeña</span></td></tr>' +
      '<tr><td><b>13 px</b></td><td class="tabla-num">4</td><td class="tabla-num">0,1 %<span class="tabla-barra no"><i style="width:1%"></i></span></td><td><span class="tabla-no">No, suelto</span></td></tr></tbody><tfoot><tr><td class="tabla-nota" colspan="4">Nota al pie de la tabla: de dónde salen los datos y cuándo se midieron.</td></tr></tfoot></table></div>';
    return '<h1 class="acento-lima">Tabla</h1><p class="m-entradilla">Marco con borde y radio de caja, cabecera gris en mayúsculas pequeñas, filas con aire, cifras a la derecha con su barrita y el estado como etiqueta verde o roja. La nota sobre los datos va dentro, como pie, en estilo nota. Sin cabecera sirve para listas de datos: la primera columna va en gris. Solo pesos de la casa: normal y negrita.</p>' + ejemplo(c + '<div style="width:100%;margin-top:16px"><table class="tabla"><tbody><tr><td>Redactado</td><td>Madre, 10-11-2026</td></tr><tr><td>Revisado</td><td>Frankie Gómez</td></tr></tbody></table></div>', 'tabla-marco · tabla · tabla-tarjetas · tabla-num · tabla-sec · tabla-si · tabla-no · tabla-barra');
  } };

  var orden = ['inicio', 'color', 'colorcomp', 'graficas', 'tipografia', 'espacios', 'radios', 'sombras', 'boton', 'campo', 'casilla', 'chip', 'acento', 'carrusel', 'tarjeta', 'tabla'];
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
