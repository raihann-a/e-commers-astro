import { Head, useForm } from '@inertiajs/react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useState, useEffect } from 'react';

declare global {
    interface Window {
        snap?: any;
    }
}

export default function Checkout({ items = [], total = 0, user }) {
    const [processing, setProcessing] = useState(false);
    const form = useForm({
        shipping_address: '',
        shipping_phone: '',
    });

    useEffect(() => {
        // Load Midtrans Snap library
        const script = document.createElement('script');
        script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
        script.setAttribute('data-client-key', import.meta.env.VITE_MIDTRANS_CLIENT_KEY);
        document.head.appendChild(script);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setProcessing(true);

        try {
            // Create order
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    shipping_address: form.data.shipping_address,
                    shipping_phone: form.data.shipping_phone,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create order');
            }

            const data = await response.json();

            // Trigger Midtrans Snap payment
            if (window.snap) {
                window.snap.pay(data.snap_token, {
                    onSuccess: function (result: any) {
                        window.location.href = `/payment-result/success?order_id=${data.order_id}`;
                    },
                    onPending: function (result: any) {
                        window.location.href = `/payment-result/pending?order_id=${data.order_id}`;
                    },
                    onError: function (result: any) {
                        window.location.href = `/payment-result/failed?order_id=${data.order_id}`;
                    },
                    onClose: function () {
                        setProcessing(false);
                    },
                });
            }
        } catch (error) {
            console.error('Checkout error:', error);
            setProcessing(false);
        }
    };

    return (
        <>
            <Head title="Checkout" />
            <Navbar />

            <section className="min-h-screen bg-[#F5F5F7] px-6 py-12 sm:px-12">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-12 text-4xl font-semibold text-[#1F2937]">
                        Checkout
                    </h1>

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Checkout Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl bg-white p-6">
                                <div>
                                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={user?.name}
                                        disabled
                                        className="w-full rounded-lg border border-[#E5E7EB] bg-gray-50 px-4 py-3 text-[#1F2937]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email}
                                        disabled
                                        className="w-full rounded-lg border border-[#E5E7EB] bg-gray-50 px-4 py-3 text-[#1F2937]"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Shipping Address *
                                    </label>
                                    <textarea
                                        value={form.data.shipping_address}
                                        onChange={(e) =>
                                            form.setData('shipping_address', e.target.value)
                                        }
                                        required
                                        rows={4}
                                        className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none"
                                        placeholder="Enter your full shipping address..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={form.data.shipping_phone}
                                        onChange={(e) =>
                                            form.setData('shipping_phone', e.target.value)
                                        }
                                        required
                                        className="w-full rounded-lg border border-[#E5E7EB] px-4 py-3 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none"
                                        placeholder="08xxx..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-2xl bg-[#3B82F6] py-4 font-semibold text-white transition-all hover:bg-blue-700 disabled:bg-gray-400"
                                >
                                    {processing ? 'Processing...' : 'Proceed to Payment'}
                                </button>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm h-fit">
                            <h2 className="mb-6 text-xl font-semibold text-[#1F2937]">
                                Order Summary
                            </h2>

                            <div className="mb-6 space-y-4 border-b border-[#E5E7EB] pb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="text-[#6B7280]">
                                            {item.product.name} × {item.quantity}
                                        </span>
                                        <span className="font-semibold text-[#1F2937]">
                                            Rp{' '}
                                            {parseInt(
                                                item.product.price * item.quantity
                                            ).toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="mb-6 space-y-3">
                                <div className="flex justify-between text-[#6B7280]">
                                    <span>Subtotal</span>
                                    <span>Rp {parseInt(total).toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-[#6B7280]">
                                    <span>Shipping</span>
                                    <span>Rp 0</span>
                                </div>
                            </div>

                            <div className="border-t border-[#E5E7EB] pt-4">
                                <div className="flex justify-between text-lg font-bold text-[#1F2937]">
                                    <span>Total</span>
                                    <span>Rp {parseInt(total).toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
