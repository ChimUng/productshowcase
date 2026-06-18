import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoginForm from "@/components/LoginForm";

const Page = () => {
    return (
        <main style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }}>
            {/* Background image — dùng Next.js Image như Herosection */}
            <Image
                src="/background-den-11.jpg"
                alt="Background"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'center', zIndex: 0 }}
            />

            {/* Overlay — tương tự herogradient của Herosection:
                - Lớp tối đều nhẹ để thấy ảnh
                - Không blur → ảnh rõ nét, form nổi bật */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 1,
                background: `
                    linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%),
                    linear-gradient(270deg, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.45) 100%)
                `,
            }} />

            {/* Login card */}
            <div style={{
                position: 'relative', zIndex: 2,
                width: '100%', maxWidth: '400px',
                margin: '0 16px',
                background: 'rgba(10,10,15,0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
                padding: '40px 36px',
            }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    {/* Accent bar — đồng bộ với ProductCards header bar */}
                    <div style={{
                        width: '40px', height: '4px', borderRadius: '99px', margin: '0 auto 16px',
                        background: 'linear-gradient(90deg, #0079CE, #4D148c)',
                    }} />
                    <h1 style={{
                        fontSize: '26px', fontWeight: 800, fontStyle: 'italic',
                        margin: 0,
                        background: 'linear-gradient(90deg, #0079CE, #4D148c)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        ProductShowcase
                    </h1>
                    <p style={{ fontSize: '13px', color: '#71717a', marginTop: '6px' }}>
                        Đăng nhập để tiếp tục
                    </p>
                </div>

                <LoginForm />

                <div style={{ textAlign: 'center', marginTop: '22px' }}>
                    <Link href='/register' style={{
                        fontSize: '13px', color: '#0079CE',
                        fontWeight: 500, textDecoration: 'none',
                    }}>
                        Chưa có tài khoản? Đăng ký ngay
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Page;