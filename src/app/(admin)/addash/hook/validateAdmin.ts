'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAdminValidation = (
    redirectPath: string = '/addash/sign-in',
    redirectIfLoggedIn: boolean = false
) => {
    const router = useRouter();
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
    const [isAdminLoading, setIsAdminLoading] = useState<boolean>(true);

    useEffect(() => {
        const validateAdminStatus = () => {
            const accessToken = localStorage.getItem('accessToken');
            const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';

            if (accessToken && isLoggedIn && redirectIfLoggedIn) {
                router.push(redirectPath);
            } else if (!accessToken) {
                router.push(redirectPath);
            } else {
                setIsAdminLoggedIn(isLoggedIn);
                setIsAdminLoading(false);
            }
        };

        validateAdminStatus();
    }, [router, redirectPath, redirectIfLoggedIn]);

    return { isAdminLoggedIn, isAdminLoading };
};

export default useAdminValidation;
