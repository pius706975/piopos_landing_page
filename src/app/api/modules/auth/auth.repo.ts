import Admin from '@/database/admin.model';
import { connectToDatabase } from '@/utils/mongoose';

export const findAdminByEmail = async (email: string) => {
    connectToDatabase();
    return await Admin.findOne({ email });
};

export const updateRefreshToken = async (adminId: string, refreshToken: string) => {
    connectToDatabase();
    return await Admin.findByIdAndUpdate(adminId, { refreshToken }, { new: true });
};

export const validateRefreshToken = async (refreshToken: string) => {
    connectToDatabase();
    return await Admin.findOne({ refreshToken });
};