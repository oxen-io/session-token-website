'use client'

import s from './Share.module.sass'
import { getShareSites, getSocialIcon } from 'lib/utils'

import circle from 'public/circle'
import Button from 'components/Button/Button'

import { useState } from 'react'

function Share({ data, settings, close }) {
    const { shareModal } = settings ?? {}

    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
    const shareSites = getShareSites(currentUrl)

    const [copied, setCopied] = useState(false)

    const handleCopyUrl = () => {
        if (!currentUrl || !navigator) return
        navigator.clipboard.writeText(`${currentUrl}`)
        setCopied(true)
    }

    return (
        <div className={s.Share}>
            <h3
                dangerouslySetInnerHTML={{
                    __html: shareModal?.title || 'Share',
                }}
            />
            <p
                dangerouslySetInnerHTML={{
                    __html:
                        shareModal?.copy ||
                        'Share this article with your friends',
                }}
            />
            <ul className={s.Buttons}>
                {shareSites &&
                    shareSites.map((site, index) => {
                        const { company, href } = site
                        return (
                            <li key={index}>
                                <a href={href}>
                                    {circle}
                                    {getSocialIcon(company)}
                                </a>
                            </li>
                        )
                    })}
            </ul>
            <div className={s.CopyCont}>
                <p>Or copy the link below</p>
                <div className={s.CopyBox} onClick={handleCopyUrl}>
                    {currentUrl && <input type="text" value={currentUrl} />}
                    <Button title={!copied ? 'Copy URL' : 'Copied!'} />
                </div>
            </div>
        </div>
    )
}

export default Share
