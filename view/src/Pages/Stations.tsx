import {
    Container,
    Grid,
    CircularProgress,
    Button
} from '@mui/material';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { StationCard, StationNewEdit, Station } from 'Features/stations';
import { useGetStationsQuery, useDeleteStationMutation } from 'Features/stations';
import { selectCurrentRestaurant } from 'Features/restaurants';

export const Stations: FC = () => {
    const currentRestaurant = useSelector(selectCurrentRestaurant);
    const {
        data: stations,
        isLoading: isLoadingStations,
        error: errorStations,
    } = useGetStationsQuery(currentRestaurant.restaurantId); 
    const [deleteStation, { isLoading: isDeleting }] = useDeleteStationMutation();   
    const [station, setStation] = useState<Station | null>(null);
    if (isLoadingStations || isDeleting) {
        return <CircularProgress />;
    }
    const handleNewRestaurant = () => {
        
        const newStation: Station = {
            stationId: '',
            name: '',
            restaurantId: currentRestaurant.restaurantId,
        };
        setStation(newStation);
    }
    return (
        <Container>
            <Grid container spacing={3}>
                {stations?.map((station) => (
                    <StationCard
                        key={station.stationId}
                        name={station.name}
                        onEdit={() => setStation(station)}
                        onDelete={() => deleteStation(station.stationId)}
                    />
                ))}
                <Grid item xs={12}>
                    <Button variant='contained' color='primary' onClick={handleNewRestaurant}>
                        Add Station
                    </Button>
                </Grid>
            </Grid>
        <StationNewEdit 
            station={station}
            onClose={() => setStation(null)}
            />
        </Container>
    );
}