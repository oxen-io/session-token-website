'use client'

import Button from '@/components/Button/Button'

import s from './NotFound.module.sass'
import clsx from 'clsx'

export default function NotFound({

}) {
    return (
        <div className={s.Outer}>
            <h1>
                404
            </h1>
            <div className={clsx('Container', s.Bottom)}>
                <Button
                    text={'Take me back'}
                    icon={'back'}
                    onClick={() => {
                        window.history.back()
                    }}
                />
            </div>
        </div>
    )
}