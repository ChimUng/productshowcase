'use client';

import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        // 1. Validation cơ bản giống Feedbackform
        if (!email || !password) {
            toast.error('Vui lòng nhập đầy đủ email và mật khẩu!');
            return;
        }

        setIsLoading(true);
        try {
            // 2. Gọi API Login Mock quản lý bằng Cookie mà chúng ta đã thống nhất
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                toast.success('Đăng nhập thành công!');
                
                // Chuyển hướng người dùng sang trang danh sách sản phẩm
                router.push('/products'); 
                router.refresh(); // Làm mới lại trạng thái server để nhận cookie mới
            } else {
                toast.error(data.error || 'Đăng nhập thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Đã xảy ra lỗi kết nối hệ thống.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Toàn màn hình có nền hơi xám nhẹ, nội dung căn giữa tuyệt đối
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
            
            {/* Sử dụng Card của NextUI làm khung Login bọc ngoài giống thiết kế Form */}
            <Card className="w-full max-w-[400px] p-2 shadow-lg bg-white" radius="lg">
                
                {/* Phần tiêu đề */}
                <CardHeader className="flex flex-col gap-1 items-center pb-0 pt-6">
                    <h1 className="text-2xl font-bold text-gray-800">Đăng Nhập</h1>
                    <p className="text-small text-default-500">Hệ thống quản lý Product Showcase</p>
                </CardHeader>

                {/* Phần ô nhập liệu - Thừa hưởng cấu trúc từ Feedbackform */}
                <CardBody className="flex flex-col gap-4 py-6">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Nhập email của bạn"
                        variant="flat"
                        isRequired
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Input
                        type="password"
                        label="Mật khẩu"
                        placeholder="Nhập mật khẩu"
                        variant="flat"
                        isRequired
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleLogin();
                        }}
                    />
                </CardBody>

                {/* Phần nút bấm hành động */}
                <CardFooter className="flex flex-col gap-2 pt-0 pb-4">
                    <Button
                        // Tái sử dụng class kiểm tra disable và màu sắc #4D148c từ Feedbackform của bạn
                        className={`w-full text-white bg-[#4D148c] font-medium ${
                            !email || !password ? 'pointer-events-none opacity-50' : ''
                        }`}
                        radius="md"
                        size="lg"
                        isLoading={isLoading}
                        onClick={handleLogin}
                    >
                        Đăng Nhập
                    </Button>
                    
                    <div className="flex justify-between w-full text-xs text-gray-400 px-1 mt-1">
                        <span className="hover:underline cursor-pointer">Quên mật khẩu?</span>
                        <span>Mẹo: admin@gmail.com / 123456</span>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}