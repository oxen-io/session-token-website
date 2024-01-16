import cn from 'clsx'
import NavLink from 'components/NavLink/NavLink'
import { CustomPortableText } from 'components/shared/CustomPortableText'
import { resolveHref } from 'lib/sanity.links'
import Logo from 'public/images/logo.png'

import Image from 'next/image'

import s from './Footer.module.sass'

export default function Footer(props) {
    const { data, topics } = props
    const footer = data?.footer || []
    const footerMenuItems = data?.footerMenuItems || []
    const title = data?.title

    const d = new Date()
    const year = d.getFullYear()

    return (
        <footer className={s.Footer}>
            <div className={cn(s.Cont, 'container')}>
                {topics && (
                    <div className={s.Topics}>
                        {topics?.map((topic, index) => {
                            const { title, slug: parentSlug, parent } = topic

                            if (parent) {
                                return null
                            }

                            return (
                                <div className={s.TopicGroup} key={index}>
                                    <h3 className="h6">{title}</h3>

                                    {topics?.map((subTopic, index) => {
                                        const { title, slug, parent } = subTopic

                                        if (parent?.title !== topic.title) {
                                            return null
                                        }

                                        return (
                                            <div
                                                className={cn(
                                                    s.Topic,
                                                    s[parentSlug],
                                                )}
                                                key={index}
                                            >
                                                <NavLink
                                                    href={`/learn/${slug}`}
                                                >
                                                    <h4>{title}</h4>
                                                </NavLink>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                )}
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
