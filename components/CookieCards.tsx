"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaCheck } from 'react-icons/fa';
import { useCart } from './ShoppingCart';

// Define TypeScript interface for cookie data
export interface Cookie {
    id: number;
    name: string;
    shortDescription: string;
    extendedDescription: string;
    image: string;
    gallery: string[];
    backgroundColor: string;
    ingredients: string[];
    allergens: string[];
}

// Cookie data structure with proper typing
const cookiesData: Cookie[] = [
    {
        id: 1,
        name: "Strawberry Matcha",
        shortDescription: "Marbled strawberry and matcha cookie base with white chocolate chips and strawberry icing drizzle",
        extendedDescription: "Experience the perfect fusion of East meets West with our Strawberry Matcha cookie. This visually stunning treat features a beautifully marbled cookie base that combines the earthy, sophisticated flavor of premium matcha with sweet, fruity strawberry. White chocolate chips add richness while a delicate strawberry icing drizzle provides the perfect finishing touch. Each bite offers a unique balance of flavors that's both refreshing and indulgent.",
        image: "/cookies/str_mat.png",
        gallery: ["/cookies/mat-1.jpeg", "/cookies/mat-2.jpeg", "/cookies/mat-3.jpeg"],
        backgroundColor: "#fbc2d1",
        ingredients: [
            "Butter",
            "Sugar",
            "Eggs",
            "Flour",
            "Matcha powder",
            "Freeze dried strawberries",
            "White chocolate chips"
        ],
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: 2,
        name: "Biscoff",
        shortDescription: "Brown butter base with white chocolate, Biscoff cookies, and filled with cookie butter!",
        extendedDescription: "Our signature Biscoff cookie features a rich brown butter base that creates the perfect foundation for this indulgent treat. We fold in premium white chocolate chips and crushed Biscoff cookies for texture, then fill each cookie with creamy cookie butter that melts in your mouth. The combination of caramelized flavors and smooth textures makes this a customer favorite.",
        image: "/cookies/bis.png",
        gallery: ["/cookies/bis-1.jpeg", "/cookies/bis-2.jpeg", "/cookies/bis-3.jpeg"],
        backgroundColor: "#ffe0ad",
        ingredients: [
            "Butter",
            "Sugar",
            "Eggs",
            "Flour",
            "Cookie butter",
            "Biscoff cookies",
            "White chocolate chips",
            "Salt"
        ],
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: 3,
        name: "Blueberry Cheesecake",
        shortDescription: "Blueberry, white chocolate, Graham crackers, filled blueberry cream cheese and topped with a blueberry icing!",
        extendedDescription: "Transport yourself to dessert heaven with our Blueberry Cheesecake cookie. We start with a tender cookie base infused with real blueberries and white chocolate chips, then add crushed graham crackers for that authentic cheesecake crust flavor. Each cookie is filled with a luscious blueberry cream cheese center and finished with a glossy blueberry icing that perfectly balances sweet and tart flavors.",
        image: "/cookies/blu_che.png",
        gallery: ["/cookies/blu-1.jpeg", "/cookies/blu-2.jpeg", "/cookies/blu-3.jpeg"],
        backgroundColor: "#dbe5f7",
        ingredients: [
            "Butter",
            "Sugar",
            "Eggs",
            "Flour",
            "Blueberry preserves",
            "Homemade blueberry purée",
            "White chocolate chips",
            "Graham crackers",
            "Salt",
            "Cream cheese"
        ],
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
];

export default function CookieCard() {
    const [selectedCookie, setSelectedCookie] = useState<Cookie | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const { dispatch } = useCart();
    const [addedId, setAddedId] = useState<number | null>(null);
    const [modalAdded, setModalAdded] = useState(false);

    const openModal = (cookie: Cookie) => {
        setSelectedCookie(cookie);
        setCurrentImageIndex(0);
    };

    const closeModal = () => {
        setSelectedCookie(null);
        setCurrentImageIndex(0);
    };

    const nextImage = () => {
        if (selectedCookie) {
            setCurrentImageIndex((prev) => 
                prev === selectedCookie.gallery.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (selectedCookie) {
            setCurrentImageIndex((prev) => 
                prev === 0 ? selectedCookie.gallery.length - 1 : prev - 1
            );
        }
    };

    const addToCart = (cookie: Cookie) => {
        dispatch({ type: 'ADD_ITEM', payload: cookie });
        setAddedId(cookie.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    const addToCartModal = (cookie: Cookie) => {
        dispatch({ type: 'ADD_ITEM', payload: cookie });
        setModalAdded(true);
        setTimeout(() => setModalAdded(false), 2000);
    };

    return (
        <>
            <div id="flavors-of-the-month" className="bg-[#FFF8E2] rounded-lg p-8 md:m-8 flex flex-col items-center">
                <h2 className="text-5xl md:text-7xl italic mb-4 text-center">Flavors of the Month</h2>
                <p className="text-center text-lg mb-18">
                    Here is our curated selection of cookies for the month of May!
                </p>
                <div className='space-y-12'>
                    {cookiesData.map((cookie: Cookie, index: number) => (
                        <div key={cookie.id} className={`hover:scale-105 hover:shadow-lg transition-transform duration-300 w-full max-w-5xl flex flex-col md:flex-row items-center p-6 rounded-lg shadow-md`} style={{backgroundColor: cookie.backgroundColor}}>
                            <div className={`w-full md:w-1/3 flex justify-center mb-6 md:mb-0 hover:rotate-6 rotate-0 transition-transform duration-300 ${index === 1 ? 'order-1 md:order-2' : ''}`}>
                                <Image
                                    src={cookie.image}
                                    alt={`${cookie.name} cookie`}
                                    width={180}
                                    height={180}
                                    className="scale-125 md:scale-175 md:my-2 -mt-12"
                                    priority
                                />
                            </div>
                            <div className={`flex-1 flex flex-col justify-center md:pl-8 text-center md:text-left ${index === 1 ? 'md:mr-6 order-2 md:order-1' : 'md:ml-6'}`}>
                                <h2 className="text-5xl md:text-6xl italic mb-4">{cookie.name}</h2>
                                <p className="text-xl mb-6">
                                    {cookie.shortDescription}
                                </p>
                                <div className="flex justify-center md:justify-start space-x-4">
                                    <button 
                                        onClick={() => openModal(cookie)}
                                        className="px-6 py-2 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition"
                                    >
                                        More Info
                                    </button>
                                    <button 
                                        onClick={() => addToCart(cookie)}
                                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center min-w-[120px]"
                                        disabled={addedId === cookie.id}
                                    >
                                        {addedId === cookie.id ? (
                                            <><FaCheck className="mr-2" /> Added</>
                                        ) : (
                                            'Add to Cart'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedCookie && (
                <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex flex-col lg:flex-row">
                            {/* Left Half - Image Gallery */}
                            <div className="lg:w-1/2 p-6">
                                <div className="relative">
                                    <Image
                                        src={selectedCookie.gallery[currentImageIndex]}
                                        alt={`${selectedCookie.name} - Image ${currentImageIndex + 1}`}
                                        width={400}
                                        height={400}
                                        className="w-full h-auto rounded-lg"
                                    />
                                    
                                    {/* Navigation Arrows */}
                                    {selectedCookie.gallery.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                                            >
                                                <FaAngleLeft />
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
                                            >
                                                <FaAngleRight />
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                {/* Image Indicators */}
                                {selectedCookie.gallery.length > 1 && (
                                    <div className="flex justify-center mt-4 space-x-2">
                                        {selectedCookie.gallery.map((_: string, index: number) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`w-3 h-3 rounded-full transition ${
                                                    index === currentImageIndex ? 'bg-black' : 'bg-gray-300'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Right Half - Cookie Details */}
                            <div className="lg:w-1/2 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-5xl md:text-6xl italic">{selectedCookie.name}</h2>
                                </div>
                                
                                <p className="text-lg mb-6 leading-relaxed">
                                    {selectedCookie.extendedDescription}
                                </p>

                                {/* Ingredients */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCookie.ingredients.map((ingredient: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Allergens */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3">Allergens</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCookie.allergens.map((allergen: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm border border-red-200"
                                            >
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-4">
                                    <button 
                                        onClick={() => addToCartModal(selectedCookie)}
                                        className="flex-1 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition flex items-center justify-center min-w-[120px]"
                                        disabled={modalAdded}
                                    >
                                        {modalAdded ? (
                                            <><FaCheck className="mr-2" /> Added</>
                                        ) : (
                                            'Add to Cart'
                                        )}
                                    </button>
                                    <button onClick={closeModal} className="px-6 py-3 border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition">
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
