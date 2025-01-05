import bcrypt from 'bcrypt';
import { createAdmin, getAdminProfile, updateAdminPassword, updateAdminProfile } from './admin.repo';

export const signUpAdminService = async (
    name: string,
    username: string,
    email: string,
    password: string,
) => {
    const saltOrRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltOrRound);

    const adminData = {
        name,
        username,
        email,
        password: hashedPassword,
        role: 'admin',
    };

    return await createAdmin(adminData);
};

export const updateAdminProfileService = async (
    id: string,
    name: string,
    username: string,
    email: string,
) => {
    const adminData = {
        name,
        username,
        email,
    };
    return await updateAdminProfile(id, adminData);
};

export const updateAdminPasswordService = async (
    id: string,
    oldPassword: string,
    newPassword: string,
) => {
    const admin = await getAdminProfile(id);
    const isPasswordValid = await bcrypt.compare(oldPassword, admin.password);

    if (!isPasswordValid) {
        throw new Error('Old password is incorrect');
    }

    const saltOrRound = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, saltOrRound);

    return await updateAdminPassword(id, hashedPassword);
};

export const getAdminProfileService = async (id: string) => {
    return await getAdminProfile(id);
};
