# Dashboard de Postulantes

Una aplicación React moderna para visualizar y gestionar candidatos que han sido analizados mediante IA.

## 🎯 Características

- **Visualización Elegante**: Muestra los datos de postulantes de manera profesional y organizada
- **Filtros Avanzados**: Filtra por rol, estado y búsqueda de texto
- **Ordenamiento**: Ordena por fecha, puntuación o nombre
- **Estadísticas**: Visualiza métricas clave en tiempo real
- **Análisis IA**: Muestra evaluaciones, consideraciones y puntuaciones generadas por IA
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla

## 📊 Datos Mostrados

Para cada postulante se muestra:
- Información de contacto (email, teléfono, ciudad)
- Rol al que postula (Web Developer, Analista de Datos, Ciberseguridad)
- Educación
- Experiencia laboral
- Habilidades
- Resumen del CV
- Puntuación IA (vote)
- Consideración de la IA
- Estado (Correo enviado / Por evaluar)

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 📝 Configuración

La aplicación consume datos de Google Sheets. Asegúrate de que:

1. La hoja de cálculo esté configurada como **pública** (Archivo > Compartir > Publicar en la web)
2. El ID de la hoja esté correctamente configurado en `App.jsx` (línea 22)
3. El nombre de la hoja coincida con el configurado (por defecto: "Hoja 1")

## 🎨 Tecnologías

- **React 19** - Framework de UI
- **Vite** - Build tool
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos
- **CSS Modules** - Estilos

## 📱 Estructura del Proyecto

```
src/
├── components/
│   ├── PostulanteCard.jsx    # Tarjeta individual de postulante
│   ├── PostulanteCard.css
│   ├── FilterBar.jsx          # Barra de filtros y búsqueda
│   ├── FilterBar.css
│   ├── Stats.jsx              # Estadísticas generales
│   └── Stats.css
├── App.jsx                    # Componente principal
├── App.css
├── main.jsx
└── index.css
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter

## 📄 Licencia

Este proyecto es privado y está diseñado para uso interno.
