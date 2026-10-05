# Prompt maestro: sitio web de BlindRoute

## 0. Datos pendientes (no los pidas, dejalos preparados)

Hay datos que todavía no tenemos y que vamos a cargar más adelante. No frenes ni preguntes por ellos, y no los inventes. Construí el sitio completo sin ellos y dejá cada uno fácil de agregar después:

| Dato pendiente | Qué hacer por ahora |
|---|---|
| Email, WhatsApp y redes de contacto | Página de contacto armada y sin datos publicados, como explica el punto 4. |
| Nombres completos y roles del equipo | Usá solo los apellidos, como en la presentación: "Giraudo · Apra · Cantarelli · Moesch". Sin roles. |
| Estado actual del proyecto | No lo menciones. |
| Dominio y hosting | No publiques nada. Usá rutas relativas para que el sitio funcione en cualquier dominio o subcarpeta. |
| Fotos o capturas reales | No hay. No uses fotos de banco de imágenes: resolvé con ilustración y animación en SVG. |
| Sitio de referencia para `/taste` | No hay. No uses `/taste` por ahora. |

En `CLAUDE.md` dejá una sección "Pendientes" con esta lista y, para cada dato, en qué archivo y en qué lugar se carga.

## 1. Tarea

Actuá como diseñador y desarrollador web. Quiero el sitio de BlindRoute, con dos páginas:

- La página principal, con scroll, que presenta el proyecto.
- Una página de contacto separada, con dirección propia: `/contacto/`. A esa dirección va a apuntar el QR.

## 2. El proyecto

BlindRoute es un sistema de orientación y navegación en interiores para personas ciegas o con baja visión. Tiene tres piezas:

- Beacons Bluetooth instalados en el edificio, que permiten ubicar a la persona sin GPS.
- Una app que calcula la posición y la ruta, y la dicta por voz en tiempo real.
- Un auricular de un solo oído, para que el otro siga escuchando el entorno.

Funciona como servicio: el establecimiento adquiere el equipamiento y la licencia, y la persona solo llega, abre la app y se mueve. Es el proyecto final de 7.º año de Electrónica del ITS Villada.

## 3. Para qué es el sitio y quién llega

La página de contacto va a estar enlazada desde un código QR impreso en una tarjeta de presentación. Quien llega acaba de conocer al equipo en una feria, una exposición o una reunión, escanea la tarjeta con el celular y entra directo a `/contacto/` con datos móviles, sin pasar por la página principal. En pocos segundos tiene que poder contactarnos o guardar el contacto, y si quiere saber más, pasar a la página principal con un toque.

Llegan tres tipos de personas:

- Responsables de establecimientos (shoppings, hospitales, aeropuertos, supermercados, terminales) que podrían instalarlo.
- Jurados, docentes, empresas y organizaciones que evalúan o apoyan el proyecto.
- Personas ciegas o con baja visión, que navegan con lector de pantalla.

De eso salen cinco decisiones que no son negociables:

- El diseño se piensa primero para celular. El escritorio es la adaptación.
- La página de contacto tiene que entenderse sola, porque es la puerta de entrada desde el QR: quiénes somos en una línea, cómo contactarnos y un enlace a la página principal. Su dirección `/contacto/` no puede cambiar nunca, porque va a estar impresa.
- Desde la página principal, el contacto tiene que estar a un toque desde la primera pantalla.
- Las dos páginas tienen que ser livianas, porque se abren con datos móviles. La de contacto, más todavía.
- Tiene que funcionar bien con lector de pantalla. Un sitio sobre accesibilidad que no es accesible pierde toda credibilidad.

## 4. Contenido

Usá estos textos tal cual, que son los del proyecto. Nada de lorem ipsum. Donde falte un texto corto (botones, etiquetas, el título de contacto), escribilo en el mismo tono y listalo en el reporte final para que lo aprobemos.

**Página principal**

