import InViewDetector from 'components/InViewDetector/InViewDetector'
import React from 'react'

import hero  from './Modules/Hero/Hero'
import iconStrip from './Modules/IconStrip/IconStrip'
import joinCta from './Modules/JoinCta/JoinCta'
import statsTiles from './Modules/StatsTiles/StatsTiles'
import tileCarousel from './Modules/TileCarousel/TileCarousel'

const Components = {
    hero,
    iconStrip,
    joinCta,
    statsTiles,
    tileCarousel,
}

const FlexibleContent = ({ rows, settings, topic }) => {
    if (!rows) {
        return null
    }

    const scrollIds = rows
        .map((row) => row.scrollId)
        .filter((id) => id)
        .map((id) => {
            return {
                id: id.replace(/\s+/g, '-').toLowerCase(),
                title: id,
            }
        })

    return (
        <main>
            {rows.map((row, index) => {
                const name = row._type

                if (!Components[name]) {
                    console.log(`component missing for ${name}`)
                    return null
                }

                if (row?.hide) return null

                const Component = Components[name]

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
