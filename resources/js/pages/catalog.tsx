import { Head, usePage } from '@inertiajs/react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductCard } from '@/components/product-card';
import { CategoryFilter } from '@/components/category-filter';
import { useState } from 'react';

export default function Catalog({ products, categories, selectedCategory, search: initialSearch }) {
    const [searchTerm, setSearchTerm] = useState(initialSearch || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const url = new URL('/catalog', window.location.origin);
        if (searchTerm) url.searchParams.set('search', searchTerm);
        if (selectedCategory) url.searchParams.set('category', selectedCategory);
        window.location.href = url.toString();
    };

    return (
        <>
            <Head title="Catalog" />
            <Navbar />

            <section className="min-h-screen bg-[#F5F5F7] px-6 py-12 sm:px-12">
                <div className="mx-auto max-w-6xl">
                    <h1 className="mb-8 text-4xl font-semibold text-[#1F2937]">
                        Product Catalog
                    </h1>

                    {/* Filters Section */}
                    <div className="mb-12 rounded-2xl bg-white p-6">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="mb-6">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-[#1F2937] placeholder-[#6B7280] focus:border-[#3B82F6] focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#3B82F6] px-6 py-3 font-semibold text-white transition-all hover:bg-blue-700"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Category Filter */}
                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                        />
                    </div>

                    {/* Products Grid */}
                    {products.data && products.data.length > 0 ? (
                        <>
                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                {products.data.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {products.links && (
                                <div className="mt-12 flex justify-center gap-2">
                                    {products.links.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.url}
                                            className={`rounded-lg px-3 py-2 ${link.active
                                                    ? 'bg-[#3B82F6] text-white'
                                                    : 'bg-white text-[#1F2937] hover:bg-[#F5F5F7]'
                                                }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="rounded-2xl bg-white py-12 text-center">
                            <p className="text-lg text-[#6B7280]">
                                No products found. Try adjusting your filters.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    );
}
