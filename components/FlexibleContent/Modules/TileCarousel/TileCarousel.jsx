import cn from 'clsx'

import ImageBox from '/components/ImageBox/ImageBox'

import s from './TileCarousel.module.sass'

export default function TileCarousel ({
    title,
    content,
    tiles
}) {
    console.log(title, content, tiles)

    return (
        <section className={s.TileCarousel}>
            <div className={cn(s.Cont, "Container")}>
                <ul>
                    {tiles?.map((tile, index) => {
                        const {
                            preTitle,
                            title,
                            copy,
                            image,
                        } = tile

                        return (
                            <li key={index}>
                                { preTitle &&
                                    <div className="smallTitle">{preTitle}</div>
                                }
                                <h2>{title}</h2>
                                <p>{copy}</p>
                                { image &&
                                    <div className={s.Image}>
                                        <ImageBox image={image} />
                                    </div>
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
