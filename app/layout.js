'use client';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { AuthContextProvider } from './context/AuthContext';
import { CountryProvider } from './context/CountryContext';
import { DrawerProvider } from './context/DrawerContext';
import React from 'react';
import {
	RecoilRoot,
	atom,
	selector,
	useRecoilState,
	useRecoilValue,
} from 'recoil';
import { CountrySpeciesProvider } from './context/CountrySpecies';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				style={{
					margin: 0,
				}}
			>
				<RecoilRoot>
					<AuthContextProvider>
						<CountryProvider>
							<CountrySpeciesProvider>
								<DrawerProvider>
									<AppRouterCacheProvider>{children}</AppRouterCacheProvider>
								</DrawerProvider>
							</CountrySpeciesProvider>
						</CountryProvider>
					</AuthContextProvider>
				</RecoilRoot>
			</body>
		</html>
	);
}
