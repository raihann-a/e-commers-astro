<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    /**
     * Handle Midtrans notification/callback
     */
    public function handleNotification()
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.server_key');
        \Midtrans\Config::$isProduction = config('services.midtrans.is_production');
        \Midtrans\Config::$isSanitized = true;
        \Midtrans\Config::$is3ds = true;

        $notification = new \Midtrans\Notification();

        $order = Order::findOrFail($notification->order_id);

        // Map Midtrans transaction status to our status
        $status = $this->mapMidtransStatus($notification->transaction_status);

        $order->update([
            'status' => $status,
            'midtrans_transaction_id' => $notification->transaction_id,
        ]);

        return response()->json(['status' => 'success']);
    }

    /**
     * Map Midtrans transaction status to our order status
     */
    private function mapMidtransStatus($transactionStatus)
    {
        return match ($transactionStatus) {
            'capture', 'settlement' => 'success',
            'pending' => 'pending',
            'deny', 'cancel', 'expire' => 'failed',
            default => 'pending',
        };
    }
}
