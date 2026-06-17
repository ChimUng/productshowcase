import { Inter } from 'next/font/google'
import './globals.css'
import { NextUiProvider } from "./NextUiProvider"; // Hoặc file Providers trung gian của bạn
import { Toaster } from 'sonner'

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
      <body className={inter.className}>
        <NextUiProvider>
          {children}
          <Toaster richColors={true} closeButton={true} />
        </NextUiProvider>
      </body>
    </html>
  )
}