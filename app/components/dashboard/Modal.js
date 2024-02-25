import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CountrySelect from './CountrySelect';
import { CountryContext } from '@/app/context/CountryContext';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { CountrySpecies } from '@/app/context/CountrySpecies';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	borderRadius: '10px',
	boxShadow: 24,
	p: 4,
};

export default function DashboardModal({ userUid }) {
	const [open, setOpen] = useState(true);
	const { country } = useContext(CountryContext);
	const { countrySpecies, updateCountrySpecies } = useContext(CountrySpecies);
	const handleOpen = () => setOpen(true);
	const handleClose = async () => {
		if (country === null || country === '') {
			return;
		} else {
			// update the user's region in the db
			const docRef = doc(db, 'Users', userUid);
			// get SpeciesByCountry data from db
			const countrylowercase = country.countryName
				.toLowerCase()
				.replace(/\s/g, '');

			// get the species by country data
			const spRef = doc(db, 'SpeciesByCountry', countrylowercase);

			await getDoc(spRef)
				.then((doc) => {
					if (doc.exists()) {
						updateDoc(docRef, {
							country: JSON.parse(JSON.stringify(country)),
							speciesByCountry: JSON.parse(JSON.stringify(doc.data())),
						});

						updateCountrySpecies(JSON.parse(JSON.stringify(doc.data())));

						setOpen(false);
					} else {
						alert('Country is not available yet. Please try again later.');
					}
				})
				.catch((error) => {
					console.log('Error getting document:', error);
					alert('There seems to be an error. Please try again later.');
				});
		}
	};

	return (
		<div>
			<Modal
				open={open}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
				onClose={() => {
					if (country === '') {
						handleOpen();
					} else {
						handleClose();
					}
				}}
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						Seems like you are new here!
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						For starters, please select your country to get started.
					</Typography>
					{/* Dropdown */}
					<CountrySelect sx={{ mt: 2 }} />
					<Button variant="contained" sx={{ mt: 2 }} onClick={handleClose}>
						Save
					</Button>
				</Box>
			</Modal>
		</div>
	);
}
