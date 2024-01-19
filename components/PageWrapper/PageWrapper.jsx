'use client'

import { motion } from 'framer-motion'

const PageWrapper = ({
    children,
}) => {
    return (
        <motion.main
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
        >
            {children}
        </motion.main>
    )
}

export default PageWrapper