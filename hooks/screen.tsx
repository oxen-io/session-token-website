import { useEffect, useState } from 'react';

import { UI } from '@/lib/constants';
import { useWindowSize } from 'react-use';

export function useScreenWidth() {
  const { width } = useWindowSize();

  // Mobile first
  const [isSM, setisSM] = useState(true);
  const [isMD, setisMD] = useState(false);
  const [isLG, setisLG] = useState(false);
  const [isXL, setisXL] = useState(false);
  const [is2XL, setis2XL] = useState(false);
  const [is3XL, setis3XL] = useState(false);

  useEffect(() => {
    const _isSM = width < UI.MD_BREAKPOINT;
    const _isMD = width >= UI.MD_BREAKPOINT && width < UI.LG_BREAKPOINT;
    const _isLG = width >= UI.LG_BREAKPOINT && width < UI.XL_BREAKPOINT;
    const _isXL = width >= UI.XL_BREAKPOINT && width < UI['2XL_BREAKPOINT'];
    const _is2XL = width >= UI['2XL_BREAKPOINT'] && width < UI['3XL_BREAKPOINT'];
    const _is3XL = width >= UI['3XL_BREAKPOINT'];

    if (isSM !== _isSM) {
      setisSM(_isSM);
    }
    if (isMD !== _isMD) {
      setisMD(_isMD);
    }
    if (isLG !== _isLG) {
      setisLG(_isLG);
    }
    if (isXL !== _isXL) {
      setisXL(_isXL);
    }
    if (is2XL !== _is2XL) {
      setis2XL(_is2XL);
    }
    if (is3XL !== _is3XL) {
      setis3XL(_is3XL);
    }
  }, [is2XL, isXL, isLG, isMD, isSM, width, is3XL]);

  return {
    width,
    isSM,
    isMD,
    isLG,
    isXL,
    is2XL,
  };
}
