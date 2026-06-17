import { useState } from 'react'

export const useAuthAction = () => {
    const [loading, setLoading] = useState(false)

    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            // TODO: Thêm logic đăng nhập thực tế
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            console.log('Login successful:', data)
        } catch (error) {
            console.error('Login error:', error)
        } finally {
            setLoading(false)
        }
    }

    return { login, loading }
}
