import { urlForImage } from 'lib/sanity.image'
import s from './ComingSoon.module.sass'
import Button from '/components/Button/Button'

import Logo from 'public/images/logoInline.svg'
import Image from 'next/image'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function ComingSoon({
    title,
    buttons,
    backgroundImage
}) {
    const backgroundImageUrl = urlForImage(backgroundImage).url()

    return (
        <section className={s.Outer}>
            <Image
                src={backgroundImageUrl}
                className={s.Bg}
                width={1920}
                height={1080}
                alt=''
            />
            <div>
                <AnimatedElement
                    delay={300}
                    type="div"
                >
                    <Image
                        src={Logo}
                        alt="Session Token"
                        className={s.Logo}
                        priority
                    />
                </AnimatedElement>
                <AnimatedElement
                    className='Huge'
                    type="h1"
                    delay={400}
                >
                    {title}
                </AnimatedElement>
                {buttons &&
                    <AnimatedElement 
                        className={s.Buttons}
                        delay={500}
                        type="ul"
                    >
                        {buttons.map((button, index) => {
                            console.log(button)

                            return (
                                <li key={index}>
                                    <Button
                                        {...button}
                                        inverted={index !== 0}
                                        small
                                    />
                                </li>
                            )
                        })}
                    </AnimatedElement>
                }
            </div>
        </section>
    )
}