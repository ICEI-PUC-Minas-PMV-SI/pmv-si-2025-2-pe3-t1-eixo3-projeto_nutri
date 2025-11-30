'use client'

import Post from "@/components/posts/post";
import { Button } from "@/components/ui/button";
import fabiana from "../../../../public/posts/fabiana.png"
import { PlusIcon, Trash2Icon, ListFilterIcon } from "lucide-react";
import { useState } from "react";
import AddPostModal, { PostModal } from "@/components/posts/addPostModal";


export default function Profile() {
    const [creatingPost, setCreatingPost] = useState(false)

    const posts = [
        {
            user: { name: "Dra. fabiana", img: fabiana },
            date: "29/10/2025",
            tag: "Nutrição",
            img: fabiana,
            title: "Alimentos para melhorar o intestino",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensure."
        },
        {
            user: { name: "Dra. fabiana", img: fabiana },
            date: "29/10/2025",
            tag: "Nutrição",
            title: "Alimentos para melhorar o intestino",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish."
        },
        {
            user: { name: "Dra. fabiana", img: fabiana },
            date: "29/10/2025",
            tag: "Nutrição",
            img: fabiana,
            title: "Alimentos para melhorar o intestino",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensure."
        },
        {
            user: { name: "Dra. fabiana", img: fabiana },
            date: "29/10/2025",
            tag: "Nutrição",
            img: fabiana,
            title: "Alimentos para melhorar o intestino",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensure."
        },
        {
            user: { name: "Dra. fabiana", img: fabiana },
            date: "29/10/2025",
            tag: "Nutrição",
            img: fabiana,
            title: "Alimentos para melhorar o intestino",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensure."
        },
    ]

    const handleCreatePost = () => setCreatingPost(true)

    return <div className="flex w-full px-72 justify-center items-center">
        <div className="h-full w-full py-12 gap-8 flex flex-col justify-center items-center">
            <div className="flex w-full px-6 py-5 justify-start items-center gap-4">
                <PostModal />
                <div className="flex justify-center items-center">
                    <Button variant={"ghost"}>
                        <Trash2Icon />
                        Deletar
                    </Button>
                    <Button variant={"ghost"}>
                        <ListFilterIcon />
                        Filtros
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full p-16 gap-16 bg-[#fafdff]  border rounded-md">
                {
                    posts.map((post, i) => (
                        <Post
                            user={post.user}
                            date={post.date}
                            tag={post.tag}
                            img={post.img}
                            title={post.title}
                            content={post.content}
                            key={i}
                        />
                    ))
                }
            </div>
        </div>

        {/* {
            creatingPost
            ? <AddPostModal />
            : <></>
        } */}
    </div>
}