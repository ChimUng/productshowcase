'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Spinner } from "@nextui-org/react";
import { toast } from 'sonner';
import { useRouter, useParams } from 'next/navigation';
import type { Product } from '@/lib/mockData';

export default function ProductDetailPage() {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();
    const params = useParams();
    const productId = Array.isArray(params.id) ? params.id[0] : params.id;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/product/${productId}`);
                const data = await response.json();

                if (response.ok && data.success) {
                    setProduct(data.data);
                } else {
                    toast.error('Không tìm thấy sản phẩm');
                    router.push('/products');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Lỗi kết nối với server');
            } finally {
                setIsLoading(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Không tìm thấy sản phẩm</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Back button */}
                <Button
                    className="mb-6 bg-gray-200 text-gray-800"
                    onClick={() => router.back()}
                >
                    ← Quay Lại
                </Button>

                {/* Product detail card */}
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-col items-start px-6 py-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-600 bg-blue-200 px-3 py-1 rounded-full">{product.category}</p>
                    </CardHeader>

                    <CardBody className="flex flex-col gap-6 p-6">
                        {/* Description */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">Mô Tả</h2>
                            <p className="text-gray-700 leading-relaxed">{product.description}</p>
                        </div>

                        {/* Price and Rating */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Giá</p>
                                <p className="text-3xl font-bold text-blue-600">${product.price}</p>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Đánh Giá</p>
                                <p className="text-3xl font-bold text-yellow-600">⭐ {product.rating}</p>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="bg-green-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Tồn Kho</p>
                            <p className="text-2xl font-bold text-green-600">{product.stock} sản phẩm</p>
                            {product.stock > 0 ? (
                                <p className="text-sm text-green-700 mt-2">✓ Còn hàng</p>
                            ) : (
                                <p className="text-sm text-red-700 mt-2">✗ Hết hàng</p>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex gap-3 pt-4 border-t">
                            <Button
                                className={`flex-1 text-white font-medium ${
                                    product.stock > 0
                                        ? 'bg-[#4D148c]'
                                        : 'bg-gray-300 pointer-events-none'
                                }`}
                                disabled={product.stock === 0}
                            >
                                Thêm Vào Giỏ
                            </Button>
                            <Button
                                className="flex-1 bg-gray-200 text-gray-800 font-medium"
                                onClick={() => router.push('/products')}
                            >
                                Tiếp Tục Mua
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
