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
import logo from '../../public/logo.png'
import burderMenu from '../../public/burgermenu.png'

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
        <section className='relative pt-[100px]  m-2 z-10'>
            <div className="flex justify-end ">
                <button className="absolute w-fit left-0 top-0 flex items-center justify-center bg-[#921CB0] min-w-10 h-[30px] rounded-md text-stone-50 p-5" onClick={() => setMenuVisible(!menuVisible)}>
                    {menuVisible ? < Image className=' w-6 h-6 m-4' src={burderMenu} alt='glaz' /> : < Image className=' w-8 h-8 m-4' src={glazPng} alt='glaz' />}
                </button>
            </div>

            {menuVisible && (

                <aside className="flex flex-col items-start mx-3 gap-10 justify-between h-[85vh]">

                    <div>
                        <nav className=" text-white text-xl">
                            <ul className="">
                                <li></li>
                                {/* <li><Link className="text-black" href={"/"}>Главная</Link></li> */}
                                <li> <Link className="text-black" href={"/user/TimeTable"}>< Image className=' w-40 h-20' src={logo} alt='logo' /></Link></li>
                            </ul>
                        </nav>



                        <Calendar className="calendar_custom p-0" locale={ru}
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





                        // footer={
                        //     selectedWeek && (
                        //         <p>
                        //             Неделя {selectedWeek.from.toLocaleDateString()} -
                        //             {selectedWeek.to.toLocaleDateString()}

                        //         </p>

                        //     )
                        // }
                        />
                    </div>



                    <div className='m-2  bottom-0'>
                        {/* {
                            !session && <Link className='' href="/login">ВОЙТИ</Link>
                        } */}
                        {
                            <Logout />
                        }
                    </div>

                </aside>
            )
            }
        </section >

    )
} 
