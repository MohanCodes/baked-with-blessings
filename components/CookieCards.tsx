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
        name: "Banana Crumble",
        shortDescription: "A brown butter banana cookie topped with cinnamon cream cheese frosting, buttery crumble, and drizzled with banana caramel.",
        extendedDescription: "Indulge in a delightful combination of warm, nutty flavors in our Banana Crumble cookie. Our cookie base is made with a rich, buttery brown butter and softened butter, giving it a comforting and tender texture. The banana flavor is brought to life with a sweet and creamy cinnamon cream cheese frosting. To top it off, each cookie is topped with a crumbly buttery crumble and drizzled with a sweet and smooth banana caramel. This cookie is the perfect combination of warmth and sweetness, making it a perfect treat for any time of day.",
        image: "/cookies/ban-cru.png",
        gallery: ["/cookies/ban-cru-1.jpg", "/cookies/ban-cru-2.jpg", "/cookies/ban-cru-3.jpg"],
        backgroundColor: "#f7dc6f",
        ingredients: [
            "Butter",
            "Sugar",
            "AP flour",
            "Eggs",
            "Banana",
            "Cinnamon",
            "Cream cheese",
            "Heavy cream"
        ],
        allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"]
    },
    {
        id: 2,
        name: "Red Velvet Cheesecake",
        shortDescription: "A rich red velvet cookie loaded with white chocolate, Oreos, and creamy cheesecake filling.",
        extendedDescription: "Treat your taste buds to a delightful combination of rich and creamy flavors in our Red Velvet Cheesecake cookie. We start with a classic red velvet cookie base that's rich and decadent, loaded with a creamy cheesecake filling that melts in your mouth. The cookie is studded with crushed Oreos and finished with a smooth layer of white chocolate that adds a velvety texture to the cookie. This cookie is a true celebration of America's favorite dessert in a whole new form.",
        image: "/cookies/red-vel.png",
        gallery: ["/cookies/red-vel-1.jpg", "/cookies/red-vel-2.jpg", "/cookies/red-vel-3.jpg"],
        backgroundColor: "#f7e1d1",
        ingredients: [
            "Cocoa powder",
            "Flour",
            "Sugar",
            "White chocolate",
            "Oreos",
            "Cream cheese",
            "Butter"
        ],
        allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"]
    },
    {
        id: 3,
        name: "Dubai Chewy Cookie",
        shortDescription: "A chewy marshmallow cookie filled with pistachio cream and crunchy Knafeh, dusted with cocoa powder for the perfect balance of sweet and rich.",
        extendedDescription: "Experience the perfect balance of sweet and rich in our Dubai Chewy Cookie. We start with a chewy marshmallow cookie base that's filled with a rich and creamy pistachio cream. The cookie is also crunchy with crispy Knafeh, a popular Dubai street snack made from fried fish scales. Each cookie is dusted with a light layer of cocoa powder for added flavor and texture. This cookie is a true celebration of the Middle Eastern flavors that Dubai is known for.",
        image: "/cookies/dubai.png",
        gallery: ["/cookies/dubai-1.jpg", "/cookies/dubai-2.jpg", "/cookies/dubai-3.jpg"],
        backgroundColor: "#cde5c7",
        ingredients: [
            "Cocoa powder",
            "Marshmallows",
            "Knafeh",
            "Pistachios",
            "Cream cheese",
            "Butter"
        ],
        allergens: ["Gluten", "Dairy", "Eggs", "Tree Nuts"]
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
        setTimeout(() => setAddedId(null), 800);
    };

    const addToCartModal = (cookie: Cookie) => {
        dispatch({ type: 'ADD_ITEM', payload: cookie });
        setModalAdded(true);
        setTimeout(() => setModalAdded(false), 800);
    };

    return (
        <>
            <div id="flavors-of-the-month" className="bg-[#FFF8E2] rounded-lg p-8 md:m-8 flex flex-col items-center z-20">
                <h2 className="text-5xl md:text-7xl italic mb-4 text-center">Flavors of the Month</h2>
                <p className="text-center text-lg mb-18">
                    Here is our curated selection of cookies for the month of February!
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
