import cn from 'clsx'

import ImageBox from '@/components/ImageBox/ImageBox'

import s from './StatsTiles.module.sass'

export default function StatsTiles ({
    tiles,
}) {
    return (
        <section className={s.StatsTiles}>
            <div className={cn(s.Cont, "Container")}>
                <ul>
                    {tiles?.map((tile, index) => {
                        const {
                            figure,
                            copy,
                            backgroundImage,
                        } = tile

                        return (
                            <li key={index}>
                                <h1 className="large">{figure}</h1>
                                <p>{copy}</p>
                                { backgroundImage && <ImageBox image={backgroundImage} /> }
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}