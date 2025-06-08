import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#FFE0AD] py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Logo */}
                <div className="flex items-center justify-center md:justify-start">
                    <Link href="/" aria-label="Home" className="group">
                        <Image 
                            src="/logo/sheep.svg" 
                            alt="Logo" 
                            width={70} 
                            height={70}
                            className="animate-bounce group-hover:animate-[bounce_0.3s_ease-in-out_infinite] transform group-hover:scale-105 transition-all duration-300 drop-shadow-md group-hover:drop-shadow-lg mt-2"
                        />
                    </Link>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-8 text-black text-center">
                    <Link href="/terms" className="hover:text-gray-800">
                        Terms
                    </Link>
                    <Link href="/privacy-policy" className="hover:text-gray-800">
                        Privacy Policy
                    </Link>
                    <Link href="/trust-and-safety" className="hover:text-gray-800">
                        Trust and Safety
                    </Link>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center md:justify-end items-center space-x-6">
                    <Link
                        href="https://www.instagram.com/_bakedwithblessings/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-black hover:text-gray-800"
                    >
                        <FaInstagram className="w-6 h-6" />
                    </Link>
                    <Link
                        href="mailto:bakedwithblessings@gmail.com"
                        aria-label="Email"
                        className="text-black hover:text-gray-800"
                    >
                        <FaEnvelope className="w-6 h-6" />
                    </Link>
                </div>
            </div>
            {/* Made with heart by Mohan */}
            <div className=" flex items-center justify-center text-black text-sm sm:mt-0 mt-6">
                Made with
                <FaHeart className="mx-1 text-red-500" aria-label="love" />
                by Mohan
            </div>
        </footer>
    );
};

export default Footer;