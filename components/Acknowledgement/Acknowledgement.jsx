'use client'

import { useState, useEffect } from 'react'

import s from './Acknowledgement.module.sass'
import cn from 'clsx'

import { CustomPortableText } from 'components/shared/CustomPortableText'
import decoration from 'public/decoration'

import Button from 'components/Button/Button'

function Acknowledgement({ settings }) {
    const { acknowledgement } = settings ?? {}
    const [show, setShow] = useState(false)

    useEffect(() => {
        const hasSeenAck = localStorage.getItem('hasSeenAck')
        if (!hasSeenAck) {
            setShow(true)
            localStorage.setItem('hasSeenAck', true)
            setTimeout(() => {
                setShow(false)
            }, 10000)
        }
    }, [])

    return (
        <div className={cn(s.Acknowledgement, show && s.Show)}>
            <div className={s.Inner}>
                <div>
                    {acknowledgement && (
                        <CustomPortableText value={acknowledgement} />
                    )}
                    <Button
                        title="Enter site"
                        handleClick={() => setShow(false)}
                        white
                    />
                </div>
                {decoration}
            </div>
        </div>
    )
}

export default Acknowledgement
