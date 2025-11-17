import clsx from "clsx";
import { useState } from "react";

type SelectProps = {
    title: string;
    options: {value: string, label?: string}[]
    isOptional?: boolean;
    size?: "md" | "lg"
}


export default function Select({title, options, size, isOptional}:SelectProps) {
    
    const [selectedValue, setSelectedValue] = useState()
    
    const handleChange = (e: any) => {
        setSelectedValue(e.target.value);
    };

    const fullTitle: string = isOptional ? title : title.concat(" *") 
    return (
        <div className={clsx(
            "gap-2 flex flex-col justify-center items-start",
            size == 'md' ? "w-[15rem]" : "w-[30rem]"
        )}>
            <p className="flex text-primary font-semibold text-lg">{fullTitle}</p>
            <select 
                className="flex text-sm w-full border-stroke border-[1px] rounded-[0.25rem] px-4 py-2 " 
                value={selectedValue}
                onChange={handleChange}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label ?? option.value}
                    </option>
                ))}
            </select>
        </div>
    )
}
