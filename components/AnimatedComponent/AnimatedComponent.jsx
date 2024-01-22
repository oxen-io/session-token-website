'use client'

import clsx from "clsx"

import { useInView } from 'react-intersection-observer'

export const AnimatedElement = ({
    type,
    children,
    delay = 0,
    className = '',
    ...props
}) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const Element = type

    return (
        <Element
            {...props}
            ref={ref}
            className={clsx(`${className} AnimatedElement`, {
                [`Visible`]: inView
            })}
            style={{
                transitionDelay: delay + 'ms'
            }}
        >
            {children}
        </Element>
    )
}