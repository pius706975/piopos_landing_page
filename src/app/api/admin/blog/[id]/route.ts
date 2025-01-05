import { getDetailPostService } from '@/app/api/modules/blog/blog.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const { pathname } = req.nextUrl;
        const id = pathname.split('/')[pathname.split('/').length - 1];

        const detailPost = await getDetailPostService(id);

        return NextResponse.json(
            {
                status: 200,
                message: 'Successfully fetched the post',
                data: detailPost,
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Error in signUpAdmin route:', error);
        return NextResponse.json(
            { status: 500, message: error.message },
            { status: 500 },
        );
    }
}
