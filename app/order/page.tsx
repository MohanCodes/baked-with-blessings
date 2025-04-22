import Navbar from '@/components/Navbar';
import React from 'react';
import { FaTruck, FaStore } from 'react-icons/fa';

const OrderPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#FFF8E2]">
            <Navbar showOrderButton={false} />

            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-8">
                <h3 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    Start an Order
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* Delivery Option */}
                    <div className="hover:bg-[#FFC567] bg-[#FFE0AD] rounded-lg shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-all duration-300">
                        <FaTruck className="text-6xl text-black mb-4" />
                        <h3 className="text-2xl font-bold">Delivery</h3>
                    </div>

                    {/* Pickup Option */}
                    <div className="hover:bg-[#FFC567] bg-[#FFE0AD] rounded-lg shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-all duration-300">
                        <FaStore className="text-6xl text-black mb-4" />
                        <h3 className="text-2xl font-bold">Pickup</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
