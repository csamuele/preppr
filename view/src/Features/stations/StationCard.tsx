import { Grid, Paper, Typography, Box, IconButton, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { FC } from 'react';

interface StationCardProps {
	name: string;
    onEdit: () => void;
    onDelete: () => void;
}

export const StationCard: FC<StationCardProps> = ({ name, onEdit, onDelete }) => {
	return (
		<Grid item xs={12} sm={6} lg={4}>
			<Paper elevation={3} sx={{ p: 2 }}>
				<Box display="flex" justifyContent="space-between">
					<Typography variant="h5" component="h2">
						{name}
					</Typography>
                    <IconButton onClick={onEdit}>
                        <Edit />
                    </IconButton>
				</Box>
                <Button color="error" onClick={onDelete}>Delete</Button>
			</Paper>
		</Grid>
	);
};
