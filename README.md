# jsonizador

Herramientas de taller para estructuras de datos JSON. Validacion, exploracion visual y edicion desde el navegador.

## Descripcion

jsonizador es una aplicacion web que reune varias herramientas para trabajar con JSON de forma visual e interactiva. Permite validar, explorar, crear y generar plantillas de estructuras JSON sin necesidad de instalacion local.

## Herramientas

### Validador

Valida JSON al instante. Encuentra errores con linea y columna exacta. Permite minificar o formatear con indentacion configurable.

- Validacion en tiempo real
- Errores con posicion exacta (linea y columna)
- Formateo con indentacion configurable (espacios o tabuladores)
- Minificacion de JSON

### Visualizador

Explora cualquier JSON como arbol colapsable o con resaltado de sintaxis por tipo de dato.

- Vista de arbol colapsable
- Vista de JSON plano con resaltado de sintaxis
- Busqueda en el arbol
- Copia del resultado formateado
- Colores diferenciados por tipo de dato (string, number, boolean, null, array, object)

### Creador

Construye JSON desde cero campo por campo con edicion visual.

- Tipado visual (string, number, boolean, null, array, object)
- Anidamiento ilimitado de objetos y arrays
- Reordenacion de campos por arrastre (drag and drop)
- Generacion automatica de JSON Schema
- Copia y descarga del resultado
- Importacion de estructura desde el Plantillero

### Plantillero

Genera una plantilla vacia con la misma estructura que tu JSON.

- Deteccion de campos opcionales en arrays de objetos
- Edicion directa de la plantilla generada
- Validacion de estructura contra el JSON original
- Exportacion al Creador para edicion visual

## Stack tecnologico

- React 18
- Vite 6
- TypeScript
- React Router 6
- @dnd-kit (drag and drop)
- IBM Plex Mono (tipografia mono)
- Space Grotesk (tipografia UI)

## Requisitos

- Node.js >= 18
- pnpm

## Instalacion

```bash
git clone <url-del-repositorio>
cd jsonizador
pnpm install
```

## Desarrollo

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Vista previa del build

```bash
pnpm preview
```

## Estructura del proyecto

```
src/
├── components/
│   ├── creator/
│   │   ├── Creator.jsx        # Editor visual de JSON
│   │   ├── FieldEditor.jsx    # Editor de campo individual
│   │   ├── FieldList.jsx      # Lista de campos con drag and drop
│   │   ├── Preview.jsx        # Vista previa del JSON
│   │   └── SchemaView.jsx     # Vista del JSON Schema
│   ├── home/
│   │   ├── Home.jsx           # Pagina principal
│   │   └── ToolCard.jsx       # Tarjeta de herramienta
│   ├── templater/
│   │   └── Templater.jsx      # Generador de plantillas
│   ├── ui/
│   │   ├── Badge.jsx          # Etiqueta
│   │   ├── Button.jsx         # Boton reutilizable
│   │   ├── GridBackground.jsx # Fondo decorativo
│   │   ├── Panel.jsx          # Panel contenedor
│   │   └── Select.jsx         # Selector
│   ├── validator/
│   │   ├── JsonInput.jsx      # Entrada de texto JSON
│   │   ├── ValidationResult.jsx # Resultado de validacion
│   │   └── Validator.jsx      # Pagina de validacion
│   └── viewer/
│       ├── SyntaxHighlight.jsx # Resaltado de sintaxis
│       ├── TreeViewNode.jsx   # Nodo del arbol
│       └── Viewer.jsx         # Pagina de visualizacion
├── layouts/
│   └── MainLayout.jsx         # Layout principal
├── tools/
│   ├── creator.js             # Logica del creador
│   ├── schema.js              # Generacion de JSON Schema
│   ├── templater.js           # Generacion de plantillas
│   ├── validator.js           # Logica de validacion
│   └── viewer.js              # Logica del visualizador
├── App.jsx                    # Rutas
└── main.jsx                   # Punto de entrada
```
