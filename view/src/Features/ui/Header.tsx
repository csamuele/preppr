//path view/src/features/ui/Header.tsx

import { AppBar, Button, Container, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';

export const Header = () => {
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
						<Typography variant="h6">preppr</Typography>
						<Button color="inherit" href="/login">
							Login
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
			<Outlet />
		</>
	);
}
