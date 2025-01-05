import axios from 'axios';

interface FetchContentProps {
    API_URL: string | undefined;
    id: string;
}

export const fetchContentData = async ({ API_URL, id }: FetchContentProps) => {
    try {
        const response = await axios.get(`${API_URL}/admin/blog/${id}`);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Failed to fetch blog data',
            );
        }
        throw new Error('An unexpected error occurred');
    }
};

interface UpdateContentProps {
    API_URL: string | undefined;
    id: string;
    title: string;
    content: string;
}

export const UpdateContentData = async ({
    API_URL,
    id,
    title,
    content,
}: UpdateContentProps) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.put(
            `${API_URL}/admin/blog/edit/${id}`,
            { title: title, description: content },
            {
                headers: { Authorization: accessToken },
            },
        );

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Failed to update blog',
            );
        }
        throw new Error('An unexpected error occurred');
    }
};
