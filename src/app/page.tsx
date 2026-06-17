'use client';

import { useState, useEffect } from 'react';
import { MotionDiv } from '@/utils/MotionDiv'
import Link from 'next/link';
import Herosection from '@/components/home/Herosection';
import ProductCards from '@/components/CardComponent/ProductCards';
import { Product } from '@/lib/types';

// Swap này ra fetch('/api/product') khi cần
const MOCK_PRODUCTS: Product[] = [
    { id: 1, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD', price: 1299.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop', stock: 15, rating: 4.5 },
    { id: 2, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with 2.4GHz receiver', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=600&fit=crop', stock: 50, rating: 4.2 },
    { id: 3, name: '4K Monitor', description: '27 inch 4K UHD display with HDR support', price: 599.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=600&fit=crop', stock: 8, rating: 4.7 },
    { id: 4, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with Cherry MX switches', price: 89.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=1200&h=600&fit=crop', stock: 25, rating: 4.6 },
    { id: 5, name: 'USB-C Cable', description: 'High-speed USB-C charging and data transfer cable', price: 12.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop', stock: 100, rating: 4.0 },
    { id: 6, name: 'Laptop Pro', description: 'High-performance laptop with 16GB RAM and 512GB SSD', price: 1299.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=600&fit=crop', stock: 15, rating: 4.5 },
    { id: 7, name: 'Wireless Mouse', description: 'Ergonomic wireless mouse with 2.4GHz receiver', price: 29.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=1200&h=600&fit=crop', stock: 50, rating: 4.2 },
    { id: 8, name: '4K Monitor', description: '27 inch 4K UHD display with HDR support', price: 599.99, category: 'Electronics', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&h=600&fit=crop', stock: 8, rating: 4.7 },
    { id: 9, name: 'Mechanical Keyboard', description: 'RGB mechanical keyboard with Cherry MX switches', price: 89.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=1200&h=600&fit=crop', stock: 25, rating: 4.6 },
    { id: 10, name: 'USB-C Cable', description: 'High-speed USB-C charging and data transfer cable', price: 12.99, category: 'Accessories', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop', stock: 100, rating: 4.0 },
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // TODO: thay bằng fetch('/api/product') khi có API thật
        setProducts(MOCK_PRODUCTS);
    }, []);

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
            {/* <Navbar /> */}

            {/* Hero — floats under fixed navbar */}
            <Herosection data={products} />

            {/* Product row */}
            <MotionDiv
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="mx-auto mt-12 pb-16"
                style={{ maxWidth: '90%' }}
            >
                <ProductCards data={products} cardid="Sản phẩm nổi bật" />

                {/* View all */}
                <div className="mt-6 text-center">
                    <Link href="/products">
                        <button className="
                            relative px-8 py-2.5 rounded-full text-sm font-semibold
                            text-[#0079CE] hover:text-white
                            border border-[#0079CE]/40 hover:border-transparent
                            transition-all duration-300 ease-in-out
                            hover:scale-105
                            hover:shadow-[0_4px_16px_rgba(0,121,206,0.35)]
                            overflow-hidden
                            group
                        ">
                            {/* Gradient layer — ẩn mặc định, hiện khi hover */}
                            <span className="
                                absolute inset-0 rounded-full
                                bg-gradient-to-r from-[#0079CE] to-[#4D148c]
                                opacity-0 group-hover:opacity-100
                                transition-opacity duration-300
                            " />
                            {/* Text nằm trên gradient */}
                            <span className="relative z-10">Xem tất cả sản phẩm →</span>
                        </button>
                    </Link>
                </div>
            </MotionDiv>
        </div>
    );
}