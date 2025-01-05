import { createPostService } from '@/app/api/modules/blog/blog.service';
import { NextRequest, NextResponse } from 'next/server';
import { validateFields } from './validator';
import { authMiddleware } from '@/middlewares/auth.middleware';

export async function POST(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const {id: userId} = authResult

        const { title, description } = await req.json();

        const { isValid, message } = validateFields({
            title,
            description
        });
        if (!isValid) {
            return NextResponse.json({ status: 400, message }, { status: 400 });
        }

        const newPost = await createPostService(
            title,
            description,
            userId,
            userId,
        );

        return NextResponse.json(
            {
                status: 201,
                message: 'Successfully created new post',
                data: newPost,
            },
            { status: 201 },
        );
    } catch (error: any) {
        console.log('Error in createBlog route:', error);
        return NextResponse.json(
            { status: 500, message: error.message },
            { status: 500 },
        );
    }
}

export async function GET() {
    return NextResponse.json(
        { status: 405, message: 'Method not allowed' },
        { status: 405 },
    );
}
