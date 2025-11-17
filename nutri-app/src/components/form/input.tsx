import { clsx } from 'clsx';

type InputProps = {
    title: string;
    type: string;
    placeholder?: string;
    isOptional?: boolean;
    size?: "md" | "lg"
}

export default function Input({title, placeholder, type, isOptional, size}:InputProps) {
    const fullTitle: string = isOptional ? title : title.concat(" *") 
    return (
        <div className={clsx(
            "gap-2 flex flex-col justify-center items-start",
            size == 'md' ? "w-[15rem]" : "w-[30rem]"
        )}>
            <p className="flex text-primary font-semibold text-lg">{fullTitle}</p>
            <input type={type} placeholder={placeholder} className="flex text-sm w-full border-stroke border-[1px] rounded-[0.25rem] px-4 py-2 "></input>
        </div>
    )
}

