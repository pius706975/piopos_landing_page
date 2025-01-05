'use client';
import { useAuth } from '@/service/api';
import axios from 'axios';
import useAdminValidation from '../../../hook/validateAdmin';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '@/components/Loading';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchContentData = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/blog/${id}`);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // console.log('error', error);
            throw new Error(
                error.response?.data?.message || 'Failed to fetch blog data',
            );
        }

        throw new Error('An unexpected error occurred');
    }
};

const DetailContent = ({ params }: { params: { id: string } }) => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const { id } = params;
    const { data, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchContentData(id),
    });

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <>
            {isAdminLoading && <LoadingComponent />}

            {isAdminLoggedIn && (
                <div className="flex items-center justify-center min-h-screen bg-white dark:bg-[#171717]">
                    <div className="w-full max-w-5xl p-6">
                        <h1 className="text-5xl font-bold text-[#007395] dark:text-white mb-4">
                            {data.title}
                        </h1>

                        <div
                            className="prose dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />
                        
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailContent;
