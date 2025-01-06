import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useMemo, useState } from 'react';
import { fetchProfile, updateProfile } from './hooks/hooks';
import LoadingComponent from '@/components/Loading';
import InputField from '@/components/input/InputField';
import Button from '@/components/button/Button';

const UpdateProfile = ({ API_URL }: { API_URL: string | undefined }) => {
    const { showError, ErrorToastComponent } = useErrorToast();
    const { showSuccess, SuccessToastComponent } = useSuccessToast();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const [formProfileData, setFormProfileData] = useState({
        name: '',
        username: '',
        email: '',
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchProfile({ API_URL }),
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
        }) => updateProfile({ API_URL, name, username, email }),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            showSuccess('Data diri berhasil diubah');
            setLoading(false);
        },
        onError: () => {
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
        } catch (error: any) {
            showError(error.message);
        }
    };

    if (isLoading)
        return (
            <div>
                <LoadingComponent />
            </div>
        );

    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
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

            <div className="mb-4">
                {ErrorToastComponent}
                {SuccessToastComponent}
            </div>

            <Button
                text={loading ? 'Mengubah...' : 'Ubah Data Diri'}
                onClick={handleProfileSubmit}
                bgColor="bg-[#007395]"
            />
        </div>
    );
};

export default UpdateProfile;
