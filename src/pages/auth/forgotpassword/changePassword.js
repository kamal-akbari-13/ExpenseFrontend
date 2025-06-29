import { useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import AuthService from '../../../services/auth.service';
import AuthLayout from '../../../components/layout/AuthLayout';
import { NewLogo } from '../../../components/utils/AnimatedAssets';

const ForgotPasswordChangePassword = () => {
    const navigate = useNavigate();
    const { email } = useParams(); 
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch('password', "");

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);     
                    setResponseError("");
        try {
            const response = await AuthService.resetPassword(email, data.password);
            if (response.data.status === "SUCCESS") {
                localStorage.setItem("message", JSON.stringify({ status: "SUCCESS", text: "Password reset successful! Please log in." }));
                navigate('/auth/signin');
            } else {
                setResponseError("Reset password failed: Something went wrong!");
                }
        } catch (error) {
            const resMessage = error.response?.data?.response || "Reset password failed. Please try again.";
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
                <h2 style={styles.title}>Reset Your Password</h2>
                <p style={styles.infoText}>Create a new, strong password for your account.</p>

                {response_error && <p style={styles.errorText}>{response_error}</p>}
                
                <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>New Password</label>
                    <input 
                            id="password"
                            type="password"
                            style={styles.input}
                            {...register('password', {
                                required: 'Password is required!',
                                minLength: { value: 8, message: "Password must have at least 8 characters" }
                            })}
                    />
                        {errors.password && <small style={styles.errorText}>{errors.password.message}</small>}
                </div>
                
                    <div style={styles.inputGroup}>
                        <label htmlFor="cpassword" style={styles.label}>Confirm New Password</label>
                    <input 
                            id="cpassword"
                            type="password"
                            style={styles.input}
                            {...register('cpassword', {
                                required: 'Confirm password is required!',
                                validate: value => value === password.current || "Passwords do not match!"
                            })}
                    />
                        {errors.cpassword && <small style={styles.errorText}>{errors.cpassword.message}</small>}
                </div>
                
                    <motion.button type="submit" style={styles.button} disabled={isLoading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {isLoading ? "Resetting..." : 'Reset Password'}
                    </motion.button>
            </form>
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
};

export default ForgotPasswordChangePassword;