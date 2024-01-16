'use client'

import { useFormspark } from '@formspark/use-formspark'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from 'components/Button/Button'

import s from './FormComponent.module.sass'

const InputField = ({
    type,
    id,
    fieldName,
    required,
    placeholder,
    register,
}) => (
    <li>
        <label htmlFor={id}>{fieldName}</label>
        <div>
            <input
                type={type}
                id={id}
                required={!!required}
                placeholder={placeholder}
                aria-describedby={type}
                {...register(id)}
            />
        </div>
    </li>
)

export const FormComponent = ({ formRows, formId, setFormSubmitted }) => {
    const [submitted, setSubmitted] = useState(false)
    const [submit, submitting] = useFormspark({ formId: formId })
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => {
        submit(data)
        setSubmitted(true)
        setFormSubmitted(true)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={s.Form}>
            <ul>
                {formRows &&
                    formRows.map(({ formFields, rowTitle }, index) => {
                        return (
                            <li key={index} className={s.Section}>
                                {rowTitle && (
                                    <span
                                        className="smallCaps smaller"
                                        dangerouslySetInnerHTML={{
                                            __html: rowTitle,
                                        }}
                                    />
                                )}
                                <ul className={s.Row}>
                                    {formFields &&
                                        formFields.map((field) => {
                                            const {
                                                inputType,
                                                _key,
                                                fieldId,
                                                placeholder,
                                                _type,
                                                fieldName,
                                                required,
                                            } = field ?? {}

                                            const { current } = fieldId ?? {}

                                            if (!inputType || !current)
                                                return null

                                            const _placeholder =
                                                placeholder ?? fieldName ?? ''

                                            if (inputType === 'textArea') {
                                                return (
                                                    <li key={_key}>
                                                        <label
                                                            htmlFor={current}
                                                        >
                                                            {fieldName}
                                                        </label>
                                                        <div>
                                                            <textarea
                                                                id={current}
                                                                required={
                                                                    !!required
                                                                }
                                                                placeholder={`${_placeholder}${
                                                                    required
                                                                        ? '*'
                                                                        : ''
                                                                }`}
                                                                aria-describedby="textarea"
                                                                {...register(
                                                                    current,
                                                                )}
                                                                rows={5}
                                                            />
                                                        </div>
                                                    </li>
                                                )
                                            }

                                            return (
                                                <InputField
                                                    key={_key}
                                                    type={inputType}
                                                    id={current}
                                                    fieldName={fieldName}
                                                    required={required}
                                                    placeholder={`${_placeholder}${
                                                        required ? '*' : ''
                                                    }`}
                                                    register={register}
                                                />
                                            )
                                        })}
                                </ul>
                            </li>
                        )
                    })}
            </ul>
            <Button type="submit" disabled={submitting} title="Submit" brown />
        </form>
    )
}
