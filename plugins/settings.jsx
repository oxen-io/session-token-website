/**
 * This plugin contains all the logic for setting up the singletons
 */

import { Iframe } from 'sanity-plugin-iframe-pane'
import { BookIcon } from '@sanity/icons'

import { iframeOptions, PREVIEWABLE_DOCUMENT_TYPES } from '../sanity.config'

import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

export const singletonPlugin = (types) => {
    return {
        name: 'singletonPlugin',
        document: {
            // Hide 'Singletons (such as Home)' from new document options
            // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
            newDocumentOptions: (prev, { creationContext }) => {
                if (creationContext.type === 'global') {
                    return prev.filter(
                        (templateItem) =>
                            !types.includes(templateItem.templateId),
                    )
                }

                return prev
            },
            // Removes the "duplicate" action on the Singletons (such as Home)
            actions: (prev, { schemaType }) => {
                if (types.includes(schemaType)) {
                    return prev.filter(({ action }) => action !== 'duplicate')
                }

                return prev
            },
        },
    }
}

// The StructureResolver is how we're changing the DeskTool structure to linking to document (named Singleton)
// like how "Home" is handled.
export const pageStructure = (typeDefArray) => {
    return (S, context) => {
        // Goes through all of the singletons that were provided and translates them into something the
        // Desktool can understand
        const singletonItems = typeDefArray.map((typeDef) => {
            return S.listItem()
                .title(typeDef.title)
                .icon(typeDef.icon)
                .child(
                    S.editor()
                        .id(typeDef.name)
                        .schemaType(typeDef.name)
                        .documentId(typeDef.name)
                        .views([
                            // Default form view
                            S.view.form(),
                            // Preview
                            ...(PREVIEWABLE_DOCUMENT_TYPES.includes(
                                typeDef.name,
                            )
                                ? [
                                      S.view
                                          .component(Iframe)
                                          .options(iframeOptions)
                                          .title('Preview'),
                                  ]
                                : []),
                        ]),
                )
        })

        // The default root list items (except custom ones)

        const ignoredTypes = ['navigationLink']
        const defaultListItems = S.documentTypeListItems()
            .filter(
                (listItem) =>
                    !typeDefArray.find(
                        (singleton) => singleton.name === listItem.getId(),
                    ),
            )
            .filter(
                (listItem) =>
                    !ignoredTypes.find(
                        (ignoredType) => ignoredType === listItem.getId(),
                    ),
            )

        return S.list()
            .title('Content')
            .items([
                ...singletonItems,
                S.divider(),
                ...defaultListItems,
            ])
    }
}
