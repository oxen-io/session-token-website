'use client'

import clsx from "clsx"
import { useCallback } from "react"

import { useInView } from 'react-intersection-observer'

export const AnimatedElement = ({
    type,
    children,
    delay = 0,
    className = '',
    disabled,
    innerRef,
    ...props
}) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const _visible = disabled || inView

    const Element = type

    const handleRefs = useCallback(node => {
        ref(node)

        if (innerRef) {
            innerRef.current = node
        }
    })

    return (
        <Element
            {...props}
            ref={handleRefs}
            className={clsx(`${className} AnimatedElement`, {
                [`Visible`]: _visible
            })}
            style={{
                transitionDelay: delay + 'ms'
            }}
        >
            {children}
        </Element>
    )
}