# Guía de la Página de Categoría

## Descripción

La página de Categoría muestra productos en una grilla responsiva que se adapta automáticamente al espacio disponible en pantalla.

## Estructura

### Controlador
**Ubicación:** `app/Http/Controllers/CategoryController.php`

El controlador maneja:
- Obtener productos por categoría
- Renderizar la página con Inertia.js
- Datos de ejemplo (en producción, reemplazar con consultas a BD)

### Página
**Ubicación:** `resources/js/Pages/Category.tsx`

Características:
- Grilla responsiva con ProductCard
- Ordenamiento de productos
- Filtros y búsqueda
- Mensaje de estado vacío

### Ruta
**Ubicación:** `routes/web.php`

```php
Route::get('/categoria/{category}', [CategoryController::class, 'show'])->name('category');
```

## Cómo Visualizar

### Opción 1: Acceder directamente por URL

Una vez que el servidor Laravel esté corriendo, accede a:

```
http://localhost:8000/categoria/aceites
http://localhost:8000/categoria/filtros
http://localhost:8000/categoria/frenos
http://localhost:8000/categoria/electricidad
http://localhost:8000/categoria/suspension
http://localhost:8000/categoria/refrigeracion
```

### Opción 2: Desde el menú lateral

El menú lateral (que está siendo trabajado por otro compañero) debe tener enlaces a:

```jsx
<Link href={route('category', 'aceites')}>Aceites</Link>
<Link href={route('category', 'filtros')}>Filtros</Link>
<Link href={route('category', 'frenos')}>Frenos</Link>
// etc.
```

## Categorías Disponibles

| Categoría | URL | Productos |
|-----------|-----|-----------|
| Aceites | `/categoria/aceites` | 3 productos |
| Filtros | `/categoria/filtros` | 3 productos |
| Frenos | `/categoria/frenos` | 1 producto |
| Encendido | `/categoria/encendido` | 1 producto |
| Electricidad | `/categoria/electricidad` | 2 productos |
| Motor | `/categoria/motor` | 1 producto |
| Suspensión | `/categoria/suspension` | 1 producto |
| Refrigeración | `/categoria/refrigeracion` | 2 productos |
| Sensores | `/categoria/sensores` | 1 producto |
| Climatización | `/categoria/climatizacion` | 1 producto |

## Pasos para Ejecutar Localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/AxelLangle/Manu-Ford.git
cd Manu-Ford
```

### 2. Instalar dependencias
```bash
composer install
npm install
```

### 3. Configurar el archivo .env
```bash
cp .env.example .env
php artisan key:generate
```

### 4. Ejecutar migraciones (si es necesario)
```bash
php artisan migrate
```

### 5. Iniciar el servidor de desarrollo

**Terminal 1 - Servidor Laravel:**
```bash
php artisan serve
```

**Terminal 2 - Vite (para compilar assets):**
```bash
npm run dev
```

### 6. Acceder a la página
Abre tu navegador y ve a:
```
http://localhost:8000/categoria/aceites
```

## Estructura de Datos de Productos

Cada producto tiene la siguiente estructura:

```php
[
    'id' => '1',
    'name' => 'Aceite de Motor Sintético 5W-40',
    'price' => 599.00,
    'image' => 'https://via.placeholder.com/260x220?text=Aceite+Motor',
    'category' => 'aceites',
    'sku' => 'OIL-5W40-001',
]
```

## Grilla Responsiva

La grilla se adapta automáticamente:

| Tamaño | Columnas | Breakpoint |
|--------|----------|-----------|
| Mobile | 1 | < 640px |
| Tablet pequeño | 2 | 640px - 1024px |
| Tablet | 3 | 1024px - 1280px |
| Desktop | 4 | 1280px - 1536px |
| Desktop grande | 5 | > 1536px |

## Funcionalidades

### Ordenamiento
- Relevancia (orden por defecto)
- Precio: Menor a Mayor
- Precio: Mayor a Menor
- Más Nuevos

### Filtros
- Sección de filtros y ordenamiento
- Integración con ProductCard

### Productos
- Muestra nombre, precio e imagen
- Botón para agregar al carrito
- Botón para agregar a favoritos
- Botón para compartir

## Próximos Pasos

### 1. Conectar con Base de Datos
Reemplazar `getProductsByCategory()` en el controlador con:

```php
private function getProductsByCategory(string $category): array
{
    return Product::where('category', $category)
        ->get()
        ->toArray();
}
```

### 2. Crear Modelo de Producto
```bash
php artisan make:model Product -m
```

### 3. Crear Migraciones
```bash
php artisan make:migration create_products_table
```

### 4. Agregar Validación
```php
$request->validate([
    'category' => 'required|string|exists:categories,slug',
]);
```

## Troubleshooting

### La página no carga
- Verifica que el servidor Laravel esté corriendo: `php artisan serve`
- Verifica que Vite esté compilando: `npm run dev`
- Revisa la consola del navegador para errores

### Los productos no aparecen
- Verifica que la categoría exista en `getProductsByCategory()`
- Revisa que los datos de ejemplo estén correctos

### Los estilos no se aplican
- Asegúrate de que Tailwind CSS esté compilado: `npm run dev`
- Limpia el caché: `npm run build`

### Las imágenes no cargan
- Las imágenes de ejemplo usan `placeholder.com`
- En producción, reemplaza con URLs reales o rutas locales

## Integración con el Menú Lateral

Para conectar el menú lateral con la página de categoría:

```jsx
// En el componente del menú
import { Link } from '@inertiajs/react';

export default function Sidebar() {
  const categories = [
    { name: 'Aceites', slug: 'aceites' },
    { name: 'Filtros', slug: 'filtros' },
    { name: 'Frenos', slug: 'frenos' },
    // ...
  ];

  return (
    <nav>
      {categories.map(cat => (
        <Link key={cat.slug} href={route('category', cat.slug)}>
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
```

## Notas

- Los datos de ejemplo están en el controlador
- En producción, usar una base de datos real
- El componente ProductCard maneja la lógica de carrito y favoritos
- La grilla es completamente responsiva con Tailwind CSS

---

**Versión:** 1.0
**Última actualización:** 25 de Noviembre, 2025
**Estado:** ✅ Completado
