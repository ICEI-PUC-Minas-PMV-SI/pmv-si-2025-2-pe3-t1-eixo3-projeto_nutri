'use client'

import Button from "@/components/form/button";
import Image from "next/image";
import bannerImage from "../../public/landingPage/banner.png"
import communityIcon from "../../public/landingPage/communityIcon.png"
import handsUnitedIcon2 from "../../public/landingPage/handsUnitedIcon2.png"
import handsUnitedIcon from "../../public/landingPage/handsUnitedIcon.png"
import usersIcon from "../../public/landingPage/usersIcon.png"
import personUsingLaptop from "../../public/landingPage/personUsingLaptop.png"
import Card from "@/components/landingPage/Card";
import MetricCard from "@/components/landingPage/MetricCard";

export default function Home() {
  function handleRedirectRegister(){
    window.location.pathname = "/register"
  }
  function handleRedirectLogin(){
    window.location.pathname = "/login"
  }
  return (
    <div className="flex flex-col w-full h-full">

      <section className="flex justify-center items-center w-full h-[40rem] bg-contrast-background px-72 py-24">
        <div className="flex justify-between items-center gap-28">
          <div className="flex flex-col justify-center items-start my-20 gap-8">

            <div className="flex flex-col justify-center items-start gap-4 ">
              <h1 className="text-5xl font-semibold leading-normal">
                <span className="text-primary">Sua jornada alimentar</span>, de quem entende você.
              </h1>
              <p>
                Use o app para seguir as orientações do seu nutricionista de forma prática.
              </p>
            </div>

            <Button
              text="Comece já"
              width="md"
              height="lg"
              handleClick={handleRedirectRegister}
            />
          </div>
          <Image src={bannerImage} alt="Happy woman eating healthy food" width={320} height={428}></Image>
        </div>
      </section>
      
      <section className="flex flex-col justify-center items-center px-60 py-20 gap-8">
        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-4xl font-semibold text-center max-w-[60rem] leading-snug">
            Mais que um gerenciador de refeições, uma experiência de bem-estar.
          </h2>
          <p>
            Para que serve o Nutri?
          </p>
        </div>

        <div className=" flex justify-around items-center w-full">
          <Card
            title="Fórum da comunidade"
            content="Acompanhe posts de profissionais de nutrição e personais cadastrados na plataforma sobre os mais variados temas voltados a saúde."
            icon={communityIcon}
            iconDescription="Community icon"
          />
          <Card
            title="Crescimento constante"
            content="Com o aplicativo você vai conseguir monitorar seus hábitos, progredindo e se tornando  1% melhor a cada dia."
            icon={handsUnitedIcon2}
            iconDescription="Hands united icon"
          />
          <Card
            title="Fórum da comunidade"
            content="Acompanhe posts de profissionais de nutrição e personais cadastrados na plataforma sobre os mais variados temas voltados a saúde."
            icon={communityIcon}
            iconDescription="Community icon"
          />
        </div>
      </section>

      <section className="flex justify-center items-center w-full h-64 bg-contrast-background py-16 px-72">
        <div className="flex justify-between items-center w-full h-full">
          <div className="flex flex-col gap-2 justify-center items-start max-w-[35rem] text-justify">
            <h2 className="text-4xl font-semibold leading-snug">
              Transformando experiências em <span className="text-primary">qualidade de vida</span>
            </h2>
            <p>Chegamos até aqui com muito esforço e dedicação, contamos com você!</p>
          </div>

          <div className="flex justify-between items-center gap-40">
            <MetricCard
              metric="Usuários" 
              value="570" 
              icon={usersIcon} 
              iconDescription="Users icon" 
            />
            <MetricCard
              metric="Posts no fórum" 
              value="3420" 
              icon={handsUnitedIcon} 
              iconDescription="Hands united icon" 
            />
          </div>
        </div>
      </section>


      <section className="flex justify-center items-center w-full py-12 px-72">
        <div className="flex justify-center items-center  px-[4.5rem] gap-60">
          <Image src={personUsingLaptop} alt="Person using a laptop" />
          <div className="flex flex-col justify-center items-start gap-8">
            <div className="flex flex-col justify-center items-start gap-4">
              <h2 className="font-semibold text-4xl">
                Tenha seus hábitos alimentares centralizados!
              </h2>
              <p className="text-justify">
                Acompanhe tudo o que você come em um só lugar — de forma simples e visual. Registre suas refeições, monitore suas metas e entenda seus padrões alimentares com clareza. Nosso app ajuda você a transformar dados em consciência, tornando o cuidado com a alimentação parte natural da sua rotina.
              </p>
            </div>
            <Button
              text="comece sua jornada"
              height="lg"
              handleClick={handleRedirectRegister}
            />
          </div>
        </div>
      </section>
      
    </div>
  );
}
