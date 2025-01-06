'use client';
import { useState, useRef } from 'react';
import axios from 'axios';
import Button from '@/components/button/Button';
import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';
import TinyMCEEditor from './components/EditorTinyMCE';
import InputField from '@/components/input/InputField';

interface CreateNewPostProps {
    API_URL: string | undefined;
}

const CreateNewPost = ({ API_URL }: CreateNewPostProps) => {
    const { showError, ErrorToastComponent } = useErrorToast();
    const { showSuccess, SuccessToastComponent } = useSuccessToast();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const editorRef = useRef<any>(null);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleEditorChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editorRef.current) {
            setContent(editorRef.current.getContent());
        }

        if (!title) {
            showError(`Judul belum diisi`);
            return;
        }

        if (!content) {
            showError(`Konten belum diisi`);
            return;
        }

        setLoading(true);

        try {
            const accessToken = localStorage.getItem('accessToken');
            const data = await axios.post(
                `${API_URL}/admin/blog/create`,
                {
                    title: title,
                    description: content,
                },
                {
                    headers: {
                        Authorization: accessToken,
                    },
                },
            );

            if (
                data.data.status !== 201 ||
                data.data.message === 'Successfully created new post'
            ) {
                showSuccess('Konten berhasil dibuat');
                window.location.href = '/addash/blog';
                setLoading(false);
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                showError(error.response?.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-4">
            <div className="mb-4">
                <InputField
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    label="Judul"
                    placeholder="Judul Konten"
                    textPosition="text-left"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 dark:text-white font-semibold">
                    Konten
                </label>

                <TinyMCEEditor value={content} onChange={handleEditorChange} />
            </div>

            {ErrorToastComponent}
            {SuccessToastComponent}

            <p> </p>

            <Button
                text={loading ? 'Sedang Submit...' : 'Submit'}
                type="submit"
                bgColor="bg-cyan-600"
                onClick={handleSubmit}
            />
        </div>
    );
};

export default CreateNewPost;
