import { FC, useEffect, useState } from 'react';
import {
	Box, Button, Typography,
	Menu,
	MenuItem, Avatar,
	Tooltip, Switch,
	CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery, useLogoutMutation } from 'App/apiSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'Utils/Hooks/useDispatch';
import { selectIsDarkMode, setDarkMode } from 'Features/ui';


export interface UserMenuProps {
	isScreenAboveMd: boolean;
}


export const UserMenu: FC<UserMenuProps> = ({ isScreenAboveMd }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const {
		data: user, isLoading: isLoadingUser, error,
	} = useGetCurrentUserQuery({});
	useEffect(() => {
		if (error) {
			navigate('/login');
		}
	}, [error, navigate]);
	const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const darkMode = useSelector(selectIsDarkMode);

	const handleDarkMode = () => {
		dispatch(setDarkMode(!darkMode));
		Cookies.set('isDarkMode', (!darkMode).toString());
	};
	const handleLogout = async () => {
		try {
			const response = await logoutUser({});
			if ('data' in response) {
				//alert the user that they have successfully logged out
				alert('You have successfully logged out!');
				//set the authenticated state to false
				//redirect the user to the login page using react router
				navigate('/login');
			} else {
				alert('Error logging out');
			}
		} catch (error) {
			alert(error);
		}
	}
	if (isLoadingUser) {
		return <CircularProgress />;
	}
	return (
		<>
			<Tooltip title="Open settings">
				<Button
					onClick={handleOpenUserMenu}
					sx={{ textTransform: 'none' }}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Avatar>
							{user?.firstName?.charAt(
								0
							) || ''}
							{user?.lastName?.charAt(
								0
							) || ''}
						</Avatar>
						<Box
							sx={{
								marginLeft: '10px',
							}}
						>
							{isScreenAboveMd && (
								<Typography
									sx={{
										color: 'white',
									}}
									variant="body1"
									component="span"
								>
									{user?.firstName}{' '}
									{user?.lastName}
								</Typography>
							)}
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
					onClick={() => navigate('/profile')}
				>
					<Typography textAlign="center">
						Profile
					</Typography>
				</MenuItem>
				<MenuItem
					onClick={() => navigate('/restaurants')}
				>
					<Typography textAlign="center">
						Restaurants
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleDarkMode}>
					<Typography textAlign="center">
						Dark Mode
					</Typography>
					<Switch
						sx={{
							marginLeft: 'auto',
						}}
						checked={darkMode} />
				</MenuItem>
				<MenuItem
					onClick={handleLogout}
				>
					<Typography textAlign="center">
						Logout
					</Typography>
				</MenuItem>
			</Menu>
</>
	);
};
