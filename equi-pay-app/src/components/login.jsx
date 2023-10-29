import React from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Link as MUILink } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {Link, useNavigate} from 'react-router-dom';

const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
});

function LoginPage() {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            navigate('/')
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
            <Paper style={{marginTop: '100px'}} elevation={3}>
                <Box p={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ marginTop: '20px' }}
                        >
                            Login
                        </Button>
                    </form>
                    <Typography variant="body1" align="center" style={{ marginTop: '20px' }}>
                        Don't have an account? <MUILink component={Link} to="/register">Register</MUILink>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default LoginPage;