1. **Inicio.** "BlindRoute". "Orientación y navegación dentro de espacios cerrados." "Por voz · en tiempo real · sin GPS". Acción principal: ir a la página de contacto. Acción secundaria: ver cómo funciona.
2. **El problema.** "Ahora imaginen un lugar completamente desconocido. No parece tan fácil, ¿no?" Después van dos datos oficiales, cada uno con su fuente al pie:
   - "En Argentina, casi 900.000 personas tienen mucha dificultad para ver o no pueden ver." Texto de apoyo: "Unas 32.000 no pueden ver." Fuente: INDEC, Estudio Nacional sobre el Perfil de las Personas con Discapacidad, resultados definitivos 2018 (personas de 6 años y más).
   - "Solo 80.838 tienen un Certificado Único de Discapacidad de origen visual." Fuente: ANDIS, Registro Nacional de Personas con Discapacidad, noviembre de 2023.
   - Mostralos uno junto al otro, sin calcular porcentajes entre ellos: uno sale de una encuesta de 2018 y el otro de un registro de 2023, y no usan el mismo criterio.
   - Respetá la redacción. No cambies "mucha dificultad para ver" por "ciegas", ni digas que esas personas necesitan bastón o perro guía, porque el estudio no lo afirma.
   - No uses la cifra de 2.000.000 de la presentación, ni la de "entre 400.000 y 450.000", que es una extrapolación sin fuente publicada.
3. **La idea.** "Google Maps, pero para el shopping." Exteriores: GPS. Interiores: BlindRoute.
4. **Cómo funciona.** "Un sistema integral": 01 Beacons, "Posición dentro del edificio". 02 App, "Calcula la ruta y la dicta". 03 Un solo oído, "El otro escucha el entorno". Ejemplo: "De la góndola al baño, sin ver", con la indicación "Seguí derecho, 20 metros".
5. **Modelo de servicio.** "El lugar lo instala. La persona sólo llega." 01 Establecimiento (shopping, aeropuerto, hospital). 02 Adquiere el sistema (equipamiento y licencia). 03 La persona llega, abre la app y se mueve.
6. **Dónde hace falta.** Shoppings, hospitales, aeropuertos, supermercados, terminales. "Cualquier espacio cerrado en el que, sin la vista, estarías perdido."
7. **Lo que buscamos.** Autonomía, seguridad, independencia.
8. **Equipo.** "Giraudo · Apra · Cantarelli · Moesch" y "ITS Villada · 7.º Electrónica". Sin roles ni estado del proyecto por ahora.
9. **Cierre.** "Un lugar no es accesible sólo por poder entrar en él. También hay que poder orientarse dentro." Debajo, un botón grande a la página de contacto.

**Página de contacto (`/contacto/`)**

- Arriba: "BlindRoute" y "Orientación y navegación dentro de espacios cerrados", para que quien llega desde el QR sepa dónde está.
- Lugar para email, WhatsApp y redes como enlaces directos, grandes y fáciles de tocar.
- Lugar para un botón "Guardar contacto" que descargue un archivo `.vcf` con los datos del proyecto.
- "Giraudo · Apra · Cantarelli · Moesch" y "ITS Villada · 7.º Electrónica".
- Un enlace claro a la página principal para conocer el proyecto.

Los datos de contacto todavía no existen, así que construí la página completa y lista para recibirlos:

- Diseñá y maquetá cada medio de contacto como si el dato estuviera, para que se pueda evaluar cómo queda.
- Mientras un dato no esté cargado, ese medio no se publica: nada de enlaces vacíos, direcciones inventadas ni textos de ejemplo que parezcan reales. Si no hay ninguno cargado, la página muestra un mensaje breve de que los datos de contacto van a estar disponibles pronto, además del equipo y el enlace a la página principal.
- Dejá todos los datos de contacto en un solo lugar del código, fácil de encontrar y de editar a mano, y explicá en `CLAUDE.md` paso a paso cómo cargarlos después, incluido el archivo `.vcf`.
- No agregues formulario de contacto.

## 5. Dirección visual

El sitio tiene que verse como parte de la misma familia que la presentación del proyecto, que está en `referencias/`. Ese archivo es un bundle comprimido: no intentes leerlo como texto. Servilo en local, abrilo con Playwright y sacá capturas de las diapositivas 1, 5, 6, 8, 9, 10 y 14 como referencia visual. La diapositiva 5 sirve por su composición, no por su cifra. Este es su sistema:

