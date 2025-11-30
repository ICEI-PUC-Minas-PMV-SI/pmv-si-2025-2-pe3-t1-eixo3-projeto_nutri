import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import InputField from "./inputField";

type RegisterBasicInfoFormProps = {
    handleNext: (e:any) => void
}

export default function RegisterBasicInfoForm({handleNext}: RegisterBasicInfoFormProps){
    const userProfiles = [
        {value: "Nutricionista"},
        {value: "Usuário"},
        {value: "Personal"},
        {value: "Convidado"},
    ]

    return (
        <div className="flex flex-col h-full w-full gap-10">
    
                <div className="flex flex-col justify-start items-center w-full  gap-8">
                    <InputField
                        title="Nome" 
                        type="text" 
                        placeholder="Nome Completo" 
                    />
                    <InputField
                        title="Email" 
                        type="email" 
                        placeholder="email@gmail.com" 
                    />
                    <div className="flex flex-col gap-2 justify-center items-start w-[30rem]">
                        <Label className="flex self-start">Tipo de Usuario *</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Usuário" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {userProfiles.map((option) => (
                                        <SelectItem value={option.value}>{option.value}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <InputField
                        title="Senha" 
                        type="password" 
                        placeholder="**************" 
                    />
                    <InputField
                        title="Confirme a senha" 
                        type="password" 
                        placeholder="**************" 
                    />
                </div>
                <div className="flex justify-end items-center w-full">
                    <Button onClick={handleNext}>Avançar</Button>
                </div>
            </div>
    )
}