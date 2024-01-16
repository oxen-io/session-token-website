'use client'

import cn from 'clsx'
import NavLink from '/components/NavLink/NavLink'

import s from './Button.module.sass'

export default function Button({
    url,
    title,
    handleClick,
    className,
    prefetch,
    type,
    small,
    inverted,
}) {
    const handleDummyClick = undefined

    const _handleClick = handleClick || handleDummyClick

    const buttonClass = cn(
        s.Button,
        'button',
        className && className,
        small && s.Small,
        inverted && s.Inverted,
    )

    if (!url) {
        return (
            <button
                className={buttonClass}
                onClick={_handleClick}
                type={type || ''}
            >
                {title && <span>{title}</span>}
            </button>
        )
    }

    return (
        <NavLink
            className={buttonClass}
            href={url}
            prefetch={prefetch}
            onClick={_handleClick}
        >
            {title && <span>{title}</span>}
        </NavLink>
    )
}
