import { verifyJWT } from './jwt.service';
import { NextRequest, NextResponse } from 'next/server';

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const decodeToken = async (header: string | undefined) => {
    if (!header) {
        throw new CustomError('Authorization header missing', 401);
    }

    const token = header.replace('Bearer ', '');
    const payload = await verifyJWT(token, jwtSecret as string);
    return payload;
};

export const authMiddleware = async (req: NextRequest) => {
    try {
        const authHeader =
            req.headers.get('Authorization') ||
            req.headers.get('authorization');
        if (!authHeader) {
            return NextResponse.json(
                { message: 'Authorization header missing' },
                { status: 401 },
            );
        }

        const decoded = await decodeToken(authHeader);
        return decoded;
    } catch (error: any) {
        return NextResponse.json(
            { message: error.message || 'Unauthorized' },
            { status: 401 },
        );
    }
};

class CustomError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
