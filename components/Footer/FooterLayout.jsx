'use client'

import cn from 'clsx'

import { getSocialIcon } from 'lib/utils'

import Image from 'next/image'

import NavLink from 'components/NavLink/NavLink'
import Button from '/components/Button/Button'
import Menu from '/components/Menu/Menu'

import Logo from 'public/images/logo-footer.png'

import s from './Footer.module.sass'

export default function Footer({settings}) {
    const menu = settings?.menuItems
    const socialLinks = settings?.socialLinks

    const d = new Date()
    const year = d.getFullYear()

    return (
        <footer className={s.Footer}>
            <div className={cn(s.Cont, 'Container')}>
                <div className={s.FooterCont}>
                    <div className={s.Main}>
                        <div className={s.Logo}>
                            <NavLink href={'/'} label="home">
                                <Image
                                    src={Logo}
                                    alt="Session Token"
                                />
                            </NavLink>
                        </div>
                        <span className="smallTitle">/ Managed by Session</span>
                    </div>
                    <Menu menu={menu} footer />
                    <div className={s.Links}>
                        <Button
                            title={'Buy $SENT'}
                            small
                            iconName={'logoWithCircle'}
                        />
                        { socialLinks &&
                            <ul className={s.Social}>
                                {socialLinks?.map((item, index) => {
                                    const {
                                        link,
                                        company,
                                    } = item

                                    return (
                                        <li key={index}>
                                            <a href={link}>
                                                {getSocialIcon(company)}
                                            </a>
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                    </div>
                </div>
                <div className={s.Bottom}>
                    Website last updated XX October 2023<br />
                    &copy; Session {year}. All rights reserved.
                </div>
            </div>
        </footer>
    )
}
