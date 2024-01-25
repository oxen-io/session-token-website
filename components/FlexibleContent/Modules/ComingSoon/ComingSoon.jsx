'use client'

import { urlForImage } from 'lib/sanity.image'
import s from './ComingSoon.module.sass'
import Button from '/components/Button/Button'

import Logo from 'public/images/logoInline.svg'
import Image from 'next/image'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function ComingSoon({
    title,
    buttons,
    backgroundImage
}) {
    const backgroundImageUrl = urlForImage(backgroundImage).url()

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHasMounted(true)
        }, 300)
    }, [])

    return (
        <section className={clsx(s.Outer, {
            [s.Mounted]: hasMounted
        })}>
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
                    className={`Huge HasGradient`}
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
                            return (
                                <li key={index}>
                                    <Button
                                        {...button}
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