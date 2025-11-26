# Guía de la Página de Carrito

## Descripción

La página de Carrito es una interfaz completa para que los usuarios gestionen sus compras. Está totalmente integrada con el `CartContext` global, lo que significa que se actualiza en tiempo real cuando se agregan o eliminan productos.

## Ubicación de Archivos

| Archivo | Ubicación |
|---------|-----------|
| Página | `resources/js/Pages/Cart.tsx` |
| Contexto | `resources/js/Contexts/CartContext.tsx` |
| Rutas | `routes/web.php` |

## Características

### 1. Sincronización en Tiempo Real
La página se actualiza automáticamente cuando:
- Se agrega un producto desde ProductCard
- Se elimina un producto del carrito
- Se cambia la cantidad de un producto
- Se vacía todo el carrito

### 2. Gestión de Productos
✅ Ver todos los productos en el carrito
✅ Aumentar/disminuir cantidad de cada producto
✅ Eliminar productos individuales
✅ Vaciar todo el carrito con confirmación
✅ Ver subtotal de cada producto

### 3. Resumen del Pedido
✅ Subtotal
✅ Envío (Gratis)
✅ Impuestos ($0.00)
✅ Descuentos (si se aplica código)
✅ Total final

### 4. Sistema de Descuentos
- Campo para ingresar código de descuento
- Botón para aplicar descuento
- Ejemplo: código válido aplica 10% de descuento
- Muestra el monto del descuento en el resumen

### 5. Interfaz Responsiva
- Diseño adaptable a todos los tamaños de pantalla
- En mobile: productos apilados verticalmente
- En desktop: grilla de 2 columnas para productos
- Resumen pegajoso (sticky) en desktop

## Cómo Usar

### Acceder a la Página
```
http://localhost:8000/carrito
```

### Desde el Código
```jsx
import { Link } from '@inertiajs/react';

// Enlace a la página del carrito
<Link href={route('cart')}>Mi Carrito</Link>
```

### Desde ProductCard
El componente ProductCard ya está integrado para agregar productos:
```jsx
const handleAddToCart = () => {
  addToCart({ id, name, price, image });
};
```

## Integración con CartContext

### Métodos Disponibles

```typescript
// Obtener items del carrito
const { items } = useCart();

// Agregar producto
const { addToCart } = useCart();
addToCart({ id, name, price, image });

// Remover producto
const { removeFromCart } = useCart();
removeFromCart(productId);

// Actualizar cantidad
const { updateQuantity } = useCart();
updateQuantity(productId, newQuantity);

// Vaciar carrito
const { clearCart } = useCart();
clearCart();

// Obtener total
const { total } = useCart();
```

## Estructura de Datos

### CartItem
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

### CartContextType
```typescript
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}
```

## Funcionalidades Detalladas

### 1. Mostrar/Ocultar Resumen
El resumen del pedido solo se muestra cuando hay productos en el carrito:

```jsx
{items.length > 0 && (
  <div className="lg:w-[357px]">
    {/* Resumen */}
  </div>
)}
```

### 2. Carrito Vacío
Cuando no hay productos, se muestra un mensaje con opción de continuar comprando:

```jsx
{items.length === 0 ? (
  <div className="text-center py-16 bg-white rounded-2xl">
    <p className="text-xl text-[#060357]/60">Tu carrito está vacío</p>
    <Link href="/categoria/aceites">Continuar comprando</Link>
  </div>
) : (
  // Mostrar productos
)}
```

### 3. Controles de Cantidad
Botones para aumentar/disminuir cantidad:

```jsx
<button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
  <Minus className="w-3 h-3 text-white" />
</button>

<button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
  <Plus className="w-3 h-3 text-white" />
</button>
```

### 4. Eliminar Producto
El método `updateQuantity` con cantidad 0 elimina automáticamente:

```jsx
const updateQuantity = (id: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  // Actualizar cantidad
};
```

### 5. Sistema de Descuentos
Aplicar descuento al carrito:

