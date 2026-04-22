<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        $eletronicos = Category::create(['name' => 'Eletrônicos']);
        $moveis = Category::create(['name' => 'Móveis']);

        Product::create([
            'name' => 'Smartphone High-End',
            'description' => 'O melhor smartphone com câmera de 108MP.',
            'price' => 4500.00,
            'category_id' => $eletronicos->id,
            'image_url' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
        ]);

        Product::create([
            'name' => 'Cadeira Ergonômica',
            'description' => 'Cadeira ideal para quem trabalha em home office.',
            'price' => 1200.50,
            'category_id' => $moveis->id,
            'image_url' => 'https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?w=400'
        ]);
    }
}