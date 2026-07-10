import { Link } from '@inertiajs/react';

export function CategoryFilter({ categories, selectedCategory }) {
    return (
        <div className="flex flex-wrap gap-2">
            <Link
                href="/catalog"
                className={`rounded-full px-4 py-2 font-semibold transition-all ${!selectedCategory
                        ? 'bg-[#3B82F6] text-white'
                        : 'border border-[#E5E7EB] text-[#1F2937] hover:border-[#3B82F6]'
                    }`}
            >
                All Products
            </Link>

            {categories.map((category) => (
                <Link
                    key={category.id}
                    href={`/catalog?category=${category.slug}`}
                    className={`rounded-full px-4 py-2 font-semibold transition-all ${selectedCategory === category.slug
                            ? 'bg-[#3B82F6] text-white'
                            : 'border border-[#E5E7EB] text-[#1F2937] hover:border-[#3B82F6]'
                        }`}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}
