import Hero from "./Hero/Hero"
import CopyAndImage from "./CopyAndImage/CopyAndImage"
import IconStrip from "./IconStrip/IconStrip"
import JoinCta from "./JoinCta/JoinCta"
import StatsTiles from "./StatsTiles/StatsTiles"
import TileCarousel from "./TileCarousel/TileCarousel"

const components = {
    Hero,
    CopyAndImage,
    IconStrip,
    JoinCta,
    StatsTiles,
    TileCarousel
}

const ucFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export default function Modules({
    modules,
}) {
    return (
        <>
            {modules && modules.map((module) => {
                const { _type, _key } = module

                const Component = components[ucFirst(_type)]

                if (!Component) {
                    return `No component found for ${_type}`
                }

                return <Component key={_key} {...module} />
            })}
        </>
    )
}
