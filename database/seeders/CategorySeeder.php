<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::create([
            'name' => 'Star Naming',
            'slug' => 'star-naming',
        ]);

        Category::create([
            'name' => 'Star Map',
            'slug' => 'star-map',
        ]);

        Category::create([
            'name' => 'Merchandise',
            'slug' => 'merchandise',
        ]);

        Category::create([
            'name' => 'Bundle & Gift Set',
            'slug' => 'bundle-gift-set',
        ]);
    }
}
