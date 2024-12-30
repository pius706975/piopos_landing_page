import Admin from '@/database/admin.model';
import { connectToDatabase } from '@/utils/mongoose';

export const createAdmin = async (adminData: {
    name: string;
    username: string;
    email: string;
    password: string;
}) => {
    connectToDatabase();

    const newAdmin = new Admin(adminData);
    return await newAdmin.save();
};
