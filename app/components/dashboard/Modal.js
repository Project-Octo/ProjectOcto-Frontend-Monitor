import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CountrySelect from './CountrySelect';
import { CountryContext } from '@/app/context/CountryContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';

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
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		if (country === null || country === '') {
			return;
		} else {
			// update the user's region in the db
			const docRef = doc(db, 'Users', userUid);
			updateDoc(docRef, {
				country: JSON.parse(JSON.stringify(country)),
			});
			setOpen(false);
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
