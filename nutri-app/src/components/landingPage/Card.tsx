import Image, { StaticImageData } from "next/image"

type CardProps = {
    title: string;
    content: string;
    icon: StaticImageData;
    iconDescription: string;
}

export default function Card({content, icon, iconDescription, title}: CardProps){
    return (
        <div className="flex flex-col justify-center items-center w-80 h-80 shadow-md px-8 py-6 gap-4">
            <Image src={icon} alt={iconDescription} />
            <h3 className="text-center font-semibold text-2xl">
              {title}
            </h3>
            <p className="text-center">
              {content}
            </p>
        </div>
    )
}