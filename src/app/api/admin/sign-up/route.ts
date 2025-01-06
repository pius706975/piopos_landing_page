import { NextRequest, NextResponse } from 'next/server';
import { signUpAdminService } from '@/app/api/modules/admin/admin.service';
import { validateFields } from './validator';

export async function POST(req: NextRequest) {
    try {
        const { name, username, email, password } = await req.json();

        const { isValid, message } = validateFields({ name, username, email, password });
        if (!isValid) {
            return NextResponse.json(
                { status: 400, message },
                { status: 400 }
            );
        }

        await signUpAdminService(name, username, email, password);

        return NextResponse.json(
            { status: 201, message: 'success' },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('Error in signUpAdmin route:', error);
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
