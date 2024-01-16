'use client'

import clsx from 'clsx'
import s from './Button.module.sass'

export default function Button({
    iconName,
    iconAfter,
    label,
    isPrimary,
    onClick = () => { }
}) {
    const inner = (
        <>
            <span>
                {label}
            </span>
        </>
    )
    return (
        <button
            className={clsx(s.Outer, {
                [s.Primary]: isPrimary
            })}
            onClick={onClick}
        >
            {inner}
        </button>
    )
}