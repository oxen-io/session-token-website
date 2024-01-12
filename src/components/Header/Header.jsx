'use client'

import Link from 'next/link'
import s from './Header.module.sass'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function Header() {
    const menu = []

    const pathname = usePathname()

    const menuJsx = (
        <ul>
            {menu.map(({
                _id,
                slug: { current: slug },
                title
            }, index) => {
                const transitionDelay = !menuOpen ? 0 : isMobile ? index * 0.1 + 0.1 : (menu.length - index) * 0.1
                const isActive = pathname === `/${slug}`

                return (
                    <li
                        key={_id}
                        style={{
                            transitionDelay: `${transitionDelay}s`
                        }}
                        onClick={() => setMenuOpen(false)}
                        className={isActive ? s.Active : ''}
                    >
                        <Link href={`/${slug}`}>
                            {title}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )

    return (
        <>
            <header className={clsx(s.Outer, 'Container')}>
                <h1>
                    Hedder gets the chedder
                </h1>
            </header>
        </>
    )
}