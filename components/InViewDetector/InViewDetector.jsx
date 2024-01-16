'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const useIsMobile = () => {
    const breakPoint = 500

    const [_isMobile, setIsMobile] = useState(false)

    const _window = typeof window !== 'undefined' ? window : null

    useEffect(() => {
        setTimeout(() => {
            if (_window) {
                setIsMobile(_window.screen.width <= breakPoint)
            }
        }, 1)
    }, [_window])

    return _isMobile
}

const InViewDetector = ({ children, name, scrollId }) => {
    const isMobile = useIsMobile()

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const innerRef = useRef()

    useEffect(() => {
        const child = innerRef.current.children[0]

        if (child) {
            if (inView) child.classList.add('inView')
        }
    }, [inView, innerRef])

    return (
        <section
            ref={(_ref) => {
                ref(_ref)
                innerRef.current = _ref
            }}
            className={name}
            id={scrollId || ''}
        >
            {children}
        </section>
    )
}

export default InViewDetector
