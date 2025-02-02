import React, { useEffect, useState } from 'react'
import Select from 'react-select'

function Categories({ categories, selectCategory, selectedCategory }) {
    const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0)

    useEffect(() => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].value === selectedCategory) {
                setSelectedCategoryIndex(i)
                break
            }
        }
    }, [selectedCategory])

    return (
        <Select
            value={categories[selectedCategoryIndex]}
            options={categories}
            onChange={selectCategory}
            styles={{
                dropdownIndicator: (provided) => ({
                    ...provided,
                    color: '#dc2626',
                }),
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? '#e8ecf4' : state.isFocused ? '#e8ecf4' : undefined,
                    color: state.isSelected ? 'white' : 'black',
                }),
            }}
        />
    )
}

export default Categories