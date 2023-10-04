//signup page with a form with first name, last name, email, password, and confirm password fields and a submit button
import { Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log('user registered: ', data);
            } else {
                console.log('error registering user');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container maxWidth="sm">
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8} md={8}>
                    <Card style={{ marginTop: '2rem' }}>
                        <CardContent>
                            <Typography variant="h5" component="h1" gutterBottom>
                                Sign Up
                            </Typography>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="First Name"
                                    type="text"
                                    name="firstName"
                                    fullWidth
                                    margin="normal"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                                <TextField
                                    label="Last Name"
                                    type="text"
                                    name="lastName"
                                    fullWidth
                                    margin="normal"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                />
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
                                <TextField
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    fullWidth
                                    margin="normal"
                                    value={confirm}
                                    onChange={(event) => setConfirm(event.target.value)}
                                />
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
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Signup;