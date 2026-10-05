# BlindRoute · sitio web

Navegación por voz dentro de edificios para personas con discapacidad visual. Proyecto final de 7.º Electrónica, ITS Villada. La web presenta la app del proyecto: que nos conozcan y, sobre todo, explicar y vender el producto. Dos páginas: principal (`/`) y contacto (`/contacto/`, a donde apunta el QR; su dirección no puede cambiar nunca).

Especificación original: `prompt-maestro-web.md` (los puntos 4, 5 y 6 fueron reemplazados por el pedido de rediseño). Herramientas disponibles: `setup-claude-code.md`.

## Alcance

- Se trabaja solo dentro de esta carpeta (`web`). Si aparecen archivos ajenos (p. ej. de Flutter), frenar y avisar.
- `_v1/` es la primera versión del sitio (reemplazada). Se puede borrar cuando se confirme el rediseño.
- `referencias/` tiene la presentación, el anteproyecto (PDF) y `taste/` con el análisis de linear.app, apple.com/accessibility y bemyeyes.com.
- `capturas/` son las capturas de verificación.

## Dirección de diseño ("el GPS de los lugares cerrados")

El motivo es el sonido. La página abre con el nombre ("BlindRoute" enorme) y debajo "El GPS de los lugares cerrados." (la analogía anterior, "un edificio que te habla", no gustó) El inicio es un campo de ondas que sale de un punto (vos) y "despierta" a los beacons a su paso, con una voz que da indicaciones como subtítulo. No se usa el ejemplo de la góndola ni el auricular (el equipo pidió sacarlos). La página no debe parecerse a la presentación: nada de tarjetas numeradas 01/02/03.

- **Inicio:** campo de ondas (SVG generado: cada beacon se enciende justo cuando la onda lo alcanza) + titular "El GPS de los lugares cerrados."
- **El problema:** texto corto + un diagrama animado (la señal del GPS choca contra el techo, adentro funcionan los beacons) y las cifras oficiales como lectura grande, separadas por filetes, sin cajas.
- **Cómo funciona:** una sola escena fija que cambia con el scroll en tres momentos (beacons → la app te ubica → una voz te lleva). Botón "Escuchar" con la voz del navegador, solo al tocarlo.
- **Un ejemplo:** escena en perspectiva hecha con CSS 3D (sin librerías): una terminal con estantes con volumen, beacons que laten, una persona que camina la ruta (con `transform`, ver la sección de la escena 3D) y cuatro fases que se iluminan en sincronía. Tiene botón de pausa y, con movimiento reducido, queda en el estado final. Las indicaciones en texto son el equivalente accesible.
- **Para tu lugar:** tres ventajas pensadas para quien administra el lugar (ver reglas).
- **Preguntas:** acordeón con `<details>` (funciona sin JavaScript).
- **Quién lo instala:** dos tarjetas con ilustración. **Dónde:** lista grande con ícono y punto que late. **Quiénes somos:** línea de tiempo (consigna, probamos, escuchamos, el problema) + ficha tipo hoja de datos (personalidad de Electrónica).
- **Pulido:** barra verde de avance bajo el encabezado, transparencias con alternativa (`prefers-reduced-transparency`), `prefers-contrast`, y los títulos de las secciones aterrizan justo debajo del encabezado (`scroll-margin-top` negativo para descontar el relleno).
- Marca que se conserva: paleta y las dos tipografías. Referencias de principios: Linear (filetes de 1px, jerarquía), Apple Accessibility (una situación humana por tarjeta), Be My Eyes (frases cortas, calidez).
- `index.html` se generó con un script que inserta el campo de ondas; es HTML estático normal y se edita a mano. Si se quiere regenerar el campo, hay que repetir el cálculo: tiempo de encendido de cada beacon = (distancia / radio × 4,8 s) mod 1,6 s.

## Stack y estructura

Sitio estático sin build. HTML, CSS y un JS chico. Rutas relativas siempre.

```
index.html                 principal
contacto/index.html        contacto (QR)
assets/css/site.css        todos los estilos (tokens al inicio)
assets/js/site.js          encabezado fijo, escena de 'cómo funciona', revelado, botón que habla
assets/fonts/              Sora 600/800, IBM Plex Sans 400/600 (woff2, latín)
assets/img/                favicon.svg, apple-touch-icon.png (180×180, rehecho desde el favicon), og.png
```

