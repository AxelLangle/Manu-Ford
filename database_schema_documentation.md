# Documentación del Esquema de Base de Datos para Manu-Ford

El siguiente esquema de base de datos ha sido diseñado para el e-commerce de refacciones de autos "Manu-Ford", utilizando las convenciones de **Laravel** y optimizado para la integración de **Laravel Cashier Stripe** para la gestión de pagos.

Se han tomado como base el esquema relacional y los archivos SQL propuestos por el equipo, aplicando las siguientes mejoras y adaptaciones:

1.  **Convenciones de Laravel:** Se ha adoptado la convención de nombres de tablas en plural (`users`, `direcciones`, `productos`, etc.) y el uso de `id` como clave primaria por defecto, aunque se ha mantenido el nombre de columna propuesto (`usuario_id`, `producto_id`, etc.) para las claves primarias cuando fue necesario, utilizando el método `->id('nombre_id')` en las migraciones. Las claves foráneas se han renombrado a `user_id` para la tabla `users` y se ha usado `foreignId()` para la gestión automática de las relaciones.
2.  **Integración con Laravel Cashier Stripe:** Se han añadido las columnas necesarias a la tabla `users` para que el modelo `User` pueda utilizar el *trait* `Billable` de Cashier.
3.  **Normalización y Consistencia:** Se han revisado los tipos de datos y las restricciones de integridad referencial (`ON DELETE`, `ON UPDATE`) para asegurar la consistencia de los datos.

---

## 1. Tablas de Usuarios y Pagos (Laravel Cashier)

| Tabla | Propósito | Adaptaciones de Laravel Cashier |
| :--- | :--- | :--- |
| `users` | Almacena la información de clientes y administradores. | Se añadieron `stripe_id`, `pm_type`, `pm_last_four`, y `trial_ends_at` para Cashier. Se incluyó el campo `rol` (`cliente`, `admin`). |
| `subscriptions` | Almacena las suscripciones de Stripe (si se implementan en el futuro). | Tabla estándar de Cashier. |
| `subscription_items` | Almacena los ítems de las suscripciones. | Tabla estándar de Cashier. |
| `direcciones` | Almacena las direcciones de envío de los usuarios. | Se usa `user_id` como clave foránea a la tabla `users`. |

### Estructura de la Tabla `users` (Adaptada para Cashier)

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | Clave primaria. |
| `name` | `varchar` | Nombre del usuario. |
| `email` | `varchar` (Unique) | Correo electrónico. |
| `password` | `varchar` | Hash de la contraseña. |
| **`rol`** | `enum` (`cliente`, `admin`) | Rol del usuario. |
| **`stripe_id`** | `varchar` (Nullable, Index) | ID del cliente en Stripe (requerido por Cashier). |
| **`pm_type`** | `varchar` (Nullable) | Tipo de método de pago (ej. `card`). |
| **`pm_last_four`** | `varchar` (Nullable) | Últimos 4 dígitos de la tarjeta. |
| **`trial_ends_at`** | `timestamp` (Nullable) | Fecha de fin del período de prueba. |

---

## 2. Tablas de Catálogo de Vehículos

Estas tablas permiten modelar la compatibilidad de las refacciones con vehículos específicos.

| Tabla | Propósito | Relaciones |
| :--- | :--- | :--- |
| `marcas` | Marcas de vehículos (Ej. Ford, Chevrolet). | Ninguna (Tabla padre). |
| `modelos` | Modelos de vehículos (Ej. Focus, Mustang). | `marca_id` (FK a `marcas`). |
| `vehiculos` | Versiones específicas de vehículos (Ej. Focus 2018 SE 2.0L). | `modelo_id` (FK a `modelos`). |

---

## 3. Tablas de Productos y Atributos

| Tabla | Propósito | Relaciones |
| :--- | :--- | :--- |
| `categorias` | Categorías jerárquicas de refacciones. | `parent_categoria_id` (FK recursiva a `categorias`). |
| `atributos` | Tipos de atributos (Ej. Material, Color). | Ninguna. |
| `productos` | Catálogo principal de refacciones. | `categoria_id` (FK a `categorias`). |
| `valores_atributos_producto` | Tabla pivote N:M para asignar valores de atributos a productos. | `producto_id` (FK a `productos`), `atributo_id` (FK a `atributos`). |
| `compatibilidad` | Tabla pivote N:M para definir qué `productos` son compatibles con qué `vehiculos`. | `producto_id` (FK a `productos`), `vehiculo_id` (FK a `vehiculos`). |

---

## 4. Tablas de Pedidos y Transacciones

| Tabla | Propósito | Adaptaciones de Stripe |
| :--- | :--- | :--- |
| `pedidos` | Registro de cada compra realizada. | Se añadieron `stripe_payment_intent_id` y `stripe_charge_id` para rastrear la transacción de Stripe. |
| `detalles_pedido` | Ítems y cantidades de cada pedido. | `pedido_id` (FK a `pedidos`), `producto_id` (FK a `productos`). |

### Estructura de la Tabla `pedidos` (Adaptada para Stripe)

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `pedido_id` | `bigint` (PK) | Clave primaria. |
| `user_id` | `bigint` (FK) | Cliente que realizó el pedido. |
| `direccion_id` | `bigint` (FK) | Dirección de envío seleccionada. |
| `total` | `decimal(12, 2)` | Monto total del pedido. |
| `estado` | `enum` | Estado del pedido (`pendiente`, `pagado`, `enviado`, `cancelado`). |
| **`stripe_payment_intent_id`** | `varchar` (Nullable, Unique) | ID de la intención de pago de Stripe (para pagos únicos). |
| **`stripe_charge_id`** | `varchar` (Nullable) | ID del cargo de Stripe (para referencia). |
| `created_at` | `timestamp` | Fecha y hora de creación del pedido. |
| `updated_at` | `timestamp` | Fecha y hora de la última actualización. |

---

## Conclusiones y Archivos Generados

Se han creado las siguientes migraciones de Laravel en el directorio `Manu-Ford/database/migrations/`:

1.  `0001_01_01_000000_create_users_table.php`: Modificada para incluir el campo `rol` y las columnas de **Laravel Cashier**.
2.  `2025_11_26_000003_create_cashier_tables.php`: Migración estándar de Cashier para `subscriptions` y `subscription_items`.
3.  `2025_11_26_000004_create_addresses_table.php`: Migración para la tabla `direcciones`.
4.  `2025_11_26_000005_create_catalog_tables.php`: Migración para `marcas`, `modelos` y `vehiculos`.
5.  `2025_11_26_000006_create_product_tables.php`: Migración para `categorias`, `atributos`, `productos`, `valores_atributos_producto` y `compatibilidad`.
6.  `2025_11_26_000007_create_order_tables.php`: Migración para `pedidos` (con campos de Stripe) y `detalles_pedido`.

Estos archivos están listos para ser ejecutados con el comando `php artisan migrate` en su proyecto Laravel.

**Nota sobre el campo `fecha_pedido`:** En Laravel, el campo `created_at` de la tabla `pedidos` cumple la función de `fecha_pedido`, por lo que se ha eliminado el campo redundante y se ha confiado en los *timestamps* automáticos de Laravel.

**Nota sobre la tabla `vehiculos`:** Se ha cambiado el tipo de dato de `anio` a `unsignedSmallInteger` para optimizar el almacenamiento.

**Nota sobre el campo `password_hash`:** En Laravel, la columna se llama simplemente `password` y se encarga de almacenar el hash. Se ha corregido en la migración de `users`.
