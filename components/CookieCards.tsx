import Image from 'next/image';
import React from 'react';

export default function CookieCard() {
    return (
        <div className="bg-[#FFF8E2] rounded-lg p-8 md:m-16 flex flex-col items-center">
            <h2 className="text-5xl md:text-7xl italic mb-4 text-center">Flavors of the Month</h2>
            <p className="text-center text-lg mb-18">
                Here is our curated selection of cookies for the month of April!
            </p>
            <div className='space-y-12'>
                <div className="hover:scale-105 hover:shadow-lg transition-transform duration-300 bg-[#FFE0AD] w-full max-w-5xl flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md">
                    <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0 rotate-6 transition-transform duration-300">
                        <Image
                            src="/cookie.png"
                            alt="A delicious seasonal cookie"
                            width={220}
                            height={220}
                            className="scale-125 md:scale-175 md:my-2 -mt-12"
                            priority
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center md:pl-8 text-center md:text-left ml-6">
                        <h2 className="text-5xl md:text-6xl italic mb-4">Cookie Name</h2>
                        <p className="text-xl mb-6">
                            This is a description of the cookie. It is delicious and perfect for the season!
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition">
                                More Info
                            </button>
                            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                                Order
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hover:scale-105 hover:shadow-lg transition-transform duration-300 bg-[#FFC567] w-full max-w-5xl flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md">
                    <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0 order-1 md:order-2 hover:rotate-6 rotate-0 transition-transform duration-300">
                        <Image
                            src="/cookie2.png"
                            alt="A delicious seasonal cookie"
                            width={220}
                            height={220}
                            className="scale-125 md:scale-175 md:my-2 -mt-12"
                            priority
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center md:pl-8 text-center md:text-left mr-6 order-2 md:order-1">
                        <h2 className="text-5xl md:text-6xl italic mb-4">Cookie Name</h2>
                        <p className="text-xl mb-6">
                            This is a description of the cookie. It is delicious and perfect for the season!
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition">
                                More Info
                            </button>
                            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                                Order
                            </button>
                        </div>
                    </div>
                </div>
                <div className="hover:scale-105 hover:shadow-lg transition-transform duration-300 bg-[#FFE0AD] w-full max-w-5xl flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md">
                    <div className="w-full md:w-1/3 flex justify-center mb-6 md:mb-0 hover:rotate-6 rotate-0 transition-transform duration-300">
                        <Image
                            src="/cookie.png"
                            alt="A delicious seasonal cookie"
                            width={220}
                            height={220}
                            className="scale-125 md:scale-175 md:my-2 -mt-12"
                            priority
                        />
                    </div>
                    <div className="flex-1 flex flex-col justify-center md:pl-8 text-center md:text-left ml-6">
                        <h2 className="text-5xl md:text-6xl italic mb-4">Cookie Name</h2>
                        <p className="text-xl mb-6">
                            This is a description of the cookie. It is delicious and perfect for the season!
                        </p>
                        <div className="flex justify-center md:justify-start space-x-4">
                            <button className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition">
                                More Info
                            </button>
                            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
                                Order
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button className="px-6 py-2 border-2 border-black text-black bg-transparent rounded-md hover:text-[#FFF8E2] hover:bg-black transition duration-300">
                        See All Cookies
                    </button>
                </div>
            </div>
        </div>
    );
}
