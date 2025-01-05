import { getPostsService } from '@/app/api/modules/blog/blog.service';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const posts = await getPostsService();
        return NextResponse.json(
            { status: 200, message: 'Successfully fetched posts', data: posts },
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
