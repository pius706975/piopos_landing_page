import DeleteButton from '@/components/button/DeleteButton';
import EditButton from '@/components/button/EditButton';
import LoadingComponent from '@/components/Loading';
import formatDate from '@/utils/dateFormatter';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ContentCard from './components/ContentCard';

interface PostedContentProps {
    API_URL: string | undefined;
}

const fetchContents = async (API_URL: string | undefined) => {
    try {
        const { data } = await axios.get(`${API_URL}/admin/blog/get-posts`);
        return data.data;
    } catch (error) {
        throw new Error('Error fetching contents');
    }
};

const deleteContent = async (id: string, API_URL: string | undefined) => {
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

const PostedContent = ({ API_URL }: PostedContentProps) => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
    const [isSuccessModalOpen, setSuccessModalOpen] = useState<boolean>(false);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(
        null,
    );

    const { data, isLoading, error } = useQuery({
        queryKey: ['contents'],
        queryFn: () => fetchContents(API_URL),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => deleteContent(id, API_URL),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contents'] });
            setSuccessModalOpen(true);
            setTimeout(() => setSuccessModalOpen(false), 4000);
        },
    });

    const handleDelete = () => {
        if (selectedContentId) {
            deleteMutation.mutate(selectedContentId);
            setDeleteModalOpen(false);
        }
    };

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    // console.log(data);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((content: any, index: any) => (
                    <ContentCard
                        key={index}
                        title={content.title}
                        lastUpdated={content.updatedAt}
                        createdBy={content.createdBy.name}
                        updatedBy={content.updatedBy.name}
                        editAction={() =>
                            router.push(`/addash/blog/${content._id}/edit`)
                        }
                        deleteAction={() => {
                            setDeleteModalOpen(true);
                            setSelectedContentId(content._id);
                        }}
                    />
                ))}
            </div>

            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">
                            Konfirmasi Hapus
                        </h2>
                        <p className="mb-4">
                            Apakah Anda yakin ingin menghapus konten ini?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 bg-gray-300 dark:text-gray-900 rounded"
                                onClick={() => setDeleteModalOpen(false)}>
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded"
                                onClick={handleDelete}>
                                Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4 text-green-600">
                            Berhasil
                        </h2>
                        <p className="mb-4">Konten berhasil dihapus.</p>
                        <div className="flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-300 dark:text-gray-900 rounded"
                                onClick={() => setSuccessModalOpen(false)}>
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostedContent;
