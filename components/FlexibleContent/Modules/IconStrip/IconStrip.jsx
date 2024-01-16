import cn from 'clsx'

import ImageBox from '/components/ImageBox/ImageBox'

import s from './IconStrip.module.sass'

export default function IconStrip ({
    title,
    icons
}) {
    return (
        <section className={s.IconStrip}>
            <div className={cn(s.Cont, "Container")}>
                { title &&
                    <div className="smallTitle">{title}</div>
                }
                {icons &&
                    <ul>
                        {icons.map((icon, index) => {
                            if (!icon) return null

                            return (
                                <li key={index}>
                                    <ImageBox image={icon} />
                                </li>
                            )
                        })}
                    </ul>
                }
            </div>
        </section>
    )
}
