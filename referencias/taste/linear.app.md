# Design Map

## Spacing Scale
2px, 4px, 6px, 8px, 12px, 16px, 24px, 28px, 30px, 40px · base 8px

## Font Hierarchy
- h1 (medido a 390px): 38px / 510 / Inter Variable · letter_spacing -0.836px · line_height 41.8px
- h2: 24px / 510 / Inter Variable · letter_spacing -0.288px
- h3: 20px / 590 / Inter Variable · letter_spacing -0.24px
- body: 15px / 400 / Inter Variable · line_height 24px
- ui/secundario: 12-13px / 400-510 / Inter Variable
- etiqueta FIG (~approx): ~11px / 400 / Berkeley Mono

## Color Palette
- background: #08090A
- surface: #0F1011
- surface-2: #161718
- text-primary: #F7F8F8
- text-body: #D0D6E0
- text-secondary: #8A8F98
- text-tertiary: #62666D

## Image Ratios
- feature (a 390px): 1.25:1
- avatar/logo: 1:1

## Component Tokens
- Radius: 4px, 6px, 8px, 12px, 16px, 9999px
- Shadows: inset 0 0 0 1px rgba(255,255,255,0.05); 0 0 0 1px rgba(0,0,0,0.2); 0 4px 4px -1px rgba(0,0,0,0.06), 0 1px 1px 0 rgba(0,0,0,0.12); 0 2px 32px 0 rgba(0,0,0,0.25)
- Grid: 3 col · máx ~1290px (contenido a 1440) · gutter 8px (grid interno medido)

Nota: las medidas del extractor se tomaron con viewport de 390px (el navegador estaba en ese tamaño); la composición de escritorio se verificó por captura a 1440px. Tamaños de titular de escritorio no medidos.

---

# Taste DNA

### Jerarquía sin color de marca
- **Trigger**: Cuando una página casi negra necesita ordenar títulos, párrafos y metadatos
- **Decision**: Eligió cuatro grises tintados hacia el azul (#F7F8F8, #D0D6E0, #8A8F98, #62666D) sobre #08090A, en lugar de usar un color de acento en la interfaz
- **Reason**: Quien lee distingue qué importa por brillo y no por tono, así que nada compite con el producto mostrado
- **Evidence**: accentCandidates del extractor: solo grises y blanco; #08090A cubre 63 % del área con fondo; #8A8F98 aparece en 69 nodos de texto

### Estructura con filetes de 1px
- **Trigger**: Cuando hay que separar columnas y tarjetas sin que la página pese
- **Decision**: Usó anillos de 1px (inset rgba(255,255,255,.05)) y divisores verticales finos en lugar de cajas rellenas o sombras grandes
- **Reason**: Los bordes casi invisibles ordenan la lectura sin crear peso visual en el fondo oscuro
- **Evidence**: box-shadow inset 0 0 0 1px rgba(255,255,255,0.05) x4; columnas FIG 0.1/0.2/0.3 separadas por líneas verticales de 1px

### Producto explicado con dibujo técnico
- **Trigger**: Cuando un concepto abstracto (agentes, velocidad) no tiene imagen propia
- **Decision**: Dibujó cubos y capas isométricas en línea fina con etiquetas FIG 0.x en monoespaciada, en lugar de capturas de pantalla o fotos
- **Reason**: El diagrama se lee como material de ingeniería y deja imaginar el sistema sin mostrar interfaz
- **Evidence**: etiquetas FIG 0.1, 0.2, 0.3 en Berkeley Mono; ilustraciones de trazo único sobre #08090A

### Movimiento corto con entrada desenfocada
- **Trigger**: Cuando los controles se usan muchas veces y la portada se ve una sola
- **Decision**: Dejó hover y foco en 0.1-0.16s con cubic-bezier(.25,.46,.45,.94) y reservó la entrada lenta para el titular, que llegó desenfocado en la captura a 4s
- **Reason**: Lo que se repite no debe hacer esperar; lo que se ve una vez puede tomarse tiempo
- **Evidence**: transiciones 0.1s y 0.16s en el extractor; focusVisible: true, reducedMotion: true; captura de portada con titular desenfocado
