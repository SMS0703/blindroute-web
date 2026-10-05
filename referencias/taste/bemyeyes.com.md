# Design Map

## Spacing Scale
8px, 16px, 24px, 48px, 80px · base 8px

## Font Hierarchy
- h1: 64px / 500 / Inter · line_height 73.6px
- h2: 44px / 500 / Inter · line_height 55px
- body (~approx): 18px / 400 / Inter
- cifras (~approx): ~56px / 500 / Inter

## Color Palette
- background: #F8F8FF
- text-heading: #142A5A
- text-body: #1E1E1E
- accent (CTA, ~approx): #F0A010
- borde de tarjeta (~approx): #1E50C8

## Image Ratios
- hero (foto): ~0.8:1 (approx)

## Component Tokens
- Radius: ~24px (tarjeta y foto, approx), 999px (botón), ~10px (ícono, approx)
- Shadows: suave bajo la foto (~approx)
- Grid: 2 col · máx ~1280px · gutter ~32px (approx)

Nota: el extractor no se corrió en este sitio; las medidas salen de una evaluación puntual y de la captura, con ~approx donde son estimadas. Un aviso de cookies cubre ~17 % del viewport en las capturas. Las cifras de voluntarios del sitio son de ellos y no se replican.

---

# Taste DNA

### Calidez por contraste suave
- **Trigger**: Cuando el producto es para personas ciegas o con baja visión y la página tiene que leerse con claridad
- **Decision**: Puso texto azul marino #142A5A sobre un blanco con tinte lavanda #F8F8FF y botones ámbar, en lugar de negro puro sobre blanco puro
- **Reason**: El contraste sigue siendo alto pero la pantalla se siente amable y no de hospital
- **Evidence**: h1 color rgb(20,42,90) sobre fondo rgb(248,248,255); botones Download App y More About Us en ámbar con texto oscuro

### Una persona real en el inicio
- **Trigger**: Cuando hay que mostrar para quién es el producto
- **Decision**: Usó la foto de una mujer con bastón blanco sonriendo con el teléfono al oído en lugar de ilustración o captura de la app
- **Reason**: Quien llega ve a alguien como él y no una pantalla; el tono queda en 'nosotros y vos', no en 'usuarios'
- **Evidence**: foto de ~400px con esquinas redondeadas junto al titular; titular "Let's see the world together" a 64px peso 500

### Frases cortas en peso medio
- **Trigger**: Cuando el titular tiene que sonar cercano y no institucional
- **Decision**: Titulares en Inter 500 (no 700) con frases de cuatro a seis palabras ("Real people. Real support. Real impact.")
- **Reason**: El peso medio y las frases cortas suenan a conversación
- **Evidence**: h1 64px/500, h2 44px/500; line-height 1.15 y 1.25 respectivamente
