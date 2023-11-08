import {useEffect, useState} from 'react';
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Container,
	Avatar,
	Tooltip,
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	useMediaQuery,
	ToggleButton,
	Switch,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Home as HomeIcon,
	Restaurant as RestaurantIcon,
	Storage as StorageIcon,
	MenuBook as MenuBookIcon,
	Kitchen as KitchenIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { Theme } from '@mui/material/styles';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from 'App/apiSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'Utils/Hooks/useDispatch';
import { selectIsDarkMode, setDarkMode } from 'Features/ui';

const settings = ['Profile', 'Change Restaurant', 'Dark Mode', 'Logout'];
const drawerItems = [
	{ text: 'Stations', icon: <KitchenIcon /> },
	{ text: 'Dishes', icon: <RestaurantIcon /> },
	{ text: 'Components', icon: <StorageIcon /> },
	{ text: 'Menus', icon: <MenuBookIcon /> },
];

export const Header = () => {
    const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useGetCurrentUserQuery({});
    const navigate = useNavigate();
    useEffect(() => {
        if (error) {
            navigate('/login');
        }
    }, [error, navigate]);

	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(
		null
	);
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleDrawerOpen = () => {
		setIsDrawerOpen(true);
	};

	const handleDrawerClose = () => {
		setIsDrawerOpen(false);
	};
	const dispatch = useDispatch();
	const handleDarkMode = () => {
		dispatch(setDarkMode(!darkMode));
		Cookies.set('isDarkMode', (!darkMode).toString());
	}

	const darkMode = useSelector(selectIsDarkMode);

	// Add this function to check the screen size
	const isScreenAboveMd = useMediaQuery((theme: Theme) =>
		theme.breakpoints.up('md')
	);

	// Modify the isDrawerOpen state to always be true when the screen size is above md
	useEffect(() => {
		setIsDrawerOpen(isScreenAboveMd);
	}, [isScreenAboveMd]);

	return (
		<>
			<AppBar position="static">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Box
							sx={{ flexGrow: 1, display: { xs: 'flex' } }}
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

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<Button
									onClick={handleOpenUserMenu}
									sx={{ textTransform: 'none'}}
								>
									<Box
												sx={{
													display: 'flex',
													alignItems: 'center',
												}}
											>
												<Avatar>
													{user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || ''}
												</Avatar>
												<Box
											sx={{
												marginLeft: '10px',
											}}
										>
											<Typography
												sx={{
													color: 'white',
												}}
												variant="body1"
												component="span"
											>
												{user?.firstName}{' '}{user?.lastName}
											</Typography>
										</Box>
									</Box>
								</Button>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								
									<MenuItem
										onClick={handleCloseUserMenu}
									>
										<Typography textAlign="center">
											Profile
										</Typography>
									</MenuItem>
									<MenuItem
										onClick={handleCloseUserMenu}
									>
										<Typography textAlign="center">
											Change Restaurant
										</Typography>
									</MenuItem>
									<MenuItem
									onClick={handleDarkMode}
									>
										<Typography textAlign="center">
											Dark Mode
										</Typography>
										<Switch
											sx={{
												marginLeft: 'auto',
											}}
											checked={darkMode}
										/>
									</MenuItem>
									<MenuItem
										onClick={handleCloseUserMenu}
									>
										<Typography textAlign="center">
											Logout
										</Typography>
									</MenuItem>
						
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
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
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px' }}>
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
                    {isScreenAboveMd ? null :
                        <IconButton onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>}
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
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				<Container style={{ marginTop: '5rem' }}>
					<Outlet />
				</Container>
			</Box>
		</>
	);
};
export default Header;
