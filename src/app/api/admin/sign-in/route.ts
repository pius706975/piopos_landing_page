import { signInAdminService } from '@/app/api/modules/auth/auth.service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { status: 400, message: 'Email or password is required' },
                { status: 400 },
            );
        }

        const { accessToken, refreshToken, data } = await signInAdminService(
            email,
            password,
        );

        return NextResponse.json(
            {
                status: 200,
                message: 'Successfully signed in',
                data: { data, accessToken, refreshToken },
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Error in signInAdmin route:', error);
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
