import { NextRequest, NextResponse } from "next/server";
import { mockUsers } from "@/lib/mockData"; // Đảm bảo đường dẫn này đúng với dự án của bạn

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 1. Kiểm tra dữ liệu đầu vào
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email và mật khẩu là bắt buộc" },
        { status: 400 }
      );
    }

    // 2. Tìm kiếm user trong Mock Data
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "Email hoặc mật khẩu không chính xác" },
        { status: 401 }
      );
    }

    // 3. Tạo token giả lập (Base64)
    const token = Buffer.from(`${user.id}:${user.email}`).toString("base64");

    // Loại bỏ password trước khi trả về Client thông tin User
    const { password: _, ...userWithoutPassword } = user;

    // 4. Tạo Response và ĐÍNH KÈM COOKIE bảo mật
    const response = NextResponse.json(
      {
        success: true,
        message: "Đăng nhập thành công",
        user: userWithoutPassword,
      },
      { status: 200 }
    );

    // Cấu hình cookie lưu token vào trình duyệt
    response.cookies.set("showcase-token", token, {
      httpOnly: true, // Chống mã độc JavaScript đọc token (XSS)
      secure: process.env.NODE_ENV === "production", // Chỉ bật khi chạy HTTPS ở production
      sameSite: "lax", // Bảo mật chống tấn công CSRF tầm trung
      path: "/", // Cookie có hiệu lực cho toàn bộ trang web
      maxAge: 60 * 60 * 3, // Token có hiệu lực trong 3 tiếng (tính bằng giây)
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi hệ thống phía Server" },
      { status: 500 }
    );
  }
}