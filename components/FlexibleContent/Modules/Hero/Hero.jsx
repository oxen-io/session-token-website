import cn from 'clsx'

import { PortableText } from '@portabletext/react'
import Button from '/components/Button/Button'
import ImageBox from 'components/ImageBox/ImageBox'

import s from './Hero.module.sass'

export default function Hero ({
    title,
    copy,
    buttons,
    backgroundImage,
    type,
}) {
    return (
        <section className={s.Hero}>
            <div className={cn(s.Cont, "Container")}>
                <div className={s.CopyCont}>
                    { title && <h1 dangerouslySetInnerHTML={{ __html: title }} /> }
                    { copy && <PortableText value={copy} /> }
                    { buttons && 
                        <ul>
                            {buttons.map((button, index) => {
                                return (
                                    <li key={index}>
                                        <Button 
                                            {...button}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>
                <div className={s.ImageCont}>
                    {backgroundImage && <ImageBox image={backgroundImage} />}
                </div>
            </div>
        </section>
    )
}
