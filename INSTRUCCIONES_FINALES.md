# 🎉 Aplicación Lista - Instrucciones Finales

## ✅ Estado Actual

La aplicación está funcionando correctamente en **http://localhost:5174**

Actualmente está mostrando **datos de ejemplo** para que puedas ver cómo funciona el dashboard.

## 🔧 Para Conectar con tus Datos Reales de Google Sheets

### Opción 1: Publicar como CSV (RECOMENDADO - Más fácil)

1. **Abre tu Google Sheet**:
   https://docs.google.com/spreadsheets/d/1pdjx9WoPMLvMyCh71Smj44WttAHaDBsBe__OTewiz4o/edit

2. **Publicar en la web**:
   - Ve a **Archivo** → **Compartir** → **Publicar en la web**
   - En el primer desplegable, selecciona **"Hoja 1"** (o la hoja que tenga tus datos)
   - En el segundo desplegable, selecciona **"Valores separados por comas (.csv)"**
   - Haz clic en **"Publicar"**
   - Confirma haciendo clic en **"Aceptar"**

3. **Recarga la aplicación**: La app detectará automáticamente los datos y dejará de mostrar el banner de "datos de ejemplo"

### Opción 2: Hacer la hoja pública

1. **Haz clic en el botón "Compartir"** (arriba a la derecha de tu Google Sheet)
2. En **"Obtener vínculo"**, cambia a **"Cualquier persona con el vínculo"**
3. Asegúrate que el permiso sea **"Lector"**
4. Haz clic en **"Copiar vínculo"** y luego **"Listo"**
5. Recarga la aplicación

## 📋 Estructura Esperada de la Hoja de Cálculo

Tu hoja debe tener estas columnas **EN ESTE ORDEN**:

| Columna | Nombre Exacto | Descripción |
|---------|---------------|-------------|
| A | FECHA | Fecha de postulación |
| B | NOMBRE | Nombre completo |
| C | TELEFONO | Número de teléfono |
| D | CIUDAD | Ciudad de residencia |
| E | EMAIL | Correo electrónico |
| F | ROL TRABAJO | Web Developer, Analista de Datos o Ciberseguridad |
| G | EDUCACIÓN | Formación académica |
| H | EXPERIENCIA LABORAL | Experiencia laboral |
| I | HABILIDADES | Habilidades (separadas por comas) |
| J | CERTIFICADOS | Certificados obtenidos (separados por comas) |
| K | RESUMEN | Resumen del CV |
| L | VOTE | Puntuación (0-10) |
| M | CONSIDERACION | Consideración de la IA |
| N | ESTADO | "Correo enviado" o "Por evaluar" |

**Importante**: 
- La **primera fila** debe contener estos encabezados **EXACTAMENTE** como aparecen arriba (en MAYÚSCULAS)
- Los espacios en "ROL TRABAJO" y "EXPERIENCIA LABORAL" son necesarios

## 🎨 Características de la Aplicación

### Filtros Disponibles
- **Búsqueda por texto**: Busca por nombre, email o ciudad
- **Filtro por rol**: Web Developer, Analista de Datos, Ciberseguridad
- **Filtro por estado**: Correo enviado, Por evaluar
- **Ordenamiento**: Por fecha, puntuación o nombre

### Estadísticas
El dashboard muestra automáticamente:
- Total de postulantes
- Correos enviados
- Postulantes por evaluar
- Distribución por roles

### Visualización
Cada postulante se muestra en una tarjeta elegante con:
- Información de contacto
- Datos de educación y experiencia
- Habilidades en formato de tags
- Puntuación y consideración de la IA
- Estado del proceso

## 🚀 Comandos Útiles

```bash
# Iniciar el servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar la build de producción
npm run preview

# Ejecutar el linter
npm run lint
```

## 🐛 Solución de Problemas

### No se cargan los datos reales

**Problema**: Sigue mostrando "datos de ejemplo"

**Soluciones**:
1. Verifica que la hoja esté publicada (ver Opción 1 arriba)
2. Verifica que el ID de la hoja sea correcto en `src/App.jsx` línea 20
3. Verifica que el nombre de la hoja sea "Hoja 1" o actualiza la línea 21
4. Abre la consola del navegador (F12) para ver los errores específicos
5. Recarga la página con Ctrl+F5 (recarga forzada)

### Algunos campos aparecen vacíos

**Causa**: Celdas vacías en Google Sheets o orden incorrecto de columnas

**Solución**: 
- Verifica que las columnas estén en el orden especificado arriba
- Completa los campos importantes en la hoja de cálculo
- La aplicación maneja campos vacíos automáticamente

### Error CORS

**Causa**: La hoja no está publicada correctamente

**Solución**: 
- Sigue los pasos de "Opción 1: Publicar como CSV"
- Asegúrate de seleccionar CSV, no "Página web"

## 📞 Configuración Personalizada

Si necesitas cambiar el ID de la hoja o el nombre:

1. Abre `src/App.jsx`
2. Modifica las líneas 20-21:

```javascript
const SHEET_ID = 'TU_ID_DE_HOJA_AQUI'
const SHEET_NAME = 'Nombre de tu hoja'
```

3. Guarda el archivo (el servidor se recargará automáticamente)

## 🎨 Personalización de Estilos

Los archivos CSS están organizados por componente:
- `src/App.css` - Estilos generales
- `src/components/PostulanteCard.css` - Tarjetas de postulantes
- `src/components/FilterBar.css` - Barra de filtros
- `src/components/Stats.css` - Estadísticas

## 📚 Archivos Importantes

- `src/App.jsx` - Componente principal y lógica de datos
- `src/datosEjemplo.js` - Datos de ejemplo (puedes editarlos)
- `src/components/` - Componentes reutilizables
- `GOOGLE_SHEETS_SETUP.md` - Guía detallada de configuración

---

¡Listo! Tu dashboard de postulantes está funcionando. Si sigues los pasos para conectar Google Sheets, verás tus datos reales en lugar de los ejemplos. 🚀
