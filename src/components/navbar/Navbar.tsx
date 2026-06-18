'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Avatar,
} from '@nextui-org/react';
import { useAuthAction } from '@/hooks/useAuthAction';

function Navbar() {
    const { logout, loading } = useAuthAction();
    const [isScrolled, setIsScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Đọc cookie cờ hiệu để biết trạng thái đăng nhập
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const check = () => {
            const loggedIn = document.cookie
                .split('; ')
                .some(c => c === 'showcase-logged-in=true');
            setIsLoggedIn(loggedIn);
        };
        check();
    }, []);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious();
        if (previous !== undefined && latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setIsScrolled(latest > 50);
    });

    const handleLogout = async () => {
        await logout(); 
        // Sau router.refresh() component mount lại → useEffect đọc cookie → isLoggedIn=false
    };

    return (
        <motion.nav
            variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] h-14"
            style={{
                background: isScrolled
                    ? 'rgba(10,10,15,0.85)'
                    : 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
                backdropFilter: isScrolled ? 'blur(12px)' : 'none',
                borderBottom: isScrolled ? 'rgba(255,255,255,0.06)' : 'none',
            }}
        >
            {/* Brand */}
            <Link href="/" className="font-extrabold text-lg italic no-underline" style={{
                background: 'linear-gradient(90deg, #0079CE, #4D148c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                ProductShowcase
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    // ── ĐÃ ĐĂNG NHẬP: hiện Avatar + menu Đăng xuất ──
                    <Dropdown
                        placement="bottom-end"
                        classNames={{
                            content: 'py-1 px-1 border border-default-200 bg-gradient-to-br dark:from-default-50 dark:to-black',
                        }}
                    >
                        <DropdownTrigger>
                            <Avatar
                                isBordered
                                as="button"
                                color="primary"
                                size="sm"
                                src="https://i.pravatar.cc/150"
                                className="transition-transform w-[27px] h-[27px] rounded-lg"
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                            <DropdownItem key="products">
                                <Link href="/products" className="w-full h-full block no-underline">
                                    Danh sách sản phẩm
                                </Link>
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                color="danger"
                                isDisabled={loading}
                                onClick={handleLogout}
                            >
                                <span className="font-semibold">
                                    {loading ? 'Đang xử lý...' : 'Đăng xuất'}
                                </span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                ) : (
                    // ── CHƯA ĐĂNG NHẬP: hiện nút Đăng nhập ──
                    <Link href="/login">
                        <button
                            className="px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
                            style={{ background: 'linear-gradient(90deg, #0079CE, #4D148c)' }}
                        >
                            Đăng nhập
                        </button>
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}

export default Navbar;