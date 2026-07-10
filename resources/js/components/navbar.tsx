import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export function Navbar() {
    const { auth } = usePage().props as any;
    const [cartCount, setCartCount] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // You could fetch cart count from backend here
        // For now, we'll just use 0
    }, []);

    return (
        <nav className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-6 py-4 shadow-sm sm:px-12">
            <div className="mx-auto flex max-w-6xl items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-[#3B82F6]">✦ Astro</span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/"
                        className="font-semibold text-[#1F2937] hover:text-[#3B82F6]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/catalog"
                        className="font-semibold text-[#1F2937] hover:text-[#3B82F6]"
                    >
                        Catalog
                    </Link>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-4">
                    {/* Cart Icon */}
                    {auth.user && (
                        <Link
                            href="/cart"
                            className="relative rounded-lg p-2 hover:bg-[#F5F5F7]"
                        >
                            <span className="text-2xl">🛒</span>
                            {cartCount > 0 && (
                                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* User Menu */}
                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-[#1F2937]">
                                    {auth.user.name}
                                </span>
                                <form method="POST" action="/logout" className="inline">
                                    <button
                                        type="submit"
                                        className="text-sm text-[#6B7280] hover:text-[#1F2937]"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-[#3B82F6] hover:bg-[#F5F5F7]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                    >
                        <span className="text-2xl">☰</span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t border-[#E5E7EB] pt-4 md:hidden">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="font-semibold text-[#1F2937] hover:text-[#3B82F6]"
                        >
                            Home
                        </Link>
                        <Link
                            href="/catalog"
                            className="font-semibold text-[#1F2937] hover:text-[#3B82F6]"
                        >
                            Catalog
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
