import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { useState } from 'react';

export default function LogList({ key, date, speciesList }) {
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			sx={{
				width: '300px',
			}}
		>
			<ListItemButton
				onClick={handleClick}
				sx={{
					width: '100%',
				}}
			>
				<ListItemIcon>
					<FolderIcon />
				</ListItemIcon>
				<ListItemText primary={date} />
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{speciesList.map((species, index) => {
						return (
							<ListItemButton
								sx={{
									pl: 4,
								}}
								key={index}
							>
								<ListItemIcon>
									<StarBorder />
								</ListItemIcon>
								<ListItemText primary={species.species} />
							</ListItemButton>
						);
					})}
				</List>
			</Collapse>
		</List>
	);
}
