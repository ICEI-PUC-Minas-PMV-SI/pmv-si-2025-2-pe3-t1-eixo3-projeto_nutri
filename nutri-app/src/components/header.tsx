
'use client'

import Button from "./form/button"

export default function Header(){
    let onLandingPage = window.location.pathname == "/"

    function handleRedirectLogin(){
        window.location.pathname = "/login"
    }
    function handleRedirectRegister(){
        window.location.pathname = "/register"
    }

    return (
        <div className="flex justify-center items-center w-[100vw] h-20 px-16 bg-contrast-background border border-stroke">
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
                            <Button 
                                text="Entrar"
                                handleClick={handleRedirectLogin}
                                style="ghost"
                                width="md"
                            />
                            <Button 
                                text="Criar Conta"
                                handleClick={handleRedirectRegister}
                                width="md"
                            />
                        </div>
                    )
                }



            </div>
        </div>
    )
}