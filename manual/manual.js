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
    return '<h1 class="acento-lima">Manual de Confirmsign</h1><p class="m-entradilla">El único manual de estilos y piezas de Confirmsign: el tronco común que comparten Madre, nexoTTK, Fennec, Rhino, Tatanka, Beagle, Dove, Makah y KRKN. Cada sección toma de aquí todo y solo añade lo mínimo propio. Lo que no está aquí no existe. Los colores, letras y medidas se leen del archivo de valores que se saca del Sketch; las piezas son las mismas que usa el nexo.</p>' +
      '<h2>Cómo se usa</h2><p>Cada entorno carga dos hojas: <b>cfs-tokens.css</b> (los valores) y <b>cfs-componentes.css</b> (las piezas). En cada pieza se ve cómo queda, sus variantes y el código para ponerla.</p>' +
      '<h2>De dónde sale</h2><p>Sketch «Tatanka_26 V2.0 UX» → valores (tokens) → este manual y el nexo. Lo que cambia en uno cambia en los otros en la misma tanda.</p>';
  } };

  /* «Color» (la lista de todos los tokens, con los nombres viejos) se retiró el 25-11-2026: solo existe la Paleta. */

  P.colorcomp = { grupo: 'Fundamentos', titulo: 'Paleta', html: function () {
    return '<h1 class="acento-lima">Paleta</h1><p class="m-entradilla">Como un pintor sin dinero: cinco pigmentos y sus tonos aclarados, más crema y papel. 27 colores en total.</p>' + '<h2>Noche</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#001524"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#001524</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#334450"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#334450</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#66737C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#66737C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#99A1A7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#99A1A7</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#CCD0D3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#CCD0D3</span></div></div><h2>Verde</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#357A38"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#357A38</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#5D9560"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#5D9560</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#86AF88"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#86AF88</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#AECAAF"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#AECAAF</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#D7E4D7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#D7E4D7</span></div></div><h2>Lima</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#DBE64C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#DBE64C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E2EB70"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#E2EB70</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E9F094"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#E9F094</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F1F5B7"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#F1F5B7</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F8FADB"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F8FADB</span></div></div><h2>Rojo</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E00307"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#E00307</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E63539"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#E63539</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#EC686A"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#EC686A</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F39A9C"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#F39A9C</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F9CDCD"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F9CDCD</span></div></div><h2>Naranja</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#C75519"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>800</b><br>#C75519</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#D27747"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>600</b><br>#D27747</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#DD9975"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>400</b><br>#DD9975</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#E9BBA3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>200</b><br>#E9BBA3</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F4DDD1"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>00</b><br>#F4DDD1</span></div></div><h2>Crema y papel</h2><div style="display:flex;gap:12px;flex-wrap:wrap"><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#F9EFE3"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>Crema</b><br>#F9EFE3</span></div><div style="width:96px"><i style="display:block;height:56px;border-radius:4px;border:1px solid var(--ttk-linea-clara);background:#FDFBF8"></i><span style="display:block;font-size:12px;line-height:16px;margin-top:4px"><b>Papel (en lugar del blanco)</b><br>#FDFBF8</span></div></div><h2>Lo que se junta</h2><p class="m-entradilla">Azul y verde petróleo pasan a noche; los cinco cremas, a crema y papel; el blanco, a papel. Los nombres viejos siguen funcionando.</p>';
  } };

  P.graficas = { grupo: 'Fundamentos', titulo: 'Colores de las gráficas', html: function () {
    var rc = getComputedStyle(document.documentElement), G = [1, 2, 3, 4, 5, 6, 7, 8].map(function (i) { return [i, rc.getPropertyValue('--ttk-grafica-' + i).trim()]; });
    var col = function (i) { return 'var(--ttk-grafica-' + (i % 8 + 1) + ')'; };
    function ley(n) { return '<div style="display:flex;flex-wrap:wrap;gap:12px;margin:8px 0 0;font-size:12px;line-height:16px">' + n.map(function (t, i) { return '<span style="display:inline-flex;align-items:center;gap:8px"><i style="width:12px;height:12px;border-radius:999px;background:' + col(i) + '"></i>' + esc(t) + '</span>'; }).join('') + '</div>'; }
    var orden = '<div style="display:flex;gap:8px;flex-wrap:wrap;margin:0 0 32px">' + G.map(function (g, i) { return '<div style="width:96px;font-size:12px;line-height:16px"><i style="display:block;height:48px;border-radius:4px;background:var(--ttk-grafica-' + g[0] + ')"></i><b>' + (i + 1) + '</b> ' + esc(g[1]) + '<br><code style="font-family:\'Courier New\',monospace;color:var(--ttk-paleta-noche-400)">--ttk-grafica-' + (i + 1) + '</code></div>'; }).join('') + '</div>';
    var normas = ['RGPD', 'ISO 22301', 'ISO 27001', 'NIS2', 'ENS', 'eIDAS'], fin = [90, 63, 55, 50, 44, 39], ini = [60, 40, 48, 43, 37, 33];
    var W = 640, H = 220, l = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;max-width:640px;display:block">';
    for (var g = 0; g <= 4; g++) { var y = 20 + g * 45; l += '<line x1="30" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="var(--ttk-linea-clara)"/><text x="0" y="' + (y + 4) + '" font-size="12" fill="var(--ttk-paleta-noche-400)">' + (100 - g * 25) + '</text>'; }
    normas.forEach(function (n, i) { var pts = []; for (var k = 0; k <= 10; k++) { var v = ini[i] + (fin[i] - ini[i]) * Math.min(1, k / 3) - (i * 3 * Math.sin(k)); pts.push((40 + k * 58) + ',' + (200 - v * 1.8)); } l += '<polyline fill="none" stroke-width="3" stroke-linejoin="round" stroke="' + col(i) + '" points="' + pts.join(' ') + '"/>'; });
    l += '</svg>' + ley(normas);
    var anos = ['2022', '2023', '2024', '2025', '2026'], b = '<svg viewBox="0 0 640 200" style="width:100%;max-width:640px;display:block">', meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun'];
    meses.forEach(function (m, j) { anos.forEach(function (a2, i) { var h = 40 + ((i * 37 + j * 23) % 110); var x = 20 + j * 102 + i * 17; b += '<rect x="' + x + '" y="' + (170 - h) + '" width="14" height="' + h + '" rx="2" fill="' + col(anos.length - 1 - i) + '"/>'; }); b += '<text x="' + (20 + j * 102 + 40) + '" y="188" font-size="12" text-anchor="middle" fill="var(--ttk-paleta-noche-400)">' + m + '</text>'; });
    b += '<line x1="10" x2="630" y1="170" y2="170" stroke="var(--ttk-linea-clara)"/></svg>' + ley(anos.slice().reverse());
    var partes = [['Banca', 34], ['Seguros', 22], ['Laboral', 16], ['Inmobiliario', 11], ['Salud', 7], ['Educación', 5], ['Ocio', 3], ['Otros', 2]], ang = 0, d = '<svg viewBox="0 0 200 200" style="width:200px;display:block">';
    partes.forEach(function (p, i) { var a0 = ang, a1 = ang + p[1] / 100 * 2 * Math.PI; ang = a1; var r = 80, x0 = 100 + r * Math.sin(a0), y0 = 100 - r * Math.cos(a0), x1 = 100 + r * Math.sin(a1), y1 = 100 - r * Math.cos(a1); d += '<path d="M' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + (p[1] > 50 ? 1 : 0) + ' 1 ' + x1 + ' ' + y1 + '" fill="none" stroke-width="32" stroke="' + col(i) + '"/>'; });
    d += '</svg>' + ley(partes.map(function (p) { return p[0] + ' ' + p[1] + ' %'; }));
    return '<h1 class="acento-lima">Colores de las gráficas</h1><p class="m-entradilla">Una sola gama de ocho tonos de la paleta, del más oscuro (1) al más claro (8), sin rojo ni naranja. Una sola regla: lo principal va en oscuro. Si las series son fechas (años, trimestres, meses o días), la más reciente va en el 1 y la más antigua en el más claro; cuando llega una fecha nueva, toma el 1 y las demás se aclaran solas. Si no son fechas, la más grande va en el 1, la siguiente en el 2, y así. Si hay más de ocho series, se juntan en «Otros».</p>' + orden +
      '<h2>Líneas · seis normas</h2>' + l + '<h2>Barras · cinco años (el más reciente, en oscuro)</h2>' + b + '<h2>Dona · ocho partes</h2>' + d;
  } };

  P.tipografia = { grupo: 'Fundamentos', titulo: 'Tipografía', html: function () {
    var AB = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ abcdefghijklmnñopqrstuvwxyz 0123456789 áéíóú ¿?¡!';
    var fuentes = [
      { n: 'Syne', uso: 'Titulares (H1 a H6), portada y cifra', css: 'var(--ttk-font-titulos)', peso: 700, d: 'https://fonts.google.com/specimen/Syne' },
      { n: 'Poppins', uso: 'Textos, botones, etiquetas y menús', css: 'var(--ttk-font-textos)', peso: 400, d: 'https://fonts.google.com/specimen/Poppins' },
      { n: 'Georgia', uso: 'Coletilla de los titulares, en cursiva', css: 'var(--ttk-font-acento)', peso: 400, cursiva: true, d: '' },
      { n: 'Courier New', uso: 'Código y valores técnicos', css: "'Courier New',monospace", peso: 400, d: '' }
    ];
    var h = '<h1 class="acento-lima">Tipografía</h1><p class="m-entradilla">Cuatro letras y una sola escala: portada, seis titulares, cifra, entradilla, párrafo, pequeña, mínima y nota. La negrita es una variante de párrafo y de pequeña. El texto de los botones va en la pieza Botón.</p><h2>Las letras</h2><div class="m-letras">';
    fuentes.forEach(function (f) {
      var fs = 'font-family:' + f.css + ';font-weight:' + f.peso + (f.cursiva ? ';font-style:italic' : '');
      h += '<div class="m-letra"><div class="m-letra-aa" style="' + fs + '">Aa</div><div class="m-letra-tx"><b>' + esc(f.n) + '</b><span>' + esc(f.uso) + '</span><p style="' + fs + '">' + AB + '</p>' + (f.d ? '<a href="' + f.d + '" target="_blank" rel="noopener">Descargar</a>' : '<em>Viene con el sistema</em>') + '</div></div>';
    });
    h += '</div>';
    var escala = [
      { n: 'Portada', c: 'ttk-portada', uso: 'Título de la cabecera de Inicio y de cada sección (en móvil, 34)' },
      { n: 'H1', c: 'ttk-titular-h1', uso: 'Título de página' },
      { n: 'H2', c: 'ttk-titular-h2', uso: 'Apartados' },
      { n: 'Coletilla', c: 'ttk-acento', css: 'font-size:21px;line-height:27px', uso: 'Tras los dos puntos de un titular, del tamaño del titular' },
      { n: 'H3', c: 'ttk-titular-h3', uso: 'Subapartados y bloques' },
      { n: 'H4', c: 'ttk-titular-h4', uso: 'Títulos dentro de un bloque' },
      { n: 'H5', c: 'ttk-titular-h5', uso: 'Títulos menores' },
      { n: 'H6', c: 'ttk-titular-h6', uso: 'El titular más pequeño' },
      { n: 'Cifra', c: 'ttk-cifra', uso: 'Cifras protagonistas (en móvil, 40)', muestra: '18.204' },
      { n: 'Entradilla', c: 'ttk-entradilla', uso: 'Frase de entrada y saludo de la portada' },
      { n: 'Entradilla en negrita', c: 'ttk-entradilla-negrita', uso: 'Lo destacado de la entradilla' },
      { n: 'Párrafo', c: 'ttk-cuerpo-parrafo', uso: 'Todo el texto seguido' },
      { n: 'Párrafo en negrita', c: 'ttk-cuerpo-parrafo-negrita', uso: 'Títulos de tarjeta y palabras destacadas' },
      { n: 'Pequeña', c: 'ttk-cuerpo-pequeno', uso: 'Textos secundarios, tablas y etiquetas' },
      { n: 'Pequeña en negrita', c: 'ttk-cuerpo-pequeno-negrita', uso: 'Etiquetas y cabeceras de tabla' },
      { n: 'Mínima', c: 'ttk-minima', uso: 'Etiquetas pequeñas, fechas y leyendas' },
      { n: 'Mínima en negrita', c: 'ttk-minima-negrita', uso: 'Etiquetas pequeñas destacadas' },
      { n: 'Nota', c: 'ttk-cuerpo-nota', uso: 'Pies y notas' }
    ];
    function mide(c, css) {
      var d = document.createElement('div'); if (c) { d.className = c; } if (css) { d.setAttribute('style', css); } d.style.position = 'absolute'; d.style.visibility = 'hidden'; d.textContent = 'x'; document.body.appendChild(d);
      var cs = getComputedStyle(d); var r = { letra: cs.fontFamily.split(',')[0].replace(/"/g, ''), tam: Math.round(parseFloat(cs.fontSize)) + ' / ' + Math.round(parseFloat(cs.lineHeight)), peso: cs.fontWeight === '700' ? 'negrita' : (cs.fontStyle === 'italic' ? 'cursiva' : 'normal') }; d.remove(); return r;
    }
    h += '<h2>La escala</h2><div class="m-escala"><div class="m-escala-cab"><span>Estilo</span><span>Muestra</span><span>Medidas</span></div>';
    escala.forEach(function (e) {
      var m = mide(e.c, e.css);
      h += '<div class="m-escala-fila"><div class="m-escala-n"><b>' + esc(e.n) + '</b><span>' + esc(e.uso) + '</span></div><div class="m-escala-m"><div class="' + e.c + '" style="margin:0;' + (e.css || '') + '">' + (e.muestra || 'Madre ordena lo que sabe') + '</div></div><div class="m-escala-v"><i>' + esc(m.letra) + '</i><i>' + esc(m.tam) + '</i><i>' + esc(m.peso) + '</i><code>.' + esc(e.c) + '</code></div></div>';
    });
    h += '</div>';
    h += '<h2>Así se ven juntos</h2><div class="m-lienzo m-ejemplo-letra"><div>' +
      '<div class="ttk-titular-h1" style="margin:0 0 4px">Certificaciones: <span class="ttk-acento">lo que nos piden y lo que cumplimos</span></div>' +
      '<p class="ttk-cuerpo-parrafo" style="margin:0 0 24px">Cada norma que se exige a Confirmsign tiene aquí su ficha, con lo que cumplimos hoy y lo que falta.</p>' +
      '<div class="ttk-titular-h2" style="margin:0 0 8px">ISO 27001</div>' +
      '<p class="ttk-cuerpo-parrafo" style="margin:0 0 16px">La norma de seguridad de la información. La auditoría externa la renovó en <span class="ttk-cuerpo-parrafo-negrita">marzo de 2026</span>.</p>' +
      '<div class="ttk-titular-h3" style="margin:0 0 8px">Qué toca hacer</div>' +
      '<div class="ttk-titular-h4" style="margin:0 0 4px">Revisión de accesos</div>' +
      '<p class="ttk-cuerpo-pequeno" style="margin:0 0 16px"><span class="ttk-cuerpo-pequeno-negrita">Responsable:</span> Dirección técnica · cada seis meses.</p>' +
      '<p class="ttk-cuerpo-nota" style="margin:0">Fuente: informe de auditoría de 2026. Ejemplo con datos inventados.</p></div></div>';
    h += '<p class="m-nota">No hay más estilos de letra: estos son los mismos en GitHub, en las webs y en el Sketch.</p>';
    return h;
  } };

  function medidas(prefijo, titulo, texto, dibujo) {
    return { grupo: 'Fundamentos', titulo: titulo, html: function () {
      var vs = variables().filter(function (x) { return x.n.indexOf(prefijo) === 0 && !/var\(/.test(x.v); });
      return '<h1 class="acento-lima">' + titulo + '</h1><p class="m-entradilla">' + texto + '</p>' + vs.map(function (x) { return dibujo(x); }).join('');
    } };
  }
  P.reticula = { grupo: 'Fundamentos', titulo: 'Retícula', html: function () {
    var cs = getComputedStyle(document.documentElement);
    function v(n) { return cs.getPropertyValue('--ttk-ret-' + n).trim(); }
    function px(n) { return parseFloat(v(n)); }
    function rejilla(t, ancho) {
      var n = px(t + '-columnas'), col = px(t + '-columna'), hueco = px(t + '-hueco'), margen = px(t + '-margen'), cont = px(t + '-contenedor');
      var esc1 = 100 / ancho, h = '<div class="m-ret" style="width:' + (ancho * esc1) + '%;padding:0 ' + (margen * esc1) + '%">';
      for (var i = 0; i < n; i++) { h += '<i style="width:' + (col / cont * 100) + '%;margin-right:' + (i < n - 1 ? (hueco / cont * 100) : 0) + '%"></i>'; }
      return h + '</div><p class="m-ret-nota">' + n + ' columnas de ' + v(t + '-columna') + ', huecos de ' + v(t + '-hueco') + ', márgenes de ' + v(t + '-margen') + ' · contenido ' + v(t + '-contenedor') + ' en ' + ancho + ' px</p>';
    }
    function reparto(nombre, partes, uso) {
      var h = '<div class="m-ret m-ret-rep">';
      partes.forEach(function (p) { h += '<b style="flex:' + p + ' ' + p + ' 0">' + p + '</b>'; });
      return '<h3>' + esc(nombre) + '</h3>' + h + '</div><p class="m-ret-nota">' + esc(uso) + '</p>';
    }
    return '<h1 class="acento-lima">Retícula</h1><p class="m-entradilla">El esqueleto de cada página: columnas iguales con huecos y márgenes fijos. Toda pieza ocupa un número entero de columnas y sus bordes caen siempre sobre el borde de una columna. Solo los fondos de color y las fotos a todo lo ancho llegan hasta el borde de la pantalla.</p>' +
      '<h2>Escritorio · desde ' + esc(v('escritorio-desde')) + '</h2>' + rejilla('escritorio', 1440) +
      '<h2>Tableta · desde ' + esc(v('tableta-desde')) + '</h2>' + rejilla('tableta', 768) +
      '<h2>Móvil · hasta ' + (px('tableta-desde') - 1) + 'px</h2>' + rejilla('movil', 390) +
      '<h2>Cómo se reparten las 12 columnas</h2>' +
      reparto('Información · 3 y 9', [3, 9], 'Páginas con menú a la izquierda: menú de 3 columnas y contenido de 9.') +
      reparto('Ficha · 9 y 3', [9, 3], 'La página de cada plantilla: contenido de 9 columnas y lateral de 3, donde va el precio.') +
      reparto('Tres tarjetas · 4, 4 y 4', [4, 4, 4], 'Portada: tarjetas de canales y de servicios.') +
      reparto('Cuatro tarjetas · 3, 3, 3 y 3', [3, 3, 3, 3], 'Portada: filas de plantillas más usadas y básicas.') +
      reparto('Buscador · 3 y tres de 3', [3, 3, 3, 3], 'Buscador y páginas de canal: filtros de 3 columnas y tres tarjetas de 3.') +
      '<h2>La hoja que se usa</h2><p class="m-entradilla">«contenedor» centra el contenido; «reticula» reparte las 12 columnas; cada pieza dice las que ocupa con «col-3», «col-4», «col-6», «col-9» o «col-12». En tableta y móvil se reparten solas en 8 y 4.</p>' +
      ejemplo('<div class="contenedor"><div class="reticula"><div class="col-3 m-ret-caja">col-3</div><div class="col-9 m-ret-caja">col-9</div><div class="col-4 m-ret-caja">col-4</div><div class="col-4 m-ret-caja">col-4</div><div class="col-4 m-ret-caja">col-4</div><div class="col-6 m-ret-caja">col-6</div><div class="col-6 m-ret-caja">col-6</div><div class="col-12 m-ret-caja">col-12</div></div></div>', 'contenedor · reticula · col-3 … col-12') +
      '<h2>Reglas</h2><ul><li><b>Texto a ' + esc(v('texto-ancho')) + ' como mucho.</b> Entradillas, párrafos y listas no pasan de ese ancho para que se lean bien; los titulares ocupan toda su columna. En móvil el texto va a todo el ancho.</li>' +
      '<li><b>Filas llenas.</b> En una rejilla de tarjetas todas las filas van completas. Si sobra una, la de más contenido va sola en una fila entera, como destacada. Nunca una tarjeta sola con un hueco al lado. No vale para carruseles, que van siempre en una línea.</li>' +
      '<li><b>Por qué 12.</b> Se parte en 2, 3, 4 y 6 partes iguales: mitades, tercios y cuartos sin decimales. Comprobación: 12 columnas de 84 y 11 huecos de 32 suman 1360; con 40 de margen a cada lado, 1440.</li></ul>' +
      '<p class="m-nota">De dónde sale: lámina 1.1 «Retícula» del Sketch de Tatanka. Los huecos y márgenes de tableta y móvil son los de Material Design.</p>';
  } };

  P.espacios = medidas('--ttk-espacio-', 'Espacios', 'La escala de espacios. Márgenes y separaciones usan solo estos valores.', function (x) { return '<div class="m-medida"><i style="width:' + x.v + '"></i>' + esc(bonito(x.n)) + ' · ' + esc(x.v) + '</div>'; });
  var usos = { 'radio-pequeno': 'botones, campos, selectores, casillas, tarjetas y ventanas', 'radio-grande': 'cajas, bandas, banners y tablas', 'radio-pildora': 'etiquetas, chips y avatar', 'sombra-tarjeta': 'lo apoyado en la página: tarjetas, cajas, paneles y ventanas', 'sombra-flotante': 'lo que queda por encima mientras flota: desplegables y la tarjeta al pasar el ratón' };
  var nombres = { 'radio-pequeno': 'Pequeño', 'radio-grande': 'Grande', 'radio-pildora': 'Píldora', 'sombra-tarjeta': 'Tarjeta', 'sombra-flotante': 'Flotante' };
  function nombre(n) { var k = n.replace('--ttk-', ''); return nombres[k] || bonito(n); }
  function uso(n) { var k = n.replace('--ttk-', ''); return usos[k] ? '<small style="display:block;color:var(--ttk-paleta-noche-400);font-size:12px;line-height:16px">' + esc(usos[k]) + '</small>' : ''; }
  P.radios = medidas('--ttk-radio-', 'Radios', 'Solo tres, y nada más: pequeño (4), grande (8) y píldora. Cada pieza usa uno de los tres directamente.', function (x) { return '<div class="m-medida"><div class="m-caja" style="border-radius:' + x.v + '">' + esc(x.v) + '</div><div>' + esc(nombre(x.n)) + uso(x.n) + '</div></div>'; });
  P.sombras = medidas('--ttk-sombra-', 'Sombras', 'Solo dos, y nada más: tarjeta para lo apoyado en la página y flotante para lo que queda por encima.', function (x) { return '<div class="m-medida"><div class="m-caja" style="box-shadow:' + x.v + ';border:0">' + esc(nombre(x.n)) + '</div><div>' + esc(x.v) + uso(x.n) + '</div></div>'; });

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
    var c = '<a class="tarjeta-plantilla" href="#tarjeta" style="display:block;width:316px;padding:16px;border-radius:var(--ttk-radio-pequeno);box-shadow:var(--ttk-sombra-tarjeta);background:#fff;color:inherit;text-decoration:none"><span class="chip">Laboral</span><div style="font-family:var(--ttk-font-titulos);font-weight:700;font-size:18px;line-height:24px;margin-top:8px">Comunicación de vacaciones</div></a>';
    return '<h1 class="acento-lima">Tarjeta de plantilla</h1><p class="m-entradilla">Margen interior de 16. Al pasar el ratón o llegar con el teclado sube 4 y la sombra pasa a flotante. Si el equipo pide menos movimiento, solo cambia la sombra.</p>' + ejemplo(c, 'tarjeta-plantilla (el relleno de la tarjeta es de Tatanka)');
  } };

  P.tabla = { grupo: 'Componentes', titulo: 'Tabla', html: function () {
    var c = '<div class="tabla-marco" style="width:100%"><table class="tabla tabla-tarjetas"><thead><tr><th>Tamaño</th><th class="tabla-num">Veces</th><th class="tabla-num">Parte del total</th><th>¿De la casa?</th></tr></thead><tbody>' +
      '<tr><td><b>14 px</b></td><td class="tabla-num">3.313</td><td class="tabla-num">44,6 %<span class="tabla-barra"><i style="width:45%"></i></span></td><td><span class="tabla-si">Sí</span><span class="tabla-sec">Pequeña</span></td></tr>' +
      '<tr><td><b>13 px</b></td><td class="tabla-num">4</td><td class="tabla-num">0,1 %<span class="tabla-barra no"><i style="width:1%"></i></span></td><td><span class="tabla-no">No, suelto</span></td></tr></tbody><tfoot><tr><td class="tabla-nota" colspan="4">Nota al pie de la tabla: de dónde salen los datos y cuándo se midieron.</td></tr></tfoot></table></div>';
    return '<h1 class="acento-lima">Tabla</h1><p class="m-entradilla">Marco con borde y radio de caja, cabecera gris en mayúsculas pequeñas, filas con aire, cifras a la derecha con su barrita y el estado como etiqueta verde o roja. La nota sobre los datos va dentro, como pie, en estilo nota. Sin cabecera sirve para listas de datos: la primera columna va en gris. Solo pesos de la casa: normal y negrita.</p>' + ejemplo(c + '<div style="width:100%;margin-top:16px"><table class="tabla"><tbody><tr><td>Redactado</td><td>Madre, 10-11-2026</td></tr><tr><td>Revisado</td><td>Frankie Gómez</td></tr></tbody></table></div>', 'tabla-marco · tabla · tabla-tarjetas · tabla-num · tabla-sec · tabla-si · tabla-no · tabla-barra');
  } };

  P.ventana = { grupo: 'Componentes', titulo: 'Ventana', html: function () {
    var c = '<div class="ventana" role="dialog" style="position:relative"><button type="button" class="ventana-cerrar">Cerrar</button><h2 class="ventana-titulo" style="margin-top:0">¿Eliminar esta plantilla?</h2><p class="ventana-texto">«Contrato de trabajo» se borrará y no se puede deshacer.</p><div class="ventana-botones"><button type="button" class="boton boton-principal">Cancelar</button><button type="button" class="boton boton-secundario">Eliminar</button></div></div>';
    return '<h1 class="acento-lima">Ventana</h1><p class="m-entradilla">Una sola para todo: velo noche, caja papel con radio y sombra de tarjeta, título en Syne 21 centrado, texto pequeño gris, botones de 160 en fila y centrados, equis arriba a la derecha. 480 de ancho; «ventana-ancha», 560, para formularios. Se cierra con la equis, con Escape o pulsando fuera.</p>' + ejemplo(c, 'ventana-velo › ventana (ventana-ancha) › ventana-cerrar · ventana-titulo · ventana-texto · ventana-botones');
  } };

  var orden = ['inicio', 'colorcomp', 'graficas', 'tipografia', 'reticula', 'espacios', 'radios', 'sombras', 'boton', 'campo', 'casilla', 'chip', 'acento', 'carrusel', 'tarjeta', 'tabla', 'ventana'];
  var menu = document.getElementById('m-menu'), pagina = document.getElementById('m-pagina');

  function pintaMenu(actual) {
    var g = '', h = '';
    orden.forEach(function (k) { if (P[k].grupo !== g) { g = P[k].grupo; h += '<h2>' + esc(g) + '</h2>'; } h += '<a href="#' + k + '"' + (k === actual ? ' aria-current="page"' : '') + '>' + esc(P[k].titulo) + '</a>'; });
    menu.innerHTML = h;
  }
  /* Modo «solo» (25-11-2026): ?solo=1 enseña un apartado sin cabecera ni índice, para verlo dentro de otra web (Madre lo usa en su Manual de diseño). */
  var solo = /[?&]solo=1/.test(location.search);
  if (solo) { document.documentElement.classList.add('m-solo'); }
  function ve() {
    var k = (location.hash || '#inicio').slice(1); if (!P[k]) { k = 'inicio'; }
    pintaMenu(k); pagina.innerHTML = P[k].html(); document.title = P[k].titulo + ' · Manual de Confirmsign';
    if (solo) { var ir = pagina.querySelectorAll('a[href^="#"]'); for (var i = 0; i < ir.length; i++) { ir[i].setAttribute('target', '_top'); ir[i].setAttribute('href', location.pathname + ir[i].getAttribute('href')); } }
    menu.classList.remove('abierto'); pagina.focus({ preventScroll: true }); window.scrollTo(0, 0);
  }
  document.querySelector('.m-menu-boton').addEventListener('click', function () { var a = menu.classList.toggle('abierto'); this.setAttribute('aria-expanded', a ? 'true' : 'false'); });
  window.addEventListener('hashchange', ve);
  if (document.readyState === 'complete') { ve(); } else { window.addEventListener('load', ve); }
})();
