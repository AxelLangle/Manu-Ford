# Componente de Filtro de Vehículos

## 🎯 Descripción

Componente React/TypeScript completo para filtrar vehículos por año, marca, modelo y versión. Diseñado basándose en especificaciones de Figma con fidelidad exacta al diseño visual.

## 📁 Ubicación de Archivos

```
Manu-Ford/
├── resources/js/
│   ├── Components/
│   │   └── VehicleFilter.tsx          # Componente principal
│   └── Pages/
│       └── VehicleFilterDemo.tsx      # Página de demostración
├── public/
│   ├── assets/
│   │   ├── I884-541;7758-11222.svg   # Icono chevron versión
│   │   ├── I884-546;7758-11222.svg   # Icono chevron modelo
│   │   ├── I884-551;7758-11222.svg   # Icono chevron marca
│   │   ├── I884-555;7758-11222.svg   # Icono chevron año
│   │   └── vehicle-filter-demo.html  # Demo HTML puro
└── routes/
    └── web.php                        # Rutas (modificado)
```

## 🚀 Inicio Rápido

### 1. Importar el componente
```jsx
import VehicleFilter from '@/Components/VehicleFilter';
```

### 2. Usar en tu página
```jsx
export default function SearchPage() {
  const handleSearch = (filters) => {
    console.log('Filtros seleccionados:', filters);
    // Procesar búsqueda, llamar API, etc.
  };

  return (
    <div>
      <VehicleFilter onSearch={handleSearch} />
    </div>
  );
}
```

### 3. Acceder a la demostración
```
http://localhost:8000/vehicle-filter
```

## 📋 Props

```typescript
interface VehicleFilterProps {
  onSearch?: (filters: VehicleFilterState) => void;
}

interface VehicleFilterState {
  year: string;      // Año seleccionado
  brand: string;     // Marca seleccionada
  model: string;     // Modelo seleccionado
  version: string;   // Versión seleccionada
}
```

## 🎨 Estilos

El componente utiliza **Tailwind CSS** y mantiene fidelidad exacta con el diseño:

| Elemento | Color | Valor |
|----------|-------|-------|
| Fondo | Gris claro | `#f5f0f0` |
| Borde | Negro | `#000000` |
| Botón | Azul marino | `#060357` |
| Texto | Gris | `#999999` |
| Barra superior | Azul marino | `#060357` |

### Tipografía
- **Fuente:** Inter
- **Pesos:** thin (300), bold (700)
- **Tamaños:** 15px (botón), 16px (campos)

### Espaciado
- **Bordes redondeados:** 15px (campos), 8px (botón)
- **Sombra marca:** `0px 4px 4px 0px rgba(0,0,0,0.25)`
- **Ancho máximo:** 1233px

## 🔄 Responsividad

El componente es **completamente responsivo**:

- **Mobile:** Campos apilados verticalmente
- **Tablet:** Distribución en 2 columnas
- **Desktop:** Distribución en fila (4 campos)

## 📊 Datos de Ejemplo

El componente incluye datos de ejemplo que pueden ser reemplazados:

```javascript
const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
const brands = ['Ford', 'Chevrolet', 'Toyota', 'Honda', 'Nissan'];
const models = ['Fiesta', 'Focus', 'Mustang', 'Ranger', 'F-150'];
const versions = ['Base', 'SE', 'XLT', 'Limited', 'Platinum'];
```

## 🔌 Integración con API

### Ejemplo: Cargar datos dinámicos
```jsx
import { useEffect, useState } from 'react';
import VehicleFilter from '@/Components/VehicleFilter';

export default function SearchPage() {
  const [years, setYears] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    // Cargar años
    fetch('/api/vehicle-years')
      .then(res => res.json())
      .then(data => setYears(data));

    // Cargar marcas
    fetch('/api/vehicle-brands')
      .then(res => res.json())
      .then(data => setBrands(data));
  }, []);

  const handleSearch = async (filters) => {
    const response = await fetch('/api/vehicle-parts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(filters)
    });
    const results = await response.json();
    // Procesar resultados
  };

  return <VehicleFilter onSearch={handleSearch} />;
}
```

## 🎯 Características

✅ Cuatro campos desplegables interactivos
✅ Gestión de estado con React Hooks
✅ Estilos Tailwind CSS exactos al diseño
✅ Iconos SVG personalizados
✅ Completamente responsivo
✅ TypeScript para type safety
✅ Callback para búsqueda
✅ Datos de ejemplo incluidos

## 🔧 Personalización

### Cambiar colores
Edita los valores de color en `VehicleFilter.tsx`:
```jsx
className="bg-[#060357]"  // Cambiar color del botón
className="text-[#999999]" // Cambiar color del texto
```

### Cambiar opciones
Reemplaza los arrays en el componente:
```jsx
const years = ['2023', '2024', '2025']; // Tu lista de años
```

### Cambiar textos
Modifica las etiquetas en el componente:
```jsx
'Selecciona el año' // Cambiar texto del placeholder
```

## 📱 Demostración HTML

Para una demostración rápida sin necesidad de ejecutar el servidor:

```bash
# Abrir en navegador
open public/vehicle-filter-demo.html
```

Este archivo HTML puro incluye:
- Todos los estilos Tailwind
- Funcionalidad JavaScript completa
- Dropdowns interactivos
- Botón de búsqueda

## 🧪 Testing

### Pruebas manuales realizadas
✅ Selección de año
✅ Selección de marca
✅ Selección de modelo
✅ Selección de versión
✅ Botón de búsqueda
✅ Dropdowns interactivos
✅ Responsividad en diferentes tamaños

## 📚 Documentación Adicional

Ver `VEHICLE_FILTER_INTEGRATION.md` para:
- Guía completa de integración
- Ejemplos de uso avanzado
- Próximos pasos sugeridos
- Notas técnicas

## 🐛 Troubleshooting

### Los iconos no se cargan
Asegúrate de que los archivos SVG estén en `public/assets/`:
```bash
ls -la public/assets/I884-*.svg
```

### El componente no se renderiza
Verifica que el componente esté importado correctamente:
```jsx
import VehicleFilter from '@/Components/VehicleFilter';
```

### Los estilos no se aplican
Asegúrate de que Tailwind CSS esté configurado en el proyecto.

## 📝 Notas

- El componente utiliza **React 18.2.0**
- Compatible con **TypeScript 5.0.2**
- Requiere **Tailwind CSS 3.2.1**
- Funciona con **Inertia.js**

## 👨‍💻 Soporte

Para cambios o mejoras:
1. Edita `resources/js/Components/VehicleFilter.tsx`
2. Actualiza los estilos según sea necesario
3. Prueba en `http://localhost:8000/vehicle-filter`

---

**Versión:** 1.0
**Última actualización:** 25 de Noviembre, 2025
**Estado:** ✅ Completado y Funcional