Comandos: servir con `python -m http.server 8080 --bind 127.0.0.1` desde `web` (sin `--bind`, cualquiera en la red local ve la carpeta entera). Al cambiar `site.css` o `site.js`, subir el `?v=` de los enlaces en las dos páginas para que el navegador no use la versión vieja.

## Sistema

- Colores: `#0D1117` fondo, `#05070A` profundo, `#161B22` tarjeta, `#21262D` elevada, `#2A313B` línea, `#fff` título, `#E6EDF3` párrafo, `#9BA5B4` secundario, `#3B82F6` acento, `#00D97E` verde (ruta, voz, positivo). El rojo `#B71C1C` no se usa como color de texto. En botones de acento, texto `#0D1117`.
- Espaciado: escala de 4 (`--s1` a `--s9`). Tipografía: `--fs-xs` a `--fs-hero`, fluida con `clamp()`.
- Movimiento: entradas de 0,6 a 0,8 s con `cubic-bezier(.2,.8,.2,1)`; interacciones menores a 200 ms. Todo dentro de `prefers-reduced-motion: no-preference`; con movimiento reducido el camino queda lleno y estático y la ruta del mapa, dibujada.
- Cada elemento interactivo tiene reposo, hover (solo `hover:hover`), foco (`:focus-visible`) y presionado.
- Transición entre páginas con `@view-transition`; el pin del encabezado se transforma en el de contacto.
- Probado con texto al 200 % en 320 px sin desbordes (títulos con `overflow-wrap:anywhere`, grillas con `minmax(0,1fr)`, encabezado que puede pasar a dos líneas).
- Cuidado con los nombres de clase: `.in` y `.paso`/`.activo` los usa el JavaScript; los contenedores usan `.caja`.

## Reglas

- Español rioplatense con voseo, a una persona, frases cortas, sin lenguaje de venta ni signos de exclamación.
- Solo contenido real: no inventar anécdotas, logros, pruebas, clientes ni testimonios. Los textos salen de lo que contó el equipo y del anteproyecto.
- Cifras oficiales con redacción y fuente exactas: INDEC 2018 (casi 900.000; unas 32.000 no pueden ver) y ANDIS nov. 2023 (80.838). Una junto a la otra, sin porcentajes entre ellas. No usar los 2.000.000 ni el 4,3 % / 40 % / 20-80 % del anteproyecto (son preliminares y erróneos).
- No nombrar a las personas entrevistadas ni citar lo que dijeron sin su acuerdo. No nombrar competidores. No publicar costos ni funcionamiento nuevo sin confirmar.
- Sección "Para tu lugar" (ventas): los tres datos salen del anteproyecto (funciona sin internet: §6.2; sin modificaciones invasivas: §1; usuario final sin costo y cliente = el lugar: §8.1). Confirmar con el equipo que siguen vigentes antes de publicar. No agregar costos.
- Textos que escribió Claude y esperan aprobación: eslogan "El GPS de los lugares cerrados.", "Afuera hay GPS. Adentro, no.", "Llegar a la terminal 4." (el escenario de la terminal es ilustrativo), la analogía de Córdoba, las cinco preguntas con sus respuestas y "Si administrás un lugar, hablemos."
- Terminología: no usar "ciego", "ciega" ni sus plurales. Decir "personas con discapacidad visual". Las cifras oficiales conservan su redacción exacta ("mucha dificultad para ver o no pueden ver").
- Marca: en el logo, "Blind" va en blanco y "Route" en celeste (`--celeste: #4DA6FF`, clase `.marca-r`). Se aplica en el encabezado, el `h1` del inicio y la página de contacto.
- Indicaciones de la voz: los giros se dicen solos ("Girá a la derecha"), sin distancia. Las distancias solo acompañan a "Seguí derecho".
- Analogía de Córdoba (sección El problema): "Casi 900.000 personas son más de la mitad de la ciudad de Córdoba", con 100 puntos y 60 encendidos (cada punto, unas 15.000 personas). Usa "alrededor de 1,5 millones de habitantes (INDEC, Censo 2022)" y aclara que es una comparación ilustrativa entre fuentes y años distintos.
- Accesibilidad WCAG 2.2 AA: un `h1` por página, encabezados en orden, regiones con nombre, enlace para saltar al contenido, foco visible, objetivos táctiles de 48 px o más, decorativos con `aria-hidden`.
- El contenido se lee completo sin JavaScript.
- No generar el QR hasta tener el dominio. No hay formulario de contacto.

