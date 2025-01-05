import { authMiddleware } from '@/middlewares/auth.middleware';
import { updateAdminProfileService } from '@/modules/admin/admin.service';
import { NextRequest, NextResponse } from 'next/server';
import { validateFields } from './validator';

export async function PUT(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { id: userId } = authResult;

        const { name, username, email } = await req.json();

        const { isValid, message } = validateFields({ name, username, email});

        if (!isValid) {
            return NextResponse.json(
                { status: 400, message },
                { status: 400 }
            );
        }

        const updatedProfile = await updateAdminProfileService(
            userId,
            name,
            username,
            email,
        );

        return NextResponse.json(
            {
                status: 200,
                message: 'Successfully updated profile',
                data: updatedProfile,
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
