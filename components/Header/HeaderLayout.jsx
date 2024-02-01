'use client'

import { useContext, useEffect, useState } from 'react'

import clsx from 'clsx'
import Image from 'next/image'

import NavLink from '/components/NavLink/NavLink'
import Button from '/components/Button/Button'
import Menu from '/components/Menu/Menu'
import Socials from 'components/Socials/Socials'

import Logo from 'public/images/logo.png'

import s from './Header.module.sass'
import MenuButton from 'components/Menu/MenuButton'
import { SettingsContext } from 'components/Contexts/SettingsContext'

export default function Header() {
    const [hasScrolled, setHasScrolled] = useState(false)
    const [hideHeader, setHideHeader] = useState(false)
    const [mobileMenuOpen, setMenuOpen] = useState(false)
    const [hasMounted, setHasMounted] = useState(false)

    const { menuTopLink, mobileMenuCta, menuItems } = useContext(SettingsContext)

    useEffect(() => {
        let lastScrollTop = 0

        setTimeout(() => {
            setHasMounted(true)
        },200)

        window.addEventListener("scroll", function () {
            var st = window.scrollY || document.documentElement.scrollTop
            if (window.scrollY > 0) {
                setHasScrolled(true)
            } else {
                setHasScrolled(false)
            }
            if (st > lastScrollTop && window.scrollY > 100) {
                setHideHeader(true)
            } else if (st < lastScrollTop) {
                setHideHeader(false)
            }
            lastScrollTop = st <= 0 ? 0 : st
        }, false)
    }, [])

    return (
        <>
            <header className={clsx(s.Header, 'Container', {
                [s.Hide]: (hideHeader && !mobileMenuOpen) || !hasMounted,
                [s.HasScrolled]: hasScrolled,
            })}>
                <NavLink href={'/'}>
                    <Image
                        src={Logo}
                        alt="Session Token"
                        priority
                    />
                </NavLink>
                <Menu menu={menuItems} />
                <div className={s.Buttons}>
                    <Button
                        {...menuTopLink}
                        small
                    />
                    <MenuButton
                        open={mobileMenuOpen}
                        setOpen={setMenuOpen}
                    />
                </div>
            </header>
            <div className={clsx(s.MobileMenu, {
                [s.Open]: mobileMenuOpen
            })}>
                <Menu
                    menu={menuItems}
                    closeMenu={() => setMenuOpen(false)}
                />
                <div className={s.Bottom}>
                    <Button
                        {...mobileMenuCta}
                    />
                    <Socials />
                </div>
            </div>
        </>
    )
}
