import React from 'react';

interface InputFieldProps {
    type: string;
    id: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    textPosition?: string;
    required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
    type,
    id,
    name,
    value,
    onChange,
    label,
    placeholder,
    textPosition = 'text-left',
    required = false,
}) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block text-lg font-medium dark:text-white">
                {label}
            </label>
            <input
                placeholder={placeholder}
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                // className={`mt-2 block w-full px-3 py-2 border ${textPosition} border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0891b2] dark:bg-white dark:text-gray-900`}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-[#1e1e1e] dark:border-gray-600 dark:text-white ${textPosition}`}
            />
        </div>
    );
};

export default InputField;
