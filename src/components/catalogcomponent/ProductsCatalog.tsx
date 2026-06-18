'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Accordion, AccordionItem, Select, SelectItem, RadioGroup, Radio, Input } from "@nextui-org/react";
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption, Transition } from '@headlessui/react';
import Searchcard from './Searchcard';

// Mock options mẫu cho Showcase (Bạn thay đổi data thực tế ở đây nhé)
const categoryOptions = [
    { name: "Bàn phím cơ", value: "keyboard" },
    { name: "Chuột Gaming", value: "mouse" },
    { name: "Tai nghe", value: "headphone" },
    { name: "Màn hình", value: "monitor" }
];

const sortbyOptions = [
    { name: "Giá: Thấp đến Cao", value: "price_asc" },
    { name: "Giá: Cao đến Thấp", value: "price_desc" },
    { name: "Mới nhất", value: "latest" }
];

const yearOptions = [
    { name: "2026", value: "2026" },
    { name: "2025", value: "2025" },
    { name: "2024", value: "2024" }
];

function Catalog({ searchParams }: { searchParams: any }) {
    const [selectedYear, setSelectedYear] = useState<string | null>(null);
    const [categoryvalue, setCategoryvalue] = useState<any[]>([]);
    const [sortbyvalue, setSortbyvalue] = useState<string | null>(null);
    const [searchvalue, setSearchvalue] = useState<string>('');
    const [query, setQuery] = useState<string>('');

    // Đồng bộ ngược từ URL params nếu có
    useEffect(() => {
        if (searchParams.search) setSearchvalue(searchParams.search);
        if (searchParams.year) setSelectedYear(searchParams.year);
        if (searchParams.sortby) setSortbyvalue(searchParams.sortby);
    }, [searchParams]);

    const resetValues = () => {
        setSelectedYear(null);
        setCategoryvalue([]);
        setSortbyvalue(null);
        setSearchvalue('');
    };

    const filteredCategories = query === '' 
        ? categoryOptions 
        : categoryOptions.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));

    return (
        <div className="w-full flex flex-col gap-6">
            
            {/* THANH ĐẦU TRANG: Ô Tìm kiếm + Bộ lọc nhanh trên Mobile */}
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between items-end bg-[#14141e] p-4 rounded-2xl border border-white/5 shadow-md">
                
                {/* Ô Search */}
                <div className="w-full md:w-1/3">
                    <p className="text-xs font-semibold text-[#0079CE] uppercase tracking-wider mb-2">Tìm kiếm</p>
                    <Input
                        type="text"
                        placeholder="Nhập tên sản phẩm..."
                        value={searchvalue}
                        onValueChange={setSearchvalue}
                        isClearable
                        autoComplete="off"
                        startContent={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        }
                    />
                </div>

                {/* Combobox Chọn Danh mục (Multi-select) */}
                <div className="w-full md:w-1/4 relative">
                    <p className="text-xs font-semibold text-[#0079CE] uppercase tracking-wider mb-2">Danh mục</p>
                    <Combobox value={categoryvalue} onChange={setCategoryvalue} multiple>
                        <div className="relative w-full cursor-default overflow-hidden rounded-xl text-left bg-[#27272a] sm:text-sm">
                            <ComboboxInput
                                className="w-full border-none py-2.5 pl-3 pr-10 text-sm bg-transparent text-white focus:ring-0 outline-none"
                                displayValue={(items: any[]) => items.map((item) => item.name).join(', ')}
                                placeholder="Tất cả danh mục"
                                onChange={(event) => setQuery(event.target.value)}
                            />
                            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-gray-400">
                                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 0 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </ComboboxButton>
                        </div>
                        <Transition afterLeave={() => setQuery('')}>
                            <ComboboxOptions className="absolute z-50 mt-1 max-h-[220px] w-full overflow-auto rounded-xl bg-[#18181b] p-1 text-base shadow-xl ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {filteredCategories.map((item) => (
                                    <ComboboxOption
                                        key={item.value}
                                        value={item}
                                        className={({ active }) => `relative cursor-pointer select-none py-2 pl-4 pr-4 rounded-lg ${active ? 'bg-[#0079CE]/20 text-[#0079CE]' : 'text-gray-300'}`}
                                    >
                                        {({ selected }) => <span className={`block truncate ${selected ? 'font-bold text-[#0079CE]' : 'font-normal'}`}>{item.name}</span>}
                                    </ComboboxOption>
                                ))}
                            </ComboboxOptions>
                        </Transition>
                    </Combobox>
                </div>

                {/* Select Sắp xếp */}
                <div className="w-full md:w-1/4">
                    <p className="text-xs font-semibold text-[#0079CE] uppercase tracking-wider mb-2">Sắp xếp</p>
                    <Select
                        placeholder="Mặc định"
                        selectedKeys={sortbyvalue ? [sortbyvalue] : []}
                        onSelectionChange={(keys) => setSortbyvalue((keys as any).anchorKey || null)}
                    >
                        {sortbyOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>{item.name}</SelectItem>
                        ))}
                    </Select>
                </div>

                {/* Nút Reset bộ lọc */}
                <button 
                    onClick={resetValues}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-400 border border-white/5 transition-all duration-200"
                    title="Xóa bộ lọc"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                </button>
            </div>

            {/* BỐ CỤC CHÍNH CHIA 2 BÊN */}
            <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 items-start">
                
                {/* BÊN TRÁI: Bộ lọc Accordion mở rộng (Chỉ hiện rõ trên màn hình lớn) */}
                <div className="hidden lg:flex flex-col gap-4">
                    <div className="bg-[#14141e] p-1 rounded-2xl border border-white/5">
                        <Accordion isCompact variant="splitted">
                            <AccordionItem key="year" title="Năm ra mắt" classNames={{ title: "text-sm font-medium text-white" }}>
                                <RadioGroup
                                    value={selectedYear}
                                    onValueChange={setSelectedYear}
                                    classNames={{ wrapper: "gap-2 pb-2" }}
                                >
                                    {yearOptions.map((year) => (
                                        <Radio 
                                            value={year.value} 
                                            key={year.value}
                                            classNames={{ label: "text-xs text-gray-400" }}
                                        >
                                            {year.name}
                                        </Radio>
                                    ))}
                                </RadioGroup>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                {/* BÊN PHẢI: Hiển thị danh sách kết quả tìm kiếm */}
                <div className="w-full">
                    <Searchcard
                        searchvalue={searchvalue}
                        selectedYear={selectedYear}
                        categoryvalue={categoryvalue}
                        sortbyvalue={sortbyvalue}
                    />
                </div>
            </div>

        </div>
    );
}

export default Catalog;