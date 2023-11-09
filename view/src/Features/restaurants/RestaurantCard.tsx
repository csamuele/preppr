import { Paper, Grid, Typography, Box, IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";
interface RestaurantCardProps {
    name: string;
    description: string;
    onEdit: () => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({name, description, onEdit}) => {
    return (
        <Grid item xs={12}>
            <Paper  elevation={3} sx={{ p: 2 }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h5" component="h2">{name}</Typography>
                    <IconButton onClick={onEdit}>
                        <Edit />
                    </IconButton>
                </Box>
                <Typography variant="body2" component="p">{description}</Typography>
            </Paper>
        </Grid>
    );
};