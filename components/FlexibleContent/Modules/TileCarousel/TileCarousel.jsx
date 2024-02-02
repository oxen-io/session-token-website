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

export default function TileCarousel({
    title,
    content,
    tiles,
    borderless
}) {
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
                    (borderless && title) ?
                        <h2>{title}</h2>
                        :
                        content &&
                        <div className={s.Content}>
                            <div className="smallTitle">{title}</div>
                            {content?.title && <h2>{content?.title}</h2>}
                            {content?.copy && <PortableText value={content?.copy} />}
                        </div>
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
                                    <div className={cn(s.Slide, fullSizeImage ? s.FullSizeImage : '')}>
                                        {link ?
                                            <NavLink href={link}>
                                                {inside}
                                            </NavLink>
                                            :
                                            <div>
                                                {inside}
                                            </div>
                                        }
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}
