'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Spinner, Image } from "@nextui-org/react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/mockData';

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/product');
                const data = await response.json();

                if (response.ok && data.success) {
                    setProducts(data.data);
                } else {
                    toast.error('Lỗi tải danh sách sản phẩm');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                toast.error('Lỗi kết nối với server');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });

            if (response.ok) {
                toast.success('Đăng xuất thành công!');
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Error during logout:', error);
            toast.error('Lỗi đăng xuất');
        }
    };

    const handleViewDetail = (productId: number) => {
        router.push(`/products/${productId}`);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* Header với nút logout */}
            <div className="max-w-6xl mx-auto mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Danh Sách Sản Phẩm</h1>
                    <p className="text-gray-600 mt-1">Tổng: {products.length} sản phẩm</p>
                </div>
                <Button
                    className="bg-red-500 text-white"
                    onClick={handleLogout}
                >
                    Đăng Xuất
                </Button>
            </div>

            {/* Grid sản phẩm */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <Card key={product.id} className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-col items-start px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50">
                            <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                            <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-3">
                            <p className="text-gray-700 text-sm line-clamp-2">{product.description}</p>

                            <div className="flex justify-between items-center">
                                <span className="text-xl font-bold text-blue-600">${product.price}</span>
                                <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⭐ {product.rating}</span>
                            </div>

                            <div className="text-xs text-gray-500">
                                Tồn kho: <span className="font-semibold">{product.stock}</span>
                            </div>

                            <Button
                                className="w-full bg-[#4D148c] text-white font-medium"
                                onClick={() => handleViewDetail(product.id)}
                            >
                                Xem Chi Tiết
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {products.length === 0 && (
                <div className="max-w-6xl mx-auto text-center py-12">
                    <p className="text-gray-500 text-lg">Không có sản phẩm nào</p>
                </div>
            )}
        </div>
    );
}
