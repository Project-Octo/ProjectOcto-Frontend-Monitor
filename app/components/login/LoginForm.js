import { useState, useRef, useContext } from 'react';
// @mui
import {
	Link,
	Stack,
	IconButton,
	InputAdornment,
	TextField,
	Checkbox,
	Container,
	Divider,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components

// Auth
import { redirect } from 'next/navigation';
import axios from 'axios';
import { useRouter } from 'next/router';
import { UserAuth } from '@/app/context/AuthContext';

// Context
import { CountryContext } from '@/app/context/CountryContext';
import { CountrySpecies } from '@/app/context/CountrySpecies';

// ----------------------------------------------------------------------

export default function LoginForm() {
	const usernameRef = useRef();
	const passwordRef = useRef();

	const { user, googleSignIn } = UserAuth();
	const { country, setCountry } = useContext(CountryContext);
	const { speciesByCountry, setSpeciesByCountry } = useContext(CountryContext);

	const handleGoogleSignIn = async (e) => {
		try {
			// if success, redirect to dashboard
			await googleSignIn()
				.then((res) => {
					console.log('res:', res);
					// setCountry(res.country);
					// setSpeciesByCountry(res.speciesByCountry);
				})
				.then(() => {
					redirect('/dashboard');
				});

			redirect('/dashboard');
		} catch (err) {
			console.log(err);
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const username = usernameRef.current.value;
		const password = passwordRef.current.value;

		console.log(username, password);
	};

	const [showPassword, setShowPassword] = useState(false);

	return (
		<form onSubmit={handleLogin}>
			<Stack
				spacing={3}
				sx={{
					paddingBottom: 5,
				}}
			>
				<TextField
					name="username"
					label="Username"
					variant="standard"
					inputRef={usernameRef}
				/>

				<TextField
					name="password"
					label="Password"
					variant="standard"
					type={showPassword ? 'text' : 'password'}
					inputRef={passwordRef}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => setShowPassword(!showPassword)}
									edge="end"
								>
									{showPassword ? (
										<img src="/eye-opened.svg" width={20} />
									) : (
										<img src="/eye-closed.svg" width={20} />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Stack>

			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				variant="contained"
				sx={{ py: 1.5 }}
			>
				Login
			</LoadingButton>

			<Divider sx={{ my: 3 }} />
			<LoadingButton
				fullWidth
				size="large"
				type="submit"
				variant="contained"
				sx={{ py: 1.5 }}
				onClick={handleGoogleSignIn}
			>
				Login with Google
			</LoadingButton>
		</form>
	);
}
