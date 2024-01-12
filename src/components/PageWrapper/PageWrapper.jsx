"use client"

import { motion } from "framer-motion"

import { Suspense } from "react"
import Loading from "@/components/Loading/Loading"

const PageWrapper = ({ children }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          {children}
        </motion.main>
      </Suspense>
    </>
  );
};

export default PageWrapper
