import SingleCaseStudy from 'components/SingleCaseStudy/SingleCaseStudy'

export function CaseStudyPage({ data }) {
    return <SingleCaseStudy caseStudy={data ?? {}} />
}

export default CaseStudyPage
