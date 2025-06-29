import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import AuthService from '../../../services/auth.service';
import AuthLayout from '../../../components/layout/AuthLayout';
import { NewLogo } from '../../../components/utils/AnimatedAssets';

const ForgotPasswordEmailVerification = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
        setResponseError("");
        try {
            const response = await AuthService.forgotPasswordVerifyEmail(data.email);
                if (response.data.status === 'SUCCESS') {
                    navigate(`/auth/forgotPassword/verifyAccount/${data.email}`);
                } else {
                    setResponseError('Verification failed: Something went wrong!');
                }
        } catch (error) {
            const resMessage = error.response?.data?.response || "Verification failed. Please try again.";
                    setResponseError(resMessage);
        } finally {
        setIsLoading(false);
    }
    };

  return (
        <AuthLayout>
            <motion.div style={styles.card} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={styles.logoContainer}>
                    <NewLogo />
                </div>
                <h2 style={styles.title}>Forgot Password</h2>
                <p style={styles.infoText}>Enter the email address associated with your account.</p>

                {response_error && <p style={styles.errorText}>{response_error}</p>}
                
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input 
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            style={styles.input}
                        {...register('email', {
                            required: "Email is required!",
                                pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
                        })}
                    />
                        {errors.email && <small style={styles.errorText}>{errors.email.message}</small>}
                </div>

                    <motion.button type="submit" style={styles.button} disabled={isLoading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {isLoading ? "Sending..." : 'Send Verification Code'}
                    </motion.button>
                </form>
                
                <div style={styles.switchMessage}>
                    <Link to={'/auth/login'} style={styles.inlineLink}>Back to Login</Link>
                </div>
            </motion.div>
        </AuthLayout>
    );
};

// Re-using styles from other auth pages for consistency
const styles = {
    card: {
        maxWidth: '500px',
        padding: '2.5rem',
        position: 'relative',
        zIndex: 1,
        width: '90%',
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        textAlign: 'center',
    },
    logoContainer: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '0.5rem',
    },
    infoText: {
        color: '#666',
        fontSize: '1rem',
        marginBottom: '1.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    inputGroup: { textAlign: 'left' },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        color: '#854836',
        fontWeight: '600',
    },
    input: {
        width: '100%',
        padding: '0.8rem 1rem',
        borderRadius: '10px',
        border: '1px solid #ddd',
        background: '#fff',
        fontSize: '1rem',
    },
    button: {
        padding: '0.8rem 2rem',
        fontSize: '1.1rem',
        color: '#F7F7F7',
        backgroundColor: '#FFB22C',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontWeight: '600',
        marginTop: '1rem',
        alignSelf: 'center',
        width: '280px',
    },
    errorText: { color: '#D32F2F', fontSize: '0.9rem', marginTop: '0.5rem' },
    switchMessage: { marginTop: '1.5rem' },
    inlineLink: {
        color: '#854836',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#FFB22C',
        }
    },
};

export default ForgotPasswordEmailVerification;
