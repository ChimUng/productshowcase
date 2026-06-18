'use client';

import React, { useEffect, useState } from "react";
import { Pagination } from "@nextui-org/react";
import ProductCard from "../CardComponent/ProductCard"; // Đường dẫn tới file ProductCard cũ của bạn
import { Product } from "@/lib/types";
import UseDebounce from "@/utils/UseDebounce";

interface SearchcardProps {
    searchvalue: string;
    selectedYear: string | null;
    categoryvalue: any[];
    sortbyvalue: string | null;
}

const Searchcard: React.FC<SearchcardProps> = ({
    searchvalue,
    selectedYear,
    categoryvalue,
    sortbyvalue,
}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[] | null>(null);
    const [lastpage, setLastpage] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const debouncedSearch = UseDebounce(searchvalue, 500);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, selectedYear, categoryvalue, sortbyvalue]);

    useEffect(() => {
        const fetchSearchProducts = async () => {
            setLoading(true);
            try {
                // Tách các giá trị category để gửi API
                const categories = categoryvalue.map(c => c.value).join(',');
                
                // Gọi API product showcase nội bộ của bạn thay vì hàm Anilist cũ
                const res = await fetch(
                    `/api/product?search=${debouncedSearch}&year=${selectedYear || ''}&category=${categories}&sort=${sortbyvalue || ''}&page=${currentPage}`
                );
                const json = await res.json();
                
                setProducts(json.data || []);
                setLastpage(json.lastPage || 1);
                setLoading(false);
            } catch (error) {
                console.error("Lỗi tìm kiếm sản phẩm:", error);
                setLoading(false);
            }
        };
        fetchSearchProducts();
    }, [debouncedSearch, selectedYear, categoryvalue, sortbyvalue, currentPage]);

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Không tìm thấy kết quả */}
            {!loading && products && products.length === 0 && (
                <div className="text-center w-full py-20 text-[#b0b0c0]">
                    <p className="text-xl font-medium">Rất tiếc!</p>
                    <p className="text-sm mt-1">Không tìm thấy sản phẩm nào phù hợp với từ khóa <span className="text-[#0079CE] font-semibold">&quot;{searchvalue}&quot;</span></p>
                </div>
            )}

            {/* Grid hiển thị danh sách Card */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
                {/* Trạng thái Skeleton Loading */}
                {loading &&
                    Array.from({ length: 10 }, (_, index) => (
                        <div key={index} className="w-[175px] h-[250px] rounded-xl bg-[#1a1a24] animate-pulse" />
                    ))
                }

                {/* Render danh sách sản phẩm bằng ProductCard */}
                {!loading && products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Phân trang đồng bộ màu Blue */}
            {!loading && lastpage > 1 && (
                <div className="flex justify-center mt-6">
                    <Pagination
                        total={lastpage}
                        page={currentPage}
                        onChange={setCurrentPage}
                        classNames={{
                            cursor: "bg-gradient-to-r from-[#0079CE] to-[#4D148c] text-white font-semibold",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Searchcard;