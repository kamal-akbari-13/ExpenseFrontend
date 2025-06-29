import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import AuthLayout from '../../components/layout/AuthLayout';
import { NewLogo } from '../../components/utils/AnimatedAssets';

const UnAuthorizedAccessPage = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout>
            <motion.div 
                style={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div style={styles.logoContainer}>
                    <NewLogo />
                </div>
                <h1 style={styles.title}>401 - Unauthorized</h1>
                <p style={styles.subtitle}>
                    Sorry, it looks like you've attempted to access a page for which you are not authorized.
                </p>
                <p style={styles.infoText}>
                    Try refreshing the page or click the button below to go back to the home page.
                </p>
                <motion.button 
                    style={styles.button}
                onClick={() => navigate("/")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Go to Home
                </motion.button>
            </motion.div>
        </AuthLayout>
    );
};

const styles = {
    card: {
        maxWidth: '600px',
        padding: '3rem',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        width: '90%',
        background: 'rgba(255, 255, 255, 0.9)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    logoContainer: {
        marginBottom: '1.5rem',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#D32F2F', // Red for error
        marginBottom: '1rem',
    },
    subtitle: {
        fontSize: '1.2rem',
        color: '#333',
        marginBottom: '1rem',
        fontWeight: '600',
    },
    infoText: {
        fontSize: '1rem',
        color: '#666',
        marginBottom: '2rem',
    },
    button: {
        padding: '0.8rem 2.5rem',
        fontSize: '1.1rem',
        color: '#F7F7F7',
        backgroundColor: '#854836',
        border: 'none',
        borderRadius: '50px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontWeight: '600',
    },
};

export default UnAuthorizedAccessPage;