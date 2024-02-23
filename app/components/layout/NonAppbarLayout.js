'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AuthContextProvider } from '../../context/AuthContext';

export default function NonAppbarLayout({ children }) {
	return (
		<AuthContextProvider>
			<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
		</AuthContextProvider>
	);
}
