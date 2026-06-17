'use client';

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Button } from "@nextui-org/react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu!');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Đăng nhập thành công!');
        router.push('/products');
        router.refresh();
      } else {
        toast.error(data.error || 'Đăng nhập thất bại.');
      }
    } catch (error) {
      toast.error('Lỗi kết nối hệ thống.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Toàn màn hình nền chuyển màu sặc sỡ, căn giữa form
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1e1b4b] via-[#4D148c] to-[#db2777] px-4">
      
      {/* Khung Form tĩnh - Nhận bo góc lg và mờ nền kính khi có plugin NextUI */}
      <Card className="w-full max-w-[400px] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-4" radius="lg">
        
        <CardHeader className="flex flex-col gap-1 items-center pt-6 pb-2">
          <h1 className="text-2xl font-extrabold text-white">Đăng Nhập</h1>
          <p className="text-xs text-purple-200/70">Hệ thống Product Showcase</p>
        </CardHeader>

        <CardBody className="flex flex-col gap-4 py-4">
          <Input
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            variant="bordered"
            radius="lg"
            className="text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <Input
            type="password"
            label="Mật khẩu"
            placeholder="••••••••"
            variant="bordered"
            radius="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
          />

          <Button
            className="w-full bg-white text-[#4D148c] font-bold mt-2 shadow-lg"
            size="lg"
            radius="lg"
            isLoading={isLoading}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </CardBody>

      </Card>
    </div>
  );
}