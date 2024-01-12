'use client'

import clsx from 'clsx'
import s from './Button.module.sass'

export default function Button({
    icon,
    iconAfter,
    text,
    isWhite,
    onClick = () => { }
}) {
    const inner = (
        <>
            <span>
                {text}
            </span>
        </>
    )
    return (
        <button
            className={clsx(s.Outer, {
                [s.White]: isWhite
            })}
            onClick={onClick}
        >
            {inner}
        </button>
    )
}