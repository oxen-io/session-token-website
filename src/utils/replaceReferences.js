import { AsyncWalkBuilder } from 'walkjs'
import { sanityFetch } from './sanityClient'

export default async function replaceReferences(
    input,
    resolvedIds = [],
    tags = []
) {
    await new AsyncWalkBuilder()
        .withGlobalFilter((x) => x.val?._type === 'reference')
        .withSimpleCallback(async (node) => {
            const refId = node.val._ref

            if (typeof refId !== 'string') {
                throw new Error('node.val._ref is not set')
            }

            if (resolvedIds.includes(refId)) {
                const ids = `[${resolvedIds.concat(refId).join(',')}]`
                throw new Error(
                    `Ran into an infinite loop of references, please investigate the following sanity document order: ${ids}`
                )
            }

            const doc = await sanityFetch(`*[_id == '${refId}']{...}[0]`, {}, tags)

            // recursively replace references
            await replaceReferences(doc, resolvedIds.concat(refId), tags)

            /**
             * Here we'll mutate the original reference object by clearing the
             * existing keys and adding all keys of the reference itself.
             */
            Object.keys(node.val).forEach((key) => delete node.val[key])
            Object.keys(doc).forEach((key) => (node.val[key] = doc[key]))
        })
        .walk(input)
}