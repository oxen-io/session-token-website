import s from './Video.module.sass'

function Video({ data }) {
    if (!data) return null

    return <div className={s.Video}>VIDEO MODAL</div>
}

export default Video
