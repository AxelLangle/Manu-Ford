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
            $table->foreignId('user_id')->constrained('users')->restrictOnDelete(); // Usar user_id
            $table->foreignId('direccion_id')->constrained('direcciones')->restrictOnDelete();
            $table->decimal('total', 12, 2);
            $table->enum('estado', ['pendiente', 'pagado', 'enviado', 'cancelado'])->default('pendiente');
            $table->string('stripe_payment_intent_id')->nullable()->unique(); // ID de la intención de pago de Stripe
            $table->string('stripe_charge_id')->nullable(); // ID del cargo de Stripe
            $table->timestamps(); // created_at será fecha_pedido
        });

        // Tabla de Detalles del Pedido (los productos en cada carrito/venta)
        Schema::create('detalles_pedido', function (Blueprint $table) {
            $table->id('detalle_id');
            $table->foreignId('pedido_id')->constrained('pedidos')->cascadeOnDelete();
            $table->foreignId('producto_id')->constrained('productos')->restrictOnDelete();
            $table->unsignedInteger('cantidad');
            $table->decimal('precio_unitario', 10, 2); // Guarda el precio al momento de la compra
            $table->timestamps();
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
