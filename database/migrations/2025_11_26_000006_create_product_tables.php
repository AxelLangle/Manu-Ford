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
            $table->unsignedBigInteger('parent_categoria_id')->nullable();
            $table->timestamps();

            // Clave Foránea Corregida: Referencia explícita a sí misma
            $table->foreign('parent_categoria_id')
                  ->references('categoria_id')->on('categorias')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();
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
            $table->unsignedBigInteger('categoria_id')->nullable();
            $table->string('sku', 50)->unique(); // No. de parte
            $table->string('nombre', 255);
            $table->text('descripcion')->nullable();
            $table->decimal('precio', 10, 2);
            $table->unsignedInteger('stock')->default(0);
            $table->string('marca_producto', 100)->nullable(); // Marca del producto (Ej. Motorcraft)
            $table->string('imagen_url', 255)->nullable();
            $table->timestamps();

            // Clave Foránea Corregida: Referencia explícita a 'categoria_id' en 'categorias'
            $table->foreign('categoria_id')
                  ->references('categoria_id')->on('categorias')
                  ->nullOnDelete()
                  ->cascadeOnUpdate();

            // Índice FULLTEXT (si se usa MySQL/MariaDB)
            // $table->fullText(['sku', 'nombre', 'descripcion']);
        });

        // Tabla Valores_Atributos_Producto (Tabla pivote N:M)
        Schema::create('valores_atributos_producto', function (Blueprint $table) {
            $table->unsignedBigInteger('producto_id');
            $table->unsignedBigInteger('atributo_id');
            $table->string('valor', 255);
            $table->primary(['producto_id', 'atributo_id']);
            $table->timestamps();

            // Claves Foráneas Corregidas
            $table->foreign('producto_id')
                  ->references('producto_id')->on('productos')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
            $table->foreign('atributo_id')
                  ->references('atributo_id')->on('atributos')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
        });

        // Tabla Compatibilidad (Producto <-> Vehículo) (Tabla pivote N:M)
        Schema::create('compatibilidad', function (Blueprint $table) {
            $table->unsignedBigInteger('producto_id');
            $table->unsignedBigInteger('vehiculo_id');
            $table->primary(['producto_id', 'vehiculo_id']);
            $table->timestamps();

            // Claves Foráneas Corregidas
            $table->foreign('producto_id')
                  ->references('producto_id')->on('productos')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
            $table->foreign('vehiculo_id')
                  ->references('vehiculo_id')->on('vehiculos')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
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
