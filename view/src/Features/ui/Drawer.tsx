import { FC } from 'react';
import {
	Box,
	IconButton,
	Typography,
	Drawer as MuiDrawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import {
	Close as CloseIcon,
	Restaurant as RestaurantIcon,
	Storage as StorageIcon,
	MenuBook as MenuBookIcon,
	Kitchen as KitchenIcon,
} from '@mui/icons-material';

const drawerItems = [
	{ text: 'Stations', icon: <KitchenIcon /> },
	{ text: 'Dishes', icon: <RestaurantIcon /> },
	{ text: 'Components', icon: <StorageIcon /> },
	{ text: 'Menus', icon: <MenuBookIcon /> },
];

export interface DrawerProps {
	isScreenAboveMd: boolean;
	isDrawerOpen: boolean;
	handleDrawerClose: () => void;
	drawerWidth: string;
}

export const Drawer: FC<DrawerProps> = ({
	isScreenAboveMd,
	isDrawerOpen,
	drawerWidth,
	handleDrawerClose,
}) => {
	return (
		<MuiDrawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
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
		</MuiDrawer>
	);
};
