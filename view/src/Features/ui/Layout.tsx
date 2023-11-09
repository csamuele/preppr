import { useEffect, useState } from 'react';
import {
	Box,
	Toolbar,
	Container,
	useMediaQuery,
} from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import { AppBar, Drawer } from 'Features/ui';

export const Layout = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};
	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};
	// Add this function to check the screen size
	const isScreenAboveMd = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('md')
	);
	const drawerWidth = '240px'
	// Modify the isDrawerOpen state to always be true when the screen size is above md
	useEffect(() => {
		setIsDrawerOpen(isScreenAboveMd);
	}, [isScreenAboveMd]);
	return (
		<Box sx={{ marginLeft: isScreenAboveMd? drawerWidth : '0px' }}>
			<AppBar
				isScreenAboveMd={isScreenAboveMd}
				handleDrawerOpen={handleDrawerOpen}
			/>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Container
					style={{
						marginTop: '5rem',
						backgroundColor: 'background.default',
					}}
				>
					<Outlet />
				</Container>
			</Box>
			<Drawer
				isScreenAboveMd={isScreenAboveMd}
				isDrawerOpen={isDrawerOpen}
				handleDrawerClose={handleDrawerClose}
				drawerWidth={drawerWidth}
			/>
		</Box>
	);
};
