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
	ListItemButton
} from '@mui/material';
import {NavLink, useNavigate} from 'react-router-dom'
import {
	Close as CloseIcon,
	Restaurant as RestaurantIcon,
	Storage as StorageIcon,
	MenuBook as MenuBookIcon,
	Kitchen as KitchenIcon,
} from '@mui/icons-material';

const drawerItems = [
	{ text: 'Stations', icon: <KitchenIcon />, to: '/' },
	{ text: 'Dishes', icon: <RestaurantIcon />, to: '/dishes'},
	{ text: 'Components', icon: <StorageIcon />, to: '/components' },
	{ text: 'Menus', icon: <MenuBookIcon />, to: '/menus' },
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
	const navigate = useNavigate();
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
					<ListItemButton key={index} onClick={()=> navigate(item.to)}>
							<ListItemIcon>{item.icon}</ListItemIcon>
							<ListItemText primary={item.text} />
					</ListItemButton>
				))}
			</List>
		</MuiDrawer>
	);
};
