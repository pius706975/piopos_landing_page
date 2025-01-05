import LoadingComponent from '@/components/Loading';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ContentCard from './components/ContentCard';
import { deleteContent, fetchContents } from './hooks';

const PostedContent = ({ API_URL }: {API_URL: string | undefined;}) => {
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
                        onclick={() => router.push(`/addash/blog/detail/${content._id}`)}
                        editAction={() =>
                            router.push(`/addash/blog/edit/${content._id}`)
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
                                className="px-4 py-2 bg-gray-300 dark:text-gray-900 rounded-2xl"
                                onClick={() => setDeleteModalOpen(false)}>
                                Batal
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-2xl"
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
