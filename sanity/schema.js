import { pageType } from "./schemas/pageType"
import settings from "./schemas/singletons/settings"

import navigationLink from "./schemas/documents/navigationLink"

import { heroType } from "./schemas/modules/heroType"
import { copyAndImageType } from "./schemas/modules/copyAndImageType"
import { iconStripType } from "./schemas/modules/iconStripType"
import { joinCtaType } from "./schemas/modules/joinCtaType"
import { statsTilesType } from "./schemas/modules/statsTilesType"
import { tileCarouselType } from "./schemas/modules/tileCarouselType"

import { link } from "./schemas/objects/link"
import { button } from "./schemas/objects/button"


export const schema = {
  types: [
    pageType,
    settings,
    heroType,
    copyAndImageType,
    iconStripType,
    joinCtaType,
    statsTilesType,
    tileCarouselType,
    navigationLink,
    link,
    button,
  ],
}
