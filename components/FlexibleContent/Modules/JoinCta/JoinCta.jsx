import clsx from 'clsx'
import s from './JoinCta.module.sass'
import { urlForImage } from 'lib/sanity.image'
import { PortableText } from '@portabletext/react'

export default function JoinCta({
    preTitle,
    title,
    copy,
    image,
    links
}) {
    const bgUrl = urlForImage(image).url()

    return (
        <section className={clsx(s.Outer, 'Container')}>
            <div>
                <div className={s.Content}>
                    <div className='smallTitle'>
                        / {preTitle}
                    </div>
                    <h2>
                        {title}
                    </h2>
                    <div className={s.Copy}>
                        <PortableText value={copy} />
                    </div>
                </div>
                <div
                    className={s.Image}
                    style={{
                        backgroundImage: `url(${bgUrl})`
                    }}
                />
            </div>
        </section>
    )
}