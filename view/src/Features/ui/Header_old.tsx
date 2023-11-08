//path view/src/features/ui/Header.tsx

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { useLogoutMutation, useGetCurrentUserQuery } from 'App/apiSlice';
import { useDispatch } from 'Utils/Hooks/useDispatch';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const Header_old = () => {
	const [logoutUser, { isLoading }] = useLogoutMutation({});
	const { pathname } = useLocation();
	const {
		data: user,
		isLoading: isLoadingUser,
		error,
	} = useGetCurrentUserQuery({});
	const navigate = useNavigate();
	const dispatch = useDispatch();
	useEffect(() => {
		if (error) {
			navigate('/login');
		}
	}, [error, navigate]);
	const handleLogout = async (): Promise<void> => {
		try {
			const response = await logoutUser(null);
			if (response) {
				//alert the user that they have successfully logged out
				alert('You have successfully logged out!');
				//set the authenticated state to false
				navigate('/login');
			} else {
				alert('Error logging out');
			}
		} catch (error) {
			//alert the user that there was an error logging out based on the error message
			alert(error);
		}
	};
	return (
		<>
			<AppBar position="static">
				<Container maxWidth="md">
					<Toolbar
						style={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<Typography variant="h4">{pathname === '/' ? 'My Restaurants' : 'Preppr'}</Typography>

						<Button color="inherit" onClick={handleLogout}>
							Logout{' '}
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
			<Container style={{ marginTop: '5rem' }}>
				<Outlet />
			</Container>
		</>
	);
};