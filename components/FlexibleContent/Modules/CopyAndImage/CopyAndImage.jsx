import cn from 'clsx'

import PortableText from 'components/PortableText/PortableText'

import ImageBox from 'components/shared/ImageBox'
import Button from '/components/Button/Button'

import s from './CopyAndImage.module.sass'

export default function CopyAndImage({
    title,
    copy,
    subCopy,
    image,
    button,
    alignment,
}) {
    return (
        <section className={s.CopyAndImage}>
            <div className={cn(s.Cont, 'Container', alignment ? s[alignment] : '')}>
                <div className={s.Content}>
                    <div className='smallTitle'>{title}</div>
                    {copy &&
                        <h2><PortableText value={copy} /></h2>
                    }
                    { subCopy &&
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
                </div>
                <div className={s.Image}>
                    {image &&
                        <ImageBox image={image} />
                    }
                </div>
            </div>
        </section>
    )
}