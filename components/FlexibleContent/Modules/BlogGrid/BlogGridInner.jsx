'use client'

import BlogTile from "./BlogTile"
import s from './BlogGrid.module.sass'
import clsx from "clsx"

import { useEffect, useState } from 'react'

export default function BlogGridInner({
    posts
}) {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setHasMounted(true)
        }, 200)
    }, [])

    return (
        <ul className={clsx(s.List, {
            [s.Mounted]: hasMounted
        })}>
            {posts.map((post, index) => (
                <li
                    key={post.slug.current}
                    style={{
                        transitionDelay: `${index * 0.1}s`
                    }}
                >
                    <BlogTile
                        post={post}
                    />
                </li>
            ))}
        </ul>
    )
}