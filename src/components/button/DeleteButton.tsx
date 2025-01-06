import React from 'react';

interface ButtonProps {
    onClick?: (e: React.FormEvent) => void;
    bgColor?: string;
    hoverColor?: string;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
}

const DeleteButton: React.FC<ButtonProps> = ({
    onClick,
    bgColor = 'bg-white',
    hoverColor = 'bg-gray-100',
    color = 'text-red-500',
    type = 'button',
}) => {
    const handleClick = async (e: React.FormEvent) => {
        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <button
            className={`flex items-center space-x-2 px-4 py-2 ${bgColor} rounded-lg shadow-md hover:${hoverColor} active:bg-gray-300 transition-all duration-150`}
            type={type}
            onClick={handleClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-red-500">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
            <span className={`${color} font-semibold`}>Delete</span>
        </button>
    );
};

export default DeleteButton;
