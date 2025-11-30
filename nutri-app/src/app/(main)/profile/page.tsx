import InputField from "@/components/form/inputField";
import { UserInfo } from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Profile() {

    const userGender = [
        { value: "male", label: "Homem" },
        { value: "female", label: "Mulher" }
    ]

    return (
        <div className="flex flex-col jusify-start w-full h-full items-center py-12 justify-between max-w-[909px] self-center">
            <div className="flex flex-col gap-8 w-full">
            <UserInfo />

            <div className="flex gap-8 w-full items-center">
                <p className="text-xl font-semibold text-primary whitespace-nowrap">
                    Dados Atuais
                </p>
                <span className="h-0.5 w-1/2 bg-zinc-600"></span>
            </div>
            <div className="flex gap-12 w-full">
                <InputField title="Peso" type="text" placeholder="67Kg" />
                <InputField title="Altura" type="number" placeholder="183cm" />
                <div className="flex flex-col gap-2 justify-center items-start whitespace-nowrap w-full ">
                    <Label className="flex self-start">Genero *</Label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Genero" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {userGender.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <InputField title="Idade" type="number" placeholder="12" />
            </div>
            <div className="flex gap-8 w-full items-center">
                <p className="text-xl font-semibold text-primary whitespace-nowrap">
                    Seus Objetivos
                </p>
                <span className="h-0.5 w-1/2 bg-zinc-600"></span>
            </div>
            <div className="flex gap-12 w-full">
                <InputField title="Peso Ideal" type="text" placeholder="74kg" />
                <InputField title="Consumo de Água Diário" type="number" placeholder="2,5l" />
                <InputField title="Calorias" type="number" placeholder="2349" />
            </div>
            </div>
            <div className="flex gap-4 justify-end w-full">

            <Button variant={"destructive"}>Excluir Conta</Button>
            <Button variant={"ghost"}>Descartar Alterações</Button>
            <Button variant={"default"}>Salvar</Button>
            </div>
        </div>
    )
}