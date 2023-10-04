//login page written in typescript with a card centered in the middle of the page and a form inside of it with email and password fields, and a submit button as well as an option to sign up and a google sso button
//path: view/src/pages/Login.tsx

import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                    <Card style={{ marginTop: '2rem' }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                Login
                            </Typography>
                            <form>
                                <TextField
                                    label="Email"
                                    type="email"
                                    name="email"
                                    fullWidth
                                    margin="normal"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    name="password"
                                    fullWidth
                                    margin="normal"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    style={{ marginTop: '1rem' }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    fullWidth
                                    style={{ marginTop: '1rem' }}
                                    href="/signup"
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
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;