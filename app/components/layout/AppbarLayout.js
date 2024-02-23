'use client';
import { useState, useEffect } from 'react';
import PrimaryAppbar from '../common/Appbar';
import { UserAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation'


export default function AppbarLayout({ children }) {
	const { user } = UserAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			await new Promise((resolve) => setTimeout(resolve, 50));

			if (!user) {
				router.push('/member/login');
			}

			setLoading(false);
		};
		checkAuth();
	}, [user]);

	if (loading) {
		return <>Loading Page...</>;
	}

	return (
		<>
			<PrimaryAppbar />
			{children}
		</>
	);
}
