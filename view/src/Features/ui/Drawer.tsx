import { FC } from 'react';
import {
	Box, IconButton,
	Typography, Drawer as MuiDrawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { drawerItems } from './DrawerOptions';


export interface DrawerProps {
	isScreenAboveMd: boolean;
	isDrawerOpen: boolean;
	handleDrawerClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({ isScreenAboveMd, isDrawerOpen, handleDrawerClose }) => {
	return (
		<MuiDrawer
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
		</MuiDrawer>
	);
};
