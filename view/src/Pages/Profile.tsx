import { FC } from 'react';
import {
	TextField,
	Typography,
	Button,
	CircularProgress,
	Grid,
} from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'Features/ui';
import { useGetCurrentUserQuery, useUpdateUserMutation } from 'App/apiSlice';
 


const validationSchema = Yup.object().shape({
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
});

export const Profile: FC = () => {
	const { data: user, isLoading, error } = useGetCurrentUserQuery({});
	const [updateUser, { isLoading: isUpdating, data: updatedUser }] = useUpdateUserMutation();
    const handleSubmit = async (values: {firstName:string, lastName:string}): Promise<void> => {
        try {
            const response = await updateUser(values);
            if (response) {

                alert('You have successfully updated your profile!');
            } else {
                alert('Error updating profile');
            }
        } catch (error) {
            alert(error);
        }
    }
	if (isLoading) {
		return <CircularProgress />;
	}

	return (
		<div>
			<Formik
				initialValues={{
					firstName: user?.firstName ?? '',
					lastName: user?.lastName ?? '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ errors, touched }) => (
					<Form>
						<Grid container spacing={2}>
                            <Grid item xs={12}>
							<Typography variant="h4">Profile</Typography>
                            </Grid>
                            <Grid item xs={12}>
							<Typography variant="subtitle1">
								{user?.email}
							</Typography>
                            </Grid>
                            <Grid item xs={12}>
							<Field
								name="firstName"
								as={TextField}
								label="First Name"
								error={
									touched.firstName &&
									Boolean(errors.firstName)
								}
								helperText={
									touched.firstName &&
									errors.firstName
								}
							/>
							<Field
								name="lastName"
								as={TextField}
								label="Last Name"
								error={
									touched.lastName &&
									Boolean(errors.lastName)
								}
								helperText={
									touched.lastName && errors.lastName
								}
							/>
                            </Grid>
                            <Grid item xs={12}>
							<Button type="submit" disabled={isUpdating}>
								{isUpdating ? (
									<CircularProgress size={24} />
								) : (
									'Save'
								)}
							</Button>
                            </Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
};
