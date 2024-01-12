import { pageType } from "./schemas/pageType"

import { heroType } from "./schemas/modules/heroType"
import { copyAndImageType } from "./schemas/modules/copyAndImageType"
import { iconStripType } from "./schemas/modules/iconStripType"
import { joinCtaType } from "./schemas/modules/joinCtaType"
import { statsTilesType } from "./schemas/modules/statsTilesType"
import { tileCarouselType } from "./schemas/modules/tileCarouselType"

export const schema = {
  types: [
    pageType,

    heroType,
    copyAndImageType,
    iconStripType,
    joinCtaType,
    statsTilesType,
    tileCarouselType,
  ],
}
