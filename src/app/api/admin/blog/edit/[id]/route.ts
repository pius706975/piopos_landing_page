import { authMiddleware } from "@/middlewares/auth.middleware";
import { updatePostService } from "@/app/api/modules/blog/blog.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const {id: userId} = authResult

        const { pathname } = req.nextUrl;
        const id = pathname.split('/')[pathname.split('/').length - 1];

        const {title, description} = await req.json();

        const updatedPost = await updatePostService(id, title, description, userId);

        return NextResponse.json(
            { status: 200, message: 'Success fully updated the post', data: updatedPost },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error in update the post route:', error);
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