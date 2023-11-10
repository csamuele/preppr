import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
    Grid,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'Features/ui';
import { useCreateStationMutation, useUpdateStationMutation } from 'Features/stations';
import { Station } from 'Features/stations';

interface StationNewEditProps {
    station: Station | null;
    onClose: () => void;
}

export const StationNewEdit: React.FC<StationNewEditProps> = ({station, onClose}) => {
    const open = station !== null;
    const [createStation, { isLoading }] = useCreateStationMutation();
    const [updateStation, { isLoading: isUpdating }] = useUpdateStationMutation();
    const handleSubmit = async (station: Station): Promise<void> => {
        try {
            if (station.stationId !== '') {
                const response = await updateStation(station);
                if ('error' in response) {
                    alert('Error updating station');
                }
            } else {
                const response = await createStation(station);
                if ('error' in response) {
                    alert('Error creating station');
                }
            }
        } catch (error) {
            alert(error);
        }
        onClose();
    }

    if (!station) {
        return null;
    }
    let title = 'Edit Station';
    if (station.stationId === '') {
        title = 'New Station';
    }
    const initialValues: Station = {
        stationId: station.stationId,
        name: station.name,
        restaurantId: station.restaurantId,
       };
    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
    });
    return (
        <Dialog open={open} onClose={() => onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                                    <Field
								name="name"
								label="Name"
								as={TextField}
                                variant="standard"
                                fullWidth
								error={isSubmitting}
								helperText={
									<ErrorMessage name="name" />
								}
							/>
                            <DialogActions>
                                <Button
                                    type="button"
                                    onClick={() => onClose()}
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                                <Button
									type="submit"
								>
									Save
								</Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}