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
            $table->foreignId('marca_id')->constrained('marcas')->restrictOnDelete();
            $table->string('nombre', 50);
            $table->timestamps();
            $table->unique(['marca_id', 'nombre']);
        });

        // Tabla Vehiculos (Versiones específicas)
        Schema::create('vehiculos', function (Blueprint $table) {
            $table->id('vehiculo_id');
            $table->foreignId('modelo_id')->constrained('modelos')->restrictOnDelete();
            $table->unsignedSmallInteger('anio'); // Usar SmallInteger para el año
            $table->string('version', 100);
            $table->string('motor', 100)->nullable();
            $table->timestamps();
            $table->unique(['modelo_id', 'anio', 'version', 'motor'], 'idx_vehiculo_unico');
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
