"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuthAction } from "@/hooks/useAuthAction"
 
const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Vui lòng nhập email." })
        .email({ message: "Email không hợp lệ" }),
    password: z
        .string()
        .min(1, { message: "Vui lòng nhập mật khẩu." }),
})

const LoginForm = () => {
    const { login, loading } = useAuthAction()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await login(values.email, values.password)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="smartschoolbus@gmail.com"
                                    className="h-10 rounded-lg border-gray-300 focus:border-[#0079CE] focus:ring-[#0079CE]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                                Mật khẩu
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="••••••••"
                                    type="password"
                                    className="h-10 rounded-lg border-gray-300 focus:border-[#0079CE] focus:ring-[#0079CE]"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-xs" />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 mt-2 rounded-lg bg-[#0079CE] hover:bg-[#005fa3] text-white font-semibold cursor-pointer transition-colors"
                >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
            </form>
        </Form>
    )
}

export default LoginForm