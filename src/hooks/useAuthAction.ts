'use client'

import { useState } from 'react'
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export const useAuthAction = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const login = async (email: string, password: string) => {
        try {
            setLoading(true)

            // 1. Gọi trực tiếp đến API Router nội bộ của Product Showcase
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            // 2. Kiểm tra phản hồi dựa chính xác trên file route.tsx của bạn
            if (response.ok && data.success) {
                toast.success(data.message || 'Đăng nhập thành công.')
                
                // Trình duyệt tự nhận cookie "showcase-token" từ server trả về
                // Đẩy thẳng user vào trang danh sách sản phẩm
                router.push('/products')
                router.refresh()
            } else {
                // Hiển thị chính xác thông báo lỗi từ Mock Data (Ví dụ: "Email hoặc mật khẩu không chính xác")
                toast.error(data.error || 'Đăng nhập thất bại. Vui lòng thử lại.')
            }
        }
        catch (err: any) {
            console.error('Login error:', err)
            toast.error('Đã xảy ra lỗi kết nối hệ thống!')
        }
        finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        try {
            setLoading(true)
            // Gọi API logout (nếu bạn có viết route xóa cookie) hoặc xóa thủ công rồi về trang chủ
            await fetch('/api/logout', { method: 'POST' }).catch(() => {})
            toast.success('Hẹn gặp lại.')
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, login, logout }
}