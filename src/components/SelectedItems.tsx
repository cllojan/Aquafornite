import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react"

interface Option{
    id:string|number
    label:string
    icon?:React.ReactNode
}

interface CustomSelectProps{
    options:Option[]
    value?:Option
    onChange:(option:Option)=>void
}


export default function SelectedItems({options, value, onChange}:CustomSelectProps) {
    const [selected, setSelected] = useState(options[0]);
    
    const handleSelect = (option: Option) =>{
        setSelected(option)
        if(onChange) onChange(option)
    }

    return (
        <div className="dropdown bg-transparent">
            <div tabIndex={0} role="button" className="btn m-1 bg-transparent border-none text-white">{selected.icon} {selected.label}</div>
            <ul tabIndex={0} className="absolute menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {
                    options.map(option =>
                        <li key={option.id} onClick={() => handleSelect(option)}>
                            <span>{option.icon} {option.label}</span>                                                        
                        </li>
                    )
                }
            </ul>
        </div>
    )
}