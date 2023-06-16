<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        Product::factory()->count(100000)->create()->each(function ($product) use ($categories) {
            $product->categories()->attach($categories->random(rand(1, 5)));
        });
    }
}
