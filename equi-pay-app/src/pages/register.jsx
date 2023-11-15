import React from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link as MUILink } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});

function RegisterPage() {
    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
        },
    });

    const handleFieldBlur = (field) => {
        formik.setFieldTouched(field, true);
        if (formik.values[field] === '') {
            formik.setFieldError(field, 'This field is required');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper style={{
                marginTop: '100px'
            }} elevation={3}>
                <Box p={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={() => handleFieldBlur('username')}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={() => handleFieldBlur('email')}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={() => handleFieldBlur('password')}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <TextField
                            fullWidth
                            id="confirmPassword"
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={() => handleFieldBlur('confirmPassword')}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ marginTop: '20px' }}
                        >
                            Register
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
                        Already have an account? <MUILink component={Link} to="/login">Login</MUILink>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default RegisterPage;
