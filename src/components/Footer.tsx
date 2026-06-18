'use client';

import React from 'react';
import Link from 'next/link';

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ background: '#0d0d14', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>

            {/* Main content */}
            <div className="mx-auto w-full lg:max-w-[85%] px-4 pt-8 pb-4">
                <div className="lg:flex lg:justify-between gap-12">

                    {/* Brand + mô tả */}
                    <div className="mb-8 lg:mb-0 lg:max-w-[480px]">
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <span className="font-extrabold text-2xl italic" style={{
                                background: 'linear-gradient(90deg, #0079CE, #4D148c)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                ProductShowcase
                            </span>
                        </Link>
                        <p className="text-[0.8rem] text-[#ffffff99] mt-3 leading-relaxed">
                            Hệ thống quản lý và trưng bày sản phẩm nội bộ. Dữ liệu chỉ dùng cho mục đích demo và phát triển.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-10 sm:gap-16">
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-4">Điều hướng</h3>
                            <ul className="flex flex-col gap-2.5 text-[0.8rem] text-[#ffffff99]">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products?category=Electronics" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Electronics
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products?category=Accessories" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Accessories
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-sm mb-4">Tài khoản</h3>
                            <ul className="flex flex-col gap-2.5 text-[0.8rem] text-[#ffffff99]">
                                <li>
                                    <Link href="/login" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Đăng nhập
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                                        Quản lý sản phẩm
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />

            {/* Bottom bar */}
            <div className="mx-auto w-full lg:max-w-[85%] px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[0.75rem] text-[#ffffff66]">
                    © {year}{' '}
                    <Link href="/" className="hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                        ProductShowcase
                    </Link>
                    {' '}| Demo project
                </span>

                {/* Social icons — giữ cấu trúc như Animeflix footer */}
                <div className="flex items-center gap-4 text-[#ffffff66]">
                    <Link
                        href="https://github.com"
                        target="_blank"
                        className="hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        className="hover:text-white transition-colors"
                    >
                        <svg className="w-[22px] h-[22px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4v13h-4v-13zM8.5 8.5h3.58v1.78h.05c.5-.95 1.73-1.95 3.57-1.95 3.82 0 4.53 2.5 4.53 5.75v6.42h-4v-5.68c0-1.35-.03-3.1-1.9-3.1-1.9 0-2.19 1.48-2.19 3v5.78h-4v-13z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;