import { Head, useForm } from '@inertiajs/react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductGallery } from '@/components/product-gallery';
import { ProductCard } from '@/components/product-card';
import { useState } from 'react';

export default function ProductDetail({ product, related = [] }) {
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const form = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const handleAddToCart = async () => {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 3000);
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    return (
        <>
            <Head title={product.name} />
            <Navbar />

            <section className="min-h-screen bg-[#F5F5F7] px-6 py-12 sm:px-12">
                <div className="mx-auto max-w-6xl">
                    {/* Product Section */}
                    <div className="mb-16 grid gap-12 lg:grid-cols-2">
                        {/* Gallery */}
                        <ProductGallery image={product.image} />

                        {/* Details */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <p className="mb-2 text-sm font-semibold text-[#3B82F6]">
                                    {product.category?.name}
                                </p>
                                <h1 className="mb-4 text-4xl font-semibold text-[#1F2937]">
                                    {product.name}
                                </h1>
                                <p className="mb-8 text-lg text-[#6B7280]">
                                    {product.description}
                                </p>

                                {/* Price */}
                                <div className="mb-8">
                                    <p className="text-sm text-[#6B7280]">Price</p>
                                    <p className="text-4xl font-bold text-[#1F2937]">
                                        Rp {parseInt(product.price).toLocaleString('id-ID')}
                                    </p>
                                </div>

                                {/* Stock */}
                                <div className="mb-8">
                                    <p className="text-sm text-[#6B7280]">
                                        Stock: <span className="font-semibold text-[#1F2937]">{product.stock} items</span>
                                    </p>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-semibold text-[#1F2937]">
                                        Quantity:
                                    </label>
                                    <div className="flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="text-lg text-[#6B7280] hover:text-[#1F2937]"
                                        >
                                            −
                                        </button>
                                        <span className="w-8 text-center font-semibold text-[#1F2937]">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="text-lg text-[#6B7280] hover:text-[#1F2937]"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                    className={`w-full rounded-2xl py-4 font-semibold text-white transition-all ${product.stock === 0
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-[#3B82F6] hover:bg-blue-700'
                                        }`}
                                >
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>

                                {addedToCart && (
                                    <div className="rounded-lg bg-green-100 p-3 text-center text-green-700">
                                        ✓ Added to cart successfully!
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    {related.length > 0 && (
                        <div>
                            <h2 className="mb-8 text-3xl font-semibold text-[#1F2937]">
                                Related Products
                            </h2>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {related.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
