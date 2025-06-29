import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useContext(ThemeContext);

    return (
        <div 
            style={{...styles.switch, justifyContent: isDarkMode ? 'flex-end' : 'flex-start'}} 
            onClick={toggleTheme}
        >
            <motion.div style={styles.handle} layout transition={spring}>
                <span style={styles.icon}>{isDarkMode ? '🌙' : '☀️'}</span>
            </motion.div>
        </div>
    );
};

const styles = {
    switch: {
        width: '70px',
        height: '40px',
        backgroundColor: 'rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '50px',
        padding: '5px',
        cursor: 'pointer',
        boxSizing: 'border-box',
    },
    handle: {
        width: '30px',
        height: '30px',
        backgroundColor: 'white',
        borderRadius: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        fontSize: '18px',
    }
}


export default ThemeToggle; 