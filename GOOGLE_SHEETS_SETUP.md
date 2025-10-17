# Instrucciones para Configurar Google Sheets

## Paso 1: Hacer la Hoja Pública

1. Abre tu hoja de Google Sheets: https://docs.google.com/spreadsheets/d/1pdjx9WoPMLvMyCh71Smj44WttAHaDBsBe__OTewiz4o/edit
2. Haz clic en **Archivo** → **Compartir** → **Publicar en la web**
3. Selecciona la hoja específica que quieres publicar (ej: "Hoja 1")
4. Haz clic en **Publicar**

## Paso 2: Verificar la Estructura de Columnas

Asegúrate de que tu hoja tenga las siguientes columnas (en cualquier orden):

1. `Fecha` - Fecha de postulación
2. `Nombre` - Nombre completo del postulante
3. `Telefono` - Número de teléfono
4. `Ciudad` - Ciudad de residencia
5. `Email` - Correo electrónico
6. `Rol` - Rol al que postula (Web Developer, Analista de Datos, Ciberseguridad)
7. `Educacion` - Información educativa
8. `Experiencia` - Experiencia laboral
9. `Habilidades` - Habilidades técnicas (separadas por comas)
10. `Resumen` - Resumen del CV
11. `Vote` - Puntuación de 1-10
12. `Consideracion` - Consideración de la IA
13. `Estado` - Estado actual (ej: "Correo enviado", "Por evaluar")

## Paso 3: Ajustar la Configuración en el Código

Si el nombre de tu hoja es diferente a "Hoja 1", edita el archivo `src/App.jsx` línea 23:

```javascript
const SHEET_NAME = 'Hoja 1'; // Cambia esto por el nombre de tu hoja
```

## Paso 4: Verificar la Conexión

1. La aplicación intentará conectarse automáticamente al iniciar
2. Si ves un error de conexión, verifica que:
   - La hoja esté publicada públicamente
   - El ID de la hoja sea correcto
   - El nombre de la hoja coincida con el configurado

## Estructura Esperada de Datos

La primera fila debe contener los encabezados de las columnas. Los datos empiezan desde la segunda fila.

Ejemplo:
```
Fecha       | Nombre      | Telefono    | Ciudad  | Email           | Rol           | ...
01/01/2024  | Juan Pérez  | 123456789   | Madrid  | juan@email.com  | Web Developer | ...
```

## Troubleshooting

### Error: "No se pudieron cargar los datos"

- **Causa**: La hoja no está pública o el ID es incorrecto
- **Solución**: Verifica que hayas completado el Paso 1 correctamente

### Los datos no se muestran correctamente

- **Causa**: Los nombres de las columnas no coinciden
- **Solución**: Verifica que los encabezados de tu hoja coincidan con los nombres listados en el Paso 2

### Algunos campos aparecen vacíos

- **Causa**: Celdas vacías en la hoja de cálculo
- **Solución**: La aplicación maneja campos vacíos automáticamente, pero asegúrate de que los datos importantes estén completos

## Alternativa: Usar la API de Google Sheets

Si prefieres mantener la hoja privada, puedes configurar la API de Google Sheets:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita la API de Google Sheets
4. Crea credenciales (API Key)
5. Modifica `src/App.jsx` para usar la API oficial en lugar del método de visualización pública

Esto requiere cambios adicionales en el código que pueden implementarse si es necesario.
