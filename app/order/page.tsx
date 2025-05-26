"use client";
import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart, getItemPrice } from '@/components/ShoppingCart';

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
            dates.push({
                value: friday.toISOString().split('T')[0],
                label: friday.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
                day: 'friday',
            });
        }
        // Sunday
        const sunday = new Date(today);
        sunday.setDate(today.getDate() + ((0 - today.getDay() + 7) % 7) + week * 7);
        if (sunday > today) {
            dates.push({
                value: sunday.toISOString().split('T')[0],
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
    const date = new Date(dateStr);
    const day = date.getDay();
    let startHour, endHour;
    if (day === 5) { // Friday
        startHour = 19; // 7 PM
        endHour = 21;   // 9 PM
    } else if (day === 0) { // Sunday
        startHour = 10; // 10 AM
        endHour = 13;   // 1 PM
    } else {
        return [];
    }
    const slots = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let min = 0; min < 60; min += 20) {
            const d = new Date(dateStr);
            d.setHours(hour, min, 0, 0);
            slots.push({
                value: d.toTimeString().slice(0,5),
                label: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
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
        pickupDate: pickupDates[0]?.value || '',
        pickupTime: '',
        specialInstructions: ''
    });
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const timeSlots = useMemo(() => getTimeSlots(formData.pickupDate), [formData.pickupDate]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Reset pickupTime if pickupDate changes
        if (name === 'pickupDate') {
            setFormData(prev => ({ ...prev, pickupTime: '' }));
        }
    };

    const formatOrderDetails = (items: any[]) => {
        return items.map(item => 
            `${item.name} (Quantity: ${item.quantity}) - $${getItemPrice(item.quantity).toFixed(2)}`
        ).join('\n');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            // Simulate order placement (no email logic)
            await new Promise((resolve) => setTimeout(resolve, 500));

            setSubmitStatus({
                type: 'success',
                message: 'Order placed successfully! (No email sent; SIMPLY FOR TESTING.)',
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
            setSubmitStatus({
                type: 'error',
                message: 'There was an error placing your order. Please try again or contact us directly.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#FFF8E2]">
            <Navbar showOrderButton={false} homeButton={true} />
            <div className="container mx-auto px-4 py-8 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Shopping Cart Section */}
                    <div>
                        <ShoppingCart />
                    </div>

                    {/* Checkout Form Section */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-2xl font-semibold mb-6">Pickup Information</h3>
                        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">
                                <strong>Pickup Location:</strong><br />
                                West Metro Chinese Church<br />
                                6015 Penn Ave S<br />
                                Minneapolis, MN 55419
                            </p>
                            <p className="text-sm text-gray-600 mt-4">
                                <strong>Regular Pickup Times:</strong><br />
                                Fridays: 7:00 PM - 9:00 PM<br />
                                Sundays: 10:00 AM - 1:00 PM
                            </p>
                            <p className="text-sm text-gray-600 mt-4">
                                <strong>Payment in person! Please have your order email ready.</strong><br />
                            </p>
                        </div>

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
                                        {pickupDates.map((slot, index) => (
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
                                <label className="block text-sm font-medium text-gray-700 mb-2">Special Instructions</label>
                                <textarea
                                    name="specialInstructions"
                                    value={formData.specialInstructions}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black py-3 px-4"
                                    placeholder="Any special requests or notes for your order?"
                                />
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
        </div>
    );
};

export default OrderPage;
