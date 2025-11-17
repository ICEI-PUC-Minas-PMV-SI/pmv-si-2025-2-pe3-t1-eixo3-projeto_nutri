import clsx from "clsx";

type ButtonProps = {
    text: string;
    handleClick: (e: any) => void
    style?: "primary" | "secondary" | "ghost"
    width?: "lg" | "md" | "sm"
    height?: "lg" | "md"
}

export default function Button ({text, style, width, height, handleClick}: ButtonProps){
    function getButtonColor(){
        switch(style){
            case "secondary": return "bg-gray text-white"
            case "ghost": return "text-primary"
            default: return "bg-primary text-white"
        }
    }
    function getButtonWidth(){
        switch(width){
            case "md": return "w-36"
            case "sm": return "w-20 text-lg"
            default: return "w-60"
        }
    }
    function getButtonHeight(){
        switch(height){
            case "lg": return "h-[3.25rem]"
            default: return "h-10"
        }
    }
    return (
        <button 
            className={clsx(
                "text-nowrap rounded-[0.25rem]",
                getButtonColor(),
                getButtonWidth(),
                getButtonHeight()
            )}
            onClick={handleClick}
        >
            {text}
        </button>
    )
}