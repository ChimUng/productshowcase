import React from 'react';
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

const Page = () => {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '16px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                padding: '40px 36px',
            }}>
                {/* Brand */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        fontStyle: 'italic',
                        color: '#0079CE',
                        margin: 0,
                    }}>HealthPro</h1>
                    <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>
                        Đăng nhập để tiếp tục
                    </p>
                </div>

                <LoginForm />

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Link href='/signup?role=PATIENT' style={{
                        fontSize: '13px',
                        color: '#0079CE',
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