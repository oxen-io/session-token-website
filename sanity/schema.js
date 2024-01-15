import { pageType } from "./schemas/pageType"
import settings from "./schemas/singletons/settings"

import navigationLink from "./schemas/documents/navigationLink"

import { hero } from "./schemas/modules/hero"
import { copyAndImage } from "./schemas/modules/copyAndImage"
import { iconStrip } from "./schemas/modules/iconStrip"
import { joinCta } from "./schemas/modules/joinCta"
import { statsTiles } from "./schemas/modules/statsTiles"
import { tileCarousel } from "./schemas/modules/tileCarousel"

import { link } from "./schemas/objects/link"
import { button } from "./schemas/objects/button"


export const schema = {
  types: [
    pageType,
    settings,
    navigationLink,
    link,
    button,
    // page modules
    hero,
    copyAndImage,
    iconStrip,
    joinCta,
    statsTiles,
    tileCarousel,
  ],
}
