import Modal from 'components/Modal/Modal'

function PageComponents({ settings, data, children }) {
    return (
        <>
            {children}
            <Modal settings={settings} />
        </>
    )
}

export default PageComponents
