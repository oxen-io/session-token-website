import cn from 'clsx'

import PortableText from 'components/PortableText/PortableText'
import Button from '/components/Button/Button'
import ImageBox from '/components/ImageBox/ImageBox'

import clsx from 'clsx'

import s from './Hero.module.sass'
import RewardStats from './RewardStats'

export default function Hero({
    title,
    copy,
    buttons,
    backgroundImage,
    type,
}) {
    return (
        <section className={clsx(s.Hero, s[`Type-${type}`])}>
            <div className={cn(s.Cont, "Container")}>
                <div className={s.MobileScroll}>
                    <div className={s.ScrollIcon} />
                    <span>Scroll</span>
                </div>
                <div className={s.CopyCont}>
                    {title &&
                        <h1
                            className={clsx({
                                'h3': type === 'rewards',
                                'Huge': type !== 'rewards',
                            })}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    }
                    {copy && <PortableText value={copy} />}
                    {buttons &&
                        <ul>
                            {buttons.map((button, index) => {
                                return (
                                    <li key={index}>
                                        <Button
                                            {...button}
                                            inverted={index !== 0}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>
                <RewardStats />
                <div className={s.ImageCont}>
                    {backgroundImage && <ImageBox image={backgroundImage} />}
                </div>
            </div>
        </section>
    )
}
