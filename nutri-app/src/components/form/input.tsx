type InputProps = {
    title: string;
    type: string;
    placeholder?: string;
    isOptional?: boolean;
}

export default function Input({title, placeholder, type, isOptional}:InputProps) {
    const fullTitle: string = isOptional ? title : title.concat(" *") 
    return (
        <div className="w-[30rem] h-8 gap-4 flex flex-col justify-center items-start">
            <p className="text-primary font-semibold text-lg">{fullTitle}</p>
            <input type={type} placeholder={placeholder} className="flex text-sm w-full border-stroke border-[1px] rounded-[4px] px-4 py-2 "></input>
        </div>
    )
}

