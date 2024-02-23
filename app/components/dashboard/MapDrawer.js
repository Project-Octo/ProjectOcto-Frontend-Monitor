import { DrawerContext } from '@/app/context/DrawerContext';
import styled from '@emotion/styled';
import { Button, Drawer, IconButton, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useContext } from 'react';

export default function MapDrawer() {
	const { isDrawerOpen, toggleDrawer } = useContext(DrawerContext);

	const handleDrawerClose = () => {
		toggleDrawer(!isDrawerOpen);
	};

	const DrawerHeader = styled('div')`
		display: flex;
		align-items: center;
		justify-content: flex-end;
        padding: 8px 8px;
	`;

	return (
		<Drawer
			variant="temporary"
			anchor="left"
			open={isDrawerOpen}
			onClose={handleDrawerClose}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
			hideBackdrop={true}
		>
			<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
				</IconButton>
			</DrawerHeader>
			<Divider />
			<div
				role="presentation"
				onClick={handleDrawerClose}
				onKeyDown={handleDrawerClose}
			>
				<p>Drawer Content</p>
			</div>
		</Drawer>
	);
}
