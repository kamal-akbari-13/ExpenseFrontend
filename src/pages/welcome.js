import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { NewLogo, CoinSVG } from '../components/utils/AnimatedAssets';

const Welcome = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

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

    const coinVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <div style={styles.container}>
            {/* Background Orbs and Coins */}
            <motion.div
                style={styles.backgroundShapes}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Orbs */}
                <motion.div style={{...styles.orb, ...styles.orb1}} animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, y: { ...floatingAnimation.transition.y, duration: 4 }}}} />
                <motion.div style={{...styles.orb, ...styles.orb2}} animate={{...floatingAnimation, transition: { ...floatingAnimation.transition, y: { ...floatingAnimation.transition.y, duration: 5 }}}} />

                {/* Coins */}
                <motion.div style={{...styles.coin, ...styles.coin1}} variants={coinVariants} animate={floatingAnimation} >
                    <CoinSVG symbol="₹" />
                </motion.div>
                <motion.div style={{...styles.coin, ...styles.coin2}} variants={coinVariants} animate={{...floatingAnimation, transition: { delay: 0.2 }}} >
                    <CoinSVG symbol="$" />
                </motion.div>
                <motion.div style={{...styles.coin, ...styles.coin3}} variants={coinVariants} animate={{...floatingAnimation, transition: { delay: 0.4 }}} >
                    <CoinSVG symbol="€" />
                </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div 
                style={styles.content}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} style={styles.logoContainer}>
                    <NewLogo />
                </motion.div>
                
                <motion.div style={styles.textContainer}>
                    <motion.h1 
                        variants={itemVariants} 
                        style={styles.title}
                        whileHover={{ scale: 1.02 }}
                    >
                        Welcome to Wealth Wise!
                    </motion.h1>
                    <motion.p 
                        variants={itemVariants} 
                        style={styles.subtitle}
                    >
                        Achieve financial independence with Wealth Wise — an innovative application crafted to transform the way you track expenses, budget effectively, and take control of your financial future.
                    </motion.p>
                </motion.div>

                <motion.div variants={itemVariants} style={styles.buttonContainer}>
                    <Link to='/auth/login' style={styles.link}>
                        <motion.button 
                            style={styles.button}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Log in
                        </motion.button>
                    </Link>
                    <Link to='/auth/register' style={styles.link}>
                        <motion.button 
                            style={{...styles.button, ...styles.createAccountButton}}
                            whileHover={{ 
                                scale: 1.05,
                                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Create Account
                        </motion.button>
                    </Link>
                </motion.div>
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
    },
    content: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '800px',
        width: '90%',
        padding: '3rem',
        background: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '20px',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    textContainer: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    logoContainer: {
        marginBottom: '1rem',
        display: 'flex',
        justifyContent: 'center',
    },
    title: {
        fontSize: '3rem',
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: '1.5rem',
        background: 'linear-gradient(135deg, #000000 0%, #854836 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: '#854836',
        maxWidth: '600px',
        lineHeight: '1.8',
        margin: '0 auto',
    },
    buttonContainer: {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        marginTop: '2.5rem',
    },
    link: {
        textDecoration: 'none',
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
        width: '180px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        fontWeight: '600',
        letterSpacing: '0.5px',
    },
    createAccountButton: {
        backgroundColor: '#854836',
    }
};

export default Welcome;