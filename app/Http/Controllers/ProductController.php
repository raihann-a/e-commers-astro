<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display catalog with all products and filters
     */
    public function catalog()
    {
        $query = Product::with('category');

        // Filter by category if provided
        if (request('category')) {
            $query->whereHas('category', fn ($q) => $q->where('slug', request('category')));
        }

        // Search by name or description
        if (request('search')) {
            $search = request('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            });
        }

        $products = $query->simplePaginate(12);
        $categories = \App\Models\Category::all();

        return Inertia::render('catalog', [
            'products' => $products,
            'categories' => $categories,
            'selectedCategory' => request('category'),
            'search' => request('search'),
        ]);
    }

    /**
     * Display product detail
     */
    public function show($slug)
    {
        $product = Product::where('slug', $slug)->with('category')->firstOrFail();

        // Get related products (same category)
        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get();

        return Inertia::render('product-detail', [
            'product' => $product,
            'related' => $related,
        ]);
    }
}
