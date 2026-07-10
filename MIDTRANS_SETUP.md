# Astro E-Commerce Setup Guide

## Environment Variables untuk Midtrans

Setelah clone/pull project, Anda perlu mengatur Midtrans configuration di file `.env`.

### Cara Mendapatkan Midtrans Keys

1. **Buat akun Midtrans** di https://dashboard.midtrans.com
2. Login ke dashboard Midtrans
3. Navigasi ke **Settings > API Keys** (atau **Konfigurasi** di beberapa versi)
4. Anda akan melihat:
   - **Server Key** (untuk backend)
   - **Client Key** (untuk frontend)
5. Copy masing-masing key

### Konfigurasi di `.env`

Buka file `.env` di root project dan tambahkan/update bagian Midtrans:

```env
# Midtrans Payment Gateway
MIDTRANS_SERVER_KEY=your_server_key_here
MIDTRANS_CLIENT_KEY=your_client_key_here
MIDTRANS_IS_PRODUCTION=false
VITE_MIDTRANS_CLIENT_KEY=your_client_key_here
```

**Penjelasan:**

- `MIDTRANS_SERVER_KEY`: Server key dari dashboard Midtrans (untuk generate Snap token dari backend)
- `MIDTRANS_CLIENT_KEY`: Client key dari dashboard Midtrans (untuk frontend library Midtrans Snap)
- `MIDTRANS_IS_PRODUCTION`: Set ke `false` untuk sandbox/testing, `true` untuk production
- `VITE_MIDTRANS_CLIENT_KEY`: Sama dengan client key, untuk frontend (prefixed VITE_ agar bisa diakses di React)

### Contoh (Sandbox - untuk testing):

```env
MIDTRANS_SERVER_KEY=SB-Mid-server-xxxxxxxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=false
VITE_MIDTRANS_CLIENT_KEY=SB-Mid-client-xxxxxxxxxxxxxxxxxx
```

### Contoh (Production):

```env
MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxxxxxxxx
MIDTRANS_IS_PRODUCTION=true
VITE_MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxxxxxxxx
```

## Setup Database

1. Jalankan migrations dan seeders:

```bash
php artisan migrate:fresh --seed
```

Ini akan membuat semua tabel (users, categories, products, carts, orders, etc.) dan mengisi dengan data dummy.

## Development Server

Jalankan Laravel development server:

```bash
php artisan serve
```

Untuk frontend development (watch CSS & JS changes):

```bash
npm run dev
# atau
pnpm dev
```

Untuk production build:

```bash
npm run build
# atau
pnpm build
```

## Fitur yang Sudah Diimplementasi

✅ **Database & Models**
- Categories, Products, Carts, CartItems, Orders, OrderItems
- Relationships dan casting (decimal untuk harga)

✅ **Backend Controllers & Routes**
- `ProductController`: Catalog dengan filter kategori & search
- `CartController`: Add/remove/update qty di keranjang
- `OrderController`: Checkout & order creation
- `PaymentController`: Midtrans webhook handling

✅ **Frontend Pages & Components**
- Home (landing page e-commerce)
- Catalog (dengan filter dan search)
- Product Detail
- Shopping Cart
- Checkout
- Payment Result (success/pending/failed)
- Navbar, Product Cards, Category Filter, Footer, Product Gallery

✅ **Midtrans Integration**
- Generate Snap token saat checkout
- Midtrans Snap popup untuk pembayaran
- Webhook handler untuk update order status
- Environment variables setup

✅ **Design & Styling**
- Tailwind CSS dengan palet warna minimalis (abu-abu muda, white, blue accent)
- Border radius 16-20px, subtle shadows
- Responsive design (mobile, tablet, desktop)
- Hover effects dan animations

## Testing Pembayaran (Sandbox)

Midtrans sandbox menyediakan test card numbers:

**Credit Card (Success):**
- Number: 4811111111111114
- Expiry: 12/25 (or future date)
- CVV: 123

**Credit Card (Failed):**
- Number: 4111111111111113
- Expiry: 12/25
- CVV: 123

Detail lebih lanjut: https://midtrans.com/en/developers

## File Structure

```
app/
├── Http/Controllers/
│   ├── ProductController.php
│   ├── CartController.php
│   ├── OrderController.php
│   └── PaymentController.php
├── Models/
│   ├── Product.php
│   ├── Category.php
│   ├── Cart.php
│   ├── CartItem.php
│   ├── Order.php
│   └── OrderItem.php

resources/
├── js/
│   ├── pages/
│   │   ├── home.tsx
│   │   ├── catalog.tsx
│   │   ├── product-detail.tsx
│   │   ├── cart.tsx
│   │   ├── checkout.tsx
│   │   └── payment-result.tsx
│   └── components/
│       ├── navbar.tsx
│       ├── product-card.tsx
│       ├── category-filter.tsx
│       ├── product-gallery.tsx
│       └── footer.tsx

database/
├── migrations/
│   ├── *_create_categories_table.php
│   ├── *_create_products_table.php
│   ├── *_create_carts_table.php
│   ├── *_create_cart_items_table.php
│   ├── *_create_orders_table.php
│   └── *_create_order_items_table.php
└── seeders/
    ├── CategorySeeder.php
    ├── ProductSeeder.php
    └── DatabaseSeeder.php

routes/
└── web.php (updated dengan e-commerce routes)

config/
├── services.php (Midtrans configuration)
└── ...
```

## Troubleshooting

**Q: Frontend tidak bisa connect ke backend API**
A: Pastikan CSRF token sudah ada di `<meta name="csrf-token">` di app.blade.php

**Q: Midtrans Snap tidak muncul saat checkout**
A: Cek console browser (F12 > Console) untuk error. Pastikan `VITE_MIDTRANS_CLIENT_KEY` sudah di `.env` dan `npm run build` sudah dijalankan.

**Q: Database error saat jalankan migrate**
A: Pastikan file `database/database.sqlite` bisa di-write, atau delete dan jalankan ulang `php artisan migrate:fresh --seed`

**Q: Produk tidak muncul di home/catalog**
A: Pastikan sudah jalankan `php artisan migrate:fresh --seed` untuk populate database.

## Next Steps

1. Update `/about`, `/contact`, `/faq` pages (opsional)
2. Implementasi order history & user account page
3. Email notifications saat order berhasil/gagal
4. Admin dashboard untuk manage products, orders, etc.
5. Reviews & ratings untuk produk
6. Wishlist feature

---

**Created:** July 2026
**Framework:** Laravel 13 + React (Inertia.js) + Tailwind CSS
**Payment:** Midtrans (Snap)
