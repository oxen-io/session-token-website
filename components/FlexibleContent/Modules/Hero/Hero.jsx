'use client'

import cn from 'clsx'

import PortableText from 'components/PortableText/PortableText'
import Button from '/components/Button/Button'
import ImageBox from '/components/ImageBox/ImageBox'

import { AnimatedBigImage, AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

import clsx from 'clsx'

import s from './Hero.module.sass'
import RewardStats from './RewardStats'
import { useState } from 'react'

export default function Hero({
    title,
    copy,
    buttons,
    backgroundImage,
    type,
}) {
    const [statsVisibleOnMobile, setStatsVisibleOnMobile] = useState(false)

    const isRewards = type === 'rewards'

    return (
        <section className={clsx(s.Hero, s[`Type-${type}`])}>
            <div className={cn(s.Cont, "Container")}>
                <div className={s.MobileScroll}>
                    <div className={s.ScrollIcon} />
                    <span>Scroll</span>
                </div>
                <div className={s.CopyCont}>
                    {title &&
                        <AnimatedElement
                            type='h1'
                            delay={100}
                            className={clsx({
                                'h3': isRewards,
                                'Huge': !isRewards,
                            })}
                            dangerouslySetInnerHTML={{ __html: title }}
                        />
                    }
                    {copy &&
                        <AnimatedElement
                            type='div'
                            delay={200}
                        >
                            <PortableText value={copy} />
                        </AnimatedElement>
                    }
                    {buttons &&
                        <AnimatedElement
                            type={'ul'}
                            delay={300}
                        >
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
                            {isRewards &&
                                <li className={s.RewardsButton}>
                                    <Button
                                        handleClick={() => {
                                            setStatsVisibleOnMobile(!statsVisibleOnMobile)
                                        }}
                                        inverted
                                        title={`${statsVisibleOnMobile ? 'Hide' : 'Show'} stats`}
                                    />
                                </li>
                            }
                        </AnimatedElement>
                    }
                </div>
                {type === 'rewards' ?
                    <RewardStats 
                        visibleOnMobile={statsVisibleOnMobile}
                    />
                    : null}
                <div className={clsx(s.ImageCont, {
                    [s.Darkened]: statsVisibleOnMobile
                })}>
                    {backgroundImage && <AnimatedBigImage image={backgroundImage} />}
                </div>
            </div>
        </section>
    )
}
