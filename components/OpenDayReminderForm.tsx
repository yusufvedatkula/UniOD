"use client"

// import {DateInput} from "@nextui-org/date-input";
import {CalendarDate} from "@internationalized/date";
import { useState } from "react";
import { useSession } from "next-auth/react";
import {Calendar} from "@nextui-org/react";

import {TimeInput} from "@nextui-org/react";
import {Time} from "@internationalized/date";

export const OpenDayReminderForm = () => {
    const today = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    const [university, setUniversity] = useState('')
    const [openDayDate, setOpenDayDate] = useState('')
    const [error, setError] = useState('')
    const [time, setTime] = useState('')

    const {data: session} = useSession()


    if (!session) {
        return (
            <div className="grid place-items-center m-10">
                <h1 className="text-2xl font-bold">You have to SIGN IN to use Open Day Reminder System</h1>
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
                university, openDayDate, time
            })
        });

        setUniversity('');
        setOpenDayDate('');
        setTime('');
        
        window.location.reload();
    }
    
    return (
        <div>
            <div className="grid place-items-center m-2" >
                <div className="shadow-lg pb-5 pl-10 pr-10 
                rounded-lg border-t-4 border-warning" 
                style={{backgroundColor:"#222831"}}>
                <h1 className="text-xl font-bold my-3 text-slate-200">
                    Open Day Reminder Form
                </h1>
        
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                    className="input input-bordered border-warning text-slate-200"
                    type="text"
                    placeholder="University"
                    onChange={(e) => setUniversity(e.target.value)}
                    />
                    <div className="flex gap-x-4">
                        <Calendar 
                        aria-label="Date (No Selection)" 
                        onChange={(date) => {
                            setOpenDayDate(date.toString());
                            setError('');
                        }}
                        color="warning"
                        />
                    </div>
                    <TimeInput 
                        defaultValue={new Time(10)}
                        hourCycle={24}
                        onChange={(e) => {
                            setTime(e.toString())
                            setError('')
                        } }
                    />
                    <button type="submit" 
                        className="btn btn-warning">
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