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

export default function Home() {
	const { open, setOpen } = useContext(DrawerContext);
	const [userUid, setUserUid] = useState('');
	const [userData, setUserData] = useState({});
	const { updateCountry } = useContext(CountryContext);

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
						if (doc.data().region) {
							updateCountry(JSON.parse(doc.data().region));
						}
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

	return (
		<>
			<APIProvider apiKey={'AIzaSyCY3SURcElSavfbmvnZrSfWQQLC87if5ak'}>
				{/* { if userData doesnt have region, show Modal } */}
				{!userData.region && <DashboardModal userUid={userUid} />}
				<MapDrawer open={open} setOpen={setOpen} />
				<Maps />
			</APIProvider>
		</>
	);
}
