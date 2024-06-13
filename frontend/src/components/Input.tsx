import React from 'react'

interface inputProps {
    label: string;
    value: string;
    name: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const input: React.FC<inputProps> = ({label, value, type, name, onChange}) => {
  return (
    <div>
        <label htmlFor="">{label}</label>
        <input 
            type={type}
            value={value}
            name={name}
            placeholder={label} 
            onChange={onChange}
            className='mt-2 text-black border-2 w-full p-1'
        />  
    </div>
  )
}

export default input
