import React from 'react'

const ActivityCard = ({ activityLevel, activityText, selected, onSelect }) => {
  const borderColorClass = selected ? 'border-green-600' : 'border-sky-500';

  return (
    <div
      className={`flex flex-col text-surface-light border rounded ${borderColorClass} cursor-pointer select-none`}
      onClick={onSelect}
    >
      <div className='p-2'>
        <p className={selected ? 'text-green-600' : ''}>{activityLevel}</p>
        <p>{activityText}</p>
      </div>
    </div>
  )
}


export default ActivityCard;
