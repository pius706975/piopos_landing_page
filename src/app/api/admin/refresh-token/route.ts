import { NextRequest, NextResponse } from 'next/server';
import { validateRefreshToken } from '@/app/api/modules/auth/auth.repo';
import { generateJWT, verifyJWT } from '@/middlewares/jwt.service';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

export async function POST(req: NextRequest) {
    try {
        const { refreshToken } = await req.json();
        if (!refreshToken) {
            return NextResponse.json(
                { status: 400, message: 'Refresh token is required' },
                { status: 400 },
            );
        }

        const admin = await validateRefreshToken(refreshToken);
        if (!admin) {
            return NextResponse.json(
                { status: 403, message: 'Invalid refresh token' },
                { status: 403 },
            );
        }

        const payload = await verifyJWT(refreshToken, REFRESH_TOKEN_SECRET);

        const accessToken = await generateJWT(
            { id: payload.id, email: payload.email, username: payload.username },
            ACCESS_TOKEN_SECRET,
            '5m',
        );

        return NextResponse.json(
            { status: 200, message: 'Access token refreshed', accessToken },
            { status: 200 },
        );
    } catch (error: any) {
        console.error('Error in refresh token route:', error);
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
