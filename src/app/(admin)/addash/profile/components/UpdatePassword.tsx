import { useErrorToast } from '@/components/message/ErrorMessage';
import { useSuccessToast } from '@/components/message/SuccessMessage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { fetchProfile, updatePassword } from './hooks/hooks';
import LoadingComponent from '@/components/Loading';
import ChangePasswordInputs from '@/components/input/ChangePasswordInputField';
import Button from '@/components/button/Button';

const UpdatePassword = ({ API_URL }: { API_URL: string | undefined }) => {
    const { showError, ErrorToastComponent } = useErrorToast();
    const { showSuccess, SuccessToastComponent } = useSuccessToast();
    const [loading, setLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();

    const [formPassword, setFormpassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const { data, isLoading, error } = useQuery({
        queryKey: ['profile'],
        queryFn: () => fetchProfile({ API_URL }),
    });

    const updatePasswordMutation = useMutation({
        mutationFn: ({
            oldPassword,
            newPassword,
        }: {
            oldPassword: string;
            newPassword: string;
        }) => updatePassword({ API_URL, oldPassword, newPassword }),
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            showSuccess('Password berhasil diubah');
            setLoading(false);
        },
        onError: error => {
            if (error.message === 'Old password is incorrect') {
                showError('Password lama salah');
            } else {
                showError('Password gagal diubah');
            }
            setLoading(false);
        },
    });

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormpassword({
            ...formPassword,
            [e.target.name]: e.target.value,
        });
    };

    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formPassword.oldPassword) {
            showError('Password lama belum diisi');
            return;
        }

        if (!formPassword.newPassword) {
            showError('Password baru belum diisi');
            return;
        }

        if (!formPassword.confirmNewPassword) {
            showError('Password baru harus dikonfirmasi');
            return;
        }

        if (formPassword.newPassword !== formPassword.confirmNewPassword) {
            showError('Password baru dan konfirmasi password harus sama');
            return;
        }

        setLoading(true);

        try {
            updatePasswordMutation.mutate({
                oldPassword: formPassword.oldPassword,
                newPassword: formPassword.newPassword,
            });
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
        <div className="bg-gray-100 dark:bg-[#2c2c2c] p-4 rounded-md shadow">
            <h2 className="text-lg font-bold text-gray-700 dark:text-white mb-4">
                Ubah Password
            </h2>
            <div className="space-y-4">
                <ChangePasswordInputs
                    oldPassword={formPassword.oldPassword}
                    newPassword={formPassword.newPassword}
                    confirmNewPassword={formPassword.confirmNewPassword}
                    onChangeOldPassword={handlePasswordChange}
                    onChangeNewPassword={handlePasswordChange}
                    onChangeConfirmNewPassword={handlePasswordChange}
                />

                <div className="mb-4">
                    {ErrorToastComponent}
                    {SuccessToastComponent}
                </div>

                <Button
                    text={loading ? 'Mengubah...' : 'Ubah Password'}
                    onClick={handlePasswordSubmit}
                    bgColor="bg-[#007395]"
                />
            </div>
        </div>
    );
};

export default UpdatePassword;
