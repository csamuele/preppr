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
import { useCreateRestaurantMutation, useUpdateRestaurantMutation } from 'App/apiSlice';
import { Restaurant } from 'App/types';

interface RestaurantNewEditProps {
	restaurant: Restaurant | null;
	onClose: () => void;
}

export const RestaurantNewEdit: React.FC<RestaurantNewEditProps> = ({
	restaurant,
	onClose,
}) => {
	const open = restaurant !== null;
	const handleClose = () => {
		onClose();
	};
	const [createRestaurant, { isLoading }] = useCreateRestaurantMutation();
    const [updateRestaurant, { isLoading: isUpdating }] = useUpdateRestaurantMutation();
	if (!restaurant) {
		return null;
	}
	let title = 'Edit Restaurant';
	if (restaurant.restaurantId === '') {
		title = 'New Restaurant';
	}
	const initialValues: Restaurant = {
		restaurantId: restaurant.restaurantId,
		name: restaurant.name,
		description: restaurant.description,
		userId: restaurant.userId,
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('Required'),
		description: Yup.string().required('Required'),
	});
	const handleSubmit = async (restaurant: Restaurant): Promise<void> => {
		try {
            if (restaurant.restaurantId !== '') {
                const response = await updateRestaurant(restaurant);
                if ('error' in response) {
                    alert('Error updating restaurant');
                }
            } else {
			const response = await createRestaurant(restaurant);
			if ('error' in response) {
				alert('Error creating restaurant');
			}
        }
        onClose();
		} catch (error) {
			alert(error);
		}
	};
	return (
		<Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({ isSubmitting }) => (
						<Form >
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
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
                            </Grid>
                            <Grid item>
							<Field
								name="description"
								label="Description"
								as={TextField}
                                variant="standard"
                                fullWidth
                                multiline
								error={isSubmitting}
								helperText={
									<ErrorMessage name="description" />
								}
							/>
                            </Grid>
                            </Grid>
							<DialogActions>
								<Button onClick={handleClose}>
									Cancel
								</Button>
								<Button
									type="submit"
									disabled={isSubmitting}
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
};