## Pendientes

| Dato | Estado | Dónde se carga |
|---|---|---|
| Email, WhatsApp y redes | Sin publicar | `contacto/index.html`, bloque `DATOS DE CONTACTO` |
| Guardar contacto (.vcf) | Botón oculto | `contacto/blindroute.vcf` + quitar `hidden` al `<div class="guardar">` |
| Nombres completos y roles | Solo apellidos | `index.html` (sección Quiénes somos) y `contacto/index.html` |
| Estado del proyecto | No se menciona | `index.html`, sección Quiénes somos |
| Dominio y hosting | Sin definir | `og:url`, `og:image` (URL absoluta de `assets/img/og.png`) y `<link rel="canonical">` en ambas páginas |
| Código QR | No generar hasta tener dominio | Apunta a `<dominio>/contacto/` |
| Fotos reales | No hay | Dejar en `assets/originales/` y usarlas |
| Acuerdo de las personas entrevistadas | Sin consultar | Antes de nombrarlas o citarlas |
| Prueba con TalkBack / VoiceOver | No automatizable | Hacerla en un teléfono real |
| Población de Córdoba (analogía) | "Alrededor de 1,5 millones", sin verificar contra el informe del Censo 2022 | `index.html`, bloque `.cba` (frase y fuente) |

### Cómo cargar los datos de contacto

1. Abrí `contacto/index.html` y buscá el comentario `DATOS DE CONTACTO`.
2. En cada `<li>` que vayas a publicar: reemplazá `COMPLETAR` en el `href` y en `<span class="v">`, y borrá el atributo `hidden` del `<li>`. Ejemplos de `href`: `mailto:correo@dominio.com`, `https://wa.me/549XXXXXXXXXX` (solo dígitos, con código de país), `https://www.instagram.com/usuario`.
3. Para otra red, copiá un `<li>`, cambiá el nombre y el ícono (los íconos están en el `<svg>` del inicio de la página).
4. Cuando hay al menos un medio visible, el mensaje "disponibles pronto" se oculta solo.
5. Guardar contacto: creá `contacto/blindroute.vcf` (UTF-8, saltos de línea CRLF) con este contenido y tus datos reales, y borrá `hidden` del `<div class="guardar">`:

```
BEGIN:VCARD
VERSION:3.0
FN:BlindRoute
ORG:BlindRoute;ITS Villada · 7.º Electrónica
EMAIL;TYPE=INTERNET:correo@dominio.com
TEL;TYPE=CELL:+549XXXXXXXXXX
URL:https://dominio.com/
NOTE:Navegación por voz dentro de edificios.
END:VCARD
```

6. Probá en el celular: tocar cada enlace y descargar el `.vcf`.

## Escena 3D de "Llegar a la terminal 4" (`.rec3d`)

- Es un piso de 400×400 (`.mundo`) inclinado con `perspective() scale(--k) rotateX(50deg) rotateZ(-40deg)`. La perspectiva va dentro del propio `transform` y escala con `--k`, así el dibujo crece parejo en cualquier ancho. `.mundo` está centrado de forma absoluta en `.vista` (no con grid: la caja de 400 px no entra en celular y la grilla la pegaba arriba a la izquierda). `--k` cambia por ancho de pantalla y `--dx`/`--dy` corrigen unos píxeles el centrado. Si se cambia la escala o la inclinación, volver a medir que el dibujo quede centrado en 320, 390, 768 y 1440 px. Los bloques (`.caja3`) usan `--x --y --w --d --h` y tres caras con degradé más una sombra sobre el piso (`::before`). Para más volumen se suben los `--h` en `index.html`.
- La secuencia la maneja `assets/js/site.js` (`aplicar(t)`). La persona se mueve con `transform: translate3d`, no con `offset-path`. La ruta es de dos tramos rectos: si se cambia el recorrido, hay que cambiar `TRAMO1`, `LARGO` y las coordenadas del `<path>` a la vez.
- Mientras camina, `.rec3d.camina` activa un paso de 0.48 s (`@keyframes paso`). Cuando la escena no está en pantalla, pierde la clase `en-vista` y sus animaciones infinitas se pausan.
- Con `prefers-reduced-motion: reduce` queda el estado final, quieto, y los textos de las cuatro fases siguen visibles.
- Todo lo que se anima en la escena es `transform` u `opacity`. No animar `box-shadow` ni variables CSS del padre.
