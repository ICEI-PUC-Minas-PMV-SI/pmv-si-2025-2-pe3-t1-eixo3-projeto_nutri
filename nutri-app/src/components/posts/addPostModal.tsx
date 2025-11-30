import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, PlusIcon, Save, SquarePlus } from "lucide-react"
import InputField from "../form/inputField"

export const PostModal = () => {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button>
                        <PlusIcon />
                        Novo Post
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[769px]">
                    <DialogHeader>
                        <DialogTitle>Criar Novo Post</DialogTitle>
                        <DialogDescription>
                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </DialogDescription>
                    </DialogHeader>
                   <div className="flex gap-9 items-center">
                    <div className="flex flex-col gap-4">
                    < p className="flex text-primary font-semibold text-lg whitespace-nowrap">Adicione uma capa ao seu post: </p>
                    <div className="flex items-center justify-center w-[268px] border h-[172] rounded-lg">
                <SquarePlus className="text-primary"/>
                    </div>
                    </div>
                    <div className="flex flex-col gap-6 w-full">
                        <InputField title="Título" type="text"  />
                        <InputField title="Categoria" type="text"  />
                    </div>
                   </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit"><Save/> Postar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
