'use client'

import clsx from 'clsx'
import s from './Footer.module.sass'
import Link from 'next/link'
import { nl2br, nl2p, replaceEmailWithMailToLinks } from '@/utils'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/utils/sanityClient'

export default function Footer({

}) {
    const pathname = usePathname()
    return (
        <footer className={clsx(
            s.Outer,
            'Container',
        )}>
            <h1>
                Fooder gets gooder
            </h1>
        </footer>
    )
}