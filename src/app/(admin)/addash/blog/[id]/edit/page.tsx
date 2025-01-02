'use client';
import InputField from '@/components/input/InputField';
import LoadingComponent from '@/components/Loading';
import { useAuth } from '@/service/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useMemo, useState } from 'react';
import useAdminValidation from '../../../hook/validateAdmin';
import ThemeChanger from '@/components/DarkSwitch';
import TinyMCEEditor from '../../components/EditorTinyMCE';
import Button from '@/components/button/Button';
import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const fetchContentData = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/admin/blog/${id}`);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error', error);
            throw new Error(
                error.response?.data?.message || 'Failed to fetch blog data',
            );
        }
        throw new Error('An unexpected error occurred');
    }
};

const UpdateContentData = async ({ id, title, content }: { id: string; title: string, content: string }) => {
    const accessToken = localStorage.getItem('accessToken');
    try {
        const response = await axios.put(
            `${BASE_URL}/admin/blog/edit/${id}`,
            { title: title, description: content },
            {
                headers: { Authorization: accessToken },
            },
        );

        // console.log('updated: ', response);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || 'Failed to update blog',
            );
        }
        throw new Error('An unexpected error occurred');
    }
};

const EditContent = ({ params }: { params: { id: string } }) => {
    useAuth();
    const { isAdminLoggedIn, isAdminLoading } = useAdminValidation();
    const { showError, ErrorToastComponent } = useErrorToast();
    const { showSuccess, SuccessToastComponent } = useSuccessToast();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const { id } = params;
    const queryClient = useQueryClient();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchContentData(id),
    });

    useMemo(() => {
        if (data && !title && !content) {
            setTitle(data.title || '');
            setContent(data.description || '');
        }
    }, [title, content, data]);

    const mutation = useMutation({
        mutationFn: ({ title, content }: { title: string; content: string }) =>
            UpdateContentData({ id, title: title, content: content }),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog', id] });
            showSuccess('Konten berhasil diupdate');
            setLoading(false);
            router.push('/addash/blog');
        },
        onError: error => {
            console.error(error);
            showError('Konten gagal diupdate');
            setLoading(false);
        },
    });

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            mutation.mutate({ title, content });
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (isError)
        return (
            <div>
                Error:{' '}
                {error instanceof Error
                    ? error.message
                    : 'Something went wrong'}
            </div>
        );

    return (
        <>
            {isAdminLoading && <LoadingComponent />}

            {isAdminLoggedIn && (
                <div className="min-h-screen flex flex-col lg:flex-row">
                    <main className="flex-1 bg-gray-50 p-4 lg:p-8 dark:bg-black">
                        <div className="mb-6 flex items-center justify-between sticky top-0 bg-gray-50 dark:bg-black z-10 p-4">
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Edit Konten
                                </h2>
                            </div>

                            <ThemeChanger />
                        </div>

                        <div className="mt-4">
                            <div className="mb-4">
                                <InputField
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    label="Title"
                                    placeholder="Judul Konten"
                                />
                            </div>

                            <label className="block text-gray-700 dark:text-white font-semibold">
                                Konten
                            </label>

                            <TinyMCEEditor
                                value={content}
                                onChange={handleEditorChange}
                            />

                            {ErrorToastComponent}
                            {SuccessToastComponent}

                            <p className="mt-4 mb-4"></p>

                            <Button
                                text={loading ? 'Sedang Update...' : 'Update'}
                                type="submit"
                                bgColor="bg-cyan-600"
                                onClick={handleSubmit}
                            />
                        </div>
                    </main>
                </div>
            )}
        </>
    );
};

export default EditContent;
