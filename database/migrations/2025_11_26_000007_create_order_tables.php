<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabla Pedidos (Ventas)
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id('pedido_id');
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete(); // 'users' usa 'id' como PK, esto es correcto.
            $table->unsignedBigInteger('direccion_id');
            $table->decimal('total', 12, 2);
            $table->enum('estado', ['pendiente', 'pagado', 'enviado', 'cancelado'])->default('pendiente');
            $table->string('stripe_payment_intent_id')->nullable()->unique();
            $table->string('stripe_charge_id')->nullable();
            $table->timestamps();

            // Clave Foránea Corregida: Referencia explícita a 'direccion_id' en 'direcciones'
            $table->foreign('direccion_id')
                  ->references('direccion_id')->on('direcciones')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });

        // Tabla de Detalles del Pedido (los productos en cada carrito/venta)
        Schema::create('detalles_pedido', function (Blueprint $table) {
            $table->id('detalle_id');
            $table->unsignedBigInteger('pedido_id');
            $table->unsignedBigInteger('producto_id');
            $table->unsignedInteger('cantidad');
            $table->decimal('precio_unitario', 10, 2);
            $table->timestamps();

            // Claves Foráneas Corregidas
            $table->foreign('pedido_id')
                  ->references('pedido_id')->on('pedidos')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
            $table->foreign('producto_id')
                  ->references('producto_id')->on('productos')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detalles_pedido');
        Schema::dropIfExists('pedidos');
    }
};
