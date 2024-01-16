'use client'

import cn from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pathToRegexp } from 'path-to-regexp'
import React from 'react'

export default function NavLink({
    href,
    as,
    exact,
    children,
    innerHTML,
    className: _className = '',
    onClick,
    label,
    prefetch,
    ...props
}) {
    const asPath = usePathname()

    const localHref =
        href &&
        !href.includes('http') &&
        !href.includes('mailto:') &&
        !href.includes('tel:')

    let className = _className

    if (onClick && !localHref) {
        return (
            <a
                className={className}
                onClick={onClick}
                dangerouslySetInnerHTML={
                    innerHTML ? { __html: innerHTML } : undefined
                }
                aria-label={label}
            >
                {children}
            </a>
        )
    }

    if (href && href.indexOf('http') !== -1) {
        return (
            <a
                className={className}
                href={href}
                target="_blank"
                rel="noreferrer"
                dangerouslySetInnerHTML={
                    innerHTML ? { __html: innerHTML } : undefined
                }
                aria-label={label}
            >
                {children}
            </a>
        )
    }

    if (
        (href && href.indexOf('tel:') !== -1) ||
        (href && href.indexOf('mailto:') !== -1)
    ) {
        return (
            <a
                className={className}
                href={href}
                dangerouslySetInnerHTML={
                    innerHTML ? { __html: innerHTML } : undefined
                }
                aria-label={label}
            >
                {children}
            </a>
        )
    }

    const isActive = pathToRegexp(as || href.split('?')[0] || '/', [], {
        sensitive: true,
        end: false,
    }).test(asPath)

    const _children = (
        <span
            dangerouslySetInnerHTML={innerHTML}
            className={className}
            aria-label={label}
        >
            {children}
        </span>
    )

    const child = React.Children.only(_children)

    const childClassName =
        child.props.className && child.props.className !== className
            ? child.props.className
            : ''

    className = cn(className, childClassName, isActive && 'active')

    return (
        <Link
            href={href}
            as={as}
            {...props}
            aria-label={label}
            prefetch={prefetch}
            onClick={onClick}
        >
            {React.cloneElement(child, { className })}
        </Link>
    )
}
