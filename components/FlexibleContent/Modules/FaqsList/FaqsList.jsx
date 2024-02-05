'use client'

import { useState } from 'react'

import s from './FaqsList.module.sass'
import clsx from 'clsx'
import PortableText from 'components/PortableText/PortableText'
import FadeCollapse from 'components/FadeCollapse/FadeCollapse'

export default function FaqsList({
    categories
}) {
    const [openCategories, setOpenCategories] = useState([])

    return (
        <section className={clsx(s.Outer, 'Container')}>
            <legend className={s.Legend}>
                <strong>
                    Table of contents
                </strong>
                <ul>
                    {categories.map(({
                        _key,
                        title
                    }) => {
                        return (
                            <li key={_key}>
                                <button>
                                    {title}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </legend>
            <main>
                <ul>
                    {categories.map(({
                        _key,
                        title,
                        faqs
                    }) => {
                        return (
                            <li key={_key}>
                                <strong>
                                    {title}
                                </strong>
                                <ul className={s.FaqsGroup}>
                                    {faqs.map(({
                                        _key,
                                        question,
                                        answer
                                    }) => {
                                        const isOpen = openCategories.includes(_key)

                                        return (
                                            <li
                                                key={_key}
                                                className={isOpen ? s.Open : ''}
                                            >
                                                <button
                                                    onClick={() => {
                                                        setOpenCategories(openCategories.includes(_key) ? openCategories.filter((category) => category !== _key) : [...openCategories, _key])
                                                    }}
                                                >
                                                    <em />
                                                    {question}
                                                </button>
                                                <FadeCollapse open={isOpen}>
                                                    <div className={s.Answer}>
                                                        <PortableText value={answer} />
                                                    </div>
                                                </FadeCollapse>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            </main>
        </section>
    )
}