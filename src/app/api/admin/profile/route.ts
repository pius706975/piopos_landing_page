import { authMiddleware } from '@/middlewares/auth.middleware';
import { getAdminProfileService } from '@/modules/admin/admin.service';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { id: userId } = authResult;

        const user = await getAdminProfileService(userId);

        return NextResponse.json(
            {
                status: 200,
                message: 'Successfully fetched profile',
                data: user,
            },
            { status: 200 },
        );
    } catch (error: any) {
        console.log('error', error);
        return NextResponse.json(
            { status: 500, message: error.message },
            { status: 500 },
        );
    }
}
