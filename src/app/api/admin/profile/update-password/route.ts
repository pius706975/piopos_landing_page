import { authMiddleware } from '@/middlewares/auth.middleware';
import { NextRequest, NextResponse } from 'next/server';
import { validateFields } from './validator';
import { updateAdminPasswordService } from '@/app/api/modules/admin/admin.service';

export async function PUT(req: NextRequest) {
    try {
        const authResult = await authMiddleware(req);
        if (authResult instanceof NextResponse) {
            return authResult;
        }

        const { id: userId } = authResult;

        const { oldPassword, newPassword } = await req.json();

        const { isValid, message } = validateFields({
            oldPassword,
            newPassword,
        });

        if (!isValid) {
            return NextResponse.json({ status: 400, message }, { status: 400 });
        }

        const updatePassword = await updateAdminPasswordService(
            userId,
            oldPassword,
            newPassword,
        );

        return NextResponse.json(
            {
                status: 200,
                message: 'Successfully updated password',
                data: updatePassword,
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
