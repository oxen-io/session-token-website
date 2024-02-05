import cn from 'clsx'

import PortableText from 'components/PortableText/PortableText'

import ImageBox from 'components/shared/ImageBox'
import Button from '/components/Button/Button'

import s from './CopyAndImage.module.sass'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function CopyAndImage({
    title,
    copy,
    subCopy,
    image,
    button,
    alignment,
}) {
    const isReversed = alignment === 'imageLeft'

    return (
        <section className={s.CopyAndImage}>
            <div className={cn(s.Cont, 'Container', alignment ? s[alignment] : '')}>
                <AnimatedElement
                    className={s.Content}
                    delay={isReversed ? 200 : 100}
                >
                    <div className='smallTitle'>{title}</div>
                    {copy &&
                        <h2><PortableText value={copy} /></h2>
                    }
                    {subCopy &&
                        <h4 className={s.SubCopy}>
                            <PortableText value={subCopy} />
                        </h4>
                    }
                    {button &&
                        <Button
                            title={button.link.title}
                            isPrimary={button.isPrimary}
                            hasArrow={button.hasArrow}
                            iconName={button.iconName}
                        />
                    }
                </AnimatedElement>
                <AnimatedElement
                    className={s.Image}
                    delay={isReversed ? 100 : 200}
                >
                    {image &&
                        <ImageBox image={image} />
                    }
                </AnimatedElement>
            </div>
        </section>
    )
}