```jsx
const [discountCode, setDiscountCode] = useState('');
const [discountApplied, setDiscountApplied] = useState(false);

const handleApplyDiscount = () => {
  if (discountCode.trim()) {
    setDiscountApplied(true);
  }
};

const discountAmount = discountApplied ? total * 0.1 : 0;
const finalTotal = total - discountAmount;
```

## Rutas

### Ruta del Carrito
```php
Route::get('/carrito', function () {
    return Inertia::render('Cart');
})->name('cart');
```

### Ruta del Checkout
```php
Route::get('/checkout', function () {
    return Inertia::render('Checkout');
})->name('checkout');
```

## Cómo Agregar Enlaces al Carrito

### En el Header/Navbar
```jsx
import { Link } from '@inertiajs/react';
import { useCart } from '@/Contexts/CartContext';

export default function Header() {
  const { items } = useCart();

  return (
    <Link href={route('cart')} className="flex items-center gap-2">
      <ShoppingCart className="w-5 h-5" />
      <span className="text-sm font-semibold">{items.length}</span>
    </Link>
  );
}
```

### En ProductCard
```jsx
<button onClick={handleAddToCart}>
  <ShoppingCart className="w-5 h-5" />
  Añadir al carrito
</button>
```

## Estilos

### Colores Principales
- Azul marino: `#060357`
- Azul oscuro: `#0a0449`
- Gris claro: `#f5f0f0`
- Blanco: `#ffffff`

### Clases Tailwind Utilizadas
- `rounded-2xl` - Bordes redondeados
- `shadow-md` - Sombra media
- `sticky top-24` - Resumen pegajoso
- `line-clamp-2` - Limitar líneas de texto
- `grid grid-cols-1 md:grid-cols-2` - Grilla responsiva

## Próximos Pasos

### 1. Crear Página de Checkout
```bash
php artisan make:page Checkout
```

### 2. Integrar Pasarela de Pago
- Stripe
- PayPal
- MercadoPago

### 3. Guardar Carrito en Base de Datos
- Crear tabla `carts`
- Guardar items cuando el usuario está autenticado
- Recuperar carrito al iniciar sesión

### 4. Agregar Cupones de Descuento
- Crear tabla `coupons`
- Validar códigos en el backend
- Aplicar descuentos dinámicos

### 5. Historial de Órdenes
- Crear tabla `orders`
- Guardar órdenes completadas
- Mostrar historial en el perfil del usuario

## Troubleshooting

### El carrito no se actualiza
- Verifica que CartProvider esté en el layout base
- Revisa que useCart() esté siendo usado correctamente
- Comprueba la consola del navegador para errores

### Los productos no aparecen
- Verifica que el ProductCard esté agregando correctamente
- Revisa que addToCart esté siendo llamado
- Comprueba que los datos del producto sean válidos

### El total no se calcula correctamente
- Verifica que el precio sea un número
- Revisa que la cantidad sea un número entero
- Comprueba la fórmula: `total = sum(price * quantity)`

### El descuento no se aplica
- Verifica que el código no esté vacío
- Revisa la lógica de validación
- Comprueba que el descuento se calcule correctamente

## Notas Importantes

1. **Persistencia**: El carrito se guarda en memoria (React state). Para persistencia, implementar localStorage o base de datos.

2. **Validación**: Actualmente no hay validación de códigos de descuento en el backend. Implementar en producción.

3. **Seguridad**: Los precios se muestran en el frontend. En producción, validar precios en el backend.

4. **Impuestos**: Actualmente están hardcodeados a $0.00. Implementar cálculo dinámico según región.

## Ejemplo Completo de Uso

```jsx
import { useCart } from '@/Contexts/CartContext';

export default function MyComponent() {
  const { items, addToCart, removeFromCart, total } = useCart();

  return (
    <div>
      <h1>Carrito ({items.length})</h1>
      
      {items.map(item => (
        <div key={item.id}>
          <p>{item.name}</p>
          <p>${item.price}</p>
          <p>Cantidad: {item.quantity}</p>
          <button onClick={() => removeFromCart(item.id)}>
            Eliminar
          </button>
        </div>
      ))}

      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
```

---

**Versión:** 1.0
**Última actualización:** 25 de Noviembre, 2025
**Estado:** ✅ Completado
