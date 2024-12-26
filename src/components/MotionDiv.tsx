'use client';

import { motion, MotionProps } from 'framer-motion';

interface MotionDivProps extends MotionProps {
    children: React.ReactNode;
    className?: string;
    from?: 'left' | 'right' | 'top' | 'bottom';
}

export const MotionDiv: React.FC<MotionDivProps> = ({
    children,
    className = '',
    from,
    initial,
    whileInView,
    transition = { duration: 0.8, ease: 'easeOut' },
    viewport = { once: true },
    ...rest
}) => {
    const slideDirection = () => {
        switch (from) {
            case 'left':
                return { x: -100, opacity: 0 };
            case 'right':
                return { x: 100, opacity: 0 };
            case 'top':
                return { y: -100, opacity: 0 };
            case 'bottom':
                return { y: 100, opacity: 0 };
            default:
                return { opacity: 0 };
        }
    };

    return (
        <motion.div
            initial={initial || slideDirection()}
            whileInView={whileInView || { x: 0, y: 0, opacity: 1 }}
            transition={transition}
            viewport={{ once: true }}
            className={className}
            {...rest}>
            {children}
        </motion.div>
    );
};
