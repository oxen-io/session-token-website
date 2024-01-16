import s from './SmoothOpen.module.sass'
import cn from 'clsx'

function SmoothOpen({ children, open }) {
    return (
        <div className={cn(s.SmoothOpen, open && s.isOpen)}>
            <div>{children}</div>
        </div>
    )
}

export default SmoothOpen
