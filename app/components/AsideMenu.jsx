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

import Logout from './auth/Logout'
import { SessionProvider, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

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
        <section className='relative pt-[100px] m-2 z-10'>
            <div className="flex justify-end ">
                <button className="absolute w-fit left-0 top-0 flex items-center justify-center bg-[#921CB0] min-w-10 h-[30px] rounded-md text-stone-50 p-5" onClick={() => setMenuVisible(!menuVisible)}>
                    {menuVisible ? 'Скрыть меню' : < Image className=' w-10 h-10 m-5' src={glazPng} alt='glaz' />}
                </button>
            </div>

            {menuVisible && (

                <aside className="flex flex-col items-center mx-6">
                    <nav className=" text-white text-xl">
                        <ul className="">
                            <li></li>
                            <li><Link className="text-black" href={"/"}>Главная</Link></li>
                            <li> <Link className="text-black" href={"/user/TimeTable"}>Расписание</Link></li>
                        </ul>
                    </nav>



                    <Calendar className="calendar_custom" locale={ru}
                        modifiers={{
                            selected: selectedWeek,
                        }}
                        onDayClick={(day, modifiers) => {
                            if (modifiers.selected) {
                                setSelectedWeek(undefined);
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
                                setSelectedWeek(undefined);
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


                    <div>
                        {/* {
                            !session && <Link className='' href="/login">ВОЙТИ</Link>
                        } */}
                        {
                            <Logout />
                        }
                    </div>

                </aside>
            )}
        </section>

    )
} 
