import cn from 'clsx'
import NavLink from 'components/NavLink/NavLink'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { resolveHref } from 'lib/sanity.links'
import Logo from 'public/images/logo.png'

import Image from 'next/image'

import s from './Footer.module.sass'

export default function Footer({settings}) {
    const footer = settings?.footer || []
    const footerMenuItems = settings?.footerMenuItems || []
    const title = settings?.title

    const d = new Date()
    const year = d.getFullYear()

    return (
        <footer className={s.Footer}>
            <div className={cn(s.Cont, 'container')}>
                <div className={s.Main}>
                    <NavLink href={'/'} label="home">
                        <Image
                            src={Logo}
                            alt="Session Token"
                            placeholder="blur"
                        />
                    </NavLink>
                    <div className={s.Acknowledgement}>
                        {footer && <CustomPortableText value={footer} />}
                        {title && (
                            <div>
                                &copy; {year} {title}
                            </div>
                        )}
                    </div>
                    {footerMenuItems && (
                        <ul>
                            {footerMenuItems.map((menuItem, key) => {
                                const href = resolveHref(
                                    menuItem?._type,
                                    menuItem?.slug,
                                )
                                if (!href) {
                                    return null
                                }
                                return (
                                    <li key={key}>
                                        <NavLink href={href}>
                                            {menuItem.title}
                                        </NavLink>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
            <div className={s.Bottom}>
                <div className={cn(s.Cont, 'container')}>
                    <ul>
                        <li>
                            <NavLink href={'/privacy-policy'}>
                                Privacy Policy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink href={'/terms-and-conditions'}>
                                Terms &amp; Conditions
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
