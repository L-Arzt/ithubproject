'use client';


import { useContext, useEffect, useState } from 'react';
import { Calendar } from './ui/calendar';
import { endOfWeek, isSameWeek, startOfWeek } from 'date-fns';
import { ru } from 'date-fns/locale'
import Link from "next/link";
import React from "react";
import { ThemeContext } from './ThemeProvider';
import Image from 'next/image';
import glazPng from '../../public/glaz.png'

export default function AsideMenu() {
    const [selectedWeek, setSelectedWeek] = useState();
    const [menuVisible, setMenuVisible] = useState(true);
    const context = useContext(ThemeContext)

    useEffect(() => {
        setSelectedWeek({
            from: startOfWeek(new Date(), {
                weekStartsOn: 1
            }),
            to: endOfWeek(new Date(), {
                weekStartsOn: 1
            }),
        })
    }, [])

    return (
        <section>
            <div className="flex justify-end">
                <button className="flex items-center justify-center bg-[#921CB0] h-[30px] rounded-md text-stone-50 p-5 m-5" onClick={() => setMenuVisible(!menuVisible)}>
                    {menuVisible ? 'Скрыть меню' : < Image className='w-7' src={glazPng} alt='glaz' />}
                </button>
            </div>

            {menuVisible && (

                <aside className="flex flex-col items-center mx-6">
                    <nav className=" text-white text-xl">
                        <ul className="">
                            <li></li>
                            <li><Link className="text-black" href={"/"}>Главная</Link></li>
                            <li> <Link className="text-black" href={"/User/TimeTable"}>Расписание</Link></li>
                        </ul>
                    </nav>



                    <Calendar locale={ru}
                        modifiers={{
                            selected: selectedWeek,
                        }}
                        onDayClick={(day, modifiers) => {
                            if (modifiers.selected) {
                                setSelectedWeek(undefined); // clear the selection if the week is already selected
                                return;
                            }
                            console.log(day);
                            const newWeek = {
                                from: startOfWeek(day, {
                                    weekStartsOn: 1
                                }),
                                to: endOfWeek(day, {
                                    weekStartsOn: 1
                                }),
                            };
                            setSelectedWeek(newWeek);

                            context.setWeeks(newWeek)
                        }}

                        onWeekNumberClick={(weekNumber, dates) => {
                            if (selectedWeek?.from && isSameWeek(dates[0], selectedWeek.from)) {
                                setSelectedWeek(undefined); // clear the selection if the week is already selected
                                return;

                            }
                            setSelectedWeek({
                                from: startOfWeek(dates[0]),
                                to: endOfWeek(dates[dates.length - 1]),
                            });

                            context.setWeeks(selectedWeek.from)

                        }
                        }

                        footer={
                            selectedWeek && (
                                <p>
                                    Неделя {selectedWeek.from.toLocaleDateString()} -
                                    {selectedWeek.to.toLocaleDateString()}
                                </p>
                            )
                        }
                    />

                </aside>
            )}
        </section>

    )
} 
