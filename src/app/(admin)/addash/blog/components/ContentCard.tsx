import DeleteButton from '@/components/button/DeleteButton';
import EditButton from '@/components/button/EditButton';
import formatDate from '@/utils/dateFormatter';

interface ContentCardProps {
    key: any;
    title: string;
    lastUpdated: string;
    createdBy: string;
    updatedBy: string;
    onclick?: () => void;
    editAction?: () => void;
    deleteAction?: () => void;
}
const ContentCard = ({
    key,
    title,
    lastUpdated,
    createdBy,
    updatedBy,
    onclick,
    editAction,
    deleteAction,
}: ContentCardProps) => {
    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    return (
        <>
            <div
                key={key}
                className="bg-[#007395] p-6 rounded-lg text-center shadow-md">
                <h3
                    onClick={onclick}
                    className="text-2xl text-white font-semibold cursor-pointer">
                    {truncateText(title, 25)}
                </h3>
                <p className="text-sm text-gray-400 font-bold">
                    Update terakhir: {formatDate(lastUpdated)}
                </p>
                <div className="text-left">
                    <p className="text-sm text-gray-400 font-bold">
                        Dibuat oleh: {createdBy}
                    </p>
                    <p className="text-sm text-gray-400 font-bold">
                        Diperbarui oleh: {updatedBy}
                    </p>
                </div>

                <div className="flex flex-wrap justify-between mt-4">
                    <EditButton onClick={editAction} />
                    <DeleteButton onClick={deleteAction} />
                </div>
            </div>
        </>
    );
};

export default ContentCard;
