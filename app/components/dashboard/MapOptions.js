import {
	Divider,
	FormControlLabel,
	FormControl,
	FormControlGroup,
	Checkbox,
	FormGroup,
	Typography,
	Container,
} from '@mui/material';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SpeciesEditorModal from './SpeciesEditorModal';
import {
	doc,
	updateDoc,
	getDoc,
	getDocs,
	collection,
} from 'firebase/firestore';
import { db } from '@/app/firebase';
import LogList from './LogList';
import groupDataByDate from '@/app/utils/groupByDate';

// use useffect to get user settings?
const StyledDiv = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
`;

const OptionContainer = styled('div')`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	padding: 1rem 2rem;
`;

export default function MapOptions({ userUid }) {
	const [speciesByDate, setSpeciesByDate] = useState([]);

	const [switchState, setSwitchState] = useState({
		invasive: true,
		protected: true,
	});

	const handleChange = (event) => {
		setSwitchState({
			...switchState,
			[event.target.name]: event.target.checked,
		});
	};

	useEffect(() => {
		const docRef = doc(db, 'Users', userUid);
		const docSnap = getDoc(docRef);
		docSnap.then((doc) => {
			if (doc.exists()) {
				let tmpData = JSON.parse(JSON.stringify(doc.data()));

				setSwitchState({
					invasive: tmpData.setting.invasiveShow,
					protected: tmpData.setting.protectedShow,
				});
			} else {
				console.log('No such document!');
			}
		});

		const querySnapshot = getDocs(collection(db, 'DetectedFishes'));
		querySnapshot.then((querySnapshot) => {
			let tmpData = [];
			querySnapshot.forEach((doc) => {
				JSON.parse(JSON.stringify(doc.data()));
				tmpData.push(doc.data().results);
			});
			groupDataByDate(tmpData).then((data) => {
				setSpeciesByDate(data);
			});
		});
	}, []);

	useEffect(() => {
		console.log(speciesByDate);
	}, [speciesByDate]);

	const dummySpeciesList = {
		'2024-01-06': [
			{
				date: '2024-01-01',
				lon: 'E124',
				detected_id: '77b84755-4ace-48f7-8dd3-35a7a60549cd',
				lat: 'N33',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/77b84755-4ace-48f7-8dd3-35a7a60549cd.png',
				user_id: '12345',
				species: 'Megalops atlanticus',
			},
			{
				lat: 'N33',
				detected_id: 'eab956c7-db45-4398-a0f3-0b6c4487af6f',
				lon: 'E124',
				species: 'Sphyraena barracuda',
				date: '2024-01-01',
				user_id: '12345',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/eab956c7-db45-4398-a0f3-0b6c4487af6f.png',
			},
			{
				user_id: '12345',
				lon: 'E124',
				species: 'Scarus rubroviolaceus',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/e660d81b-d681-4f4b-ae0f-35e663fc7837.png',
				detected_id: 'e660d81b-d681-4f4b-ae0f-35e663fc7837',
				date: '2024-01-01',
				lat: 'N33',
			},
			{
				lon: 'E124',
				species: 'Sphyraena barracuda',
				lat: 'N33',
				user_id: '12345',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/fd684627-5067-4323-a422-17fa0dd93182.png',
				detected_id: 'fd684627-5067-4323-a422-17fa0dd93182',
				date: '2024-01-01',
			},
			{
				species: 'Scarus rubroviolaceus',
				date: '2024-01-01',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/ce4433d1-86ef-4481-97ea-2fd6bea8eb79.png',
				user_id: '12345',
				detected_id: 'ce4433d1-86ef-4481-97ea-2fd6bea8eb79',
				lat: 'N33',
				lon: 'E124',
			},
		],
		'2024-01-02': [
			{
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/e058bbb2-07ce-4d9f-aafb-49298175f9f0.png',
				detected_id: 'e058bbb2-07ce-4d9f-aafb-49298175f9f0',
				species: 'Megalops atlanticus',
				date: '2024-01-01',
				user_id: '12345',
				lon: 'E124',
				lat: 'N33',
			},
			{
				lat: 'N33',
				species: 'Megalops atlanticus',
				date: '2024-01-01',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/636460bc-1e64-4cfc-9261-15ac7616f5d4.png',
				user_id: '12345',
				lon: 'E124',
				detected_id: '636460bc-1e64-4cfc-9261-15ac7616f5d4',
			},
			{
				lon: 'E124',
				lat: 'N33',
				detected_id: 'f07c25b6-4f53-4797-a968-d8f54a373580',
				date: '2024-01-01',
				species: 'Megalops atlanticus',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/f07c25b6-4f53-4797-a968-d8f54a373580.png',
				user_id: '12345',
			},
			{
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/6a7a1199-53f9-4c45-93c9-701e5c5d9db6.png',
				detected_id: '6a7a1199-53f9-4c45-93c9-701e5c5d9db6',
				lon: 'E124',
				lat: 'N33',
				user_id: '12345',
				date: '2024-01-01',
				species: 'Megalops atlanticus',
			},
			{
				species: 'Megalops atlanticus',
				user_id: '12345',
				img_path:
					'a2c37812-4453-4446-9c96-f14f33e90436/3ae55bf9-b611-4e72-b964-388679fd2fee.png',
				lon: 'E124',
				date: '2024-01-01',
				lat: 'N33',
				detected_id: '3ae55bf9-b611-4e72-b964-388679fd2fee',
			},
		],
	};

	return (
		<StyledDiv>
			<OptionContainer>
				<Typography
					variant="h6"
					color="text.primary"
					sx={{
						marginBottom: '1rem',
					}}
				>
					Endangered/Protected Species
				</Typography>
				<Typography
					variant="body1"
					color="text.primary"
					sx={{
						marginBottom: '0.5rem',
					}}
				>
					Manage Endangered/Protected Species
				</Typography>
				{/* Circle button with fish icon */}

				<SpeciesEditorModal />
				<FormGroup>
					<FormControlLabel
						control={
							<Checkbox
								checked={switchState.invasive}
								onChange={handleChange}
								name="invasive"
							/>
						}
						label="Invasive"
					/>
					<FormControlLabel
						control={
							<Checkbox
								checked={switchState.protected}
								onChange={handleChange}
								name="protected"
							/>
						}
						label="Protected"
					/>
				</FormGroup>

				<Typography
					variant="body1"
					color="text.primary"
					sx={{
						marginBottom: '0.5rem',
					}}
				></Typography>
			</OptionContainer>
			<Divider
				sx={{
					width: '100%',
				}}
			/>

			<OptionContainer>
				<Typography variant="h6" color="text.primary">
					By date
				</Typography>

				<Typography
					variant="body1"
					color="text.primary"
					sx={{
						marginBottom: '0.5rem',
					}}
				>
					See species found by date
				</Typography>

				<Container
					disableGutters
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'flex-start',
						justifyContent: 'center',
						width: '100%',
					}}
				>
					{
						Object.keys(dummySpeciesList).map((key, index) => {
							return (
								<LogList
									key={index}
									date={key}
									speciesList={dummySpeciesList[key]}
								/>
							);
						})
					}
				</Container>
			</OptionContainer>
		</StyledDiv>
	);
}
