import Image from "next/image";

export default function Main() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/mainsection.png"
        alt="Main Section"
        layout="fill"
        objectFit="cover"
        priority
        className="pointer-events-none rounded-b-[80px]"
      />
      <div className="absolute top-0 left-0">
        <Image
          src="/svg1.svg"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none sm:w-[300px]"
        />
      </div>
      <div className="absolute -bottom-1.5 -right-1">
        <Image
          src="/svg2.svg"
          alt=""
          width={180}
          height={180}
          className="pointer-events-none sm:w-[300px]"
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-6/12 text-center">
        <Image
          src="/vert.svg"
          alt="Vertical SVG"
          width={1200}
          height={1200}
          className="pointer-events-none sm:max-w-xl max-w-xs"
        />
        <button className="mt-4 px-6 py-2 border-2 border-[#FFF8E2] text-[#FFF8E2] bg-transparent rounded-md hover:bg-[#FFF8E2] hover:text-black transition duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
}
