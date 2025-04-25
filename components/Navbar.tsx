import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
    showOrderButton: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showOrderButton = true }) => {
    return (
        <nav className="fixed top-0 w-full grid grid-cols-3 items-center px-4 py-2 bg-[#FFF8E2] z-50">
            <div className="flex justify-start">
            </div>

            {/* Centered Title - Center */}
            <div className="flex justify-center">
                <Link href="/">
                    <Image src="/horiz.svg" alt="Logo" width={250} height={32} className='max-w-[200px]' />
                </Link>
            </div>

            {/* Order Button - Right */}
            <div className="flex justify-end">
                <Link href="/order">
                    <button className="px-3 py-2 text-white bg-black rounded hover:bg-gray-800 focus:outline-none">
                        Order
                    </button>
                </Link>
                {showOrderButton && <div></div>}
            </div>
        </nav>
    );
};

export default Navbar;
