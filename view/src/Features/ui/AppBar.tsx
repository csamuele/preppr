import { FC } from 'react';
import {
	AppBar as MuiAppBar,
	Box,
	Toolbar,
	IconButton, Container
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { CurrentRestaurantSelect } from 'Features/restaurants';
import { UserMenu } from 'Features/user';


export interface HeaderProps {
	isScreenAboveMd: boolean;
	handleDrawerOpen: () => void;
}
;

export const AppBar: FC<HeaderProps> = ({ isScreenAboveMd, handleDrawerOpen }) => {

	return (
		<MuiAppBar position="static">
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
		</MuiAppBar>
	);
};
