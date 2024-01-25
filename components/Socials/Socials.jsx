'use client'

import { SettingsContext } from "components/Contexts/SettingsContext"
import { getSocialIcon } from 'lib/utils'
import { useContext } from "react"

import s from './Socials.module.sass'

export default function Socials() {
    const { socialLinks } = useContext(SettingsContext)

    return (
        <ul className={s.Outer}>
            {socialLinks?.map((item, index) => {
                const {
                    link,
                    company,
                } = item

                return (
                    <li key={index}>
                        <a href={link}>
                            {getSocialIcon(company)}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}