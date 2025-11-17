import Image, { StaticImageData } from "next/image"

type MetricCardProps = {
    value: string
    metric: string
    icon: StaticImageData
    iconDescription: string
}

export default function MetricCard({value, metric, icon, iconDescription}: MetricCardProps){
    return (
        <div className="flex gap-4">
            <Image src={icon} alt={iconDescription} />
            <div className="flex flex-col">
                <h3 className="font-semibold text-2xl">{value}</h3>
                <p>{metric}</p>
            </div>
        </div>
    )
}