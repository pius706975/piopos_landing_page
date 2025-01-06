import React, { useState } from 'react';

interface SuccessToastProps {
    message: string;
    onClose: () => void;
}

const SuccessToast: React.FC<SuccessToastProps> = ({ message, onClose }) => {
    return (
        <div className="flex items-center justify-between text-green-600 bg-green-100/80 shadow-white-lg text-md px-4 py-2 rounded shadow-lg border border-green-600">
            <p>{message}</p>
            <button
                onClick={onClose}
                className="text-green-600 hover:text-red-800 font-bold text-xl">
                &times;
            </button>
        </div>
    );
};

export const useSuccessToast = () => {
    const [success, setSuccess] = useState<string | null>(null);

    const showSuccess = (message: string) => {
        setSuccess(message);
        setTimeout(() => {
            setSuccess(null);
        }, 4000);
    };

    const SuccessToastComponent = success ? (
        <SuccessToast message={success} onClose={() => setSuccess(null)} />
    ) : null;

    return { showSuccess, SuccessToastComponent };
};
