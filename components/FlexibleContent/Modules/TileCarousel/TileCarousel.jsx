"use client"

import cn from 'clsx'

import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y, Navigation } from 'swiper/modules'

import 'swiper/scss'
import 'swiper/scss/a11y'
import 'swiper/css/navigation'

import PortableText from 'components/PortableText/PortableText'

import ImageBox from '/components/ImageBox/ImageBox'
import Button from '/components/Button/Button'
import NavLink from '/components/NavLink/NavLink'

import s from './TileCarousel.module.sass'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function TileCarousel({
    title,
    content,
    tiles,
    borderless
}) {
    const hasScrollIconOnMobile = !content && !borderless

    return (
        <section className={cn(
            s.TileCarousel,
            {
                [s.HasContent]: content,
                [s.Borderless]: borderless,
            }
        )}
        >
            <div className={cn(s.Cont, "Container")}>
                {
                    content ?
                        <div className={s.Content}>
                            <div className="smallTitle">{title}</div>
                            {content?.title && <h2>{content?.title}</h2>}
                            {content?.copy && <PortableText value={content?.copy} />}
                        </div>
                        : borderless ?
                            <h2>{title}</h2>
                            : title ?
                                <div className="smallTitle">
                                    {title}
                                    {hasScrollIconOnMobile ?
                                        <div className={s.ScrollIcon}>
                                            Scroll
                                            <svg width="77" height="8" viewBox="0 0 77 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M76.4998 3.79688L69.9998 0.0440984V7.54965L76.4998 3.79688ZM70.6498 3.14688L0.964111 3.14688V4.44687L70.6498 4.44687V3.14688Z" fill="#fff" />
                                            </svg>
                                        </div>
                                        : null}
                                </div>
                                : null
                }
                <div className={s.Slider}>
                    <Swiper
                        modules={[A11y, Navigation]}
                        spaceBetween={20}
                        slidesPerView={content ? 1.2 : 1}
                        a11y={true}
                        allowTouchMove={true}
                        navigation={true}
                        breakpoints={
                            {
                                1024: {
                                    slidesPerView: content ? 3 : 2.85,
                                    allowTouchMove: false,
                                },
                            }
                        }
                    >
                        {tiles?.map((tile, index) => {
                            const {
                                preTitle,
                                title,
                                copy,
                                image,
                                fullSizeImage,
                                linkLabel,
                                link,
                            } = tile

                            const inside = (
                                <>
                                    {image &&
                                        <div className={s.Image}>
                                            <ImageBox image={image} />
                                        </div>
                                    }
                                    <div className={s.TileContent}>
                                        {preTitle &&
                                            <div className="smallTitle">{preTitle}</div>
                                        }
                                        {content ?
                                            <h4>{title}<span>↗</span></h4>
                                            :
                                            <h2>{title}</h2>
                                        }
                                        <p>{copy}</p>
                                        {linkLabel &&
                                            <Button
                                                title={linkLabel}
                                                inverted={!fullSizeImage}
                                                hasArrow={link}
                                                disabled={!link}
                                            />
                                        }
                                    </div>
                                </>
                            )

                            return (
                                <SwiperSlide key={index}>
                                    <AnimatedElement
                                        className={cn(s.Slide, fullSizeImage ? s.FullSizeImage : '')}
                                        delay={(index * 100) + 100}
                                    >
                                        {link ?
                                            <NavLink href={link}>
                                                {inside}
                                            </NavLink>
                                            :
                                            <div>
                                                {inside}
                                            </div>
                                        }
                                    </AnimatedElement>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
