'use client'

import AuthFormCard from "@/components/form/AuthFormCard";
import RegisterAdditionalInfoForm from "@/components/form/RegisterAdditionalInfoForm";
import RegisterBasicInfoForm from "@/components/form/RegisterBasicInfoForm";
import { useState } from "react";

export default function Register()  {

    const [isFirststep, setIsFirstStep] = useState(true)

    function handleRegister(){
        window.location.pathname = "/main"
    }

    return (
            <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
            <h1 className="flex justify-center items-center text-primary font-bold text-[2rem]">
                {isFirststep? "Cadastro do Usuário" : "Nos fale sobre você"}
            </h1>
            <AuthFormCard>
            
                {isFirststep ? (
                    <RegisterBasicInfoForm handleNext={() => setIsFirstStep(false)}/>
                ) : (
                    <RegisterAdditionalInfoForm handleReturn={() => setIsFirstStep(true)} handleRegister={handleRegister}/>
                )}
    
            </AuthFormCard>
        </div>
    )
}