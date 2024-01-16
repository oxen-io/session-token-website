import NavLink from '/components/NavLink/NavLink'

import s from './HeaderMenu.module.sass'

export default function HeaderMenu({ menu }) {
    if (!menu) return null

    return (
        <ul className={s.HeaderMenu}>
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
                                <NavLink href={slug}>{title}</NavLink>
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
                                                    <NavLink href={slug}>{title}</NavLink>
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
