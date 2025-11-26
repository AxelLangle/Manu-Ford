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
        Schema::create('direcciones', function (Blueprint $table) {
            $table->id('direccion_id'); // Mantener el nombre de columna propuesto
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete(); // Usar user_id y FK a 'users'
            $table->string('calle', 255);
            $table->string('ciudad', 100);
            $table->string('estado', 100);
            $table->string('codigo_postal', 10);
            $table->timestamps(); // Añadir timestamps para Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('direcciones');
    }
};
