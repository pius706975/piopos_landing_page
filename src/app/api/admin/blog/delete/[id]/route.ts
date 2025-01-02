import { authMiddleware } from "@/middlewares/auth.middleware";
import { deletePostService } from "@/modules/blog/blog.service";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { pathname } = req.nextUrl;
        const id = pathname.split('/')[pathname.split('/').length - 1];

        await deletePostService(id);

        return NextResponse.json(
            { status: 200, message: 'Successfully deleted the post' },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error in delete route:', error);
        return NextResponse.json(
            { status: 500, message: error.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { status: 405, message: 'Method not allowed' },
        { status: 405 }
    );
}