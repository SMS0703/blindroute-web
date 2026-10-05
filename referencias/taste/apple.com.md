# Design Map

## Spacing Scale
8px, 16px, 24px, 32px · base 8px

## Font Hierarchy
- título de sección (nav local): 34px / 600 / SF Pro Display · letter_spacing -0.374px · line_height 50px
- título de tarjeta (~approx): ~28px / 600 / SF Pro Display
- etiqueta de tarjeta (~approx): ~17px / 600 / SF Pro Text

## Color Palette
- background (inicio): #000000
- background (cuerpo): #FFFFFF
- tarjeta neutra (~approx): #F5F5F7
- tarjeta celeste (~approx): #C7EEFF
- tarjeta marrón (~approx): #6B3B2A
- boton + (~approx): #1D1D1F

## Image Ratios
- tarjeta: ~0.52:1 (alta, approx)

## Component Tokens
- Radius: ~28px (tarjeta, approx), 999px (botón +)
- Shadows: ninguna perceptible en tarjetas
- Grid: 3.3 tarjetas visibles col · máx ~1440px a sangre con carrusel · gutter ~28px (approx)

Nota: el extractor no se corrió en este sitio; las medidas salen de una evaluación puntual (fuentes, h1, fondo) y de la captura, marcadas ~approx cuando son estimadas. La portada es un video que no había cargado a los 4s (captura negra).

---

# Taste DNA

### Una situación humana por tarjeta
- **Trigger**: Cuando hay que explicar funciones para personas ciegas, sordas o con baja audición sin hablar de especificaciones
- **Decision**: Cada tarjeta lleva una ilustración plana de una persona usando la función y una sola frase en lenguaje llano ("Hear detailed descriptions of what's in view, just by asking."), en lugar de listar características
- **Reason**: Quien llega entiende para qué sirve antes de entender cómo funciona
- **Evidence**: tarjetas VoiceOver, Generated Subtitles, AirPods Pro 3 y Personal Voice en la captura; título de ~28px peso 600 y un renglón de apoyo de ~17px

### Un color por función
- **Trigger**: Cuando hay muchas funciones y no se quiere un ícono por cada una
- **Decision**: Pintó cada tarjeta con un fondo propio (gris claro, celeste, marrón) en lugar de unificar el color
- **Reason**: El color funciona como pista de memoria: la persona recuerda 'la celeste' antes que el nombre
- **Evidence**: fondos distintos en 3 tarjetas contiguas; texto oscuro sobre claro y blanco sobre marrón

### Detalle bajo demanda
- **Trigger**: Cuando la página tiene decenas de funciones y poco espacio
- **Decision**: Mostró solo título y dibujo, y escondió el detalle detrás de un botón + circular negro, en lugar de desplegar todo el texto
- **Reason**: Cada tarjeta se entiende en 3 segundos y quien quiere más lo pide
- **Evidence**: botón + de ~36px en la esquina inferior derecha de cada tarjeta; carrusel horizontal con flechas y siguiente tarjeta cortada en el borde
