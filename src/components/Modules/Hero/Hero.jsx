import s from './Hero.module.sass'

export default function Hero ({
    title,
    copy,
    buttons,
    backgroundImage,
    type
}) {
    return (
        <section className={s.Outer}>
            <h1>Hero</h1>
        </section>
    )
}