import cn from 'clsx'

import { PortableText } from '@portabletext/react'

import ImageBox from 'components/shared/ImageBox'
import Button from '/components/Button/Button'

import s from './CopyAndImage.module.sass'

export default function CopyAndImage ({
    title,
    copy,
    image,
    button,
    alignment,
}) {
    return (
        <section className={s.CopyAndImage}>
            <div className={cn(s.Cont, 'Container', alignment ? s[alignment]: '')}>
                <div className={s.Content}>
                    <div className='smallTitle'>{title}</div>
                    { copy &&
                        <h2><PortableText value={copy} /></h2>
                    }
                    { button &&
                        <Button
                            title={button?.label}
                            inverted={!button?.isPrimary}
                            arrow
                        />
                    }
                </div>
                <div className={s.Image}>
                    { image &&
                        <ImageBox image={image} />
                    }
                </div>
            </div>
        </section>
    )
}