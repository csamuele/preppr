import { useEffect, useState } from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Container,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	useMediaQuery} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'Utils/Hooks/useDispatch';
import { CurrentRestaurantSelect } from 'Features/restaurants';
import { drawerItems } from './DrawerOptions';
import { UserMenu } from 'Features/user';

export const Layout = () => {
	
	const navigate = useNavigate();


	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);



	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};
	const dispatch = useDispatch();



	// Add this function to check the screen size
	const isScreenAboveMd = useMediaQuery((theme: Theme) => theme.breakpoints.up('md')
	);
	const drawerWidth = isScreenAboveMd ? '240px' : '0px';
	// Modify the isDrawerOpen state to always be true when the screen size is above md
	useEffect(() => {
		setIsDrawerOpen(isScreenAboveMd);
	}, [isScreenAboveMd]);

	return (
		<Box sx={{ marginLeft: drawerWidth }}>
			<Box>
				<AppBar position="static">
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Box
								sx={{
									flexGrow: 1,
									display: {
										xs: 'flex',
										md: 'none',
									},
								}}
							>
								<IconButton
									size="large"
									aria-label="open drawer"
									onClick={handleDrawerOpen}
									edge="start"
									color="inherit"
									sx={{ mr: 2 }}
								>
									<MenuIcon />
								</IconButton>
							</Box>
							<Box sx={{ flexGrow: 1 }}>
								<CurrentRestaurantSelect />
							</Box>
							<Box sx={{ flexGrow: 0 }}>
								<UserMenu isScreenAboveMd={isScreenAboveMd} />
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
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
			</Box>
			<Drawer
				sx={{
					width: 240,
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: 240,
						boxSizing: 'border-box',
					},
				}}
				variant="persistent"
				anchor="left"
				open={isScreenAboveMd ? true : isDrawerOpen} // Modify the open prop to always be true when the screen size is above md
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '16px',
					}}
				>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						PREPPR
					</Typography>
					{isScreenAboveMd ? null : (
						<IconButton onClick={handleDrawerClose}>
							<CloseIcon />
						</IconButton>
					)}
				</Box>

				<List>
					{drawerItems.map((item, index) => (
						<ListItem key={index}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
