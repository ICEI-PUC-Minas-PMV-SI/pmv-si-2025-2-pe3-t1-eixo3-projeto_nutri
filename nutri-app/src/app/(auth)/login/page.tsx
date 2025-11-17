'use client'

import AuthFormCard from "@/components/form/AuthFormCard";
import Button from "@/components/form/button";
import Input from "@/components/form/input";

function handleLogin(e: any) {
window.location.pathname = "/main"
}

export default function Login() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full">
      <h1 className="flex justify-center items-center text-primary font-bold text-[2rem]">
        Login
      </h1>
      <AuthFormCard>
        <div className="flex flex-col h-full w-full gap-10">

          <div className="flex flex-col justify-start items-center w-full  gap-8">
              <Input
                  title="Email" 
                  type="email" 
                  placeholder="email@gmail.com" 
              />
              <Input
                  title="Senha" 
                  type="password" 
                  placeholder="**************" 
              />
          </div>
          <div className="flex justify-center items-center w-full">
            <Button text="Login" handleClick={handleLogin}></Button>
          </div>
        </div>

      </AuthFormCard>
    </div>
  );
}