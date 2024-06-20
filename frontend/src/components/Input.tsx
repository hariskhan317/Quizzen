import React from 'react'

interface inputProps {
    label: string;
    value: string;
    name: string;
    type: string;
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const input: React.FC<inputProps> = ({label, value, type, name, className, onChange}) => {
  return (
    <div> 
        <input 
            type={type}
            value={value}
            name={name}
            placeholder={label} 
            onChange={onChange}
            className={className}
        />  
    </div>
  )
}

export default input
