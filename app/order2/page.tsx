"use client";

import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaMapPin, FaClock } from 'react-icons/fa';

export default function FoodDeliveryHeader() {
    const [timeModalOpen, setTimeModalOpen] = useState<boolean>(false);
    const [selectedDay, setSelectedDay] = useState<string>('Today');
    const [selectedTime, setSelectedTime] = useState<string>('4:20 - 4:50 PM');
    const timeButtonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    
    const days: string[] = [
        'Today',
        'Tomorrow',
        'Sat, Apr 26',
        'Mon, Apr 28',
        'Tue, Apr 29'
    ];
    
    const times: string[] = [
        '4:20 - 4:50 PM',
        '4:50 - 5:20 PM',
        '5:20 - 5:50 PM',
        '5:50 - 6:20 PM',
        '6:20 - 6:50 PM'
    ];
    
    // Close the modal when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
                timeButtonRef.current && !timeButtonRef.current.contains(event.target as Node)) {
                setTimeModalOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleDaySelection = (day: string): void => {
        setSelectedDay(day);
    };
    
    const handleTimeSelection = (time: string): void => {
        setSelectedTime(time);
    };
    
    const handleSave = (): void => {
        setTimeModalOpen(false);
    };
    
    return (
        <div className="w-full bg-white">
            {/* Header with options */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex space-x-2">                    
                    {/* Time Selection Button */}
                    <div className="relative">
                        <button 
                            ref={timeButtonRef}
                            className="flex items-center border rounded-full px-3 py-1 bg-white cursor-pointer"
                            onClick={() => setTimeModalOpen(!timeModalOpen)}
                        >
                            <FaClock size={18} className="mr-1" />
                            <span>{selectedDay} - {selectedTime}</span>
                            <FaChevronDown size={18} className="ml-1" />
                        </button>
                        
                        {/* Time Selection Modal - Positioned Under Button */}
                        {timeModalOpen && (
                            <div 
                                ref={modalRef}
                                className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg w-96 z-50"
                            >
                                <div className="p-4 border-b text-center font-bold">
                                    Time
                                </div>
                                
                                <div className="flex">
                                    {/* Day Selection */}
                                    <div className="w-1/2 border-r max-h-64 overflow-y-auto">
                                        {days.map((day) => (
                                            <div 
                                                key={day}
                                                className={`p-4 cursor-pointer ${selectedDay === day ? 'bg-pink-200' : 'hover:bg-gray-100'}`}
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
                                                className={`p-4 cursor-pointer ${selectedTime === time ? 'bg-pink-200' : 'hover:bg-gray-100'}`}
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
                                        className="w-full p-3 bg-gray-300 rounded-md font-semibold hover:bg-gray-400"
                                        onClick={handleSave}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    {/* Location Button */}
                    <div className="flex items-center border rounded-full px-3 py-1 bg-white cursor-pointer">
                        <FaMapPin size={18} className="mr-1" />
                        <span className="truncate max-w-56">114th - 11417 Slide Rd, Ste 100</span>
                        <FaChevronDown size={18} />
                    </div>
                </div>
            </div>
        </div>
    );
}