import { motion } from 'framer-motion';

const FinanceIllustration = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 },
        },
    };

    return (
        <motion.div
            style={styles.illustrationContainer}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <h3 style={styles.illustrationTitle}>Your Finances, Simplified</h3>
            <p style={styles.illustrationText}>
                Track every transaction, visualize your spending, and achieve your financial goals with ease.
            </p>
            <motion.div style={styles.chartContainer}>
                {/* Bar chart */}
                <motion.div style={styles.bar} variants={itemVariants} custom={0.1} />
                <motion.div style={{...styles.bar, height: '60%'}} variants={itemVariants} custom={0.2} />
                <motion.div style={{...styles.bar, height: '80%'}} variants={itemVariants} custom={0.3} />
                <motion.div style={{...styles.bar, height: '40%'}} variants={itemVariants} custom={0.4} />

                {/* Floating Icons */}
                <motion.div style={{...styles.icon, top: '10%', left: '20%'}} variants={itemVariants}>
                    💰
                </motion.div>
                <motion.div style={{...styles.icon, top: '40%', right: '10%'}} variants={itemVariants}>
                    📈
                </motion.div>
                <motion.div style={{...styles.icon, bottom: '5%', left: '40%'}} variants={itemVariants}>
                    💳
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

const styles = {
    illustrationContainer: {
        padding: '2rem',
        textAlign: 'center',
        color: '#fff',
    },
    illustrationTitle: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        marginBottom: '1rem',
        color: '#FFB22C',
    },
    illustrationText: {
        fontSize: '1.1rem',
        maxWidth: '350px',
        margin: '0 auto 2rem auto',
        lineHeight: 1.6,
        color: 'rgba(255, 255, 255, 0.9)',
    },
    chartContainer: {
        position: 'relative',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: '1rem',
        padding: '1rem',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '15px',
    },
    bar: {
        width: '30px',
        height: '100%',
        background: 'linear-gradient(to top, #FFB22C, #FFC85C)',
        borderRadius: '5px',
    },
    icon: {
        position: 'absolute',
        fontSize: '2rem',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        padding: '0.5rem',
        backdropFilter: 'blur(5px)',
    },
};

export default FinanceIllustration; 