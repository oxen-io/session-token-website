import cn from 'clsx'

import ImageBox from '/components/ImageBox/ImageBox'
import Button from '/components/Button/Button'

import s from './TileCarousel.module.sass'

export default function TileCarousel ({
    title,
    content,
    tiles
}) {
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
                            fullSizeImage,
                            linkLabel,
                            link,
                        } = tile

                        return (
                            <li key={index} className={fullSizeImage ? s.FullSizeImage : ''}>
                                { image &&
                                    <div className={s.Image}>
                                        <ImageBox image={image} />
                                    </div>
                                }
                                { preTitle &&
                                    <div className="smallTitle">{preTitle}</div>
                                }
                                <h2>{title}</h2>
                                <p>{copy}</p>
                                { linkLabel &&
                                    <Button
                                        title={linkLabel}
                                        url={link}
                                    />
                                }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}
