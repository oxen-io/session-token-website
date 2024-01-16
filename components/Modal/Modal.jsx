'use client'

import cn from 'clsx'
import useStore from 'lib/store'
import x from 'public/x.js'

import styles from './Modal.module.sass'
import Video from './ModalTypes/Video'
import Share from './ModalTypes/Share'

export default function Modal({ settings }) {
    const { closeModal, modalData } = useStore()

    const { type, subType, data, isVisible } = modalData ? modalData : {}

    let component = null

    const commonProps = {
        settings,
        data,
        subType,
        isVisible,
        close: closeModal,
    }

    switch (type) {
    case 'VIDEO':
        component = <Video {...commonProps} />
        break
    case 'SHARE':
        component = <Share {...commonProps} />
        break
    default:
        break
    }

    return (
        <div
            className={cn(styles.modal, isVisible && styles.visible)}
            onClick={closeModal}
            onKeyDown={closeModal}
            role="button"
            tabIndex={0}
            aria-label="clos emodal"
        >
            <div
                className={styles[type]}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                role="button"
                tabIndex={0}
                data-lenis-prevent
                aria-label="modal"
            >
                {type ? <button onClick={closeModal}>{x}</button> : null}
                {component}
            </div>
        </div>
    )
}
