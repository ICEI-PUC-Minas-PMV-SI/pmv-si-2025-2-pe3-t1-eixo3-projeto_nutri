import Image from "next/image";
import { Card } from "../ui/card";
import clsx from "clsx";

type PostProps = {
    user: {name:string, img:any},
    tag: string,
    date: string,
    title: string,
    content: string,
    img:any
}

export default function Post({user, tag, date, title, content, img}:PostProps){
    return (
        <Card className="w-full flex flex-col justify-center items-center gap-5 p-10">
            <div className="w-full flex justify-between items-center px-3">
                <div className="flex justify-center items-center gap-4">
                    <Image className="w-8 aspect-square bg-primary" src={user.img} alt="User profile" />
                    <h2>{user.name}</h2>
                </div>
                <div className="flex justify-center items-center gap-4 text-sm">
                    <div className="bg-[#dff0dd] text-primary rounded-lg w-28 flex justify-center items-center">
                        {tag}
                    </div>
                    <div className="bg-[#dff0dd] text-primary rounded-lg w-28 flex justify-center items-center">
                        {date}
                    </div>
                </div>
            </div>

            <div className="flex w-full justify-between items-start gap-12">
                <div className="flex flex-col gap-4">
                    <h2>
                        {title}
                    </h2>
                    <p className={clsx(
                            "text-justify",
                            img ? "max-w-[32rem]" : ""
                    )}>
                        {content}
                    </p>
                </div>
                {img ? <Image className="w-[17rem] h-40 aspect-square bg-primary" src={img} alt="Post image" /> : <></>}
            </div>
        </Card>
    )
}