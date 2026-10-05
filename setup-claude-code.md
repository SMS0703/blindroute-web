# Setup de Claude Code para este proyecto

> Este archivo documenta el entorno técnico ya instalado en esta máquina para trabajar con Claude Code en diseño y desarrollo web. **No contiene información del proyecto en sí** (eso vive en otra sesión de Claude) — es solo el contexto de herramientas disponibles, para que esa sesión pueda armar un prompt maestro que las aproveche al máximo.

## Entorno base (Windows 11)

- **Claude Code**: instalado y funcionando (`claude --version` confirmado).
- **Node.js**: instalado (requerido para `npx`).
- **Git for Windows**: instalado (requerido para clonar skills y para que Claude Code use la herramienta Bash en Windows).

## Skills instaladas (alcance: Global — disponibles en cualquier proyecto)

Instaladas desde `npx skills@latest add emilkowalski/skills`, symlinkeadas a Claude Code en `~/.agents/skills/`:

- `emil-design-eng` — **la principal**: pulido de interfaz, jerarquía visual, espaciado, decisiones de animación. Hay que pedirle explícitamente que la aplique y justifique sus decisiones.
- `animate`, `animate-expo`, `animation-vocabulary` — vocabulario y ejecución de animaciones.
- `apple-design` — criterios de diseño estilo Apple.
- `ask-sonner` — notificaciones/toasts (librería Sonner).
- `break-ui` — romper patrones de UI genéricos.
- `find-animation-opportunities`, `improve-animations`, `review-animations` — detectar, mejorar y revisar animaciones.
- `mobile-native` — patrones de UI nativos mobile.
- `pick-ui-library` — ayuda a elegir librería de componentes.
- `prototype` — prototipado rápido.
- `write-swift` — no relevante para este proyecto (es para iOS nativo).
- `find-skills` — meta-skill: ayuda a Claude Code a descubrir y sugerir otras skills instaladas cuando sean relevantes.

Además:

- **`/taste`** (de `senlindesign/taste-skill`, clonada manualmente en `~/.claude/skills/taste`): analiza una URL pública con Playwright y devuelve un documento de decisiones de diseño (tipografía, proporciones, ritmo visual, tokens). Se usa así: `/taste https://sitio-que-admires.com`. Sirve para extraer **principios transferibles**, nunca para copiar textos, logos, imágenes o código de terceros — siempre pedir una interpretación original.

## MCP servers conectados

- **Playwright MCP** (`@playwright/mcp@latest`), conectado con `--scope user` → **disponible globalmente**, en cualquier carpeta de proyecto. Permite a Claude Code abrir un navegador real, navegar, hacer clic, llenar formularios, leer consola y sacar capturas de escritorio/móvil para verificar que el sitio funciona de verdad.
  - Capacidad opcional de video disponible vía `--caps=devtools,testing` (no activada aún; activar solo si se necesita grabar un recorrido).

## No instalado (deliberadamente salteado)

- **Figma MCP**: no se instaló porque el proyecto no parte de diseños existentes en Figma. Si en algún momento se suman diseños ahí, se puede agregar después con `claude plugin install figma@claude-plugins-official`.

## Carpeta del proyecto

```
C:\Users\ASUS\OneDrive\Documentos\villada\blindroute
```

Este `.md` debe vivir en la raíz de esa carpeta. Se recomienda además crear ahí un `CLAUDE.md` (si no existe ya) con las convenciones propias del proyecto: stack, estructura de carpetas, comandos de build/test, contenido real (nunca lorem ipsum), tono de marca y restricciones.

## Qué se espera del prompt maestro que arme la otra sesión

El prompt que se le pase a Claude Code debería:

1. Describir el proyecto real (negocio/producto, audiencia, objetivo, contenido, tono, páginas, restricciones) — esa parte la aporta la otra sesión que conoce el proyecto.
2. Pedir explícitamente que use **`emil-design-eng`** para justificar jerarquía, interacción y animación.
3. Pedir que use **`/taste`** sobre una o dos referencias visuales reales (si las hay) solo como principios de estilo, nunca como copia.
4. Indicar que primero proponga una dirección de diseño y un plan breve, y recién después construya.
5. Pedir que, una vez construido, lo **verifique con Playwright** en escritorio y móvil: navegación, CTAs, formularios, consola sin errores, capturas.
6. Pedir que reporte qué probó y qué quedó pendiente, sin afirmar que algo "funciona" si no lo comprobó.

Plantilla base (a completar con los datos reales del proyecto):

```
Actuá como diseñador y desarrollador web. Quiero un sitio para [negocio] dirigido a 
[audiencia], cuyo objetivo es [acción].
Contenido y páginas: [detalle]. Tono: [adjetivos]. Restricciones: [stack, marca, 
accesibilidad].
Usá emil-design-eng para justificar jerarquía, interacción y movimiento. Usá el análisis 
de /taste de [referencias] solo como principios, sin copiar activos ni identidad.
Primero proponé una dirección y un plan breve. Después construí la página completa. 
Iniciá el proyecto y verificá con Playwright en escritorio y móvil: navegación, CTA, 
formularios, consola y capturas. Corregí los problemas y reportá qué probaste y qué 
quedó pendiente.
```
