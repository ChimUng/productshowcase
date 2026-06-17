import React from 'react';
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const Page = () => {
    return (
        <main style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            {/* Blurred Background Image */}
            <div style={{
                position: 'absolute',
                top: -20,
                left: -20,
                right: -20,
                bottom: -20,
                backgroundImage: 'url("/background-den-11.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(10px)',
                zIndex: -2,
            }} />
            
            {/* Dark Overlay Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: -1,
            }} />

            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#18181B',
                border: '1px solid #27272a',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                padding: '40px 36px',
                zIndex: 1,
            }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        fontStyle: 'italic',
                        color: '#D14836',
                        margin: 0,
                    }}>HealthPro</h1>
                    <p style={{ fontSize: '13px', color: '#a1a1aa', marginTop: '4px' }}>
                        Đăng nhập để tiếp tục
                    </p>
                </div>

                <LoginForm />

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link href='/login' style={{
                        fontSize: '13px',
                        color: '#D14836',
                        fontWeight: '500',
                        textDecoration: 'none',
                    }}>
                        Chưa có tài khoản? Đăng ký ngay
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Page;