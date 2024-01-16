'use client'

import { useEffect, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import NavLink from 'components/NavLink/NavLink'
import Button from '/components/Button/Button'

import HeaderMenu from './HeaderMenu'

import Logo from 'public/images/logo.png'

import s from './Header.module.sass'

export default function Header({settings}) {
    const [hideMenu, setHideMenu] = useState(false)

    const menu = settings?.menuItems

    useEffect(() => {
        let lastScrollTop = 0

        window.addEventListener("scroll", function(){
            var st = window.scrollY || document.documentElement.scrollTop
            if (st > lastScrollTop && window.scrollY > 100) {
                setHideMenu(true)
            } else if (st < lastScrollTop) {
                setHideMenu(false)
            }
            lastScrollTop = st <= 0 ? 0 : st
        }, false)         
    }, [settings])

    return (
        <header className={clsx(s.Header, 'Container', hideMenu ? s.Hide : '')}>
            <NavLink href={'/'}>
                <Image
                    src={Logo}
                    alt="Session Token"
                    placeholder="blur"
                    onClick={ () => setMenuOpen(false) }
                    priority
                />
            </NavLink>
            <HeaderMenu menu={menu} />
            <Button
                title={'Buy $SENT'}
                small
                iconName={'logoWithCircle'}
            />
        </header>
    )
}
