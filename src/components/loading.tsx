const LoadingComponent = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="relative w-24 h-24 animate-spin">
            <div className="absolute inset-0 border-t-4 border-[#007395] dark:border-white rounded-full"></div>
            <div className="absolute inset-0 border-t-4 border-[#007395] rounded-full animate-ping"></div>
        </div>
    </div>
    );
};

export default LoadingComponent;