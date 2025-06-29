import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import AuthService from '../../../services/auth.service';
import AuthLayout from '../../../components/layout/AuthLayout';
import { NewLogo } from '../../../components/utils/AnimatedAssets';

const ForgotPasswordCodeVerification = () => {
    const navigate = useNavigate();
    const { email } = useParams(); 
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data) => {
        setIsLoading(true);
        setResponseError("");
        try {
            const response = await AuthService.forgotPasswordverifyCode(data.code);
                if (response.data.status === 'SUCCESS') {
                    navigate(`/auth/forgotPassword/resetPassword/${email}`);
                } else {
                setResponseError('Verification failed. Invalid code.');
                }
        } catch (error) {
            const resMessage = error.response?.data?.response || "Verification failed. Please try again.";
            setResponseError(resMessage);
        } finally {
        setIsLoading(false);
    }
    };

    const resendCode = async () => {
        setIsSending(true);
                    setResponseError("");
        setSuccessMessage("");
        try {
            await AuthService.resendResetPasswordVerificationCode(email);
            setSuccessMessage(`A new verification code has been sent to ${email}.`);
        } catch (error) {
            setResponseError("Failed to resend code. Please try again in a moment.");
        } finally {
        setIsSending(false);
    }
    };

    return (
        <AuthLayout>
            <motion.div style={styles.card} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                <div style={styles.logoContainer}>
                    <NewLogo />
                </div>
                <h2 style={styles.title}>Verify Your Account</h2>
                
                {isSending && <p style={styles.infoText}>Sending email to {email}...</p>}
                {successMessage && <p style={styles.successText}>{successMessage}</p>}
                {!isSending && !successMessage && (
                    <p style={styles.infoText}>
                        A verification code has been sent to <span style={{ fontWeight: 'bold', color: '#854836' }}>{email}</span>.
                    </p>
                )}
                {response_error && <p style={styles.errorText}>{response_error}</p>}
                
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="code" style={styles.label}>Verification Code</label>
                    <input 
                            id="code"
                            type="text"
                            placeholder="Enter 6-digit code"
                            style={styles.input}
                            {...register('code', { required: "Code is required!" })}
                    />
                        {errors.code && <small style={styles.errorText}>{errors.code.message}</small>}
                </div>

                    <p style={styles.expiryInfo}>The code will expire in 15 minutes.</p>

                    <motion.button type="submit" style={styles.button} disabled={isLoading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {isLoading ? "Verifying..." : 'Verify'}
                    </motion.button>
                </form>
                
                <div style={styles.switchMessage}>
                    Having problems?{' '}
                    <span onClick={resendCode} style={{...styles.inlineLink, cursor: 'pointer'}}>
                        {isSending ? "Sending..." : 'Resend Code'}
                    </span>
                </div>
            </motion.div>
        </AuthLayout>
    );
};

// Re-using styles from other auth pages
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
        marginBottom: '1rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginTop: '1.5rem',
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
        textAlign: 'center',
        letterSpacing: '0.2em',
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
    errorText: { color: '#D32F2F', fontSize: '0.9rem', marginTop: '1rem' },
    successText: { color: '#2E7D32', fontSize: '0.9rem', marginTop: '1rem' },
    infoText: { color: '#666', fontSize: '1rem', marginTop: '1rem' },
    expiryInfo: { color: '#666', fontSize: '0.8rem', fontStyle: 'italic', marginTop: '0.5rem' },
    switchMessage: { marginTop: '1.5rem', color: '#854836' },
    inlineLink: { color: '#FFB22C', textDecoration: 'none', fontWeight: 'bold' },
};

export default ForgotPasswordCodeVerification;