import clsx from 'clsx'
import s from './JoinCta.module.sass'
import { urlForImage } from 'lib/sanity.image'
import PortableText from 'components/PortableText/PortableText'
import Socials from 'components/Socials/Socials'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function JoinCta({
    preTitle,
    title,
    copy,
    image,
    socialLinks
}) {
    const bgUrl = urlForImage(image).url()

    return (
        <section className={clsx(s.Outer, 'Container')}>
            <AnimatedElement
                delay={100}
            >
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
                    <Socials socialLinks={socialLinks} />
                </div>
                <div
                    className={s.Image}
                    style={{
                        backgroundImage: `url(${bgUrl})`
                    }}
                />
            </AnimatedElement>
        </section>
    )
}