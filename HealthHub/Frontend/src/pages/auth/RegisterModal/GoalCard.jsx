import React from 'react'

const GoalCard = ({ goalType, selected, onSelect }) => {
    const borderColorClass = selected ? 'border-green-600' : 'border-sky-500';

    return (
        <div
            className={`flex flex-col text-surface-light border rounded ${borderColorClass} cursor-pointer select-none`} // Added select-none class here
            onClick={onSelect}
        >
            <div className='p-2 text-center'>
                <p className={selected ? 'text-green-600' : ''}>{goalType}</p>
            </div>
        </div>
    )
}

export default GoalCard