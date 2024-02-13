'use client'

//
import GUI from 'lil-gui'
import { Renderer, Program, Color, Mesh, Triangle, Vec2 } from 'ogl'
import vertex from '../glsl/main.vert'
import fragment from '../glsl/main.frag'
import LoaderManager from '../managers/LoaderManager'
import { gsap } from 'gsap'
import { isTouch } from '../utils/isTouch'
import IntersectionObserver from '../managers/IntersectionObserver'
//

import { useEffect, useRef } from "react"

export default function BulgeImage({
    image
}) {
    const canvasRef = useRef()

    useEffect(() => {
        const renderer = new Renderer({
            dpr: Math.min(window.devicePixelRatio, 2),
            canvas: canvasRef.current,
            width: canvasRef.current.offsetWidth,
            height: canvasRef.current.offsetHeight,
        })

        const { gl } = renderer

    }, [])

    return (
        <>
            <canvas ref={canvasRef} />
        </>
    )
}