"use client";
import { motion } from "framer-motion";

const FadeIn = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="h-full"
        >
            {children}
        </motion.div>
    );
};

export default FadeIn;