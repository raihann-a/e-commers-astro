import { Link } from '@inertiajs/react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[#E5E7EB] bg-[#F5F5F7]">
            <div className="px-6 py-12 sm:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Brand */}
                        <div>
                            <Link href="/" className="mb-4 inline-block">
                                <span className="text-2xl font-bold text-[#3B82F6]">✦ Astro</span>
                            </Link>
                            <p className="text-sm text-[#6B7280]">
                                Premium celestial products and unique gifts for astronomy lovers.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="mb-4 font-semibold text-[#1F2937]">Quick Links</h4>
                            <ul className="space-y-2 text-sm text-[#6B7280]">
                                <li>
                                    <Link href="/" className="hover:text-[#3B82F6]">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/catalog" className="hover:text-[#3B82F6]">
                                        Catalog
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Customer Service */}
                        <div>
                            <h4 className="mb-4 font-semibold text-[#1F2937]">Support</h4>
                            <ul className="space-y-2 text-sm text-[#6B7280]">
                                <li>
                                    <a href="mailto:support@astro.com" className="hover:text-[#3B82F6]">
                                        support@astro.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+62818xxxx" className="hover:text-[#3B82F6]">
                                        +62 818 XXXX XXXX
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Social & Legal */}
                        <div>
                            <h4 className="mb-4 font-semibold text-[#1F2937]">Legal</h4>
                            <ul className="space-y-2 text-sm text-[#6B7280]">
                                <li>
                                    <a href="#" className="hover:text-[#3B82F6]">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-[#3B82F6]">
                                        Terms of Service
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-[#E5E7EB] pt-8 text-center text-sm text-[#6B7280]">
                        <p>&copy; {currentYear} Astro. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
