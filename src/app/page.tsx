import { MotionDiv } from '@/utils/MotionDiv'
import Link from 'next/link';
import Herosection from '@/components/home/Herosection';
import ProductCards from '@/components/CardComponent/ProductCards';
import { Product } from '@/lib/types';
import Navbarcomponent from '@/components/navbar/Navbar'

async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch('http://localhost:3000/api/product', {
            next: { revalidate: 60 },
            cache: 'no-store'
        });
        const json = await res.json();
        return json.data || [];
    } catch (error) {
        console.error("Fetch lỗi:", error);
        return [];
    }
}

// Chuyển component thành async function
export default async function HomePage() {

    const products = await getProducts();

    return (
        <div style={{ minHeight: '100vh', background: '#0a0a0f', fontFamily: 'Inter, sans-serif' }}>
            {/* <Navbar /> */}
            <Navbarcomponent />

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