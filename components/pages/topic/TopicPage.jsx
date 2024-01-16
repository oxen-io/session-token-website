import SingleTopic from 'components/SingleTopic/SingleTopic'

import PageComponents from 'components/PageComponents/PageComponents'


export function TopicPage({ data, settings }) {
    return (
        <PageComponents settings={settings} data={data} isTopic>
            <SingleTopic topic={data ?? {}} />
        </PageComponents>
    )
}

export default TopicPage
