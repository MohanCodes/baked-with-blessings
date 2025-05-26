import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Cookie } from './CookieCards';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import Image from 'next/image';

// Define cart item interface
interface CartItem extends Cookie {
    quantity: number;
}

// Define cart state interface
interface CartState {
    items: CartItem[];
    total: number;
    isOpen: boolean;
}

// Define cart actions
type CartAction =
    | { type: 'ADD_ITEM'; payload: Cookie }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' };

// Create cart context
const CartContext = createContext<{
    state: CartState;
    dispatch: React.Dispatch<CartAction>;
} | null>(null);

// Initial cart state
const initialState: CartState = {
    items: [],
    total: 0,
    isOpen: false,
};

// Helper for pricing
export function getItemPrice(quantity: number) {
    return 4.99 * quantity;
}

// Cart reducer
function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                const newItems = state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                const updatedItem = newItems.find(item => item.id === action.payload.id)!;
                return {
                    ...state,
                    items: newItems,
                    total: newItems.reduce((sum, item) => sum + getItemPrice(item.quantity), 0),
                };
            }
            const newItems = [...state.items, { ...action.payload, quantity: 1 }];
            return {
                ...state,
                items: newItems,
                total: newItems.reduce((sum, item) => sum + getItemPrice(item.quantity), 0),
            };
        }
        case 'REMOVE_ITEM': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: newItems,
                total: newItems.reduce((sum, item) => sum + getItemPrice(item.quantity), 0),
            };
        }
        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            ).filter(item => item.quantity > 0);
            return {
                ...state,
                items: newItems,
                total: newItems.reduce((sum, item) => sum + getItemPrice(item.quantity), 0),
            };
        }
        case 'CLEAR_CART':
            return {
                items: [],
                total: 0,
                isOpen: false
            };
        default:
            return state;
    }
}

// Cart provider component
export function CartProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

// Custom hook to use cart
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

// Cart component
export default function ShoppingCart() {
    const { state, dispatch } = useCart();

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

    return (
        <div className='sticky top-16'>
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
                {state.items.length === 0 ? (
                    <div>
                        <p className="text-gray-500">Your cart is empty!</p>
                        <button
                            className="text-black underline mt-2 inline-block"
                            onClick={() => handleOrderNow()}
                        >
                            Browse our cookies
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {state.items.map((item) => (
                                <div key={item.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-14 h-14 relative rounded overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-gray-500">${getItemPrice(item.quantity).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => dispatch({
                                                type: 'UPDATE_QUANTITY',
                                                payload: { id: item.id, quantity: Math.max(0, item.quantity - 1) }
                                            })}
                                            className="px-2 py-1 bg-gray-100 rounded"
                                        >
                                            <FaMinus />
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch({
                                                type: 'UPDATE_QUANTITY',
                                                payload: { id: item.id, quantity: item.quantity + 1 }
                                            })}
                                            className="px-2 py-1 bg-gray-100 rounded"
                                        >
                                            <FaPlus />
                                        </button>
                                        <button
                                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                            className="ml-2 text-red-500"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 border-t pt-4">
                            <div className="flex justify-between text-lg font-semibold">
                                <span>Total:</span>
                                <span>${state.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <PickupInfoCard />
        </div>
    );
}

// Add pickup info card below the cart
export function PickupInfoCard() {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h3 className="text-xl font-semibold mb-2">Pickup Information</h3>
            <p className="text-sm text-gray-600 mb-2">
                <strong>Pickup Location:</strong><br />
                West Metro Chinese Church<br />
                6015 Penn Ave S<br />
                Minneapolis, MN 55419
            </p>
            <p className="text-sm text-gray-600 mb-2">
                <strong>Regular Pickup Times:</strong><br />
                Fridays: 7:00 PM - 9:00 PM<br />
                Sundays: 10:00 AM - 1:00 PM
            </p>
            <p className="text-sm text-gray-600">
                <strong>Payment in person! Please have your order email ready.</strong>
            </p>
        </div>
    );
} 