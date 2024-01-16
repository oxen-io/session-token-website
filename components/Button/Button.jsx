'use client'

import cn from 'clsx'
import NavLink from '/components/NavLink/NavLink'

import { getLinkUrl } from 'lib/sanity.links'

import s from './Button.module.sass'

import buttonLogos from 'public/images/buttonLogos'

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
    iconName,
    arrow,
    disabled,
}) {
    const handleDummyClick = undefined

    const _handleClick = handleClick || handleDummyClick

    const buttonClass = cn(
        s.Button,
        'button',
        className && className,
        small && s.Small,
        inverted && s.Inverted,
        disabled && s.Disabled,
    )

    const buttonIcon = iconName ? buttonLogos[iconName] : null

    if (!url && !sanityLink) {
        return (
            <button
                className={buttonClass}
                onClick={_handleClick}
                type={type || ''}
            >
                {buttonIcon}
                {title && <span dangerouslySetInnerHTML={{ __html: `${title}${arrow ? ' ↗' : ''}` }} />}
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
            {buttonIcon}
            {_title && <span dangerouslySetInnerHTML={{ __html: `${_title}${arrow ? ' ↗' : ''}` }} />}
        </NavLink>
    )
}
