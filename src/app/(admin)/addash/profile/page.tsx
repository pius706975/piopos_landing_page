'use client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingComponent from '@/components/Loading';
import { useAuth } from '@/service/api';
import useAdminValidation from '../hook/validateAdmin';
import ThemeChanger from '@/components/DarkSwitch';
import InputField from '@/components/input/InputField';
import Button from '@/components/button/Button';
import ChangePasswordInputs from '@/components/input/ChangePasswordInputField';
import { useState } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetchProfile = async () => {
    const accessToken = localStorage.getItem('accessToken');

    try {
        const response = await axios.get(`${BASE_URL}/admin/profile`, {
            headers: { Authorization: accessToken },
        });

        if (
            response.data.status === 200 ||
            response.data.message === '"Successfully fetched profile"'
        ) {
            return response.data.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    'Failed to fetch admin profile',
            );
        }
    }
};

const AdminProfile = () => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
    });

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    const handleSubmit = () => {
        console.log('Password Lama:', oldPassword);
        console.log('Password Baru:', newPassword);
        console.log('Konfirmasi Password Baru:', confirmNewPassword);
    };

    return (
        <>
            {isAdminLoading && <LoadingComponent />}

            {isAdminLoggedIn && (
                <div className="min-h-screen bg-[#007395] dark:bg-[#171717] flex justify-center items-center px-4">
                    <div className="bg-white dark:bg-[#232323] shadow-md rounded-lg p-6 w-full max-w-5xl">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-bold text-gray-700 dark:text-white">
                                {data.name}
                            </h1>

                            <ThemeChanger />
                        </div>

                        <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-6">
                            <div className="w-full lg:w-1/3 bg-gray-100 dark:bg-[#2c2c2c] p-4 rounded-md shadow">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative">
                                        <div className="w-24 h-24 bg-blue-500 text-white flex items-center justify-center text-3xl font-bold rounded-full">
                                            {data.name[0]}
                                        </div>
                                        <button className="absolute bottom-0 right-0 bg-gray-200 hover:bg-gray-300 p-2 rounded-full shadow">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 text-gray-600">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.232 5.232l3.536 3.536m-7.036-1.036h3.868a2 2 0 012 2v7.868a2 2 0 01-2 2H6.868a2 2 0 01-2-2v-3.868a2 2 0 012-2h3.868m4.5-4.5l3.536 3.536M16 11l-5 5m0 0l-1.5-1.5M11 16l-1.5-1.5"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="w-full">
                                        <InputField
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={() => {}}
                                            label="Name"
                                            placeholder="Name"
                                            textPosition="text-left"
                                        />

                                        <InputField
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={data.username}
                                            onChange={() => {}}
                                            label="Username"
                                            placeholder="Username"
                                            textPosition="text-left"
                                        />

                                        <InputField
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={data.email}
                                            onChange={() => {}}
                                            label="Email"
                                            placeholder="Email"
                                            textPosition="text-left"
                                        />
                                    </div>

                                    <div className="w-full"></div>
                                </div>
                            </div>

                            <div className="w-full lg:w-2/3">
                                <div className="bg-gray-100 dark:bg-[#2c2c2c] p-4 rounded-md shadow">
                                    <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4">
                                        Ubah Password
                                    </h2>
                                    <div className="space-y-4">

                                        <ChangePasswordInputs
                                            oldPassword={oldPassword}
                                            newPassword={newPassword}
                                            confirmNewPassword={
                                                confirmNewPassword
                                            }
                                            onChangeOldPassword={e =>
                                                setOldPassword(e.target.value)
                                            }
                                            onChangeNewPassword={e =>
                                                setNewPassword(e.target.value)
                                            }
                                            onChangeConfirmNewPassword={e =>
                                                setConfirmNewPassword(
                                                    e.target.value,
                                                )
                                            }
                                        />

                                        <Button
                                            text="Ubah Password"
                                            onClick={() => handleSubmit}
                                            bgColor="bg-[#007395]"
                                        />
                                    </div>
                                </div>

                                <Button
                                    text="Sign out"
                                    onClick={() => {}}
                                    bgColor="bg-red-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminProfile;
