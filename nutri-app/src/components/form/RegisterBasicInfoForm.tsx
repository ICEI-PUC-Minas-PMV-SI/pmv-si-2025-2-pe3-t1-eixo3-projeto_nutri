import Button from "./button";
import Input from "./input";
import Select from "./select";

type RegisterBasicInfoFormProps = {
    handleNext: (e:any) => void
}

export default function RegisterBasicInfoForm({handleNext}: RegisterBasicInfoFormProps){
    const userProfiles = [
        {value: "Nutricionista"},
        {value: "Usuário"},
    ]

    return (
        <div className="flex flex-col h-full w-full gap-10">
    
                <div className="flex flex-col justify-start items-center w-full  gap-8">
                    <Input
                        title="Nome" 
                        type="text" 
                        placeholder="Nome Completo" 
                    />
                    <Input
                        title="Email" 
                        type="email" 
                        placeholder="email@gmail.com" 
                    />
                    <Select
                        title="Tipo de perfil"
                        options={userProfiles}
                    />
                    <Input
                        title="Senha" 
                        type="password" 
                        placeholder="**************" 
                    />
                    <Input
                        title="Confirme a senha" 
                        type="password" 
                        placeholder="**************" 
                    />
                </div>
                <div className="flex justify-end items-center w-full">
                    <Button text="Avançar" handleClick={handleNext}></Button>
                </div>
            </div>
    )
}