'use client'

import useStore from 'lib/store'

import share from 'public/share'

import s from './MobileShareTab.module.sass'

function MobileShareTab() {
    const { openModal } = useStore()
    return (
        <div
            className={s.MobileShareTab}
            onClick={() => openModal({ type: 'SHARE' })}
        >
            <span className="smallCaps smaller">Share</span>
            {share}
        </div>
    )
}

export default MobileShareTab
