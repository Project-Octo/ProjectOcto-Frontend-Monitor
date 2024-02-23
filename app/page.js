'use client';
import { UserAuth } from './context/AuthContext';

export default function Home() {
	return (
		<>
			Login page
			{/* Button to Login page */}
			<a href="/login">
				<button>Login</button>
			</a>
		</>
	);
}
