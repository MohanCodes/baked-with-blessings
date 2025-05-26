"use client";

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaMapPin, FaClock } from 'react-icons/fa';

function getDaysList() {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 5; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        if (i === 0) {
            days.push('Today');
        } else if (i === 1) {
            days.push('Tomorrow');
        } else {
            days.push(
                date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: '2-digit'
                })
            );
        }
    }
    return days;
}

export default function FoodDeliveryHeader() {
    const [timeModalOpen, setTimeModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState('Today');
    const [selectedTime, setSelectedTime] = useState('4:20 - 4:50 PM');
    const timeButtonRef = useRef<HTMLButtonElement | null>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('114th - 11417 Slide Rd, Ste 100');
    const locationButtonRef = useRef<HTMLButtonElement | null>(null);
    const locationModalRef = useRef<HTMLDivElement | null>(null);

    const days = getDaysList();
    const times = [
        '4:20 - 4:50 PM',
        '4:50 - 5:20 PM',
        '5:20 - 5:50 PM',
        '5:50 - 6:20 PM',
        '6:20 - 6:50 PM'
    ];
    const locations = [
        '114th - 11417 Slide Rd, Ste 100',
        'Downtown - 500 Main St',
        'West End - 2000 West Ave',
        'North Park - 800 North Blvd'
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                timeButtonRef.current &&
                !timeButtonRef.current.contains(event.target as Node)
            ) {
                setTimeModalOpen(false);
            }
            if (
                locationModalRef.current &&
                !locationModalRef.current.contains(event.target as Node) &&
                locationButtonRef.current &&
                !locationButtonRef.current.contains(event.target as Node)
            ) {
                setLocationModalOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleDaySelection = (day: string) => setSelectedDay(day);
    const handleTimeSelection = (time: string) => setSelectedTime(time);
    const handleSave = () => setTimeModalOpen(false);

    const handleLocationSelection = (location: string) => setSelectedLocation(location);
    const handleLocationSave = () => setLocationModalOpen(false);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between p-4">
                <div className="flex space-x-2">
                    {/* Time Selection Button */}
                    <div className="relative">
                        <button
                            ref={timeButtonRef}
                            className="flex items-center rounded-full px-3 py-1 cursor-pointer"
                            onClick={() => setTimeModalOpen(!timeModalOpen)}
                        >
                            <FaClock size={18} className="mr-1" />
                            <span>{selectedDay} - {selectedTime}</span>
                            <FaChevronDown size={18} className="ml-1" />
                        </button>

                        {/* Time Selection Modal */}
                        {timeModalOpen && (
                            <div
                                ref={modalRef}
                                className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg w-96 z-40 p-4"
                            >
                                <div className="p-4 border-b text-center font-bold">
                                    Time
                                </div>
                                <div className="flex p-4">
                                    {/* Day Selection */}
                                    <div className="w-1/2 border-r max-h-64 overflow-y-auto">
                                        {days.map((day) => (
                                            <div
                                                key={day}
                                                className={`p-4 rounded-2xl cursor-pointer ${selectedDay === day ? 'bg-[#FFC567]' : 'hover:bg-gray-100'}`}
                                                onClick={() => handleDaySelection(day)}
                                            >
                                                {day}
                                            </div>
                                        ))}
                                    </div>
                                    {/* Time Selection */}
                                    <div className="w-1/2 max-h-64 overflow-y-auto">
                                        {times.map((time) => (
                                            <div
                                                key={time}
                                                className={`p-4 rounded-2xl cursor-pointer ${selectedTime === time ? 'bg-[#FFC567]' : 'hover:bg-gray-100'}`}
                                                onClick={() => handleTimeSelection(time)}
                                            >
                                                {time}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Save Button */}
                                <div className="p-4">
                                    <button
                                        className="w-full p-3 bg-[#FFD2D2] rounded-md font-semibold hover:bg-[#f8AEAE]"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Location Button */}
                    <div className="relative">
                        <button
                            ref={locationButtonRef}
                            className="flex items-center rounded-full px-3 py-1 cursor-pointer"
                            onClick={() => setLocationModalOpen(!locationModalOpen)}
                        >
                            <FaMapPin size={18} className="mr-1" />
                            <span className="truncate max-w-56">{selectedLocation}</span>
                            <FaChevronDown size={18} />
                        </button>
                        {locationModalOpen && (
                            <div
                                ref={locationModalRef}
                                className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg w-80 z-40 p-4"
                            >
                                <div className="p-4 border-b text-center font-bold">
                                    Select Location
                                </div>
                                <div className="max-h-64 overflow-y-auto p-2">
                                    {locations.map((location) => (
                                        <div
                                            key={location}
                                            className={`p-4 rounded-2xl cursor-pointer ${selectedLocation === location ? 'bg-[#FFC567]' : 'hover:bg-gray-100'}`}
                                            onClick={() => handleLocationSelection(location)}
                                        >
                                            {location}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4">
                                    <button
                                        className="w-full p-3 bg-[#FFD2D2] rounded-md font-semibold hover:bg-[#f8AEAE]"
                                        onClick={handleLocationSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
