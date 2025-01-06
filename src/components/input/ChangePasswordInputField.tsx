import React, { useState } from 'react';

interface PasswordInputsProps {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    onChangeOldPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeConfirmNewPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChangePasswordInputs: React.FC<PasswordInputsProps> = ({
    oldPassword,
    newPassword,
    confirmNewPassword,
    onChangeOldPassword,
    onChangeNewPassword,
    onChangeConfirmNewPassword,
}) => {
    const [showPasswords, setShowPasswords] = useState(false);

    const toggleShowPasswords = () => {
        setShowPasswords(!showPasswords);
    };

    return (
        <div className="space-y-6">
            <div>
                <input
                    type={showPasswords ? 'text' : 'password'}
                    id="oldPassword"
                    name="oldPassword"
                    value={oldPassword}
                    onChange={onChangeOldPassword}
                    placeholder="Password lama"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-[#1e1e1e] dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <input
                    type={showPasswords ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={onChangeNewPassword}
                    placeholder="Password Baru"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-[#1e1e1e] dark:border-gray-600 dark:text-white"
                />
            </div>

            <div>
                <input
                    type={showPasswords ? 'text' : 'password'}
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={onChangeConfirmNewPassword}
                    placeholder="Konfirmasi Password Baru"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-[#1e1e1e] dark:border-gray-600 dark:text-white"
                />
            </div>

            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="showPasswords"
                    checked={showPasswords}
                    onChange={toggleShowPasswords}
                    className="mr-2"
                />
                <label
                    htmlFor="showPasswords"
                    className="text-sm text-gray-700 dark:text-gray-300"
                >
                    Tampilkan password
                </label>
            </div>
        </div>
    );
};

export default ChangePasswordInputs;
