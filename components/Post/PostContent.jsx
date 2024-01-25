'use client'

import PortableText from 'components/PortableText/PortableText'
import s from './PostContent.module.sass'
import { useRef } from 'react'
import { AnimatedElement } from 'components/AnimatedComponent/AnimatedComponent'

export default function PostContent({
    post: {
        copy
    }
}) {
    const mainRef = useRef()

    const allH2s = copy.filter(block => block._type === 'block' && block.style === 'h2')

    return (
        <section className={s.Outer}>
            <AnimatedElement
                ref={mainRef}
                type='main'
                delay={250}
            >
                <PortableText value={copy} />
            </AnimatedElement>
            <aside>
                <AnimatedElement
                    type='div'
                    delay={300}
                >
                    <h5>
                        In this article
                    </h5>
                    <ul>
                        {allH2s.map((h2, index) => {
                            const textContent = h2.children[0].text

                            return (
                                <li key={h2._key}>
                                    <button
                                        onClick={() => {
                                            const target = mainRef.current.querySelector(`h2:nth-of-type(${index + 1})`)
                                            target.scrollIntoView({
                                                behavior: 'smooth',
                                                offsetTop: 100
                                            })
                                        }}
                                    >
                                        {textContent}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </AnimatedElement>
            </aside>
        </section>
    )
}