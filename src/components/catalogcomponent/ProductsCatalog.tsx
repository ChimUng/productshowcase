'use client';

import React, { useState, useEffect } from 'react';
import { Accordion, AccordionItem, Select, SelectItem, RadioGroup, Radio, Input, Button } from "@nextui-org/react";
import Searchcard from './Searchcard';
import { categoryOptions, sortbyOptions, ratingOptions, priceRangeOptions } from './options';

function ProductsCatalog({ searchParams }: { searchParams: any }) {
    // States bộ lọc tương đương hệ thống Animeflix
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [sortbyvalue, setSortbyvalue] = useState<string | null>(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<string | null>(null);
    const [searchvalue, setSearchvalue] = useState<string>('');
    
    // States cho khoảng giá tự nhập tay
    const [minPrice, setMinPrice] = useState<string>('');
    const [maxPrice, setMaxPrice] = useState<string>('');
    
    // Quản lý hiển thị thanh bộ lọc ẩn trên thiết bị di động
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

    // Đồng bộ hóa ngược từ URL nếu có dữ liệu truyền vào ban đầu
    useEffect(() => {
        if (searchParams?.search) setSearchvalue(searchParams.search);
        if (searchParams?.category) setSelectedCategory(searchParams.category);
        if (searchParams?.sortby) setSortbyvalue(searchParams.sortby);
    }, [searchParams]);

    // Hàm dọn dẹp nhanh tất cả bộ lọc về trạng thái trống (Thùng rác)
    const resetFilters = () => {
        setSelectedCategory(null);
        setSortbyvalue(null);
        setSelectedPriceRange(null);
        setSelectedRating(null);
        setSearchvalue('');
        setMinPrice('');
        setMaxPrice('');
    };

    // Khi người dùng tự gõ khoảng giá, hủy kích hoạt ô chọn nhanh mẫu sẵn
    const handleCustomPriceChange = (type: 'min' | 'max', val: string) => {
        setSelectedPriceRange(null); // Xóa check mẫu sẵn
        if (type === 'min') setMinPrice(val);
        if (type === 'max') setMaxPrice(val);
    };

    // Lớp giao diện cấu hình chung để áp dụng hiệu ứng Highlight Màu Chủ Đạo (Blue #0079CE)
    const customSelectClasses = {
        trigger: "bg-[#16161f] border border-white/5 hover:border-[#0079CE]/50 transition-colors rounded-xl text-white",
        popoverContent: "bg-[#16161f] border border-white/10 rounded-xl text-white",
        listbox: "p-1",
    };

    const filterFormContent = () => (
        <div className="flex flex-col gap-5">
            {/* Nhóm lọc Khoảng Giá */}
            <Accordion isCompact variant="splitted" defaultExpandedKeys={['price']} className="px-0">
                <AccordionItem 
                    key="price" 
                    aria-label="Price Filter" 
                    title={<span className="text-sm font-semibold text-[#d1d7e0]">Khoảng Giá</span>}
                    classNames={{ content: "pb-4 flex flex-col gap-3", heading: "bg-[#16161f] rounded-xl px-2" }}
                >
                    <RadioGroup
                        value={selectedPriceRange || ""}
                        onValueChange={(val) => {
                            setSelectedPriceRange(val);
                            setMinPrice(''); // Xóa khoảng giá tự nhập để ưu tiên mẫu chọn
                            setMaxPrice('');
                        }}
                    >
                        {priceRangeOptions.map((p) => (
                            <Radio 
                                value={p.value} 
                                key={p.value}
                                classNames={{
                                    label: `text-xs ${selectedPriceRange === p.value ? "text-[#0079CE] font-bold" : "text-gray-400"}`
                                }}
                            >
                                {p.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                    
                    <div className="divider text-[10px] text-gray-600 font-medium text-center border-t border-white/5 pt-2">HOẶC TỰ NHẬP</div>
                    <div className="flex gap-2 items-center">
                        <Input 
                            type="number" 
                            placeholder="Từ $" 
                            size="sm"
                            value={minPrice}
                            onValueChange={(val) => handleCustomPriceChange('min', val)}
                            classNames={{ inputWrapper: "bg-[#20202b] rounded-lg h-8" }}
                        />
                        <span className="text-gray-500 text-xs">-</span>
                        <Input 
                            type="number" 
                            placeholder="Đến $" 
                            size="sm"
                            value={maxPrice}
                            onValueChange={(val) => handleCustomPriceChange('max', val)}
                            classNames={{ inputWrapper: "bg-[#20202b] rounded-lg h-8" }}
                        />
                    </div>
                </AccordionItem>
            </Accordion>

            {/* Nhóm lọc Đánh giá Rating */}
            <Accordion isCompact variant="splitted" defaultExpandedKeys={['rating']} className="px-0">
                <AccordionItem 
                    key="rating" 
                    aria-label="Rating Filter" 
                    title={<span className="text-sm font-semibold text-[#d1d7e0]">Đánh Giá</span>}
                    classNames={{ content: "pb-3", heading: "bg-[#16161f] rounded-xl px-2" }}
                >
                    <RadioGroup value={selectedRating || ""} onValueChange={setSelectedRating}>
                        {ratingOptions.map((r) => (
                            <Radio 
                                value={r.value} 
                                key={r.value}
                                classNames={{
                                    label: `text-xs ${selectedRating === r.value ? "text-[#0079CE] font-bold" : "text-gray-400"}`
                                }}
                            >
                                {r.name}
                            </Radio>
                        ))}
                    </RadioGroup>
                </AccordionItem>
            </Accordion>
        </div>
    );

    return (
        <div className="w-full text-white bg-[#0a0a0f] min-height-100vh py-4">
            
            {/* THANH ĐIỀU HƯỚNG TRÊN (DESKTOP BAR / MOBILE SEARCH) */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6 w-full">
                
                {/* Khung ô tìm kiếm chính */}
                <div className="w-full md:max-w-md flex gap-2">
                    <Input
                        type="text"
                        aria-label="Search items"
                        placeholder="Tìm kiếm sản phẩm ở đây..."
                        value={searchvalue}
                        onValueChange={setSearchvalue}
                        classNames={{ inputWrapper: "bg-[#16161f] border border-white/5 rounded-xl h-11" }}
                        startContent={
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        }
                    />
                    
                    {/* Nút bấm mở nhanh bộ lọc trên giao diện Mobile */}
                    <Button 
                        isIconOnly 
                        className="md:hidden bg-[#16161f] rounded-xl text-white border border-white/5"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <svg className="w-5 h-5 text-[#0079CE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </Button>

                    {/* Nút xóa nhanh tất cả bộ lọc (Icon Thùng rác) */}
                    <Button 
                        isIconOnly 
                        className="bg-[#16161f] rounded-xl border border-white/5 hover:bg-red-950/30 group transition-colors"
                        onClick={resetFilters}
                        aria-label="Clear all filters"
                    >
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v6m-4-6h4m-6 0h8" />
                        </svg>
                    </Button>
                </div>

                {/* KHU VỰC CÁC Ô SELECT CHỈ XUẤT HIỆN TRÊN MÀN HÌNH LỚN */}
                <div className="hidden md:flex items-center gap-4 w-full md:w-auto">
                    {/* Select Chọn Danh Mục */}
                    <Select
                        labelPlacement="outside"
                        aria-label="Select category"
                        placeholder="Tất cả danh mục"
                        selectedKeys={selectedCategory ? [selectedCategory] : []}
                        className="w-52"
                        classNames={customSelectClasses}
                        onSelectionChange={(keys) => {
                            const selectedStr = (keys as any).anchorKey || Array.from(keys)[0] || null;
                            setSelectedCategory(selectedStr);
                        }}
                    >
                        {categoryOptions.map((cat) => (
                            <SelectItem 
                                key={cat.value} 
                                textValue={cat.name}
                                className="data-[selected=true]:bg-[#0079CE] data-[selected=true]:text-white data-[hover=true]:bg-[#0079CE]/20 transition-colors"
                            >
                                {cat.name}
                            </SelectItem>
                        ))}
                    </Select>

                    {/* Select Sắp Xếp Theo Tiêu Chí */}
                    <Select
                        labelPlacement="outside"
                        aria-label="Sort options"
                        placeholder="Sắp xếp theo"
                        selectedKeys={sortbyvalue ? [sortbyvalue] : []}
                        className="w-52"
                        classNames={customSelectClasses}
                        onSelectionChange={(keys) => {
                            const selectedStr = (keys as any).anchorKey || Array.from(keys)[0] || null;
                            setSortbyvalue(selectedStr);
                        }}
                    >
                        {sortbyOptions.map((item) => (
                            <SelectItem 
                                key={item.value} 
                                textValue={item.name}
                                className="data-[selected=true]:bg-[#0079CE] data-[selected=true]:text-white data-[hover=true]:bg-[#0079CE]/20 transition-colors"
                            >
                                {item.name}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>

            {/* BỘ LỌC DẠNG DROPDOWN KHI CLICK TRÊN MOBILE */}
            {isMobileMenuOpen && (
                <div className="md:hidden w-full bg-[#11111a] border border-white/5 rounded-2xl p-4 mb-6 flex flex-col gap-4 animate-fade-in">
                    {/* Hàng 1: Danh mục và Sắp xếp nằm cạnh nhau */}
                    <div className="grid grid-cols-2 gap-3">
                        <Select
                            labelPlacement="outside"
                            aria-label="Select category mobile"
                            placeholder="Danh mục"
                            selectedKeys={selectedCategory ? [selectedCategory] : []}
                            classNames={customSelectClasses}
                            onSelectionChange={(keys) => setSelectedCategory((keys as any).anchorKey || Array.from(keys)[0] || null)}
                        >
                            {categoryOptions.map((cat) => (
                                <SelectItem key={cat.value} className="data-[selected=true]:bg-[#0079CE] data-[hover=true]:bg-[#0079CE]/20">{cat.name}</SelectItem>
                            ))}
                        </Select>

                        <Select
                            labelPlacement="outside"
                            aria-label="Sort options mobile"
                            placeholder="Sắp xếp"
                            selectedKeys={sortbyvalue ? [sortbyvalue] : []}
                            classNames={customSelectClasses}
                            onSelectionChange={(keys) => setSortbyvalue((keys as any).anchorKey || Array.from(keys)[0] || null)}
                        >
                            {sortbyOptions.map((item) => (
                                <SelectItem key={item.value} className="data-[selected=true]:bg-[#0079CE] data-[hover=true]:bg-[#0079CE]/20">{item.name}</SelectItem>
                            ))}
                        </Select>
                    </div>

                    {/* Hàng 2 & Hàng 3: Khung Giá và Đánh giá chiếm trọn dòng */}
                    <div className="w-full flex flex-col gap-4 border-t border-white/5 pt-3">
                        {filterFormContent()}
                    </div>
                </div>
            )}

            {/* BỐ CỤC CHÍNH CHIA HAI BÊN (DESKTOP VIEW) */}
            <div className="flex gap-5 items-start w-full">
                
                {/* CỘT TRÁI: Accordion hiển thị cố định trên Desktop */}
                <div className="hidden md:block w-[240px] flex-shrink-0 sticky top-4">
                    {filterFormContent()}
                </div>

                {/* CỘT PHẢI: Hiển thị lưới sản phẩm Searchcard */}
                <div className="w-full">
                    <Searchcard
                        searchvalue={searchvalue}
                        categoryvalue={selectedCategory}
                        sortbyvalue={sortbyvalue}
                        priceRange={selectedPriceRange}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        ratingvalue={selectedRating}
                    />
                </div>
            </div>

        </div>
    );
}

export default ProductsCatalog;