const { createContext, useContext, useState, useEffect } = require('react');
import {
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const googleSignIn = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithPopup(auth, provider);
	};

	const logout = async () => {
		await signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return () => unsubscribe();
	}, [user]);

	return (
		<AuthContext.Provider value={{ user, googleSignIn, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(AuthContext);
};
