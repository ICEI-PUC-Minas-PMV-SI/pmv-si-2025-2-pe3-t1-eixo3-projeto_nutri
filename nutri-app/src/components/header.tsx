
'use client'

import Link from "next/link"

import { usePathname } from "next/navigation"
import { Button } from "./ui/button"

export default function Header(){
    const onLandingPage = usePathname() == "/"

    return (
        <div className="flex justify-center items-center w-full min-h-20 px-16 bg-contrast-background border border-stroke">
            <div className="flex justify-between items-center w-full h-10 px-6">

                { !onLandingPage ? (
                        <div className="flex justify-center items-center gap-6">
                            <div className="w-10 aspect-square bg-primary rounded-lg">
                            </div>
                            <h1 className="text-lg text-primary font-bold">
                                Nutri
                            </h1>
                        </div>
                    ) : (
                        <div className="flex w-full justify-end items-center gap-4">
                            <Link href={"/login"}>
                                <Button
                                    variant={"ghost"}
                                >Entrar</Button>
                            </Link>
                            <Link href={"/register"}>
                                <Button 
                                >Criar Conta</Button>
                            </Link>
                        </div>
                    )
                }

            </div>
        </div>
    )
}