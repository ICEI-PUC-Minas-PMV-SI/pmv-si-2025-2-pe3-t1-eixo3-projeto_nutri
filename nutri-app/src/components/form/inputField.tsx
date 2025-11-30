import { clsx } from 'clsx';
import { Input } from '../ui/input';

type InputProps = {
    title: string;
    type: string;
    placeholder?: string;
    isOptional?: boolean;
    size?: "md" | "lg"
}

export default function InputField({title, placeholder, type, isOptional, size}:InputProps) {
    const fullTitle: string = isOptional ? title : title.concat(" *") 
    return (
        <div className={clsx(
            "gap-2 flex flex-col justify-center items-start w-full"
        )}>
            <p className="flex text-primary font-semibold text-lg">{fullTitle}</p>
            <Input type={type} placeholder={placeholder} className="flex text-sm w-full border-stroke border-[1px] rounded-[0.25rem] px-4 py-2" />
        </div>
    )
}

