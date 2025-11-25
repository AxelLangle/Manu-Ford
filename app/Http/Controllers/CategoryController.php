<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    /**
     * Display products for a specific category.
     */
    public function show(string $category): Response
    {
        // Datos de ejemplo - en producción vendrían de la base de datos
        // TODO: Reemplazar con consultas reales a la BD
        $products = $this->getProductsByCategory($category);

        return Inertia::render('Category', [
            'category' => ucfirst(str_replace('-', ' ', $category)),
            'products' => $products,
        ]);
    }

    /**
     * Get products for a specific category.
     * 
     * @param string $category
     * @return array
     */
    private function getProductsByCategory(string $category): array
    {
        // Datos de ejemplo - en producción vendrían de la base de datos
        $allProducts = [
            [
                'id' => '1',
                'name' => 'Aceite de Motor Sintético 5W-40',
                'price' => 599.00,
                'image' => 'https://via.placeholder.com/260x220?text=Aceite+Motor',
                'category' => 'aceites',
                'sku' => 'OIL-5W40-001',
            ],
            [
                'id' => '2',
                'name' => 'Filtro de Aire Premium',
                'price' => 299.00,
                'image' => 'https://via.placeholder.com/260x220?text=Filtro+Aire',
                'category' => 'filtros',
                'sku' => 'FIL-AIR-001',
            ],
            [
                'id' => '3',
                'name' => 'Pastillas de Freno Cerámicas',
                'price' => 899.00,
                'image' => 'https://via.placeholder.com/260x220?text=Pastillas+Freno',
                'category' => 'frenos',
                'sku' => 'BRK-PAD-001',
            ],
            [
                'id' => '4',
                'name' => 'Bujías de Iridio',
                'price' => 450.00,
                'image' => 'https://via.placeholder.com/260x220?text=Bujias',
                'category' => 'encendido',
                'sku' => 'SPK-IRD-001',
            ],
            [
                'id' => '5',
                'name' => 'Batería 12V 100Ah',
                'price' => 1299.00,
                'image' => 'https://via.placeholder.com/260x220?text=Bateria',
                'category' => 'electricidad',
                'sku' => 'BAT-12V-001',
            ],
            [
                'id' => '6',
                'name' => 'Correa de Distribución',
                'price' => 749.00,
                'image' => 'https://via.placeholder.com/260x220?text=Correa',
                'category' => 'motor',
                'sku' => 'BLT-DST-001',
            ],
            [
                'id' => '7',
                'name' => 'Amortiguadores Delanteros',
                'price' => 1599.00,
                'image' => 'https://via.placeholder.com/260x220?text=Amortiguadores',
                'category' => 'suspension',
                'sku' => 'SUS-AMR-001',
            ],
            [
                'id' => '8',
                'name' => 'Radiador de Aluminio',
                'price' => 1099.00,
                'image' => 'https://via.placeholder.com/260x220?text=Radiador',
                'category' => 'refrigeracion',
                'sku' => 'RAD-ALU-001',
            ],
            [
                'id' => '9',
                'name' => 'Termostato Automotriz',
                'price' => 349.00,
                'image' => 'https://via.placeholder.com/260x220?text=Termostato',
                'category' => 'refrigeracion',
                'sku' => 'THR-AUT-001',
            ],
            [
                'id' => '10',
                'name' => 'Sensor de Oxígeno',
                'price' => 599.00,
                'image' => 'https://via.placeholder.com/260x220?text=Sensor',
                'category' => 'sensores',
                'sku' => 'SEN-OXY-001',
            ],
            [
                'id' => '11',
                'name' => 'Alternador 120A',
                'price' => 1399.00,
                'image' => 'https://via.placeholder.com/260x220?text=Alternador',
                'category' => 'electricidad',
                'sku' => 'ALT-120A-001',
            ],
            [
                'id' => '12',
                'name' => 'Compresor de Aire Acondicionado',
                'price' => 1899.00,
                'image' => 'https://via.placeholder.com/260x220?text=Compresor',
                'category' => 'climatizacion',
                'sku' => 'CMP-AC-001',
            ],
            [
                'id' => '13',
                'name' => 'Aceite de Motor Mineral 10W-30',
                'price' => 399.00,
                'image' => 'https://via.placeholder.com/260x220?text=Aceite+Mineral',
                'category' => 'aceites',
                'sku' => 'OIL-10W30-001',
            ],
            [
                'id' => '14',
                'name' => 'Aceite de Transmisión ATF',
                'price' => 549.00,
                'image' => 'https://via.placeholder.com/260x220?text=Aceite+ATF',
                'category' => 'aceites',
                'sku' => 'OIL-ATF-001',
            ],
            [
                'id' => '15',
                'name' => 'Filtro de Cabina',
                'price' => 199.00,
                'image' => 'https://via.placeholder.com/260x220?text=Filtro+Cabina',
                'category' => 'filtros',
                'sku' => 'FIL-CAB-001',
            ],
            [
                'id' => '16',
                'name' => 'Filtro de Combustible',
                'price' => 249.00,
                'image' => 'https://via.placeholder.com/260x220?text=Filtro+Combustible',
                'category' => 'filtros',
                'sku' => 'FIL-FUL-001',
            ],
        ];

        // Filtrar productos por categoría
        $filtered = array_filter($allProducts, function ($product) use ($category) {
            return $product['category'] === $category;
        });

        // Si no hay productos en la categoría, retornar todos
        if (empty($filtered)) {
            return $allProducts;
        }

        return array_values($filtered);
    }
}
