// pages/under-construction.tsx
import React from 'react';

const UnderDevelopment = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#007395] text-white dark:bg-gray-900 dark:text-[#007395]">
            <div className="text-center max-w-md">
                <h1 className="text-4xl font-bold mb-4">
                    🚧 Website masih dalam tahap pengembangan 🚧
                </h1>
                <p className="text-lg mb-6">
                    Kami sedang bekerja keras untuk memberikan Anda pengalaman yang
                    memuaskan! 
                </p>
                <div className="flex justify-center">
                    <div className="relative w-24 h-24 animate-spin">
                        <div className="absolute inset-0 border-t-4 border-white rounded-full"></div>
                        <div className="absolute inset-0 border-t-4 border-[#007395] rounded-full animate-ping"></div>
                    </div>
                </div>
                <p className="text-sm mt-6">
                    Terima kasih. Kami tidak sabar untuk membagikan progres kami kepada Anda 💻
                </p>
            </div>
        </div>
    );
};

export default UnderDevelopment;
