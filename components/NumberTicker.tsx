'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

function nonLinearEase(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

enum NumberSuffix {
  BILLION = 'b',
  MILLION = 'm',
}

/**
 * Splits a number into its simplified parts with a suffix, its major part before the suffix and the rest of the number before the shortening
 * @param number
 * @returns
 */
function splitNumber(number: number): {
  numSuffix: NumberSuffix | '';
  numMajor: string;
  numRest?: string;
} {
  const numSuffix =
    number >= 1000000000 ? NumberSuffix.BILLION : number >= 1000000 ? NumberSuffix.MILLION : '';
  const numMajor =
    numSuffix === NumberSuffix.BILLION
      ? (number / 1000000000).toLocaleString()
      : numSuffix === NumberSuffix.MILLION
        ? (number / 1000000).toLocaleString()
        : number.toLocaleString();
  const numRest = number.toLocaleString().substring(numMajor.length);
  return { numSuffix, numMajor, numRest };
}

export default function NumberTicker({
  targetNumber,
  duration = 3000,
  onClick,
}: {
  targetNumber: number;
  duration?: number;
  onClick?: () => void;
}) {
  const [count, setCount] = useState<number>(0);
  const [majorNumber, setMajorNumber] = useState<string>();
  const [restNumber, setRestNumber] = useState<string>();
  const [showRestNumber, setShowRestNumber] = useState<boolean>(true);
  const [suffix, setSuffix] = useState('');
  const [formattedString, setFormattedString] = useState<string>();

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }
    let start = 0;
    const step = (timestamp) => {
      if (!start) {
        start = timestamp;
      }
      /* const progress = timestamp - start;
      const currentCount = Math.min(targetNumber * (progress / duration), targetNumber); */
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(nonLinearEase(progress) * targetNumber);
      // setCount(currentCount);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [targetNumber, duration, inView]);

  useEffect(() => {
    if (targetNumber !== count) {
      return;
    }
    const { numSuffix, numMajor, numRest } = splitNumber(targetNumber);
    setRestNumber(numRest);
    setMajorNumber(numMajor);
    setSuffix(numSuffix);
    setFormattedString(`${numMajor}${numSuffix}`);
    setTimeout(() => {
      setShowRestNumber(false);
    }, 1800 + 1);
  }, [targetNumber, count, duration]);

  return (
    <motion.div
      ref={ref}
      className="relative inline-flex cursor-pointer"
      onClick={() => {
        if (onClick && formattedString) {
          onClick();
        }
      }}
    >
      {formattedString ? <motion.div>{majorNumber}</motion.div> : null}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: formattedString ? 0 : 1 }}
        transition={{
          duration: 0.8,
          delay: 1 + 0.8,
          ease: 'linear',
        }}
        style={{ display: showRestNumber ? 'block' : 'none' }}
      >
        {restNumber ?? Math.floor(count).toLocaleString()}
      </motion.div>
      {formattedString ? (
        <motion.div
          initial={{ opacity: 0, display: 'none' }}
          animate={{ opacity: 1, display: 'block' }}
          transition={{
            duration: 0.8,
            delay: 1 + 0.8,
            ease: 'linear',
          }}
        >
          {suffix}
        </motion.div>
      ) : null}
    </motion.div>
  );
}
