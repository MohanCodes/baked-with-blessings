import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8E2] flex flex-col">
      <Navbar homeButton={true} showOrderButton={false} />
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 pb-16">
        <div className="max-w-md w-full">
          <Image
            src="/logo/sheep.svg"
            alt="Lost sheep"
            width={180}
            height={140}
            className="animate-bounce group-hover:animate-[bounce_0.3s_ease-in-out_infinite] transform group-hover:scale-105 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg mt-2 mx-auto mb-6"
            priority
          />
          <h1 className="text-4xl font-bold mb-2 text-black">This sheep is lost...</h1>
          <p className="text-lg text-gray-700 mb-6">404 – Page Not Found</p>
          <blockquote className="italic text-[#b38f00] mb-8 border-l-4 border-[#ffe58f] pl-4">
            "Rejoice with me; I have found my lost sheep."<br />
            <span className="text-sm text-gray-500">– Luke 15:6</span>
          </blockquote>
          <Link href="/">
            <button className="px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition font-semibold">
              Return Home
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
} 