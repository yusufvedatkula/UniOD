"use client"

import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";
import { useState } from "react";
import { useSession } from "next-auth/react";


export const OpenDayReminderForm = () => {
    const today = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const [university, setUniversity] = useState('')
    const [openDayDate, setOpenDayDate] = useState('')
    const [error, setError] = useState('')

    const {data: session} = useSession()


    if (!session) {
        return (
            <div className="grid place-items-center m-10">
                <h1 className="text-2xl font-bold">You have to log in to use Open Day Reminder System</h1>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const [year, month, day] = openDayDate.split('-').map(Number);
        const selectedDate = new CalendarDate(year, month, day);

        if (!selectedDate || selectedDate.compare(today) < 0) {
            setError('Please enter a valid date that is today or in the future.');
            return;
        } 

        setError('');

        await fetch('api/setReminder', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                university, openDayDate
            })
        });

        setUniversity('');
        setOpenDayDate('');
    }
    
    return (
        <div>
            <div className="grid place-items-center m-10">
                <div className="shadow-lg p-5 rounded-lg border-t-4 border-blue-950">
                <h1 className="text-xl font-bold my-4">Open Day Reminder Form</h1>
        
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                    className="bg-gray-50 border
                    border-gray-300 
                    text-white text-sm rounded-lg 
                    focus:ring-blue-500 
                    focus:border-blue-500 block w-full p-2.5 
                    dark:bg-gray-700
                    dark:border-gray-600 
                    dark:placeholder-white 
                    dark:text-white 
                    dark:focus:ring-blue-500 
                    dark:focus:border-blue-500"
                    type="text"
                    placeholder="University"
                    onChange={(e) => setUniversity(e.target.value)}
                    />
                    
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                        <DateInput
                            className="bg-gray-50 border
                            border-gray-300 
                            text-white text-sm rounded-lg 
                            focus:ring-blue-500 
                            focus:border-blue-500 block w-full p-2.5 
                            dark:bg-gray-700
                            dark:border-gray-600 
                            dark:placeholder-white 
                            dark:text-white 
                            dark:focus:ring-blue-500 
                            dark:focus:border-blue-500"
                            label={"Open Day Date"} 
                            isRequired
                            defaultValue={
                                new CalendarDate(new Date().getFullYear(), 
                                new Date().getMonth() + 1, 
                                new Date().getDate()
                            )} 
                            minValue={
                                new CalendarDate(new Date().getFullYear(), 
                                new Date().getMonth() + 1, 
                                new Date().getDate())} 
                            placeholderValue={new CalendarDate(1995, 11, 6)} 
                            onChange={(date) => {
                                setOpenDayDate(date.toString());
                                setError('');
                            }}
                        />
                    </div>
                    <button className="bg-blue-900 
                    text-white font-bold 
                    cursor-pointer border-solid border-black border-0 px-6 py-2 
                    rounded-md hover:bg-blue-700 
                    transition-all duration-300 ease-in-out">
                    Set Reminder
                    </button>

                    {error && (
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                    </div>
                )}
                </form>
                </div>
            </div>
        </div>
       
    )
}