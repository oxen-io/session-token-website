'use client'

import clsx from 'clsx'
import Image from 'next/image'

import NavLink from '@/components/NavLink/NavLink'

import HeaderMenu from './HeaderMenu'

import Logo from '/public/images/logo.png'

import s from './Header.module.sass'

export default function Header({settings}) {
    const menu = settings?.menuItems

    console.log(settings)

    return (
        <header className={clsx(s.Header, 'Container')}>
            <NavLink href={'/'}>
                <Image
                    src={Logo}
                    alt="Session Token"
                    placeholder="blur"
                    onClick={ () => setMenuOpen(false) }
                />
            </NavLink>
            <HeaderMenu menu={menu} />
        </header>
    )
}
