import InViewDetector from 'components/InViewDetector/InViewDetector'
import React from 'react'

import Hero from './Modules/Hero/Hero'
import IconStrip from './Modules/IconStrip/IconStrip'
import JoinCta from './Modules/JoinCta/JoinCta'
import StatsTiles from './Modules/StatsTiles/StatsTiles'
import TileCarousel from './Modules/TileCarousel/TileCarousel'
import CopyAndImage from './Modules/CopyAndImage/CopyAndImage'
import BlogGrid from './Modules/BlogGrid/BlogGrid'
import ComingSoon from './Modules/ComingSoon/ComingSoon'

const Components = {
    Hero,
    IconStrip,
    JoinCta,
    StatsTiles,
    TileCarousel,
    CopyAndImage,
    BlogGrid,
    ComingSoon
}

const ucFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const FlexibleContent = ({ rows, settings, topic }) => {
    if (!rows) {
        return null
    }

    const scrollIds = rows.map(row => row.scrollId).filter(Boolean).map(id => ({
        id: id.replace(/\s+/g, '-').toLowerCase(),
        title: id,
    }))

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

                const scrollId = row.scrollId
                    ? row.scrollId.replace(/\s+/g, '-').toLowerCase()
                    : null

                return (
                    <InViewDetector name={name} key={index} scrollId={scrollId}>
                        <Component
                            {...row}
                            key={index}
                            scrollIds={scrollIds}
                            settings={settings}
                            topic={topic}
                        />
                    </InViewDetector>
                )
            })}
        </main>
    )
}

export default FlexibleContent
