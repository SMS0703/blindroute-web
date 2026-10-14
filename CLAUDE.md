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

- **Inicio** (variante "Interfaz", elegida con prototipos): texto alineado a la izquierda y, arriba (en celular) o a la derecha (en compu), el campo de ondas (SVG generado: cada beacon se enciende justo cuando la onda lo alcanza) con un aviso estilo iOS (`.noti`) que alterna "Seguí derecho / Girá a la derecha / Llegaste". Botones: "Contacto" (píldora azul) y el enlace "Cómo funciona ›" (`.mas`).
- **El problema:** texto corto + un diagrama animado (la señal del GPS choca contra el techo, adentro funcionan los beacons) y las cifras oficiales como lectura grande, separadas por filetes, sin cajas.
- **Cómo funciona:** una sola escena fija que cambia con el scroll en tres momentos (beacons → la app te ubica → una voz te lleva). Botón "Escuchar" con la voz del navegador, solo al tocarlo.
- **Un ejemplo:** escena en perspectiva hecha con CSS 3D (sin librerías): una terminal con estantes con volumen, beacons que laten, una persona que camina la ruta (con `transform`, ver la sección de la escena 3D) y cuatro fases que se iluminan en sincronía. Tiene botón de pausa y, con movimiento reducido, queda en el estado final. Las indicaciones en texto son el equivalente accesible.
- **Para establecimientos** (id `#para-tu-lugar`): dos ventajas pensadas para quien administra el lugar (ver reglas).
- **Preguntas:** acordeón con `<details>` (funciona sin JavaScript).
- **Quién lo instala:** dos tarjetas con ilustración. **Dónde:** lista grande con ícono y punto que late. **Quiénes somos:** línea de tiempo (consigna, escuchamos, el problema, buscamos) + ficha tipo hoja de datos (personalidad de Electrónica).
- **Pulido:** barra verde de avance bajo el encabezado, transparencias con alternativa (`prefers-reduced-transparency`), `prefers-contrast`, y los títulos de las secciones aterrizan justo debajo del encabezado (`scroll-margin-top` negativo para descontar el relleno).
- Estética Apple sobre la base oscura: fondo negro, tarjetas `#1c1c1e` sin borde y con esquinas grandes, botones en píldora, encabezado de vidrio esmerilado, mucho aire entre secciones.
- Tipografía: Alegreya Sans (Huerta Tipográfica, Argentina) 400/500/700 en todo el sitio, elegida en una ronda de prototipos. Tiene números de estilo antiguo por defecto: el `body` fuerza `lining-nums`. Los antetítulos van en azul, en la misma fuente (sin mayúsculas ni monoespaciada). Los títulos van en un solo color; el verde queda para el eslogan del inicio, la voz y la ruta.
- Referencias de principios: Linear (filetes de 1px, jerarquía), Apple Accessibility (una situación humana por tarjeta), Be My Eyes (frases cortas, calidez).
- `index.html` se generó con un script que inserta el campo de ondas; es HTML estático normal y se edita a mano. Si se quiere regenerar el campo, hay que repetir el cálculo: tiempo de encendido de cada beacon = (distancia / radio × 4,8 s) mod 1,6 s.

## Stack y estructura

Sitio estático sin build. HTML, CSS y un JS chico. Rutas relativas siempre.

```
index.html                 principal
contacto/index.html        contacto (QR)
assets/css/site.css        todos los estilos (tokens al inicio)
assets/js/site.js          encabezado fijo, escena de 'cómo funciona', revelado, botón que habla
assets/js/contacto.js      formulario de consultas de /contacto/ (solo esa página)
api/contacto.js            función de Vercel: recibe las consultas y las manda por mail con Resend
assets/fonts/              Alegreya Sans 400/500/700 (woff2, latín)
assets/img/                favicon.svg, apple-touch-icon.png (180×180, rehecho desde el favicon), og.png
```

Comandos: servir con `python -m http.server 8080 --bind 127.0.0.1` desde `web` (sin `--bind`, cualquiera en la red local ve la carpeta entera). Al cambiar `site.css` o `site.js`, subir el `?v=` de los enlaces en las dos páginas para que el navegador no use la versión vieja.

## Sistema

