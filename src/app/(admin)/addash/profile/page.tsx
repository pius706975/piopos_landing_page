'use client';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoadingComponent from '@/components/Loading';
import { useAuth } from '@/service/api';
import useAdminValidation from '../hook/validateAdmin';
import ThemeChanger from '@/components/DarkSwitch';
import InputField from '@/components/input/InputField';
import Button from '@/components/button/Button';
import ChangePasswordInputs from '@/components/input/ChangePasswordInputField';
import { FormEvent, useMemo, useState } from 'react';
import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';

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

const updateProfile = async ({
    name,
    username,
    email,
}: {
    name: string;
    username: string;
    email: string;
}) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.put(
            `${BASE_URL}/admin/profile/edit`,
            {
                name: name,
                username: username,
                email: email,
            },
            {
                headers: { Authorization: accessToken },
            },
        );

        console.log('response: ', response);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message ||
                    'Failed to update admin profile',
            );
        }

        throw new Error('An unexpected error occurred');
    }
};

const AdminProfile = () => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const { showError, ErrorToastComponent } = useErrorToast();
    const { showSuccess, SuccessToastComponent } = useSuccessToast();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const [formProfileData, setFormProfileData] = useState({
        name: '',
        username: '',
        email: '',
    });

    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchProfile(),
    });

    useMemo(() => {
        if (
            data &&
            !formProfileData.name &&
            !formProfileData.username &&
            !formProfileData.email
        ) {
            setFormProfileData({
                name: data.name,
                username: data.username,
                email: data.email,
            });
        }
    }, [data, formProfileData]);

    const updateDataMutation = useMutation({
        mutationFn: ({
            name,
            username,
            email,
        }: {
            name: string;
            username: string;
            email: string;
        }) => updateProfile({ name, username, email }),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            showSuccess('Data diri berhasil diubah');
            setLoading(false);
        },
        onError: error => {
            console.log(error);
            showError('Data diri gagal diubah');
            setLoading(false);
        },
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormProfileData({
            ...formProfileData,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formProfileData.name) {
            showError('Nama belum diisi');
            return;
        }

        if (!formProfileData.username) {
            showError('Username belum diisi');
            return;
        }

        if (!formProfileData.email) {
            showError('Email belum diisi');
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formProfileData.email)) {
            showError('Format email salah');
            return;
        }

        setLoading(true);

        try {
            updateDataMutation.mutate({
                name: formProfileData.name,
                username: formProfileData.username,
                email: formProfileData.email,
            });

            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    const handlePasswordSubmit = () => {
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
                                            value={formProfileData.name}
                                            onChange={handleProfileChange}
                                            label="Name"
                                            placeholder="Name"
                                        />

                                        <InputField
                                            type="text"
                                            id="username"
                                            name="username"
                                            value={formProfileData.username}
                                            onChange={handleProfileChange}
                                            label="Username"
                                            placeholder="Username"
                                        />

                                        <InputField
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formProfileData.email}
                                            onChange={handleProfileChange}
                                            label="Email"
                                            placeholder="Email"
                                        />

                                        <div className='mb-4'>
                                        {ErrorToastComponent}
                                        {SuccessToastComponent}
                                        </div>

                                        <Button
                                            text={
                                                loading
                                                    ? 'Mengubah...'
                                                    : 'Ubah Data Diri'
                                            }
                                            onClick={handleProfileSubmit}
                                            bgColor="bg-[#007395]"
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
                                            onClick={() => handlePasswordSubmit}
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
