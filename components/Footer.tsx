import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#FFE0AD] py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                {/* Logo */}
                <div className="flex items-center justify-center md:justify-start">
                    <Link href="/" aria-label="Home">
                        <Image src="/sheep.svg" alt="Logo" width={70} height={70} />
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
                    <Link href="/press" className="hover:text-gray-800">
                        Press
                    </Link>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center md:justify-end items-center space-x-4">
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        className="text-black hover:text-gray-800"
                    >
                        <FaInstagram size={20} />
                    </Link>
                    <Link
                        href="mailto:info@example.com"
                        aria-label="Email"
                        className="text-black hover:text-gray-800"
                    >
                        <FaEnvelope size={20} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;