import {
	ToggleButton,
} from '@mui/material';
import {
	Home as HomeIcon,
	Restaurant as RestaurantIcon,
	Storage as StorageIcon,
	MenuBook as MenuBookIcon,
	Kitchen as KitchenIcon,
} from '@mui/icons-material';

const settings = ['Profile', 'Change Restaurant', 'Dark Mode', 'Logout'];
export const drawerItems = [
	{ text: 'Stations', icon: <KitchenIcon /> },
	{ text: 'Dishes', icon: <RestaurantIcon /> },
	{ text: 'Components', icon: <StorageIcon /> },
	{ text: 'Menus', icon: <MenuBookIcon /> },
];

