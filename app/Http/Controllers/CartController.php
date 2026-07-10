<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display user's cart
     */
    public function show()
    {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->first();

        if (!$cart) {
            $cart = Cart::create(['user_id' => $user->id]);
        }

        $items = $cart->items()->with('product')->get();
        $total = $items->sum(fn ($item) => $item->product->price * $item->quantity);

        return Inertia::render('cart', [
            'items' => $items,
            'total' => $total,
            'cart_id' => $cart->id,
        ]);
    }

    /**
     * Add product to cart (API endpoint)
     */
    public function add()
    {
        $validated = request()->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->firstOrCreate(['user_id' => $user->id]);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $validated['product_id'])
            ->first();

        if ($cartItem) {
            $cartItem->update(['quantity' => $cartItem->quantity + $validated['quantity']]);
        } else {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $validated['product_id'],
                'quantity' => $validated['quantity'],
            ]);
        }

        return response()->json(['success' => true, 'message' => 'Product added to cart']);
    }

    /**
     * Remove item from cart (API endpoint)
     */
    public function remove()
    {
        $validated = request()->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
        ]);

        CartItem::findOrFail($validated['cart_item_id'])->delete();

        return response()->json(['success' => true, 'message' => 'Item removed from cart']);
    }

    /**
     * Update cart item quantity (API endpoint)
     */
    public function updateQty()
    {
        $validated = request()->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        CartItem::findOrFail($validated['cart_item_id'])
            ->update(['quantity' => $validated['quantity']]);

        return response()->json(['success' => true, 'message' => 'Quantity updated']);
    }
}
