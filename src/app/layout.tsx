import { Inter } from 'next/font/google'
import './globals.css'
import { NextUiProvider } from "./NextUiProvider"; 
import { Toaster } from 'sonner'
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Product Showcase - Quản lý nội bộ",
  description: "Hệ thống quản lý sản phẩm chuyên nghiệp",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) { 
  return (
    // Bỏ chữ 'dark' đi, dùng chế độ thường để màu sắc hiển thị đúng tone sáng rực rỡ
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className} style={{ background: '#0a0a0f', minHeight: '100vh' }}>
        <NextTopLoader color="#0079CE" shadow="0 0 10px #0079CE, 0 0 5px #4D148c" />
        <NextUiProvider>
          {children}
          <Toaster richColors={true} closeButton={true} theme='dark'/>
        </NextUiProvider>
      </body>
    </html>
  )
}