import { motion } from 'framer-motion';

export const NewLogo = ({ style }) => (
    <motion.div style={style}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
                d="M10 20 L20 40 L30 20 L40 40 L50 20"
                stroke="url(#logoGradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFB22C" />
                    <stop offset="100%" stopColor="#854836" />
                </linearGradient>
            </defs>
        </svg>
    </motion.div>
);

export const CoinSVG = ({ style, symbol }) => (
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