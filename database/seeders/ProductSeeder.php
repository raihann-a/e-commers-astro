<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Star Naming Products
        Product::create([
            'category_id' => 1,
            'name' => 'Adopt a Star - Basic Package',
            'slug' => 'adopt-star-basic',
            'description' => 'Adopt your own star with a beautiful certificate of ownership and official coordinates. Perfect gift for anyone who loves astronomy.',
            'price' => 99000,
            'stock' => 50,
            'image' => 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Adopt a Star - Premium Package',
            'slug' => 'adopt-star-premium',
            'description' => 'Premium star adoption package including framed certificate, constellation guide, and personalized star map.',
            'price' => 249000,
            'stock' => 30,
            'image' => 'https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 1,
            'name' => 'Adopt a Star - Deluxe Package',
            'slug' => 'adopt-star-deluxe',
            'description' => 'Ultimate star adoption experience with official registry, framed certificate, consultation with astronomer, and lifetime digital access.',
            'price' => 499000,
            'stock' => 15,
            'image' => 'https://images.unsplash.com/photo-1462332420958-a05d1e7413e3?w=500&h=500&fit=crop',
        ]);

        // Star Map Products
        Product::create([
            'category_id' => 2,
            'name' => 'Custom Star Map - Digital',
            'slug' => 'custom-star-map-digital',
            'description' => 'Personalized digital star map showing the night sky on any date and location. Perfect for birthdays and anniversaries.',
            'price' => 149000,
            'stock' => 100,
            'image' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Custom Star Map - Framed Canvas',
            'slug' => 'custom-star-map-canvas',
            'description' => 'High-quality canvas print of your custom star map. Ready to hang with wooden frame included.',
            'price' => 299000,
            'stock' => 40,
            'image' => 'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 2,
            'name' => 'Custom Star Map - Premium Print',
            'slug' => 'custom-star-map-premium',
            'description' => 'Luxury star map print on premium paper with rose gold foil accents and custom engraving option.',
            'price' => 449000,
            'stock' => 25,
            'image' => 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
        ]);

        // Merchandise Products
        Product::create([
            'category_id' => 3,
            'name' => 'Galaxy Poster Collection',
            'slug' => 'galaxy-poster-collection',
            'description' => 'Set of 3 beautiful galaxy posters with minimalist design. Each 24x36 inches.',
            'price' => 199000,
            'stock' => 60,
            'image' => 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Constellation Miniature Set',
            'slug' => 'constellation-miniature-set',
            'description' => 'Hand-crafted miniature constellation sculptures. Display set of 5 major constellations.',
            'price' => 299000,
            'stock' => 35,
            'image' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Night Sky Tumbler',
            'slug' => 'night-sky-tumbler',
            'description' => 'Thermal insulated tumbler with custom night sky design. Perfect for coffee or tea.',
            'price' => 149000,
            'stock' => 80,
            'image' => 'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 3,
            'name' => 'Astronomy Book - Beginner\'s Guide',
            'slug' => 'astronomy-beginners-guide',
            'description' => 'Beautifully illustrated guide to the night sky. Perfect for astronomy enthusiasts of all levels.',
            'price' => 179000,
            'stock' => 50,
            'image' => 'https://images.unsplash.com/photo-150784272343-583f20270319?w=500&h=500&fit=crop',
        ]);

        // Bundle & Gift Set Products
        Product::create([
            'category_id' => 4,
            'name' => 'Romantic Couple\'s Bundle',
            'slug' => 'romantic-couples-bundle',
            'description' => 'Perfect anniversary gift: 2 Custom star maps + Constellation miniature set + Premium packaging.',
            'price' => 799000,
            'stock' => 20,
            'image' => 'https://images.unsplash.com/photo-1516214104703-3e062b0b3e13?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 4,
            'name' => 'Astronomy Lover\'s Ultimate Bundle',
            'slug' => 'astronomy-lovers-bundle',
            'description' => 'Complete astronomy collection: Star adoption (premium) + Custom star map + Galaxy posters + Beginner\'s guide.',
            'price' => 1299000,
            'stock' => 15,
            'image' => 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=500&h=500&fit=crop',
        ]);

        Product::create([
            'category_id' => 4,
            'name' => 'Birthday Celebration Package',
            'slug' => 'birthday-celebration-package',
            'description' => 'Special birthday gift: Star adoption (basic) + Custom star map (birthdate) + Gift box + Personal message card.',
            'price' => 349000,
            'stock' => 30,
            'image' => 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=500&fit=crop',
        ]);
    }
}
