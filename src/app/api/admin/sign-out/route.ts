import { authMiddleware } from '@/middlewares/auth.middleware';
import { NextRequest, NextResponse } from 'next/server';
import { signOutAdminService } from '../../modules/auth/auth.service';

export async function POST(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { id: userId } = authResult;

        await signOutAdminService(userId);

        return NextResponse.json(
            { status: 200, message: 'Successfully signed out' },
            { status: 200 },
        );
    } catch (error: any) {
        console.log('Error in signOutAdmin route:', error);
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