'use client';

import Image from 'next/image';
import Maps from '../components/dashboard/Maps';
import DashboardModal from '../components/dashboard/Modal';
import { APIProvider } from '@vis.gl/react-google-maps';
import MapDrawer from '../components/dashboard/MapDrawer';
import { useContext, useEffect, useState } from 'react';
import { DrawerContext } from '../context/DrawerContext';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { CountryContext } from '../context/CountryContext';
import { CountrySpecies } from '../context/CountrySpecies';

export default function Home() {
	const { open, setOpen } = useContext(DrawerContext);
	const [userUid, setUserUid] = useState('');
	const [userData, setUserData] = useState('');
	const { updateCountry } = useContext(CountryContext);
	const { updateCountrySpecies } = useContext(CountrySpecies);

	useEffect(() => {
		// from db get user data using uid from auth
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUserUid(user.uid);
			} else {
				console.log('No user is signed in.');
			}
			const docRef = doc(db, 'Users', user.uid);
			const docSnap = getDoc(docRef);
			docSnap
				.then((doc) => {
					if (doc.exists()) {
						setUserData(doc.data());
						// if user data has region, update country context
						updateCountry(doc.data().country);
						updateCountrySpecies(doc.data().speciesByCountry);
					} else {
						// doc.data() will be undefined in this case
						console.log('No such document!');
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error);
				});
		});
	}, []);

	if (!userData) {
		return (
			<>
				<h1>Wildlife Tracker</h1>
				<p>Loading...</p>
			</>
		);
	}

	return (
		<>
			<APIProvider apiKey={'AIzaSyCY3SURcElSavfbmvnZrSfWQQLC87if5ak'}>
				{/* { if userData doesnt have region, show Modal } */}
				{!userData.country && <DashboardModal userUid={userUid} />}
				<MapDrawer open={open} setOpen={setOpen} userUid={userUid} />
				<Maps />
			</APIProvider>
		</>
	);
}
