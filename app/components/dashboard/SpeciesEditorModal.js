import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CountrySpecies } from '@/app/context/CountrySpecies';
import {
	ListItem,
	List,
	IconButton,
	Container,
	Divider,
	TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';

import styled from '@emotion/styled';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 1000,
	bgcolor: 'background.paper',
	border: 'none',
	boxShadow: 24,
	borderRadius: 4,
	p: 4,
};

export default function SpeciesEditorModal() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const { countrySpecies } = React.useContext(CountrySpecies);

	const [invasiveSpecies, setInvasiveSpecies] = React.useState([]);
	const [protectedSpecies, setProtectedSpecies] = React.useState([]);

	const [addInvasiveSpecies, setAddInvasiveSpecies] = React.useState('');
	const [addProtectedSpecies, setAddProtectedSpecies] = React.useState('');

	React.useEffect(() => {
		if (countrySpecies) {
			setInvasiveSpecies(countrySpecies.invasive);
			setProtectedSpecies(countrySpecies.protected);
		}
	}, [countrySpecies]);

	const handleAddInvasiveSpecies = () => {
		setInvasiveSpecies([...invasiveSpecies, addInvasiveSpecies]);
		setAddInvasiveSpecies('');
	};

	const handleAddProtectedSpecies = () => {
		setProtectedSpecies([...protectedSpecies, addProtectedSpecies]);
		setAddProtectedSpecies('');
	};

	const ListContainer = styled('div')`
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding: 0;
		gap: 1rem;
	`;

	const IndividualList = styled('div')`
		width: 100%;
		max-width: 500;
		margin-right: 1rem;
	`;

	function RenderList(speciesList, type) {
		return (
			<IndividualList key={`IL-${type}`}>
				<List
					key={`list-${type}`}
					sx={{
						width: '100%',
						maxWidth: 500,
						bgcolor: 'background.paper',
						position: 'relative',
						overflow: 'auto',
						maxHeight: 300,
						'& ul': { padding: 0 },
						padding: 0,
					}}
				>
					{speciesList?.map((species, index) => {
						return (
							<>
								<Divider key={`divider-${index}`} />

								<ListItem
									key={`list-${index}`}
									sx={{
										paddingLeft: '0',
									}}
									secondaryAction={
										<IconButton
											edge="end"
											aria-label="delete"
											key={`delete-${index}`}
										>
											<DeleteIcon key={`delete-icon-${index}`} />
										</IconButton>
									}
								>
									<Typography
										variant="body1"
										component="div"
										key={`species-${index}`}
									>
										{species}
									</Typography>
								</ListItem>
							</>
						);
					})}
				</List>
			</IndividualList>
		);
	}

	return (
		<div>
			<Button onClick={handleOpen} variant="contained">
				Open Editor
			</Button>
			<Modal
				key="modal"
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h4" component="h2">
						Species Editor
					</Typography>

					<Typography
						variant="body1"
						component="div"
						sx={{
							color: 'text.secondary',
							marginBottom: '1rem',
						}}
					>
						Default invasive/protected species are sourced from each
						country&rsquo;s official list of endangered and protected species.
					</Typography>

					<ListContainer>
						<Container disableGutters>
							<Typography variant="h6" component="div">
								Invasive Species
							</Typography>
							{RenderList(invasiveSpecies, 'Invasive Species')}
							<Container
								disableGutters
								sx={{
									display: 'flex',
									alignContent: 'center',
									marginTop: '1rem',
								}}
							>
								<TextField
									label="Add Invasive Species"
									key="add-invasive-species"
									value={addInvasiveSpecies}
									sx={{
										width: '100%',
									}}
									onChange={(e) => {
										setAddInvasiveSpecies(e.target.value);
									}}
								/>
								<Button
									variant="contained"
									color="primary"
									sx={{
										marginLeft: '1rem',
										padding: '1rem 2rem',
									}}
								>
									Add
								</Button>
							</Container>
						</Container>

						<Container disableGutters>
							<Typography variant="h6" component="div">
								Protected Species
							</Typography>

							{RenderList(protectedSpecies, 'Protected Species')}

							<Container
								disableGutters
								sx={{
									display: 'flex',
									alignContent: 'center',
									marginTop: '1rem',
								}}
							>
								<TextField
									label="Add Protected Species"
									key="add-protected-species"
									value={addProtectedSpecies}
									sx={{
										width: '100%',
									}}
									onChange={(e) => {
										setAddProtectedSpecies(e.target.value);
									}}
								/>
								<Button
									variant="contained"
									color="primary"
									sx={{
										marginLeft: '1rem',
										padding: '1rem 2rem',
									}}
									onChange={handleAddInvasiveSpecies}
								>
									Add
								</Button>
							</Container>
						</Container>
					</ListContainer>

					<Container
						disableGutters
						sx={{
							display: 'flex',
							justifyContent: 'flex-end',
							marginTop: '1rem',
							gap: '1rem',
						}}
					>
						<Button variant="contained" color="info">
							Revert to default
						</Button>
						<Button variant="contained" color="primary">
							Save Changes and Close
						</Button>
						<Button variant="contained" color="error" onClick={handleClose}>
							Close Without Saving
						</Button>
					</Container>
				</Box>
			</Modal>
		</div>
	);
}
