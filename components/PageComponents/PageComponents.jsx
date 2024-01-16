import Modal from 'components/Modal/Modal'
import Acknowledgement from 'components/Acknowledgement/Acknowledgement'
import FlexibleContent from 'components/FlexibleContent/FlexibleContent'

function PageComponents({ settings, data, children }) {
    const { content } = data ?? {}

    return (
        <>
            {children}
            <Modal settings={settings} />
            <Acknowledgement settings={settings} />
        </>
    )
}

export default PageComponents
