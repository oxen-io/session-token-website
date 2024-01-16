import cn from 'clsx'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Scrollbar, A11y } from 'swiper/modules'

// import 'swiper/scss'
// import 'swiper/scss/scrollbar'
// import 'swiper/scss/a11y'

import ImageBox from '/components/ImageBox/ImageBox'
import Button from '/components/Button/Button'

import s from './TileCarousel.module.sass'

export default function TileCarousel ({
    title,
    content,
    tiles
}) {
    return (
        <section className={s.TileCarousel}>
            <div className={cn(s.Cont, "Container")}>
                <div className={s.Slider}>
                    {/* <Swiper
                        modules={[Scrollbar, A11y]}
                        spaceBetween={20}
                        slidesPerView={1}
                        a11y={true}
                        breakpoints={
                            {
                                500: {
                                    slidesPerView: 2
                                },
                                1400: {
                                    slidesPerView: 3
                                },
                            }
                        }
                        scrollbar={{ draggable: true }}
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

                            return (
                                <SwiperSlide key={index}>
                                    <div key={index} className={cn(s.Slide, fullSizeImage ? s.FullSizeImage : '')}>
                                        { image &&
                                            <div className={s.Image}>
                                                <ImageBox image={image} />
                                            </div>
                                        }
                                        { preTitle &&
                                            <div className="smallTitle">{preTitle}</div>
                                        }
                                        <h2>{title}</h2>
                                        <p>{copy}</p>
                                        { linkLabel &&
                                            <Button
                                                title={linkLabel}
                                                url={link}
                                            />
                                        }
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper> */}
                </div>
            </div>
        </section>
    )
}
