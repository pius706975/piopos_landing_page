import axios from 'axios';

export const fetchProfile = async ({ API_URL }: { API_URL: string | undefined }) => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${API_URL}/admin/profile`, {
            headers: { Authorization: accessToken },
        });

        if (
            response.data.status === 200 ||
            response.data.message === '"Successfully fetched profile"'
        ) {
            return response.data.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    'Failed to fetch admin profile',
            );
        }
    }
};

export const updateProfile = async ({
    API_URL,
    name,
    username,
    email,
}: {
    API_URL: string | undefined;
    name: string;
    username: string;
    email: string;
}) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        await axios.put(
            `${API_URL}/admin/profile/edit`,
            {
                name: name,
                username: username,
                email: email,
            },
            {
                headers: { Authorization: accessToken },
            },
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    'Failed to update admin profile',
            );
        }

        throw new Error('An unexpected error occurred');
    }
};

export const updatePassword = async ({
    API_URL,
    oldPassword,
    newPassword,
}: {
    API_URL: string | undefined;
    oldPassword: string;
    newPassword: string;
}) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        await axios.put(
            `${API_URL}/admin/profile/update-password`,
            {
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
            {
                headers: { Authorization: accessToken },
            },
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    'Failed to update admin password',
            );
        }

        throw new Error('An unexpected error occurred');
    }
};