**Color**

| Uso | Valor |
|---|---|
| Fondo | `#0D1117` |
| Fondo profundo (cierre, pie) | `#05070A` |
| Tarjeta | `#161B22` |
| Superficie elevada | `#21262D` |
| Línea y borde | `#2A313B` |
| Texto principal | `#FFFFFF` |
| Texto de párrafo | `#E6EDF3` |
| Texto secundario | `#9BA5B4` |
| Acento | `#3B82F6` |
| Positivo y énfasis | `#00D97E` |
| Alerta | `#B71C1C` |

**Tipografía**

- Títulos en Sora. Peso 800 para las palabras gigantes, con interletrado de -0.055em e interlineado de 0.88. Peso 600 para títulos de sección, con -0.035em.
- Texto en IBM Plex Sans, pesos 400 a 600.
- Antetítulos en mayúsculas, chicos, con interletrado de 0.24em, en acento o en secundario.

**Composición**

- Una idea por pantalla, pocas palabras, tipografía enorme y mucho aire.
- Tarjetas con borde de 1 px, radio de 28 px y pasos numerados 01, 02, 03 en acento.
- Íconos de línea fina con puntas redondeadas, en acento.
- Un resplandor radial azul muy suave detrás del elemento principal de cada sección.
- El punto medio "·" como separador.

**Movimiento**

- Entradas cortas (subir, aparecer, crecer) de 0.6 a 0.85 s con `cubic-bezier(.2,.8,.2,1)`.
- El motivo propio es la señal del beacon: anillos concéntricos que se expanden desde un punto. El segundo motivo es la ruta que se dibuja sobre un plano.
- Todo movimiento va dentro de `prefers-reduced-motion: no-preference`.

**Tono**

Español rioplatense con voseo. Frases cortas y directas, sobrias, sin signos de exclamación ni lenguaje de venta.

El sitio no es la presentación con scroll. Traducí el sistema a una página: tamaños fluidos con `clamp()`, lectura vertical y secciones que se entiendan sin alguien que las explique en voz alta.

## 6. Restricciones técnicas

- Todo el sitio se gestiona dentro de la carpeta donde estás trabajando, que es `web` (`C:\Users\ASUS\OneDrive\Documentos\villada\blindroute\web`). No leas, crees ni modifiques nada fuera de ella.
- Antes de crear archivos, listá lo que ya hay en la carpeta. Si encontrás archivos que no son de este sitio, por ejemplo los que genera Flutter (`manifest.json`, `flutter_bootstrap.js`, una carpeta `icons/`), frená y avisame antes de tocar o reemplazar cualquier cosa.
- Sitio estático, sin backend, publicable en cualquier hosting estático. HTML, CSS y JavaScript mínimo. Si querés usar un framework, justificalo en el plan.
- La página principal va en `index.html` y la de contacto en `contacto/index.html`, para que la dirección `/contacto/` funcione en cualquier hosting sin configuración. Las dos páginas comparten la hoja de estilos y las fuentes.
- Peso: fuentes alojadas en el propio sitio, en woff2, solo latín y solo los pesos que se usen. Animaciones con CSS, sin librerías. Sin rastreadores ni contenido incrustado de terceros. Objetivo: menos de 300 KB transferidos en la primera carga de la página principal, sin contar fotos, y menos de 150 KB en la de contacto.
- El contenido tiene que leerse completo con JavaScript desactivado.
- Accesibilidad WCAG 2.2 nivel AA:
  - HTML semántico, un solo `h1` por página, encabezados en orden, regiones con nombre y enlace para saltar al contenido.
  - Todo se puede usar con teclado y el foco siempre se ve.
  - Áreas táctiles de 48 px como mínimo.
  - Animaciones decorativas ocultas al lector de pantalla. La animación de "cómo funciona" necesita su equivalente en texto.
  - Contraste: blanco sobre el acento `#3B82F6` da 3,68:1 y no alcanza para texto chico, así que en botones de acento usá texto oscuro `#0D1117` (5,15:1) o texto grande en negrita. El rojo `#B71C1C` sobre el fondo da 2,88:1: no lo uses como color de texto.
