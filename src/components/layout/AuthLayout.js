import { motion } from 'framer-motion';

const floatingAnimation = {
    y: [-10, 10],
    rotate: [-5, 5],
    transition: {
        y: {
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        },
        rotate: {
            duration: 3.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
        }
    }
};

const CoinSVG = ({ style, symbol }) => (
    <motion.div style={{...style, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="url(#coinGradient)"
                stroke="#FFB22C"
                strokeWidth="2"
            />
            <defs>
                <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#FFB22C', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#FFC85C', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <text
                x="50"
                y="62"
                textAnchor="middle"
                fill="#854836"
                fontSize="35"
                fontWeight="bold"
                fontFamily="Arial"
            >
                {symbol}
            </text>
        </svg>
    </motion.div>
);


const AuthLayout = ({ children }) => {
    return (
        <div style={styles.container}>
            {/* Background Orbs and Coins */}
            <motion.div
                style={styles.backgroundShapes}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {/* Orbs */}
                <motion.div style={{...styles.orb, ...styles.orb1}} animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, y: { ...floatingAnimation.transition.y, duration: 4 }}}} />
                <motion.div style={{...styles.orb, ...styles.orb2}} animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, y: { ...floatingAnimation.transition.y, duration: 5 }}}} />

                {/* Coins */}
                <motion.div style={{...styles.coin, ...styles.coin1}} animate={floatingAnimation} >
                    <CoinSVG symbol="₹" />
                </motion.div>
                <motion.div style={{...styles.coin, ...styles.coin2}} animate={{...floatingAnimation, transition: { delay: 0.2 }}} >
                    <CoinSVG symbol="$" />
                </motion.div>
                <motion.div style={{...styles.coin, ...styles.coin3}} animate={{...floatingAnimation, transition: { delay: 0.4 }}} >
                    <CoinSVG symbol="€" />
                </motion.div>
            </motion.div>
            
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        width: '100%',
        background: 'radial-gradient(circle, #F7F7F7 0%, #EFEFEF 100%)',
        overflow: 'hidden',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundShapes: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
    },
    orb: {
        position: 'absolute',
        borderRadius: '50%',
        filter: 'blur(50px)',
        opacity: 0.4,
    },
    orb1: {
        width: '40vw',
        height: '40vw',
        minWidth: '300px',
        minHeight: '300px',
        background: 'rgba(255, 178, 44, 0.4)',
        top: '-15%',
        left: '-15%',
    },
    orb2: {
        width: '30vw',
        height: '30vw',
        minWidth: '250px',
        minHeight: '250px',
        background: 'rgba(133, 72, 54, 0.3)',
        bottom: '-10%',
        right: '-10%',
    },
    coin: {
        position: 'absolute',
        width: '80px',
        height: '80px',
    },
    coin1: {
        top: '15%',
        left: '10%',
    },
    coin2: {
        bottom: '20%',
        right: '15%',
        width: '100px',
        height: '100px',
    },
    coin3: {
        top: '50%',
        left: '15%',
        width: '90px',
        height: '90px',
    }
};

export default AuthLayout; 