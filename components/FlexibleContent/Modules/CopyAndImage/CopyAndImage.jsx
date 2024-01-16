import s from './CopyAndImage.module.sass'

export default function CopyAndImage ({
    title,
    copy,
    image,
    button,
    alignment
}) {
    return (
        <section className={s.Outer}>
            <h1>
                Copy and image
            </h1>
        </section>
    )
}