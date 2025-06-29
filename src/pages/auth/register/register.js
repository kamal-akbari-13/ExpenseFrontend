import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import AuthService from '../../../services/auth.service';
import AuthLayout from '../../../components/layout/AuthLayout';
import { NewLogo } from '../../../components/utils/AnimatedAssets';
import FinanceIllustration from '../../../components/utils/FinanceIllustration';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = useRef({});
    password.current = watch('password', "");

    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onSubmit = async (data) => {
        setIsLoading(true);
                    setResponseError("");
        try {
            const response = await AuthService.register_req(data.username, data.email, data.password);
            if (response.data.status === "SUCCESS") {
                    navigate(`/auth/userRegistrationVerfication/${data.email}`);
            } else {
                setResponseError("Registration failed: Something went wrong!");
                }
        } catch (error) {
                if (error.response) {
                setResponseError(error.response.data.response);
            } else {
                setResponseError("Registration failed: Something went wrong!");
                }
        } finally {
        setIsLoading(false);
    }
    };

    return (
        <AuthLayout>
            <motion.div
                style={{...styles.card, flexDirection: isMobile ? 'column' : 'row'}}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Left Side */}
                {!isMobile && (
                    <div style={styles.leftSide}>
                        <FinanceIllustration />
                    </div>
                )}

                {/* Right Side */}
                <div style={styles.rightSide}>
                    <div style={styles.logoContainer}>
                        <NewLogo />
                    </div>
                    <h2 style={styles.title}>Create Account</h2>
                    {response_error && <p style={styles.errorText}>{response_error}</p>}
                    
                    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="username" style={styles.label}>Username</label>
                            <input id="username" type="text" style={styles.input} {...register('username', { required: "Username is required!" })} />
                            {errors.username && <small style={styles.errorText}>{errors.username.message}</small>}
                </div>
                
                        <div style={styles.inputGroup}>
                            <label htmlFor="email" style={styles.label}>Email</label>
                            <input id="email" type="email" style={styles.input} {...register('email', { required: "Email is required!", pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" } })} />
                            {errors.email && <small style={styles.errorText}>{errors.email.message}</small>}
                </div>
                
                        <div style={styles.inputGroup}>
                            <label htmlFor="password" style={styles.label}>Password</label>
                            <input id="password" type="password" style={styles.input} {...register('password', { required: 'Password is required!', minLength: { value: 8, message: "Password must have at least 8 characters" } })} />
                            {errors.password && <small style={styles.errorText}>{errors.password.message}</small>}
                </div>
                
                        <div style={styles.inputGroup}>
                            <label htmlFor="cpassword" style={styles.label}>Confirm Password</label>
                            <input id="cpassword" type="password" style={styles.input} {...register('cpassword', { required: 'Confirm password is required!', validate: value => value === password.current || "Passwords do not match!" })} />
                            {errors.cpassword && <small style={styles.errorText}>{errors.cpassword.message}</small>}
                </div>
                
                        <motion.button type="submit" style={styles.button} disabled={isLoading} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            {isLoading ? "Creating Account..." : 'Register'}
                        </motion.button>
                    </form>
                    
                    <div style={styles.switchMessage}>
                        <p style={styles.agreement}>By clicking Register, you agree to our user agreement, privacy policy, and cookie policy.</p>
                        Already a member? <Link to='/auth/login' style={styles.inlineLink}>Login Here</Link>
                    </div>
                </div>
            </motion.div>
        </AuthLayout>
    );
};

const styles = {
    card: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1000px',
        width: '90%',
        display: 'flex',
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
    },
    leftSide: {
        flex: 1,
        background: '#854836',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightSide: {
        flex: 1,
        padding: '2.5rem',
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
        marginBottom: '1.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    inputGroup: {
        textAlign: 'left',
    },
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
    errorText: {
        color: '#D32F2F',
        fontSize: '0.9rem',
        marginTop: '0.2rem',
    },
    switchMessage: {
        marginTop: '1.5rem',
        color: '#854836',
    },
    agreement: {
        fontSize: '0.8rem',
        color: '#666',
        marginBottom: '1rem',
    },
    inlineLink: {
        color: '#FFB22C',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Register;