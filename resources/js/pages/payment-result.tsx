import { Head, Link } from '@inertiajs/react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PaymentResult({ status }) {
    const isSuccess = status === 'success';
    const isPending = status === 'pending';

    return (
        <>
            <Head title={`Payment ${isSuccess ? 'Successful' : isPending ? 'Pending' : 'Failed'}`} />
            <Navbar />

            <section className="flex min-h-screen items-center justify-center bg-[#F5F5F7] px-6 py-12">
                <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
                    {isSuccess ? (
                        <>
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                    <span className="text-4xl text-green-600">✓</span>
                                </div>
                            </div>
                            <h1 className="mb-2 text-3xl font-semibold text-[#1F2937]">
                                Payment Successful!
                            </h1>
                            <p className="mb-8 text-lg text-[#6B7280]">
                                Thank you for your purchase. Your order has been confirmed.
                            </p>
                        </>
                    ) : isPending ? (
                        <>
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100">
                                    <span className="text-4xl text-yellow-600">⏳</span>
                                </div>
                            </div>
                            <h1 className="mb-2 text-3xl font-semibold text-[#1F2937]">
                                Payment Pending
                            </h1>
                            <p className="mb-8 text-lg text-[#6B7280]">
                                Your payment is being processed. Please wait for confirmation.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="mb-6 flex justify-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                                    <span className="text-4xl text-red-600">✕</span>
                                </div>
                            </div>
                            <h1 className="mb-2 text-3xl font-semibold text-[#1F2937]">
                                Payment Failed
                            </h1>
                            <p className="mb-8 text-lg text-[#6B7280]">
                                Unfortunately, your payment could not be processed. Please try again.
                            </p>
                        </>
                    )}

                    <div className="space-y-3">
                        <Link
                            href="/"
                            className="inline-block rounded-2xl bg-[#3B82F6] px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                        >
                            Back to Home
                        </Link>
                        <br />
                        <Link
                            href="/catalog"
                            className="inline-block rounded-2xl border-2 border-[#3B82F6] px-8 py-3 font-semibold text-[#3B82F6] transition-all hover:bg-[#3B82F6] hover:text-white"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}    );
}
