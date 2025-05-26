"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaShoppingCart } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { useCart, getItemPrice } from './ShoppingCart';

interface NavbarProps {
    showOrderButton?: boolean;
    homeButton?: boolean;
}

export default function Navbar({ showOrderButton = true, homeButton = false }: NavbarProps) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { state } = useCart();

    const handleOrderNow = (): void => {
        const isAtHome = (): boolean => {
            const currentPath = window.location.pathname;
            return currentPath === '/';
        };
    
        const scrollToFlavors = (): void => {
            const flavorsSection = document.getElementById("flavors-of-the-month") as HTMLElement | null;
            if (flavorsSection) {
                flavorsSection.scrollIntoView({ 
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                console.warn("Flavors section not found");
            }
        };
    
        if (isAtHome()) {
            scrollToFlavors();
        } else {
            // Navigate to home with hash fragment
            window.location.href = `${window.location.origin}/#flavors-of-the-month`;
        }
    };
    
    
    const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <>
            <nav className="fixed top-0 w-full grid grid-cols-3 items-center px-4 py-2 bg-[#FFF8E2] z-40">
                <div className="flex justify-start">
                    {homeButton && (
                        <button
                            className="relative p-2 hover:bg-white/50 rounded-full transition"
                            onClick={() => window.location.href = '/'}
                        >
                            <FaHome className="w-6 h-6" />
                        </button>
                    )}
                </div>

                {/* Centered Title - Center */}
                <div className="flex justify-center">
                    <Link href="/">
                        <Image src="/logo/horiz.svg" alt="Logo" width={250} height={32} className='max-w-[250px]' />
                    </Link>
                </div>

                {/* Right section with Order button and Cart */}
                <div className="flex justify-end items-center space-x-4">
                    {showOrderButton && (
                        <Link href="/order">
                            <button className="px-3 py-2 text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none">
                                Order
                            </button>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-white/50 rounded-full transition"
                        aria-label="Shopping cart"
                    >
                        <FaShoppingCart className="w-6 h-6" />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </nav>

            {/* Slide-out Cart */}
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                    isCartOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{ maxHeight: '100vh' }}
            >
                <div className="h-full flex flex-col">
                    <div className="p-4 border-b flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Your Cart</h3>
                        <button
                            onClick={() => setIsCartOpen(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <IoMdClose className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        {state.items.length === 0 ? (
                            <div className="text-center text-gray-500 mt-8">
                                <p>Your cart is empty!</p>
                                <button
                                    className="text-black underline mt-1 inline-block"
                                    onClick={() => {
                                        handleOrderNow();
                                        setIsCartOpen(false);
                                      }}
                                >
                                    Browse our cookies
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {state.items.map((item) => (
                                    <div key={item.id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
                                        <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                                            <p className="text-sm font-medium mt-1">${getItemPrice(item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {state.items.length > 0 && (
                        <div className="border-t p-4 bg-gray-50">
                            <div className="flex justify-between text-lg font-semibold mb-4">
                                <span>Total:</span>
                                <span>${state.total.toFixed(2)}</span>
                            </div>
                            <Link
                                href="/order"
                                className="block w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition"
                                onClick={() => setIsCartOpen(false)}
                            >
                                Checkout
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay */}
            {isCartOpen && (
                <div
                    className="fixed inset-0 z-45"
                    onClick={() => setIsCartOpen(false)}
                />
            )}
        </>
    );
}
