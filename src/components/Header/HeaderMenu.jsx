import NavLink from '@/components/NavLink/NavLink'

import s from './HeaderMenu.module.sass'

export default function HeaderMenu({ menu }) {
    if (!menu) return null

    return (
        <ul className={s.HeaderMenu}>
            {menu?.map((menuItem, key) => {
                const {
                    title,
                    slug
                } = menuItem

                return (
                    <li key={key}>
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
    )
}
