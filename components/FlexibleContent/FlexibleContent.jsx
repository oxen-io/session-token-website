import React from 'react'

import Hero from './Modules/Hero/Hero'
import IconStrip from './Modules/IconStrip/IconStrip'
import JoinCta from './Modules/JoinCta/JoinCta'
import StatsTiles from './Modules/StatsTiles/StatsTiles'
import TileCarousel from './Modules/TileCarousel/TileCarousel'
import CopyAndImage from './Modules/CopyAndImage/CopyAndImage'
import BlogGrid from './Modules/BlogGrid/BlogGrid'
import ComingSoon from './Modules/ComingSoon/ComingSoon'
import GenericCta from './Modules/GenericCta/GenericCta'

const Components = {
    Hero,
    IconStrip,
    JoinCta,
    StatsTiles,
    TileCarousel,
    CopyAndImage,
    BlogGrid,
    ComingSoon,
    GenericCta
}

const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const FlexibleContent = ({ rows, settings, topic }) => {
    if (!rows) {
        return null
    }

    return (
        <main>
            {rows.map((row, index) => {
                const name = row._type

                const Component = Components[ucFirst(name)]

                if (!Component) {
                    console.log(`component missing for ${name}`)
                    return null
                }

                if (row?.hide) return null

                return (
                    <Component
                        {...row}
                        key={index}
                        settings={settings}
                        topic={topic}
                    />
                )
            })}
        </main>
    )
}

export default FlexibleContent
