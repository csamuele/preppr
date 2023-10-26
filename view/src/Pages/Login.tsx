//login page written in typescript with a card centered in the middle of the page and a form inside of it with email and password fields, and a submit button as well as an option to sign up and a google sso button
//path: view/src/pages/Login.tsx

import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from 'Features/ui';
import { useLoginMutation, Credentials } from 'App/apiSlice';
import { useDispatch } from 'Utils/Hooks/useDispatch';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

const Login = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };
    const [loginUser, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const handleSubmit = async (values: Credentials): Promise<void> => {
        try {
            const response = await loginUser(values);
            if (response) {
                //alert the user that they have successfully logged in
                alert('You have successfully logged in!');
                //set the authenticated state to true
                console.log(response);
                //redirect the user to the dashboard page using react router
                navigate('/');
            } else {
                alert('Error logging in');
                console.log(response);
            }
        } catch (error) {
            //alert the user that there was an error logging in based on the error message
            alert(error);

        }
    }
    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                    <Card style={{ marginTop: '2rem' }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                Login
                            </Typography>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={LoginSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <Field
                                            as={TextField}
                                            label="Email"
                                            type="email"
                                            name="email"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <ErrorMessage name="email"  />
                                        <Field
                                            as={TextField}
                                            label="Password"
                                            type="password"
                                            name="password"
                                            fullWidth
                                            margin="normal"
                                        />
                                        <ErrorMessage name="password" />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            style={{ marginTop: '1rem' }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Logging in...' : 'Login'}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            style={{ marginTop: '1rem' }}
                                            onClick={() => navigate('/signup')}
                                        >
                                            Sign Up
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            style={{ marginTop: '1rem' }}
                                            href="/auth/google"
                                        >
                                            Login with Google
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;