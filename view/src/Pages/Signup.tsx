import { Button, Card, CardContent, Container, Grid, Typography, TextField } from '@mui/material';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'Features/ui';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from 'App/apiSlice';
import { UserFormData } from 'App/types';

const Signup = () => {
    const navigate = useNavigate();
    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string()
        .required('Required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        ),
        confirm: Yup.string().oneOf([Yup.ref('password'), undefined], 'Passwords must match').required('Required'),
    });



    const [registerUser, { isLoading }] = useRegisterMutation();

    const handleSubmit = async (user: UserFormData): Promise<void> => {
        try {
            const response = await registerUser( user );
            if ('data' in response) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                    <Card style={{ marginTop: '2rem' }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                Sign Up
                            </Typography>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                <Form>
                                    <ErrorMessage name="firstName"/>
                                    <Field name="firstName" as={TextField} label="First Name" fullWidth required margin="normal" />
                                    <ErrorMessage name="lastName"/>
                                    <Field name="lastName" as={TextField} label="Last Name" fullWidth required margin="normal" />
                                    <ErrorMessage name="email" />
                                    <Field name="email" type="email" as={TextField} label="Email" fullWidth required margin="normal" />
                                    <ErrorMessage name="password" />
                                    <Field name="password" type="password" as={TextField} inputProps={{ 'data-testid': 'password-input' }} label="Password" fullWidth required margin="normal" />
                                    <ErrorMessage name="confirm" />
                                    <Field name="confirm" type="password" as={TextField} inputProps={{ 'data-testid': 'confirm-password-input' }} label="Confirm Password" fullWidth required margin="normal" />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        style={{ marginTop: '1rem' }}
                                    >
                                        Sign Up
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        fullWidth
                                        style={{ marginTop: '1rem' }}
                                        href="/login"
                                    >
                                        Login
                                    </Button>
                                </Form>
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Signup;
