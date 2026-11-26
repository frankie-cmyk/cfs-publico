# Correctores de los entornos (26-11-2026)

Lo que Madre y nexoTTK usan para llevar a la escala del manual lo que no viene del manual (estilos de plugins, de la plantilla y de Tatanka). No llevan medidas propias: leen cfs-tokens.css.

- remate-del-manual.js: se carga en el navegador de Madre y de nexoTTK; lee las variables --ttk-… de la página y ajusta espacios, radios, sombras, tamaño e interlineado de letra y la gama de las gráficas.
- madre-correctores.php.txt: el mismo trabajo en las hojas de estilo de Madre (fragmento 1096), leyendo cfs-tokens.css.
- nexo-correctores.php.txt: el mismo trabajo en las hojas del nexo (motor, fragmento 735), leyendo cfs-tokens.css de m-cfs.us/manual con una hora de memoria.

## Una sola copia (26-11-2026)

- `remate-del-manual.js` es la única copia del remate. Madre lo carga de aquí (fragmento 1096) y nexoTTK también (nexo.js). Si se cambia aquí, cambia en los dos.
- La regla de colores de las gráficas es `orden()` de este archivo (`window.cfsManual.orden`): fechas, la más reciente en el color 1; si no, la más grande. El motor de gráficas de Madre (fragmento 52) la usa de aquí.
- Única excepción: el servidor de Madre tiene un espejo de esa regla en PHP (`cfs_graf_tiempo` y `cfs_graf_rango`, fragmento 52), porque el servidor no puede leer este archivo. Si se cambia la regla, se cambia aquí y allí.

## Reflejos de las webs (26-11-2026)

La norma (Frankie): se unifica en las webs y en GitHub y en los Sketch queda el reflejo, con un solo estilo en todos los sitios. Copias de lo que adapta cada web a las piezas del manual:

- `madre-piezas-del-manual.php.txt` — fragmento 1127 de Madre: Chip, Menú, Botón de icono y Pestaña lateral en las piezas propias de Madre.
- `madre-fundamentos-en-correos-entrada-escritorio.php.txt` — fragmento 1125: Fundamentos en correos, pantalla de entrada y escritorio.
- `madre-muestra-de-graficas.php.txt` — fragmento 1124: la muestra de gráficas de Madre que enseña el manual.
- `madre-campos-del-manual.php.txt` — fragmento 1128: Campo y Selector del manual en todas las cajas y desplegables de Madre.
- `madre-opciones-archivo-casillas.php.txt` — fragmento 1129: opciones (Chip), subir archivo y casillas del manual en Madre.
- `madre-piezas-en-fragmentos-antiguos.css.txt` — fragmentos 165, 205, 61 y 33: la parte de su estilo que usa piezas del manual (acento lima fino, botón secundario, chip elegido).
- `nexo.css.txt` — nexo.css de nexoTTK.
- `nexo-ficha.css.txt` y `nexo-fotos.css.txt` — los estilos de las fichas y del visor de fotos de nexoTTK.
- Desde el 27-11-2026 los estilos de nexoTTK no llevan valores escritos a mano: todo sale de cfs-tokens.css, y las medidas propias de nexoTTK (anchos de columnas, tarjetas, iconos) tienen nombre en el bloque «Medidas propias de esta capa» al principio de cada archivo.
- Madre (27-11-2026): sus fragmentos ya no llevan valores escritos a mano en sus estilos; las medidas propias de cada fragmento tienen nombre (--m<número>-…) al principio de su estilo. Quedan con valores a mano, a propósito, los correos y los PDF (los programas de correo no entienden los valores con nombre) y los cortes de pantalla (767, 1023…), que no admiten nombre.
- `madre-medidas-sueltas.php.txt` — fragmento 1225 [M0 Medidas]: las medidas propias de piezas sueltas de Madre, con nombre, en un solo sitio.

Cuando cambia una de esas piezas en la web, se vuelve a copiar aquí.
