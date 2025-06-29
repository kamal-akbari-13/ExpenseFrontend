import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import AuthService from '../../../services/auth.service';
import AuthLayout from '../../../components/layout/AuthLayout';
import { NewLogo } from '../../../components/utils/AnimatedAssets';
import FinanceIllustration from '../../../components/utils/FinanceIllustration';

const Login = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 992);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            if (currentUser.roles.includes("ROLE_USER")) {
            navigate("/user/dashboard");
            } else if (currentUser.roles.includes("ROLE_ADMIN")) {
            navigate("/admin/transactions");
            }
        }
    }, [navigate]);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [response_error, setResponseError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        setIsLoading(true);
                setResponseError("");
        try {
            await AuthService.login_req(data.email, data.password);
            localStorage.setItem("message", JSON.stringify({ status: "SUCCESS", text: "Login successful!" }));

            const currentUser = AuthService.getCurrentUser();
            if (currentUser.roles.includes("ROLE_USER")) {
                        navigate("/user/dashboard");
            } else if (currentUser.roles.includes("ROLE_ADMIN")) {
                        navigate("/admin/transactions");
                    }
        } catch (error) {
            const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            if (resMessage === "Bad credentials") {
                    setResponseError("Invalid email or password!");
            } else {
                setResponseError("Something went wrong. Please try again later.");
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
                    <h2 style={styles.title}>Login</h2>
                    {response_error && <p style={styles.errorText}>{response_error}</p>}
                
                    <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                        <div style={styles.inputGroup}>
                            <label htmlFor="email" style={styles.label}>Email</label>
                    <input 
                                id="email"
                                type="email"
                                style={styles.input}
                        {...register('email', {
                            required: "Email is required!",
                                    pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: "Invalid email address!" }
                        })}
                    />
                            {errors.email && <small style={styles.errorText}>{errors.email.message}</small>}
                </div>
                
                        <div style={styles.inputGroup}>
                            <label htmlFor="password" style={styles.label}>Password</label>
                    <input 
                                id="password"
                                type="password"
                                style={styles.input}
                                {...register('password', { required: 'Password is required!' })}
                    />
                            {errors.password && <small style={styles.errorText}>{errors.password.message}</small>}
                        </div>

                        <div style={styles.forgotPassword}>
                            <Link to={'/auth/forgetpassword/verifyEmail'} style={styles.inlineLink}>Forgot password?</Link>
                </div>

                        <motion.button
                            type="submit"
                            style={styles.button}
                            disabled={isLoading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLoading ? "Logging in..." : 'Login'}
                        </motion.button>
                    </form>
                    
                    <div style={styles.switchMessage}>
                        New member? <Link to='/auth/register' style={styles.inlineLink}>Register Here</Link>
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
    forgotPassword: {
        textAlign: 'center',
        fontSize: '0.9rem',
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
    inlineLink: {
        color: '#FFB22C',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Login;