- `lang="es-AR"`, título, descripción, Open Graph e ícono.
- No generes el código QR todavía. Va a apuntar a la dirección final de `/contacto/`, que depende del dominio, y una tarjeta impresa no se puede corregir.

## 7. Cómo trabajar

Estas son las skills instaladas que quiero que uses, y para qué:

| Skill | Para qué |
|---|---|
| `emil-design-eng` | La principal. Jerarquía, espaciado, interacción y movimiento, con sus decisiones justificadas por escrito. |
| `mobile-native` | Patrones de celular, que es por donde entra casi todo el mundo. |
| `break-ui` | Que la página no parezca una plantilla genérica. |
| `prototype` | Mostrarme opciones de la primera pantalla antes de construir el resto. |
| `animation-vocabulary` y `animate` | Definir y construir las animaciones. |
| `find-animation-opportunities`, `improve-animations` y `review-animations` | Detectar, mejorar y revisar las animaciones una vez construida la página. |
| `find-skills` | Detectar si otra skill instalada sirve. Avisame antes de usar una que no esté en esta tabla. |

No uses estas: `/taste` (no hay sitio de referencia por ahora), `apple-design` (el sitio ya tiene su propio sistema visual), `pick-ui-library` y `ask-sonner` (no hay librería de componentes ni notificaciones), `animate-expo` y `write-swift` (no es una app).

Pasos:

1. Leé `setup-claude-code.md`, que está en esta misma carpeta, para saber qué herramientas tenés instaladas. Ese archivo nombra como carpeta del proyecto a `blindroute`: no le hagas caso en eso, la carpeta de trabajo es `web`, como dice el punto 6. Creá `CLAUDE.md` con las convenciones del sitio: stack, estructura de carpetas, comandos, tono, restricciones y la regla de usar solo contenido real.
2. Revisá el punto 0 y tené presente qué datos quedan pendientes. No copies textos, imágenes, logos ni código de terceros.
3. Con `emil-design-eng`, `mobile-native` y `break-ui`, proponeme una dirección y un plan breve: estructura de las dos páginas, cómo se ve la de contacto al llegar desde el QR, cómo queda el contacto a un toque desde la principal, qué animaciones van y qué comunica cada una. Usá `animation-vocabulary` para nombrarlas con precisión.
4. Con `prototype`, mostrame dos opciones de la primera pantalla de la página principal en celular. Esperá mi aprobación de la dirección y de la opción antes de seguir.
5. Construí las dos páginas completas. Usá `animate` para las animaciones y justificá cada una: qué comunica y por qué esa duración y esa curva.
6. Pasá `find-animation-opportunities`, aplicá lo que valga la pena con `improve-animations` y cerrá con `review-animations`. No sumes movimiento que no comunique nada: la página tiene que seguir siendo liviana.
7. Verificá las dos páginas con Playwright en escritorio (1440×900) y en celular (390×844):
   - Abrir `/contacto/` directamente, como si se llegara desde el QR, y pasar de ahí a la página principal y volver.
   - Navegación por anclas y botones de acción.
   - La página de contacto sin datos cargados: se ve el mensaje de que van a estar disponibles pronto y no hay enlaces vacíos ni rotos.
   - La página de contacto con datos de prueba cargados solo para la verificación: enlaces de email y WhatsApp bien formados y descarga del `.vcf`. Después de probar, quitá los datos de prueba.
   - Consola sin errores.
   - Recorrido con teclado y foco visible.
   - Movimiento reducido emulado.
   - Sin scroll horizontal a 320 px de ancho.
   - Capturas de cada sección y de la página de contacto en los dos tamaños.
8. Reportá qué probaste, con qué resultado y qué quedó pendiente, incluida la lista de datos del punto 0 que faltan cargar. No digas que algo funciona si no lo comprobaste. La prueba con TalkBack o VoiceOver en un teléfono real no se puede automatizar: dejala anotada como pendiente nuestra.
