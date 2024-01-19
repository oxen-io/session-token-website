import cn from 'clsx'

import NavLink from '/components/NavLink/NavLink'

import s from './Menu.module.sass'

export default function Menu({ menu, footer }) {
    if (!menu) return null

    return (
        <ul className={cn(s.Menu, footer ? s.Footer : '')}>
            {menu?.map((menuItem, index) => {
                const {
                    title,
                    slug,
                    children,
                } = menuItem

                return (
                    <li key={index}>
                        <div className={s.Title}>
                            {slug ? (
                                <NavLink href={`/${slug}`}>{title}</NavLink>
                            ) : (
                                title
                            )}
                        </div>
                        { children &&
                            <ul className={s.SubMenu}>
                                { children?.map((menuItem, sIndex) => {
                                    const {
                                        title,
                                        slug,
                                    } = menuItem

                                    return (
                                        <li key={sIndex}>
                                            <div className={s.Title}>
                                                {slug ? (
                                                    <NavLink href={`/${slug}`}>{title}</NavLink>
                                                ) : (
                                                    title
                                                )}
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                    </li>
                )
            })}
        </ul>
    )
}
