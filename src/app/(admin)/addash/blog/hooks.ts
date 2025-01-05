import axios from "axios";

export const fetchContents = async (API_URL: string | undefined) => {
    try {
        const { data } = await axios.get(`${API_URL}/admin/blog/get-posts`);
        return data.data;
    } catch (error) {
        throw new Error('Error fetching contents');
    }
};

export const deleteContent = async (id: string, API_URL: string | undefined) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        await axios.delete(`${API_URL}/admin/blog/delete/${id}`, {
            headers: { Authorization: accessToken },
        });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Failed to delete content',
            );
        }
        throw new Error('An unexpected error occurred');
    }
};