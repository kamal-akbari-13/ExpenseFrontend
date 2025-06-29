import { Link } from "react-router-dom";
import { motion } from 'framer-motion';
import AuthLayout from '../../../components/layout/AuthLayout';
import successGif from '../../../assets/images/success.gif';

const RegistrationSuccess = () => {
    return (
        <AuthLayout>
            <motion.div 
                style={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.img 
                    src={successGif} 
                    alt="Success" 
                    style={styles.gif}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                />
                <h2 style={styles.title}>Congratulations!</h2>
                <p style={styles.subtitle}>Your account has been successfully created.</p>
                <Link to='/auth/login'>
                    <motion.button 
                        style={styles.button}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Login Now
                    </motion.button>
                </Link>
            </motion.div>
        </AuthLayout>
    );
};

const styles = {
    card: {
        maxWidth: '450px',
        padding: '3rem 2rem',
        textAlign: 'center',
        // Common card styles
        position: 'relative',
        zIndex: 1,
        width: '90%',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    gif: {
        width: '100px',
        height: '100px',
        marginBottom: '1rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2E7D32', // Green for success
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.1rem',
        color: '#666',
        marginBottom: '2rem',
    },
    button: {
        padding: '0.8rem 2.5rem',
        fontSize: '1.1rem',
        color: '#F7F7F7',
        backgroundColor: '#FFB22C',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontWeight: '600',
    },
};

export default RegistrationSuccess;