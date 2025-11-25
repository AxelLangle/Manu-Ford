<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/vehicle-filter', function () {
    return Inertia::render('VehicleFilterDemo');
})->name('vehicle-filter');

Route::get('/categoria/{category}', function ($category) {
    // Datos de ejemplo - en producción vendrían de la base de datos
    $products = [
        [
            'id' => '1',
            'name' => 'Aceite de Motor Sintético 5W-40',
            'price' => 599.00,
            'image' => 'https://via.placeholder.com/260x220?text=Aceite+Motor',
            'category' => $category,
        ],
        [
            'id' => '2',
            'name' => 'Filtro de Aire Premium',
            'price' => 299.00,
            'image' => 'https://via.placeholder.com/260x220?text=Filtro+Aire',
            'category' => $category,
        ],
        [
            'id' => '3',
            'name' => 'Pastillas de Freno Cerámicas',
            'price' => 899.00,
            'image' => 'https://via.placeholder.com/260x220?text=Pastillas+Freno',
            'category' => $category,
        ],
        [
            'id' => '4',
            'name' => 'Bujías de Iridio',
            'price' => 450.00,
            'image' => 'https://via.placeholder.com/260x220?text=Bujias',
            'category' => $category,
        ],
        [
            'id' => '5',
            'name' => 'Batería 12V 100Ah',
            'price' => 1299.00,
            'image' => 'https://via.placeholder.com/260x220?text=Bateria',
            'category' => $category,
        ],
        [
            'id' => '6',
            'name' => 'Correa de Distribución',
            'price' => 749.00,
            'image' => 'https://via.placeholder.com/260x220?text=Correa',
            'category' => $category,
        ],
        [
            'id' => '7',
            'name' => 'Amortiguadores Delanteros',
            'price' => 1599.00,
            'image' => 'https://via.placeholder.com/260x220?text=Amortiguadores',
            'category' => $category,
        ],
        [
            'id' => '8',
            'name' => 'Radiador de Aluminio',
            'price' => 1099.00,
            'image' => 'https://via.placeholder.com/260x220?text=Radiador',
            'category' => $category,
        ],
        [
            'id' => '9',
            'name' => 'Termostato Automotriz',
            'price' => 349.00,
            'image' => 'https://via.placeholder.com/260x220?text=Termostato',
            'category' => $category,
        ],
        [
            'id' => '10',
            'name' => 'Sensor de Oxígeno',
            'price' => 599.00,
            'image' => 'https://via.placeholder.com/260x220?text=Sensor',
            'category' => $category,
        ],
        [
            'id' => '11',
            'name' => 'Alternador 120A',
            'price' => 1399.00,
            'image' => 'https://via.placeholder.com/260x220?text=Alternador',
            'category' => $category,
        ],
        [
            'id' => '12',
            'name' => 'Compresor de Aire Acondicionado',
            'price' => 1899.00,
            'image' => 'https://via.placeholder.com/260x220?text=Compresor',
            'category' => $category,
        ],
    ];

    return Inertia::render('Category', [
        'category' => ucfirst($category),
        'products' => $products,
    ]);
})->name('category');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
