'use client'

import cn from 'clsx'
import NavLink from '/components/NavLink/NavLink'

import { getLinkUrl } from 'lib/sanity.links'

import s from './Button.module.sass'

export default function Button({
    link: sanityLink,
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


    if (!url && !sanityLink) {
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

    let linkUrl = url
    let _title = title

    if (sanityLink) {
        linkUrl = getLinkUrl(sanityLink)
        _title = sanityLink.title || title
    }

    return (
        <NavLink
            className={buttonClass}
            href={linkUrl}
            prefetch={prefetch}
            onClick={_handleClick}
        >
            {_title && <span>{_title}</span>}
        </NavLink>
    )
}
