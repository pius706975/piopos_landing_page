import { generateJWT } from '@/middlewares/jwt.service';
import { findAdminByEmail, updateRefreshToken } from './auth.repo';
import bcrypt from 'bcrypt';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access_secret';
const REFRESH_TOKEN_SECRET =
    process.env.REFRESH_TOKEN_SECRET || 'refresh_secret';

export const signInAdminService = async (email: string, password: string) => {
    const admin = await findAdminByEmail(email);
    if (!admin) throw new Error('Email or password is incorrect');

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) throw new Error('Email or password is incorrect');

    const accessToken = await generateJWT(
        { id: admin._id, email: admin.email, username: admin.username },
        ACCESS_TOKEN_SECRET,
        '5m',
    );

    const refreshToken = await generateJWT(
        { id: admin._id, email: admin.email, username: admin.username },
        REFRESH_TOKEN_SECRET,
        '7d',
    );

    await updateRefreshToken(admin._id, refreshToken);

    return {
        data: admin,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
};

export const signOutAdminService = async (id: string) => {
    await updateRefreshToken(id, '');

    return;
};
