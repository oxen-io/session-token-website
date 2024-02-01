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
                                <ul>
                                    {faqs.map(({
                                        _key,
                                        question,
                                        answer
                                    }) => {
                                        return (
                                            <li key={_key}>
                                                <button>
                                                    {question}
                                                </button>
                                                <FadeCollapse open={false}>
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