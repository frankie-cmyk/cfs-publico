# Madre (m-cfs.us) unificada al manual

Madre carga `manual/estilos/cfs-tokens.css` (desde https://www.m-cfs.us/manual/estilos/cfs-tokens.css) antes de su hoja de la casa, y sus colores salen de esos valores. El modo noche de Madre sigue funcionando: cambia las mismas variables de Madre por encima.

## Tanda 1 · colores (25-11-2026, CAMBIALO de Frankie)

| Variable de Madre | Valor del manual | Antes |
|---|---|---|
| --cfs-color-titulo, --cfs-marino, --cfs-noir | --ttk-texto-oscuro | #001524 |
| --cfs-color-texto, --cfs-tinta | --ttk-texto-titular | #262626 y #222 |
| --cfs-color-texto2, --cfs-gris-texto, --cfs-text | --ttk-texto-gris | #736d66 |
| --cfs-color-etiqueta | --ttk-etiqueta-pastilla | #5d6673 |
| --cfs-color-enlace, --cfs-navy | --ttk-texto-enlace | #023453 |
| --cfs-color-accion | --ttk-paleta-rojo-800 | #c8102e |
| --cfs-color-acento, --cfs-lime | --ttk-paleta-lima-800 | #dbe64c |
| --cfs-color-luz | --ttk-paleta-lima-200 | #f6f9b0 |
| --cfs-color-borde, --cfs-color-borde-claro, --cfs-borde-suave, --cfs-line | --ttk-linea-clara | #dedbd7, #ececec, #e6e6e6 |
| --cfs-borde-pastilla | --ttk-linea-gris | #c9cfd8 |
| --cfs-color-fondo | --ttk-fondo-blanco | #fff |
| --cfs-color-fondo2, --cfs-fondo-suave, --cfs-fondo-sello, --cfs-aside | --ttk-fondo-gris-claro | #f4f6f9, #fafafa, #edeff2 |
| --cfs-color-crema, --cfs-cream | --ttk-fondo-crema-menu | #f9efe3 |
| --cfs-green | --ttk-paleta-verde-600 | #4caf50 |
| --cfs-green-d | --ttk-paleta-verde-800 | #357a38 |

Letras: ya eran las del nexo (Poppins, Syne y Georgia, con los mismos tamaños). Quedan para las tandas siguientes: radios, sombras con nombre propio, piezas y plantillas, y los colores escritos a mano dentro de otras piezas de Madre.

Dónde está en Madre: fragmento 670 «[M00 Estilos de la casa]» (copia previa: 980).

## Tanda 2 · radios y sombras (25-11-2026)

| Variable de Madre | Valor del manual | Antes |
|---|---|---|
| --cfs-radio-peque | --ttk-radio-pequeno (4) | 8 |
| --cfs-radio-tarjeta | --ttk-radio-tarjeta (4) | 12 |
| --cfs-radio-caja | --ttk-radio-caja (8) | 10 |
| --cfs-radio-pastilla | --ttk-radio-pildora | 999 |
| --cfs-sombra-suave | --ttk-sombra-tarjeta | mismo valor |
| --cfs-sombra-alzada | --ttk-sombra-flotante | mismo valor |

Fragmento 670 (copia previa: 981). Quedan los radios y sombras escritos a mano dentro de otras piezas de Madre.

## Tanda 3 · botones (25-11-2026)

| Botón de Madre | Antes | Ahora (manual) |
|---|---|---|
| Principal | marino, píldora, negrita | --ttk-boton-principal-claro (verde), radio 4, alto 40, mayúsculas |
| Principal al pasar | lima | --ttk-boton-pasar-claro |
| Secundario | blanco, borde gris, píldora | borde --ttk-boton-secundario-claro, transparente, mismas medidas |
| Enviar de Help (.cfs-hp-env) | — | --ttk-boton-enviar (rojo) |
| Modo noche, principal | igual que de día | --ttk-boton-principal-oscuro |

Se añadieron a «secundario» .cfs-hp-otra y .cfs-ch-nueva. Fragmento 444 «[M41 Piezas comunes]» (copia previa: 982). Quedan pastillas, campos y chips.

Botones sueltos pasados al común (25-11-2026, 19:16): «Recargar la página» y «Sí, actualizar» como principales; «Cerrar», «Ahora no» y «Solicitar búsqueda» (Panic) como secundarios; el botón de elegir archivo, como secundario. Copia previa del 444: 983. Revisadas Pendientes, Vacaciones, Inventario, Claves, Log y Certificaciones: no quedan botones con estilo propio; lo que queda son etiquetas, tarjetas y flechas (tandas siguientes).

## Tanda 4 · letras (25-11-2026)

Mismas cuatro letras que nexoTTK: Syne (títulos), Georgia cursiva (coletillas), Poppins (texto) y Courier New (código). Tamaños igualados con CAMBIALO: H1 34, H2 21, H3 18, título de tarjeta Poppins negrita 16, párrafo 16, nota 10. El botón «Actualizar esta ficha» dejó de ir en Arial. Ficha «1. Fuentes» de Madre con alfabetos y valores leídos en vivo. Fragmentos 670 (copias previas 984, 985, 989), 689 (986, 988) y 444 (987).

## Tanda 5 · tabla (25-11-2026)

Componente nuevo del manual: Tabla (no existía en nexoTTK). En Madre todas las tablas ordenables (cfs-tabla-ord) lo usan: marco, cabecera gris en mayúsculas, filas con aire, cifras a la derecha con barrita y estado como etiqueta verde o roja. Equivalencias: tabla → cfs-tabla-ord, tabla-num → cfs-tnum, tabla-sec/si/no/barra → cfs-tabla-sec/si/no/barra. Fragmentos 670 (copia previa 990) y 689 (991); botón «Medir ahora» al principal en 444.
