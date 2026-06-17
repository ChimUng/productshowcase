'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/types';

interface HerosectionProps {
    data: Product[];
}

function Herosection({ data }: HerosectionProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fading, setFading] = useState(false);

    const goTo = (idx: number) => {
        if (idx === currentIndex) return;
        setFading(true);
        setTimeout(() => { setCurrentIndex(idx); setFading(false); }, 250);
    };

    const goToNext = () => {
        setFading(true);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + 1) % data.length);
            setFading(false);
        }, 250);
    };

    useEffect(() => {
        if (data.length <= 1) return;
        const t = setInterval(goToNext, 6000);
        return () => clearInterval(t);
    }, [data.length]);

    if (!data || data.length === 0) return null;

    const item = data[currentIndex];

    return (
        <div style={{ position: 'relative', width: '100%', height: '80vh', minHeight: '480px', overflow: 'hidden', background: '#0a0a0f' }}>

            {/* Background image */}
            <div 
                style={{
                    position: 'absolute', inset: 0,
                    // backgroundImage: `url(${item.image})`,
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    opacity: fading ? 0 : 1,
                    transition: 'opacity 0.4s ease',
                }}
            >
                <Image
                    src={item.image}
                    alt={item.name || "Product Image"}
                    priority={true}
                    loading="eager"
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
            </div>

            {/* Gradient overlay — 3 layers */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: `
                    linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 30%),
                    linear-gradient(180deg, rgba(0,0,0,0) 40%, #0a0a0f 100%),
                    linear-gradient(270deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 80%)
                `,
            }} />

            {/* Info panel */}
            <div style={{
                position: 'absolute', bottom: '80px', left: '7%', width: '45%', zIndex: 2,
                opacity: fading ? 0 : 1,
                transform: fading ? 'translateY(8px)' : 'translateY(0)',
                transition: 'opacity 0.35s ease, transform 0.35s ease',
            }}>
                {/* Eyebrow */}
                <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#0079CE' }}>
                    #{currentIndex + 1} · {item.category}
                </p>

                {/* Title */}
                <h1 className="font-bold text-white mb-3 leading-tight line-clamp-2" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}>
                    {item.name}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 flex-wrap mb-3">
                    <span className={`text-sm font-medium flex items-center gap-1.5 ${item.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25M9 12.25v4.5m3-4.75v4.5m3-5.25v4.5" />
                        </svg>
                        {item.stock > 0 ? `Còn ${item.stock} sản phẩm` : 'Hết hàng'}
                    </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-6 line-clamp-3" style={{ color: '#b0b0c0' }}>
                    {item.description}
                </p>

                {/* Price + CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-3xl font-extrabold" style={{
                        background: 'linear-gradient(90deg, #0079CE, #4D148c)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        ${item.price.toLocaleString()}
                    </span>

                    <Link href={`/products/${item.id}`}>
                        <button
                            className="px-6 py-2.5 rounded-full font-semibold text-sm text-white transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-[#0079CE] to-[#4D148c] hover:from-[#008be0] hover:to-[#5e1ca8]"
                            style={{
                                boxShadow: '0 4px 16px rgba(0,121,206,0.35)',
                                border: 'none',
                            }}
                        >
                            Xem chi tiết
                        </button>
                    </Link>

                    {/* <Link href="/products">
                        <button
                            className="px-6 py-2 rounded-full font-medium text-sm text-white transition-colors hover:bg-white/20"
                            style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(8px)',
                                border: '1px solid rgba(255,255,255,0.2)',
                            }}
                        >
                            Tất cả →
                        </button>
                    </Link> */}
                </div>
            </div>

            {/* Dots */}
            {data.length > 1 && (
                <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 3 }}
                    className="flex gap-2">
                    {data.map((_, i) => (
                        <span
                            key={i}
                            onClick={() => goTo(i)}
                            className={`block h-[10px] rounded-full cursor-pointer transition-all duration-300 transform 
                                ${i === currentIndex ? 'w-[28px]' : 'w-[10px] bg-white/40 hover:bg-white/80 hover:scale-125'}`}
                            style={{
                                width: i === currentIndex ? '28px' : '10px',
                                background: i === currentIndex
                                    ? 'linear-gradient(90deg, #0079CE, #4D148c)'
                                    : undefined,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Herosection;