import DeleteButton from '@/components/button/DeleteButton';
import EditButton from '@/components/button/EditButton';
import LoadingComponent from '@/components/Loading';
import formatDate from '@/utils/dateFormatter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
const PostedContent = ({ API_URL }: PostedContentProps) => {
    const router = useRouter();
    const { data, isLoading, error } = useQuery({
        queryKey: ['contents'],
        queryFn: () => fetchContents(API_URL),
    });

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
                    <div
                        key={index}
                        className="bg-[#007395] p-6 rounded-lg text-center shadow-md">
                        <h3 className="text-2xl text-white font-semibold">
                            {content.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-bold">
                            Update terakhir: {formatDate(content.updatedAt)}
                        </p>
                        <div className="text-left">
                            <p className="text-sm text-gray-400 font-bold">
                                Dibuat oleh: {content.createdBy.name}
                            </p>
                            <p className="text-sm text-gray-400 font-bold">
                                Diperbarui oleh: {content.updatedBy.name}
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-between mt-4">
                            <EditButton
                                onClick={() =>
                                    router.push(
                                        `/addash/blog/${content._id}/edit`,
                                    )
                                }
                            />
                            <DeleteButton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostedContent;
