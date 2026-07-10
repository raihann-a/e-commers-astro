import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useState } from 'react';

export default function Cart({ items = [], total = 0, cart_id = null }) {
    const [cartItems, setCartItems] = useState(items);
    const [cartTotal, setCartTotal] = useState(total);
    const [loading, setLoading] = useState(false);

    const handleRemove = async (itemId: number) => {
        try {
            setLoading(true);
            const response = await fetch('/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ cart_item_id: itemId }),
            });

            if (response.ok) {
                const updated = cartItems.filter((item) => item.id !== itemId);
                setCartItems(updated);
                const newTotal = updated.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                );
                setCartTotal(newTotal);
            }
        } catch (error) {
            console.error('Failed to remove item:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQty = async (itemId: number, quantity: number) => {
        if (quantity < 1) return;

        try {
            const response = await fetch('/api/cart/update-qty', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    cart_item_id: itemId,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                const updated = cartItems.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                );
                setCartItems(updated);
                const newTotal = updated.reduce(
                    (sum, item) => sum + item.product.price * item.quantity,
                    0
                );
                setCartTotal(newTotal);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    return (
        <>
            <Head title="Shopping Cart" />
            <Navbar />

            <section className="min-h-screen bg-[#F5F5F7] px-6 py-12 sm:px-12">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-12 text-4xl font-semibold text-[#1F2937]">
                        Shopping Cart
                    </h1>

                    {cartItems.length > 0 ? (
                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-6 rounded-2xl bg-white p-6 shadow-sm"
                                    >
                                        {/* Product Image */}
                                        <div className="w-24 flex-shrink-0">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="h-24 w-24 rounded-lg object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-[#1F2937]">
                                                {item.product.name}
                                            </h3>
                                            <p className="text-[#6B7280]">
                                                Rp {parseInt(item.product.price).toLocaleString('id-ID')}
                                            </p>

                                            {/* Quantity Control */}
                                            <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#E5E7EB] w-fit px-3 py-1">
                                                <button
                                                    onClick={() =>
                                                        handleUpdateQty(item.id, item.quantity - 1)
                                                    }
                                                    disabled={loading}
                                                    className="text-[#6B7280] hover:text-[#1F2937]"
                                                >
                                                    −
                                                </button>
                                                <span className="w-6 text-center font-semibold text-[#1F2937]">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        handleUpdateQty(item.id, item.quantity + 1)
                                                    }
                                                    disabled={loading}
                                                    className="text-[#6B7280] hover:text-[#1F2937]"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Price & Remove */}
                                        <div className="flex flex-col items-end justify-between">
                                            <p className="text-lg font-semibold text-[#1F2937]">
                                                Rp{' '}
                                                {parseInt(
                                                    item.product.price * item.quantity
                                                ).toLocaleString('id-ID')}
                                            </p>
                                            <button
                                                onClick={() => handleRemove(item.id)}
                                                disabled={loading}
                                                className="text-sm text-red-600 hover:text-red-700"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Cart Summary */}
                            <div className="rounded-2xl bg-white p-6 shadow-sm h-fit">
                                <h2 className="mb-6 text-xl font-semibold text-[#1F2937]">
                                    Order Summary
                                </h2>
                                <div className="space-y-4 border-b border-[#E5E7EB] pb-6">
                                    <div className="flex justify-between text-[#6B7280]">
                                        <span>Subtotal</span>
                                        <span>
                                            Rp {parseInt(cartTotal).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[#6B7280]">
                                        <span>Shipping</span>
                                        <span>TBD</span>
                                    </div>
                                </div>
                                <div className="my-6 flex justify-between text-lg font-bold text-[#1F2937]">
                                    <span>Total</span>
                                    <span>
                                        Rp {parseInt(cartTotal).toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="block w-full rounded-2xl bg-[#3B82F6] py-3 text-center font-semibold text-white transition-all hover:bg-blue-700"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-2xl bg-white py-12 text-center">
                            <p className="mb-6 text-lg text-[#6B7280]">
                                Your cart is empty
                            </p>
                            <Link
                                href="/catalog"
                                className="inline-block rounded-2xl bg-[#3B82F6] px-8 py-3 font-semibold text-white hover:bg-blue-700"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
