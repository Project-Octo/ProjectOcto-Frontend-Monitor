'use client';
import { useEffect } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
	const { user } = UserAuth();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			router.push('/dashboard');
		}
	}, [user]);

	return <>{children}</>;
}
