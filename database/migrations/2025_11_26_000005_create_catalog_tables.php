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
        // Tabla Marcas (de Vehículos)
        Schema::create('marcas', function (Blueprint $table) {
            $table->id('marca_id');
            $table->string('nombre', 50)->unique();
            $table->timestamps();
        });

        // Tabla Modelos (de Vehículos)
        Schema::create('modelos', function (Blueprint $table) {
            $table->id('modelo_id');
            $table->unsignedBigInteger('marca_id'); // Usar unsignedBigInteger en lugar de foreignId
            $table->string('nombre', 50);
            $table->timestamps();
            $table->unique(['marca_id', 'nombre']);

            // Clave Foránea Corregida: Referencia explícita a 'marca_id' en 'marcas'
            $table->foreign('marca_id')
                  ->references('marca_id')->on('marcas')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });

        // Tabla Vehiculos (Versiones específicas)
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id('vehiculo_id');
            $table->unsignedBigInteger('modelo_id'); // Usar unsignedBigInteger
            $table->unsignedSmallInteger('anio');
            $table->string('version', 100);
            $table->string('motor', 100)->nullable();
            $table->timestamps();
            $table->unique(['modelo_id', 'anio', 'version', 'motor'], 'idx_vehiculo_unico');

            // Clave Foránea Corregida: Referencia explícita a 'modelo_id' en 'modelos'
            $table->foreign('modelo_id')
                  ->references('modelo_id')->on('modelos')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehiculos');
        Schema::dropIfExists('modelos');
        Schema::dropIfExists('marcas');
    }
};
