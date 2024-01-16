import React from 'react'
import Select from 'react-select'

import RockButton from 'components/RockButton/RockButton'

const SelectBox = ({ options, handleChange, value, placeholder, isTopic }) => {
    const _options = (() => {
        let _response = options

        if (typeof options === 'string') {
            _response = []

            const optionsArray = options.split('\n')

            optionsArray.forEach((option) => {
                const valueArray = option.split(' : ')

                _response.push({
                    value: valueArray[1],
                    label: valueArray[0],
                })
            })
        } else {
            return _response
        }
    })()

    const textColour = isTopic ? '#6C1653' : '#00364C'

    const colourStyles = {
        control: (styles) => ({
            ...styles,
            backgroundColor: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            padding: '15px 10px',
            borderRadius: '10px',
            color: textColour,
            border: `1px solid ${isTopic ? '#6C1653' : '#BBBABB'}`,
            boxShadow: '0px 1px 7px 0px #d4d3d3',
        }),
        option: (styles, { isSelected }) => {
            return {
                ...styles,
                color: textColour,
                fontSize: '18px',
                fontWeight: 500,
                padding: '15px 10px',
                background: isSelected
                    ? '#CCD7DB'
                    : '#FFF',
            }
        },
        placeholder: (styles) => ({ ...styles, color: textColour }),
    }

    return (
        <Select
            className={`select`}
            options={_options}
            onChange={handleChange}
            value={_options.filter(function(option) {
                return option.label === value
            })}
            placeholder={placeholder ? placeholder : value}
            classNamePrefix={'select-box'}
            menuColor="black"
            isSearchable={false}
            styles={colourStyles}
            components={{
                IndicatorSeparator: () => null,
                DropdownIndicator: () => <RockButton down purple={isTopic} />,
            }}
        />
    )
}

export default SelectBox
