import { Paper, Grid, Typography } from "@mui/material";

interface RestaurantCardProps {
    name: string;
    description: string;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({name, description}) => {
    return (
        <Grid item xs={12} md={6} lg={6}>
            <Paper  elevation={3} sx={{ p: 2 }}>
                <Typography variant="h5" component="h2">{name}</Typography>
                <Typography variant="body2" component="p">{description}</Typography>
            </Paper>
        </Grid>
    );
};