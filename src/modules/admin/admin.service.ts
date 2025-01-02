import bcrypt from 'bcrypt';
import { createAdmin } from './admin.repo';

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
