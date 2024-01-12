"use client";

import React, { useEffect, useRef } from "react"

const { jarallax, jarallaxVideo } = typeof window !== "undefined" ? require("jarallax") : () => null

export default function ParallaxBg({
    children,
    backgroundImageUrl = null,
    backgroundVideoUrl = null,
    backgroundVideoMobileUrl = null,
    backgroundImageMobileUrl = null,
    className = "",
}) {
    let hasInitialisedJarallax = false;

    const ref = useRef(null)

    useEffect(() => {
        if (jarallaxVideo) {
            jarallaxVideo()
        }

        if (ref && ref.current && !hasInitialisedJarallax) {
            const isMobile = window.innerWidth < 768

            if (backgroundVideoUrl || backgroundVideoMobileUrl) {
                const _url = (isMobile && backgroundVideoMobileUrl) ? backgroundVideoMobileUrl : backgroundVideoUrl

                hasInitialisedJarallax = true

                jarallax(ref.current, {
                    speed: isMobile ? 1 : 0.8,
                    videoSrc: `mp4:${_url}`
                })
            } else if (backgroundImageUrl || backgroundImageMobileUrl) {
                const _url = (isMobile && backgroundImageMobileUrl) ? backgroundImageMobileUrl : backgroundImageUrl
                hasInitialisedJarallax = true

                jarallax(ref.current, {
                    speed: 0.8,
                    imgSrc: _url
                })
            }
        }
    }, [backgroundImageUrl]);

    return (
        <section
            className={`jarallax ${className}`}
            ref={ref}
        >
            {children}
        </section>
    );
}
