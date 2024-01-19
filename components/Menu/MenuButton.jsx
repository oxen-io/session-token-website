import clsx from 'clsx'
import s from './MenuButton.module.sass'

export default function MenuButton({
    open,
    setOpen
}) {
    return (
        <button
            className={clsx(s.Outer, {
                [s.Open]: open
            })}
            onClick={() => setOpen(!open)}
        >
            <div />
            <div />
            <div />
        </button>
    )
}