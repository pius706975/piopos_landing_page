'use client';

import Button from '@/components/button/Button';
import InputField from '@/components/input/InputField';
import PasswordInput from '@/components/input/PasswordInputField';
import LoadingComponent from '@/components/loading';
import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';
import { signIn } from '@/service/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AdminSignIn = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const { showError, ErrorToastComponent } = useErrorToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [redirectLoading, setRedirectLoading] = useState<boolean>(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
    const { showSuccess, SuccessToastComponent } = useSuccessToast();

    const validateAdminStatus = async () => {
        const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
        setIsAdminLoggedIn(isLoggedIn);
        setRedirectLoading(false);
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
            router.push('/addash');
        } else {
            validateAdminStatus();
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.email) {
            showError(`Email belum diisi`);
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            showError('Format email salah');
            return;
        }

        if (!formData.password) {
            showError(`Password belum diisi`);
            return;
        }

        setLoading(true);

        try {
            const data = await signIn(formData.email, formData.password);
            if (
                data.message === 'Successfully signed in' ||
                data.status === 200
            ) {
                showSuccess('Berhasil masuk');
                window.location.href = '/addash';
                setLoading(false);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (
                    error.response?.data.message ===
                    'Email or password is incorrect'
                ) {
                    showError('Email atau password salah');
                }
            } else {
                showError('An unexpected error occured');
            }

            setLoading(false);
        }
    };

    return (
        <>
            {redirectLoading && (
                <LoadingComponent/>
            )}

            {!isAdminLoggedIn && (
                <div className="flex items-center justify-center min-h-screen bg-[#007395] dark:bg-[#171717]">
                    <div className="w-full max-w-md p-6 rounded-xl shadow-xl dark:bg-gray-900">
                        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
                            Sign In
                        </h2>

                        {ErrorToastComponent}
                        {SuccessToastComponent}

                        <InputField
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Masukkan email"
                        />

                        <PasswordInput
                            value={formData.password}
                            onChange={handleChange}
                            showPassword={showPassword}
                            placeholder="Masukkan password"
                            toggleShowPassword={() =>
                                setShowPassword(!showPassword)
                            }
                            toggleShowPasswordColor="text-white"
                        />

                        <Button
                            text={loading ? 'Sedang memuat...' : 'Masuk'}
                            type="submit"
                            bgColor="bg-cyan-600"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSignIn;
