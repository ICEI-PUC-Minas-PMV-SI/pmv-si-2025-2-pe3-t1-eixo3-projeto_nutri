import clsx from "clsx";

type ButtonProps = {
    text: string;
    handleClick: (e: any) => void
    style?: "primary" | "secondary" | "ghost"
    size?: "lg" | "md" | "sm"
}

export default function Button ({text, style, size, handleClick}: ButtonProps){
    function getButtonColor(){
        switch(style){
            case "secondary": return "bg-gray text-white"
            case "ghost": return "text-primary"
            default: return "bg-primary text-white"
        }
    }
    function getButtonSize(){
        switch(size){
            case "md": return "w-36"
            case "sm": return "w-20 text-lg"
            default: return "w-60"
        }
    }
    return (
        <button 
            className={clsx(
                "text-nowrap h-10 rounded-[0.25rem]",
                getButtonColor(),
                getButtonSize()
            )}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}