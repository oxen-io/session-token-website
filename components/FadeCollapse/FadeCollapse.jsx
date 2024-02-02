import SmoothCollapse from 'react-smooth-collapse'

import s from './FadeCollapse.module.sass'
import clsx from 'clsx'

export default ({ open, children }) => {
    return (
        <div className={clsx(s.Outer, {
            [s.Open]: open
        })}>
            <SmoothCollapse allowOverflowWhenOpen expanded={!!open}>
                {children}
            </SmoothCollapse>
        </div>
    )
}