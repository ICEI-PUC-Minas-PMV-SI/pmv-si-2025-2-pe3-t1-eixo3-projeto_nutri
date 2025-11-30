import { Button } from "../ui/button";
import InputField from "./inputField";

type RegisterAdditionalInfoFormProps = {
    handleReturn: (e:any) => void
    handleRegister: (e:any) => void
}

export default function RegisterAdditionalInfoForm({handleReturn, handleRegister}: RegisterAdditionalInfoFormProps){
    const userProfiles = [
        {value: "Nutricionista"},
        {value: "Usuário"},
    ]

    return (
        <div className="flex flex-col h-full w-full gap-10">
    
                <div className="flex flex-col justify-start items-center w-full gap-8">
                    <div className="flex justify-between items-center w-full gap-16">
                        <p className="text-nowrap text-gray text-xl font-semibold">Dados Atuais</p>
                        <div className="h-[0.125rem] w-full bg-stroke"></div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <div className="flex justify-between items-center gap-16">
                            <InputField
                                title="Peso"
                                size="md"
                                type="text"
                                placeholder="67kg"
                            />
                            <InputField
                                title="Altura"
                                size="md"
                                type="text"
                                placeholder="1,63m"
                            />
                        </div>
                        <div className="flex justify-between items-center gap-16">
                            <InputField
                                title="Genero"
                                size="md"
                                type="text"
                                placeholder="67kg"
                            />
                            <InputField
                                title="Idade"
                                size="md"
                                type="text"
                                placeholder="18 anos"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center w-full gap-8">
                    <div className="flex justify-between items-center w-full gap-16">
                        <p className="text-nowrap text-gray text-xl font-semibold">Seus objetivos</p>
                        <div className="h-[0.125rem] w-full bg-stroke"></div>
                    </div>

                    <div className="w-full flex flex-col justify-center items-center gap-8">
                        <div className="flex justify-between items-center gap-16">
                            <InputField
                                title="Peso ideal"
                                size="md"
                                type="text"
                                placeholder="67kg"
                                isOptional={true}
                            />
                            <InputField
                                title="Consumo de água diário"
                                size="md"
                                type="text"
                                placeholder="2L"
                                isOptional={true}
                            />
                        </div>
                        <div className="flex w-full justify-start items-center gap-16">
                            <InputField
                                title="Calorias"
                                size="md"
                                type="text"
                                placeholder="2 kcal"
                                isOptional={true}
                            />
                        </div>
                    </div>
                </div>


                <div className="flex justify-between items-center w-full">
                    <Button variant="secondary" onClick={handleReturn}>Voltar</Button>
                    <Button onClick={handleRegister}>Cadastrar</Button>
                </div>
            </div>
    )
}