- Colores (oscuros de Apple): `#000` fondo, `#0b0b0c` profundo (cierre y pie), `#1c1c1e` tarjeta, `#2c2c2e` elevada, `#38383a` línea, `#f5f5f7` título, `#a1a1a6` párrafo, `#86868b` secundario, `#2997ff` acento (enlaces, íconos, antetítulos, foco), `#0071e3` botón (texto blanco, 4,7:1; el hover oscurece a `#0066d9` para no bajar de 4,5:1), `#30d158` verde (ruta, voz, positivo). Error del formulario `#ff6961`. El rojo `#B71C1C` no se usa como color de texto.
- Espaciado: escala de 4 (`--s1` a `--s9`). Tipografía: `--fs-xs` a `--fs-hero`, fluida con `clamp()`.
- Movimiento: entradas de 0,7 a 0,9 s con `cubic-bezier(.23,1,.32,1)` (`--ease`); interacciones de 160 a 200 ms; al presionar, `scale(.97)`. Las preguntas se abren con animación de altura (`::details-content` + `interpolate-size`), donde el navegador lo soporta. Todo dentro de `prefers-reduced-motion: no-preference`; con movimiento reducido el camino queda lleno y estático y la ruta del mapa, dibujada.
- Cada elemento interactivo tiene reposo, hover (solo `hover:hover`), foco (`:focus-visible`) y presionado.
- Transición entre páginas con `@view-transition`; el pin del encabezado se transforma en el de contacto.
- Probado con texto al 200 % en 320 px sin desbordes (títulos con `overflow-wrap:anywhere`, grillas con `minmax(0,1fr)`, encabezado que puede pasar a dos líneas).
- Cuidado con los nombres de clase: `.in` y `.paso`/`.activo` los usa el JavaScript; los contenedores usan `.caja`.

## Reglas

- Tono informativo y general, en tercera persona: la página describe el producto ("la persona", "el lugar"), no le habla al lector con "vos" ni en imperativo. Botones neutros ("Contacto", "Enviar pregunta"). Frases cortas, sin lenguaje de venta ni signos de exclamación. Excepción: las indicaciones de la voz de la app ("Seguí derecho", "Girá a la derecha", "Llegaste") son citas del producto y se mantienen.
- Solo contenido real: no inventar anécdotas, logros, pruebas, clientes ni testimonios. Los textos salen de lo que contó el equipo y del anteproyecto.
- Cifras oficiales con redacción y fuente exactas: INDEC 2018 (casi 900.000; unas 32.000 no pueden ver) y ANDIS nov. 2023 (80.838). Una junto a la otra, sin porcentajes entre ellas. No usar los 2.000.000 ni el 4,3 % / 40 % / 20-80 % del anteproyecto (son preliminares y erróneos).
- No nombrar a las personas entrevistadas ni citar lo que dijeron sin su acuerdo. No nombrar competidores. No publicar costos ni funcionamiento nuevo sin confirmar.
- Sección "Para establecimientos": dos datos del anteproyecto (sin modificaciones invasivas: §1; usuario final sin costo y cliente = el lugar: §8.1). Confirmar con el equipo que siguen vigentes. No agregar costos.
- No afirmar que funciona sin internet (desde las últimas versiones descarga los mapas de la nube) ni que el celular puede ir en el bolsillo (no está probado qué tan bien anda la brújula así).
- Textos que escribió Claude y esperan aprobación: eslogan "El GPS de los lugares cerrados.", "Afuera hay GPS. Adentro, no.", "Llegar a la terminal 4." (el escenario de la terminal es ilustrativo), las tres preguntas con sus respuestas y "Instalarlo en un lugar empieza con una consulta."
- Terminología: no usar "ciego", "ciega" ni sus plurales. Decir "personas con discapacidad visual". Las cifras oficiales conservan su redacción exacta ("mucha dificultad para ver o no pueden ver").
- Marca: en el logo, "Blind" va en blanco y "Route" en celeste (`--celeste: #4DA6FF`, clase `.marca-r`). Se aplica en el encabezado, el `h1` del inicio y la página de contacto.
- Indicaciones de la voz: los giros se dicen solos ("Girá a la derecha"), sin distancia. Las distancias solo acompañan a "Seguí derecho".
- No revelar cómo funciona la tecnología: hablar de "tecnología propia", "una red de referencia discreta" o "un equipamiento compacto", nunca de beacons, Bluetooth, señales, cantidad de dispositivos ni cálculos. Los nombres de clases del código pueden seguir diciendo "beacon"; los textos visibles y las etiquetas `aria-label`, no.
- Sin comentarios en los archivos publicados (HTML, CSS y JS de `assets/`): todo se ve con "Inspeccionar". Las notas van en este archivo, que no se publica.
- Accesibilidad WCAG 2.2 AA: un `h1` por página, encabezados en orden, regiones con nombre, enlace para saltar al contenido, foco visible, objetivos táctiles de 48 px o más, decorativos con `aria-hidden`.
- El contenido se lee completo sin JavaScript.
- No generar el QR hasta tener el dominio.

## Formulario de consultas (`/contacto/`)

