'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface ProductCardProps {
    product: Product;
}

function ProductCard({ product }: ProductCardProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link 
            href={`/products/${product.id}`} 
            className="no-underline flex-shrink-0 block rounded-xl overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                className={`w-[175px] bg-[#1a1a24] rounded-xl overflow-hidden transition-all duration-300 transform 
                    ${hovered ? '-translate-y-2 shadow-[0_8px_28px_rgba(0,121,206,0.25)]' : 'translate-y-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]'}`}
            >
                {/* Khu vực chứa Image tối ưu */}
                <div className="relative h-[180px] w-full overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="175px"
                        loading="lazy"
                        className={`object-cover transition-transform duration-500 ease-out ${hovered ? 'scale-105' : 'scale-100'}`}
                    />
                    
                    {/* Badge phân loại */}
                    <span className="absolute top-2 right-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#0079CE] to-[#4D148c]">
                        {product.category}
                    </span>
                </div>

                {/* Phần thông tin chữ bên dưới */}
                <div className="p-2.5">
                    <p className="text-[13px] font-medium leading-snug line-clamp-2 mb-1.5 text-[#d1d7e0]">
                        {product.name}
                    </p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-[#0079CE]">
                            ${product.price.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;