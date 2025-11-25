# Componente de Filtro de Vehículos - Guía de Integración

## Descripción General

Se ha creado un componente React/TypeScript completo para el filtro de vehículos basado en el diseño de Figma proporcionado. El componente permite a los usuarios seleccionar el año, marca, modelo y versión de su vehículo para encontrar refacciones compatibles.

## Archivos Creados

### 1. Componente Principal
**Ubicación:** `resources/js/Components/VehicleFilter.tsx`

El componente incluye:
- Cuatro campos desplegables (Año, Marca, Modelo, Versión)
- Botón de búsqueda funcional
- Gestión de estado con React Hooks
- Estilos Tailwind CSS que coinciden exactamente con el diseño de Figma
- Iconos SVG para los chevrones
- Manejo de eventos y callbacks

### 2. Página de Demostración
**Ubicación:** `resources/js/Pages/VehicleFilterDemo.tsx`

Página de ejemplo que integra el componente VehicleFilter en el layout base de la aplicación.

### 3. Assets (Iconos SVG)
**Ubicación:** `public/assets/`

Se han copiado los siguientes archivos SVG:
- `I884-541;7758-11222.svg` - Icono chevron para versión
- `I884-546;7758-11222.svg` - Icono chevron para modelo
- `I884-551;7758-11222.svg` - Icono chevron para marca
- `I884-555;7758-11222.svg` - Icono chevron para año

### 4. Ruta de Demostración
**Ubicación:** `routes/web.php`

Se agregó la ruta `/vehicle-filter` que renderiza la página de demostración.

## Características del Componente

### Props
```typescript
interface VehicleFilterProps {
  onSearch?: (filters: VehicleFilterState) => void;
}

interface VehicleFilterState {
  year: string;
  brand: string;
  model: string;
  version: string;
}
```

### Uso Básico
```jsx
import VehicleFilter from '@/Components/VehicleFilter';

export default function MyPage() {
  const handleSearch = (filters) => {
    console.log('Filtros seleccionados:', filters);
    // Aquí puedes hacer una llamada a la API o redirigir a resultados
  };

  return <VehicleFilter onSearch={handleSearch} />;
}
```

## Estilos y Diseño

El componente utiliza Tailwind CSS y mantiene fidelidad exacta con el diseño de Figma:

- **Color de fondo:** `#f5f0f0` (gris claro)
- **Color de borde:** Negro
- **Color del botón:** `#060357` (azul marino oscuro)
- **Color del texto:** `#999999` (gris)
- **Fuente:** Inter (font-thin, font-bold)
- **Bordes redondeados:** 15px en campos, 8px en botón
- **Sombra:** `0px_4px_4px_0px_rgba(0,0,0,0.25)` en campo de marca

## Responsividad

El componente es totalmente responsivo:
- En dispositivos móviles: Los campos se apilan verticalmente
- En tablets y desktop: Los campos se distribuyen en una fila
- El ancho máximo es 1233px (como en el diseño original)

## Datos de Ejemplo

El componente incluye datos de ejemplo para las opciones:
- **Años:** 2020-2025
- **Marcas:** Ford, Chevrolet, Toyota, Honda, Nissan
- **Modelos:** Fiesta, Focus, Mustang, Ranger, F-150
- **Versiones:** Base, SE, XLT, Limited, Platinum

Estos datos pueden ser reemplazados con datos dinámicos de una API.

## Próximos Pasos de Integración

### 1. Conectar con una API
```jsx
const handleSearch = async (filters) => {
  const response = await fetch('/api/vehicle-parts', {
    method: 'POST',
    body: JSON.stringify(filters)
  });
  const results = await response.json();
  // Procesar resultados
};
```

### 2. Cargar datos dinámicos
Reemplazar los arrays estáticos con datos obtenidos de una API:
```jsx
useEffect(() => {
  fetchYears().then(setYears);
  fetchBrands().then(setBrands);
  // etc.
}, []);
```

### 3. Integración en otras páginas
Importar el componente en cualquier página donde necesites el filtro:
```jsx
import VehicleFilter from '@/Components/VehicleFilter';
```

## Validación Visual

El componente ha sido validado contra el diseño de Figma y coincide exactamente en:
- Layout y espaciado
- Colores y tipografía
- Iconos y elementos visuales
- Comportamiento interactivo de los dropdowns
- Estilos de hover y estados

## Archivo HTML de Demostración

También se incluye un archivo HTML puro (`public/vehicle-filter-demo.html`) que puede ser usado para visualizar el componente sin necesidad de ejecutar el servidor Laravel/React completo.

## Soporte y Mantenimiento

Para cualquier cambio en el diseño o funcionalidad:
1. Actualizar los estilos Tailwind en `VehicleFilter.tsx`
2. Modificar las opciones de los dropdowns según sea necesario
3. Ajustar la lógica de búsqueda en el callback `onSearch`

---

**Fecha de creación:** 25 de Noviembre, 2025
**Versión:** 1.0