- Las consultas se envían a `api/contacto.js`, una función de Vercel que manda el mail con Resend. El mail de destino y la clave no están en el código: van en variables de entorno.
- Mientras la función no esté configurada, la página oculta el formulario (pregunta `GET /api/contacto/` → `{ listo }`). Sin JavaScript, el formulario se envía igual y la función responde con una página simple.
- Protección contra robots: campo trampa `web`, invisible para las personas. Límites: nombre 80, email 120 y mensaje 2000 caracteres.
- El mail llega con "responder a" el email de quien preguntó, así que se contesta directo desde el correo.

### Cómo activarlo

1. Crear una cuenta gratis en resend.com con el mail que va a recibir las consultas.
2. En Resend, crear una API key (permiso "Sending access").
3. En Vercel → el proyecto → Settings → Environment Variables, cargar:
   - `RESEND_API_KEY`: la clave del paso 2.
   - `CONTACTO_EMAIL`: el mail que recibe las consultas (el mismo de la cuenta de Resend).
4. Volver a desplegar (Deployments → Redeploy) para que tome las variables.
5. Probar desde el celular: mandar una pregunta y verificar que llegue.

Sin dominio propio verificado en Resend, el remitente es `onboarding@resend.dev` y solo puede enviar al mail de la cuenta de Resend. Con dominio propio: verificarlo en Resend y agregar `CONTACTO_REMITENTE` (por ejemplo `BlindRoute <consultas@dominio.com>`).

## Pendientes

| Dato | Estado | Dónde se carga |
|---|---|---|
| Email | Oculto: la cuenta blindrouteitsv@gmail.com está inhabilitada (apelación en curso). El formulario sigue: las consultas quedan en Resend → Emails | Volver a poner el `<li>` de abajo en la lista `.medios` y la línea `EMAIL;TYPE=INTERNET:blindrouteitsv@gmail.com` en `contacto/blindroute.vcf` |
| Instagram | Publicado: @blindroute_ | `contacto/index.html`, bloque `DATOS DE CONTACTO` |
| WhatsApp | Sin publicar (falta el número) | Agregar el `<li>` de abajo a la lista `.medios` |
| Guardar contacto (.vcf) | Publicado, con el mail y la dirección de Vercel | `contacto/blindroute.vcf` (sumar el teléfono cuando esté) |
| Nombres completos y roles | Solo apellidos | `index.html` (sección Quiénes somos) y `contacto/index.html` |
| Estado del proyecto | No se menciona | `index.html`, sección Quiénes somos |
| Dominio y hosting | Sin definir | `og:url`, `og:image` (URL absoluta de `assets/img/og.png`) y `<link rel="canonical">` en ambas páginas |
| Código QR | No generar hasta tener dominio | Apunta a `<dominio>/contacto/` |
| Fotos reales | No hay | Dejar en `assets/originales/` y usarlas |
| Acuerdo de las personas entrevistadas | Sin consultar | Antes de nombrarlas o citarlas |
| Prueba con TalkBack / VoiceOver | No automatizable | Hacerla en un teléfono real |
| Envío de consultas | Formulario oculto hasta configurar | Cuenta de Resend y variables `RESEND_API_KEY` y `CONTACTO_EMAIL` en Vercel (ver "Formulario de consultas") |

### Cómo cargar los datos de contacto

1. Abrí `contacto/index.html` y buscá la lista `<ul class="medios">` (no hay comentarios en el HTML publicado). Para sumar un medio, pegá su `<li>`:

```html
<li data-medio="email">
  <a class="medio" href="mailto:blindrouteitsv@gmail.com">
    <svg class="ico" aria-hidden="true"><use href="#i-mail"/></svg>
    <span><small>Email</small><span class="v">blindrouteitsv@gmail.com</span></span>
  </a>
</li>
<li data-medio="whatsapp">
  <a class="medio" href="https://wa.me/549XXXXXXXXXX">
    <svg class="ico" aria-hidden="true"><use href="#i-whatsapp"/></svg>
    <span><small>WhatsApp</small><span class="v">+54 9 XXX XXX-XXXX</span></span>
  </a>
</li>
```
2. Reemplazá el número o el usuario en el `href` y en `<span class="v">`. Ejemplos de `href`: `mailto:correo@dominio.com`, `https://wa.me/549XXXXXXXXXX` (solo dígitos, con código de país), `https://www.instagram.com/usuario`.
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
- `.vista` lleva `pointer-events:none` y `overflow:hidden`. No sacarlos: en celular el navegador proyectaba la zona de toque de la marca de destino (elemento 3D) sobre los botones del inicio y los dejaba sin funcionar después de hacer scroll.
- En `/contacto/`, el logo (`.brand.marca-c`) es un enlace a la página principal y lleva el `view-transition-name: marca`. No repetir ese nombre en otro elemento de la misma página: se cancela la transición.
