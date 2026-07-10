<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// Public routes - E-commerce
Route::inertia('/', 'home')->name('home');
Route::get('/catalog', [ProductController::class, 'catalog'])->name('catalog');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// Payment callback (webhook from Midtrans)
Route::post('/payment/midtrans-callback', [PaymentController::class, 'handleNotification'])->name('payment.callback');

// Protected routes - Cart & Order
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Cart routes
    Route::get('/cart', [CartController::class, 'show'])->name('cart.show');
    Route::post('/api/cart/add', [CartController::class, 'add'])->name('cart.add');
    Route::post('/api/cart/remove', [CartController::class, 'remove'])->name('cart.remove');
    Route::post('/api/cart/update-qty', [CartController::class, 'updateQty'])->name('cart.update-qty');

    // Order routes
    Route::get('/checkout', [OrderController::class, 'showCheckout'])->name('checkout');
    Route::post('/api/orders', [OrderController::class, 'createOrder'])->name('orders.create');
    Route::get('/payment-result/{status}', [OrderController::class, 'paymentResult'])->name('payment.result');
});

require __DIR__.'/settings.php';

