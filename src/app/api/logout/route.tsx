import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json(
      {
        success: true,
        message: "Đăng xuất thành công",
      },
      { status: 200 }
    );

    // XÓA COOKIE: Đặt lại maxAge bằng 0 để trình duyệt lập tức hủy bỏ cookie này
    response.cookies.set("showcase-token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, 
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi hệ thống phía Server" },
      { status: 500 }
    );
  }
}