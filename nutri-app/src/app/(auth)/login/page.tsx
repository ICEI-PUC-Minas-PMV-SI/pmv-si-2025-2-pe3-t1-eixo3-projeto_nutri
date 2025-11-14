import AuthFormCard from "@/components/form/AuthFormCard";
import Input from "@/components/form/input";

export default function Login({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthFormCard>
        <div className="flex-col">
            <Input
                title="Email" 
                type="email" 
                placeholder="email@gmail.com" 
            />
            <Input
                title="Email" 
                type="email" 
                placeholder="email@gmail.com" 
            />
            {/* <div className="w-[30rem] h-8 gap-4 flex flex-col justify-center items-start bg-">
                <p className="text-primary font-semibold text-lg">Email *</p>
                <input type="email" placeholder="email@gmail.com" className="flex text-sm w-full border-stroke border-[1px] rounded-[4px] px-4 py-2 "></input>
            </div> */}
        </div>
    </AuthFormCard>
  );
}