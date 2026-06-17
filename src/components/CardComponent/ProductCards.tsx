'use client';

import { useRef, useState, useEffect } from 'react';
import { useDraggable } from 'react-use-draggable-scroll'; 
import { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductCardsProps {
    data: Product[];
    cardid: string;
}

function ProductCards({ data, cardid }: ProductCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // 2. Sử dụng hook của thư viện để lấy các event kéo chuột (MouseDown, MouseMove, MouseUp,...)
    const { events } = useDraggable(containerRef as React.MutableRefObject<HTMLDivElement>);

    // Các state điều khiển ẩn/hiển thị mũi tên điều hướng
    const [isLeftArrowActive, setIsLeftArrowActive] = useState(false);
    const [isRightArrowActive, setIsRightArrowActive] = useState(false);

    // Hàm kiểm tra vị trí cuộn để ẩn/hiện nút mũi tên
    const handleScroll = () => {
        const container = containerRef.current;
        if (container) {
            const scrollPosition = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;
            // Nếu cuộn qua 10px thì hiện mũi tên trái, nếu chưa cuộn kịch phải thì hiện mũi tên phải
            setIsLeftArrowActive(scrollPosition > 10);
            setIsRightArrowActive(scrollPosition < maxScroll - 10);
        }
    };

    // Theo dõi khi data nạp xong thì tính toán lại mũi tên ngay
    useEffect(() => {
        handleScroll();
        window.addEventListener('resize', handleScroll);
        return () => window.removeEventListener('resize', handleScroll);
    }, [data]);

    // Hàm cuộn mượt bằng nút bấm
    const smoothScroll = (amount: number) => {
        const container = containerRef.current;
        if (container) {
            container.scrollBy({
                left: amount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative group/arrows">
            {/* Tiêu đề danh mục sản phẩm */}
            <div className="flex items-center gap-2.5 mb-5">
                <span className="block w-[5px] h-7 rounded-md bg-gradient-to-b from-[#0079CE] to-[#4D148c]" />
                <h2 className="text-white text-xl font-semibold m-0">{cardid}</h2>
            </div>

            {/* MŨI TÊN TRÁI */}
            <button
                onClick={() => smoothScroll(-550)}
                className={`absolute left-[-15px] top-[50%] z-20 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-white/10 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg
                    ${isLeftArrowActive ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </button>

            {/* MŨI TÊN PHẢI */}
            <button
                onClick={() => smoothScroll(550)}
                className={`absolute right-[-15px] top-[50%] z-20 -translate-y-1/2 bg-black/70 hover:bg-black/90 border border-white/10 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg
                    ${isRightArrowActive ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-2'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
            </button>

            {/* THANH CUỘN CHỨA CARDS */}
            <div
                ref={containerRef}
                {...events} 
                onScroll={handleScroll} 
                className="flex gap-3 overflow-x-auto pb-4 select-none scrollbar-none scroll-smooth"
                style={{ cursor: 'grab' }}
            >
                {data.length > 0
                    ? data.map(p => <ProductCard key={p.id} product={p} />)
                    : Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="w-[175px] h-[250px] flex-shrink-0 rounded-xl bg-[#1a1a24] animate-pulse" />
                    ))
                }
            </div>
        </div>
    );
}

export default ProductCards;