"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'
import ShoppingCart from '@/components/ShoppingCart';
import { useCart, getItemPrice } from '@/components/ShoppingCart';
import emailjs from '@emailjs/browser';

interface CheckoutForm {
    name: string;
    email: string;
    phone: string;
    pickupDate: string;
    pickupTime: string;
    specialInstructions: string;
}

const getNextPickupDates = () => {
    const dates = [];
    const today = new Date();
    for (let week = 0; week < 3; week++) {
        // Friday
        const friday = new Date(today);
        friday.setDate(today.getDate() + ((5 - today.getDay() + 7) % 7) + week * 7);
        if (friday > today) {
            const year = friday.getFullYear();
            const month = String(friday.getMonth() + 1).padStart(2, '0');
            const day = String(friday.getDate()).padStart(2, '0');
            dates.push({
                value: `${year}-${month}-${day}`,
                label: friday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                day: 'friday',
            });
        }
        // Sunday
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + ((0 - today.getDay() + 7) % 7) + week * 7);
        if (sunday > today) {
            const year = sunday.getFullYear();
            const month = String(sunday.getMonth() + 1).padStart(2, '0');
            const day = String(sunday.getDate()).padStart(2, '0');
            dates.push({
                value: `${year}-${month}-${day}`,
                label: sunday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                day: 'sunday',
            });
        }
    }
    // Sort by date ascending
    dates.sort((a, b) => a.value.localeCompare(b.value));
    return dates;
};

const getTimeSlots = (dateStr: string) => {
    if (!dateStr) return [];
    
    // Parse the date string properly
    const date = new Date(dateStr + 'T12:00:00'); // Add time to avoid timezone issues
    const dayOfWeek = date.getDay();
    
    let startHour, endHour;
    if (dayOfWeek === 5) { // Friday
        startHour = 19; // 7 PM
        endHour = 21;   // 9 PM
    } else if (dayOfWeek === 0) { // Sunday
        startHour = 10; // 10 AM
        endHour = 13;   // 1 PM
    } else {
        return [];
    }
    
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += 20) {
            const hours24 = hour.toString().padStart(2, '0');
            const minutes = min.toString().padStart(2, '0');
            const timeValue = `${hours24}:${minutes}`;
            
            // Create a proper date for formatting
            const [year, month, day] = dateStr.split('-').map(Number);
            const d = new Date(year, month - 1, day, hour, min);
            
            slots.push({
                value: timeValue,
                label: d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
            });
        }
    }
    return slots;
};

const OrderPage = () => {
    const { state, dispatch } = useCart();
    const pickupDates = useMemo(getNextPickupDates, []);
    const [formData, setFormData] = useState<CheckoutForm>({
        name: '',
        email: '',
        phone: '',
        pickupDate: '',
        pickupTime: '',
        specialInstructions: ''
    });
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Set initial pickup date after pickupDates are computed
    useEffect(() => {
        if (pickupDates.length > 0 && !formData.pickupDate) {
            setFormData(prev => ({ ...prev, pickupDate: pickupDates[0].value }));
        }
    }, [pickupDates, formData.pickupDate]);

    const timeSlots = useMemo(() => getTimeSlots(formData.pickupDate), [formData.pickupDate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: CheckoutForm) => {
            const updated = { ...prev, [name]: value };
            // Reset pickupTime if pickupDate changes
            if (name === 'pickupDate') {
                updated.pickupTime = '';
            }
            return updated;
        });
    };

    const formatOrderDetails = (items: any[]) => {
        return items.map(item => {
            const price = getItemPrice(item.quantity);
            return `${item.name} (Quantity: ${item.quantity}) - $${price.toFixed(2)}`;
        }).join('\n');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // Validate environment variables first
            const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
            const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
            
            if (!serviceId || !templateId || !publicKey) {
                throw new Error('EmailJS environment variables are not properly configured');
            }

            // Generate a random order ID (8 uppercase alphanumeric characters)
            const orderId = Math.random().toString(36).substr(2, 8).toUpperCase();

            // Format order details
            const orderDetails = formatOrderDetails(state.items);

            // Send email using EmailJS
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    order_id: orderId,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    pickupDate: formData.pickupDate,
                    pickupTime: formData.pickupTime,
                    specialInstructions: formData.specialInstructions,
                    orders: state.items.map(item => ({
                        name: item.name,
                        units: item.quantity,
                        price: getItemPrice(item.quantity).toFixed(2),
                        image_url: `https://bakedwithblessings.com/${item.image}`,
                    })),
                    cost: {
                        total: state.total.toFixed(2)
                    },
                },
                {
                    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
                }
            );

            setSubmitStatus({
                type: 'success',
                message: 'Order placed and email sent successfully!',
            });

            // Clear form and cart
            setFormData({
                name: '',
                email: '',
                phone: '',
                pickupDate: pickupDates[0]?.value || '',
                pickupTime: '',
                specialInstructions: '',
            });
            dispatch({ type: 'CLEAR_CART' });
        } catch (error) {
            console.error('EmailJS Error:', error);
            console.error('Error type:', typeof error);
            console.error('Error message:', error instanceof Error ? error.message : 'No message');
            
            setSubmitStatus({
                type: 'error',
                message: `There was an error placing your order. ${error instanceof Error ? error.message : 'Please try again or contact us directly.'}`,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF8E2]">
            <Navbar showOrderButton={false} homeButton={true} />
            <div className="flex-grow container mx-auto px-4 py-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shopping Cart Section */}
                    <div>
                        <ShoppingCart />
                    </div>

                    {/* Checkout Form Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold mb-6">Order Information</h3>

                        {submitStatus.type && (
                            <div className={`mb-6 p-4 rounded-lg ${
                                submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                            }`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                    required
                                    pattern="^[A-Za-z\s'-]{2,}$"
                                    title="Please enter a valid name (letters, spaces, apostrophes, and hyphens only)"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                    required
                                    pattern="^(\+?1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$"
                                    title="Please enter a valid US phone number (e.g., 123-456-7890)"
                                />
                            </div>

                            {/* Pickup Date and Time in the same row */}
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Date</label>
                                    <select
                                        name="pickupDate"
                                        value={formData.pickupDate}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                        required
                                    >
                                        {pickupDates.map((slot: { value: string; label: string }, index: number) => (
                                            <option key={index} value={slot.value}>
                                                {slot.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Time</label>
                                    <select
                                        name="pickupTime"
                                        value={formData.pickupTime}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                        required
                                        disabled={!formData.pickupDate}
                                    >
                                        <option value="" disabled>Select a time</option>
                                        {timeSlots.map((slot, index) => (
                                            <option key={index} value={slot.value}>{slot.label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Comments</label>
                                <textarea
                                    name="specialInstructions"
                                    value={formData.specialInstructions}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                    placeholder="Any special requests or notes for your order?"
                                />
                            </div>

                            <div className="flex justify-between text-lg font-semibold mb-4">
                                <span>Total:</span>
                                <span>${state.total.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || state.items.length === 0}
                                className={`w-full bg-black text-white py-3 px-4 rounded-md transition duration-200 mt-4 
                                    ${(isSubmitting || state.items.length === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                            >
                                {isSubmitting ? 'Placing Order...' : 'Place Order for Pickup'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderPage;
