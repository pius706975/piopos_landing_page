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

export const getAdminProfile = async (id: string) => {
    connectToDatabase();
    return await Admin.findById(id);
};

export const updateAdminProfile = async (id: string, adminData: {
    name: string;
    username: string;
    email: string;
}) => {
    connectToDatabase();
    return await Admin.findByIdAndUpdate(id, adminData, { new: true });
};

export const updateAdminPassword = async (id: string, password: string) => {
    connectToDatabase();
    return await Admin.findByIdAndUpdate(id, { password }, { new: true });
}