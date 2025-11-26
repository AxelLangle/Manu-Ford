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
        // Tabla Categorias (Jerárquica)
        Schema::create('categorias', function (Blueprint $table) {
            $table->id('categoria_id');
            $table->string('nombre', 100);
            $table->foreignId('parent_categoria_id')->nullable()->constrained('categorias')->nullOnDelete();
            $table->timestamps();
        });

        // Tabla Atributos (Tipos de atributos)
        Schema::create('atributos', function (Blueprint $table) {
            $table->id('atributo_id');
            $table->string('nombre', 50)->unique();
            $table->timestamps();
        });

        // Tabla Productos (Refacciones)
        Schema::create('productos', function (Blueprint $table) {
            $table->id('producto_id');
            $table->foreignId('categoria_id')->nullable()->constrained('categorias')->nullOnDelete();
            $table->string('sku', 50)->unique(); // No. de parte
            $table->string('nombre', 255);
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2);
            $table->unsignedInteger('stock')->default(0);
            $table->string('marca_producto', 100)->nullable(); // Marca del producto (Ej. Motorcraft)
            $table->string('imagen_url', 255)->nullable();
            $table->timestamps();

            // Índice FULLTEXT (si se usa MySQL/MariaDB)
            // $table->fullText(['sku', 'nombre', 'descripcion']);
        });

        // Tabla Valores_Atributos_Producto (Tabla pivote N:M)
        Schema::create('valores_atributos_producto', function (Blueprint $table) {
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnDelete();
            $table->foreignId('atributo_id')->constrained('atributos')->cascadeOnDelete();
            $table->string('valor', 255);
            $table->primary(['producto_id', 'atributo_id']);
            $table->timestamps();
        });

        // Tabla Compatibilidad (Producto <-> Vehículo) (Tabla pivote N:M)
        Schema::create('compatibilidad', function (Blueprint $table) {
            $table->foreignId('producto_id')->constrained('productos')->cascadeOnDelete();
            $table->foreignId('vehiculo_id')->constrained('vehiculos')->cascadeOnDelete();
            $table->primary(['producto_id', 'vehiculo_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('compatibilidad');
        Schema::dropIfExists('valores_atributos_producto');
        Schema::dropIfExists('productos');
        Schema::dropIfExists('atributos');
        Schema::dropIfExists('categorias');
    }
};
