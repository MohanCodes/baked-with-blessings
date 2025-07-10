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
        name: "Cinnamon Roll",
        shortDescription: "A soft and chewy brown butter base with swirls of cinnamon filling and topped with brown butter icing",
        extendedDescription: "Experience the warm, comforting flavors of a classic cinnamon roll in cookie form. Our Cinnamon Roll cookie features a soft and chewy brown butter base that provides the perfect foundation for generous swirls of cinnamon filling. Each cookie is finished with a decadent brown butter icing that melts in your mouth, creating the ultimate sweet and spicy treat that's perfect for any time of day.",
        image: "/cookies/cin.png",
        gallery: ["/cookies/cin-2.jpg", "/cookies/cin-3.jpg"],
        backgroundColor: "#f4e4bc",
        ingredients: [
            "Butter",
            "Sugar",
            "Eggs",
            "Flour",
            "Cinnamon",
            "Powdered sugar",
            "Milk"
        ],
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: 2,
        name: "Oreo Cheesecake",
        shortDescription: "A sugar cookie base with Oreos and white chocolate chips and filled with a decadent cheesecake filling",
        extendedDescription: "Indulge in the perfect combination of cookies and cream with our Oreo Cheesecake cookie. We start with a classic sugar cookie base that's studded with crushed Oreos and white chocolate chips for texture and flavor. Each cookie is filled with a rich, creamy cheesecake filling that creates a delightful contrast of textures and tastes. This cookie is a true celebration of America's favorite cookie in a whole new form.",
        image: "/cookies/oreo.png",
        gallery: ["/cookies/oreo-2.jpg", "/cookies/oreo-3.jpg"],
        backgroundColor: "#e8e8e8",
        ingredients: [
            "Butter",
            "Sugar",
            "Eggs",
            "Flour",
            "Oreos",
            "Cream cheese",
            "White chocolate chips"
        ],
        allergens: ["Gluten", "Dairy", "Eggs"]
    },
    {
        id: 3,
        name: "Banana Choc-chip Walnut",
        shortDescription: "A brown butter banana cookie base with semi-sweet chocolate chips and toasted walnuts",
        extendedDescription: "Satisfy your sweet tooth with our Banana Choc-chip Walnut cookie, a perfect blend of classic flavors. We use ripe bananas and brown butter to create a moist, flavorful cookie base that's naturally sweet and aromatic. Semi-sweet chocolate chips add rich chocolatey goodness, while toasted walnuts provide a satisfying crunch and nutty flavor. This cookie is a delicious twist on traditional banana bread that's sure to become a new favorite.",
        image: "/cookies/banwal.png",
        gallery: ["/cookies/banwal-2.jpg", "/cookies/banwal-3.jpg"],
        backgroundColor: "#f7dc6f",
        ingredients: [
            "Bananas",
            "Chocolate",
            "Butter",
            "Flour",
            "Walnuts"
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
        setTimeout(() => setAddedId(null), 2000);
    };

    const addToCartModal = (cookie: Cookie) => {
        dispatch({ type: 'ADD_ITEM', payload: cookie });
        setModalAdded(true);
        setTimeout(() => setModalAdded(false), 2000);
    };

    return (
        <>
            <div id="flavors-of-the-month" className="bg-[#FFF8E2] rounded-lg p-8 md:m-8 flex flex-col items-center z-20">
                <h2 className="text-5xl md:text-7xl italic mb-4 text-center">Flavors of the Month</h2>
                <p className="text-center text-lg mb-18">
                    Here is our curated selection of cookies for the month of July!
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
