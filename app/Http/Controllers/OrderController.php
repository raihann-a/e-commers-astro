<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show checkout page
     */
    public function showCheckout()
    {
        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->firstOrFail();
        $items = $cart->items()->with('product')->get();

        if ($items->isEmpty()) {
            return redirect()->route('cart.show')->with('error', 'Your cart is empty');
        }

        $total = $items->sum(fn ($item) => $item->product->price * $item->quantity);

        return Inertia::render('checkout', [
            'items' => $items,
            'total' => $total,
            'user' => $user,
        ]);
    }

    /**
     * Create order and return Midtrans token (API endpoint)
     */
    public function createOrder()
    {
        $validated = request()->validate([
            'shipping_address' => 'required|string',
            'shipping_phone' => 'required|string',
        ]);

        $user = auth()->user();
        $cart = Cart::where('user_id', $user->id)->with('items.product')->firstOrFail();
        $items = $cart->items()->with('product')->get();

        if ($items->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 422);
        }

        // Calculate total
        $total = $items->sum(fn ($item) => $item->product->price * $item->quantity);

        // Create order
        $order = Order::create([
            'user_id' => $user->id,
            'total_price' => $total,
            'status' => 'pending',
            'shipping_address' => $validated['shipping_address'],
            'shipping_phone' => $validated['shipping_phone'],
        ]);

        // Create order items
        foreach ($items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);
        }

        // Generate Midtrans token
        $snapToken = $this->generateMidtransToken($order);

        // Clear cart
        $cart->items()->delete();

        return response()->json([
            'success' => true,
            'order_id' => $order->id,
            'snap_token' => $snapToken,
        ]);
    }

    /**
     * Generate Midtrans Snap token
     */
    private function generateMidtransToken(Order $order)
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => $order->id,
                'gross_amount' => (int) $order->total_price,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
                'phone' => $order->shipping_phone,
            ],
            'item_details' => $order->items->map(function ($item) {
                return [
                    'id' => $item->product_id,
                    'price' => (int) $item->price,
                    'quantity' => $item->quantity,
                    'name' => $item->product->name,
                ];
            })->toArray(),
        ];

        $snapToken = \Midtrans\Snap::getSnapToken($params);

        return $snapToken;
    }

    /**
     * Show payment result page
     */
    public function paymentResult($status)
    {
        return Inertia::render('payment-result', [
            'status' => $status,
        ]);
    }
}
