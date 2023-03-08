import Image from "next/image";

const LogoComponent = () => {
  return (
    <div className="flex flex-row items-center ">
      <Image className="animate-pulse" src="./logo.svg" width={50} height={50} alt="logo" />
      <h1 className="text-2xl font-base">Brandhive</h1>
    </div>
  );
};

export default LogoComponent;
