import { Link } from '@inertiajs/react';

export function ProductCard({ product }) {
    return (
        <Link href={`/products/${product.slug}`}>
            <div className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl">
                {/* Image */}
                <div className="relative overflow-hidden bg-[#F5F5F7] h-64">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Category Badge */}
                    {product.category && (
                        <span className="mb-2 inline-block rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#3B82F6]">
                            {product.category.name}
                        </span>
                    )}

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 font-semibold text-[#1F2937] group-hover:text-[#3B82F6]">
                        {product.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 line-clamp-2 text-sm text-[#6B7280]">
                        {product.description}
                    </p>

                    {/* Price & Stock */}
                    <div className="flex items-center justify-between">
                        <p className="text-lg font-bold text-[#1F2937]">
                            Rp {parseInt(product.price).toLocaleString('id-ID')}
                        </p>
                        <span
                            className={`text-xs font-semibold ${product.stock > 0
                                    ? 'text-green-600'
                                    : 'text-red-600'
                                }`}
                        >
                            {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
