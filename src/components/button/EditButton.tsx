import React from 'react';

interface ButtonProps {
    onClick?: (e: React.FormEvent) => void;
    bgColor?: string;
    hoverColor?: string;
    color?: string;
    type?: 'button' | 'submit' | 'reset';
}

const EditButton: React.FC<ButtonProps> = ({
    onClick,
    bgColor = 'bg-white',
    hoverColor = 'bg-gray-100',
    color = 'text-blue-500',
    type = 'button',
}) => {
    const handleClick = async (e: React.FormEvent) => {
        if (typeof onClick === 'function') {
            onClick(e);
        }
    };

    return (
        <button
            className={`flex items-center space-x-2 px-4 py-2 ${bgColor} rounded-lg shadow-md hover:${hoverColor}`}
            type={type}
            onClick={handleClick}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-blue-500">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487l3.651 3.65M4.5 20.25h5.25L19.76 10.24a2.121 2.121 0 000-3l-3-3a2.121 2.121 0 00-3 0L4.5 14.998v5.252z"
                />
            </svg>
            <span className={`${color} font-semibold`}>Edit</span>
        </button>
    );
};

export default EditButton;