import { Head, Link } from '@inertiajs/react';
import { ProductCard } from '@/components/product-card';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function Home({ products = [], categories = [] }) {
    const featuredProducts = products.slice(0, 6);

    return (
        <>
            <Head title="Home" />
            <Navbar />

            {/* Hero Section */}
            <section className="bg-[#F5F5F7] px-6 py-24 sm:px-12 lg:py-32">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="mb-6 text-5xl font-semibold text-[#1F2937] sm:text-6xl lg:text-7xl">
                        Adopt Your Own Star
                    </h1>
                    <p className="mb-10 text-xl text-[#6B7280] sm:text-2xl">
                        Discover our premium collection of celestial products and unique gifts for astronomy lovers.
                    </p>
                    <Link
                        href="/catalog"
                        className="inline-block rounded-2xl bg-[#3B82F6] px-10 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
                    >
                        Explore Catalog
                    </Link>
                </div>
            </section>

            {/* Categories Highlight */}
            <section className="bg-white px-6 py-16 sm:px-12 lg:py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-3xl font-semibold text-[#1F2937]">
                        Browse by Category
                    </h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/catalog?category=${category.slug}`}
                                className="group rounded-2xl bg-[#F5F5F7] p-8 text-center transition-all hover:bg-[#EFEFF1] hover:shadow-lg"
                            >
                                <h3 className="text-lg font-semibold text-[#1F2937] group-hover:text-[#3B82F6]">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="bg-[#EFEFF1] px-6 py-16 sm:px-12 lg:py-20">
                <div className="mx-auto max-w-6xl">
                    <h2 className="mb-12 text-center text-3xl font-semibold text-[#1F2937]">
                        Featured Collection
                    </h2>
                    <div className="mb-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="text-center">
                        <Link
                            href="/catalog"
                            className="inline-block rounded-2xl border-2 border-[#3B82F6] px-10 py-3 font-semibold text-[#3B82F6] transition-all hover:bg-[#3B82F6] hover:text-white"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Promo Banner */}
            <section className="bg-white px-6 py-16 sm:px-12 lg:py-20">
                <div className="mx-auto max-w-6xl rounded-2xl bg-gradient-to-r from-[#F5F5F7] to-[#EFEFF1] p-12 text-center">
                    <h3 className="mb-4 text-3xl font-semibold text-[#1F2937]">
                        Special Offer Coming Soon
                    </h3>
                    <p className="text-lg text-[#6B7280]">
                        Sign up for our newsletter to get exclusive offers and early access to new products.
                    </p>
                </div>
            </section>

            <Footer />
        </>
    );
}
