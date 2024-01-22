import { hero } from 'schemas/objects/flexibleSections/hero'
import { joinCta } from 'schemas/objects/flexibleSections/joinCta'
import { statsTiles } from 'schemas/objects/flexibleSections/statsTiles'
import { tileCarousel } from 'schemas/objects/flexibleSections/tileCarousel'
import { iconStrip } from 'schemas/objects/flexibleSections/iconStrip'
import { copyAndImage } from 'schemas/objects/flexibleSections/copyAndImage'
import { blogGrid } from 'schemas/objects/flexibleSections/blogGrid'
import { comingSoon } from './objects/flexibleSections/comingSoon'

import link from 'schemas/objects/link'
import figure from 'schemas/objects/figure'
import formRow from 'schemas/objects/form/formRow'
import formBuilder from 'schemas/objects/form/formBuilder'
import formFields from 'schemas/objects/form/formFields'
import quote from 'schemas/objects/quote'
import portableImage from 'schemas/objects/portableImage'
import { button } from 'schemas/objects/button'

import page from 'schemas/documents/page'
import post from 'schemas/documents/post'
import author from 'schemas/documents/author'
import navigationLink from 'schemas/documents/navigationLink'
import forms from 'schemas/documents/forms'
import settings from 'schemas/singletons/settings'

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

]