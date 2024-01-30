import { hero } from './objects/flexibleSections/hero'
import { joinCta } from './objects/flexibleSections/joinCta'
import { statsTiles } from './objects/flexibleSections/statsTiles'
import { tileCarousel } from './objects/flexibleSections/tileCarousel'
import { iconStrip } from './objects/flexibleSections/iconStrip'
import { copyAndImage } from './objects/flexibleSections/copyAndImage'
import { blogGrid } from './objects/flexibleSections/blogGrid'
import { comingSoon } from './objects/flexibleSections/comingSoon'

import link from './objects/link'
import figure from './objects/figure'
import formRow from './objects/form/formRow'
import formBuilder from './objects/form/formBuilder'
import formFields from './objects/form/formFields'
import quote from './objects/quote'
import portableImage from './objects/portableImage'
import { button } from './objects/button'
import { iframe } from './objects/iframe'
import socialLinks from './partials/socialLinks'

import page from './documents/page'
import post from './documents/post'
import author from './documents/author'
import navigationLink from './documents/navigationLink'
import forms from './documents/forms'
import settings from './singletons/settings'

export default [
    // Singletons
    settings,

    // Documents
    page,
    post,
    author,
    navigationLink,
    forms,

    // Modules
    hero,
    joinCta,
    statsTiles,
    tileCarousel,
    iconStrip,
    copyAndImage,
    blogGrid,
    comingSoon,

    // Objects
    figure,
    link,
    formFields,
    formRow,
    formBuilder,
    quote,
    portableImage,
    button,
    iframe,
    socialLinks
]