'use client';

import { useContext, useEffect, useRef, useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../../components/ui/table';
import Link from 'next/link';
import { ThemeContext } from '../../components/ThemeProvider';


import ArrowLeftImg from '../../../public/arrowLeftImg.png'
import ArrowRightImg from '../../../public/arrowRightImg.png'
import edit from '../../../public/edit.png'
import Image from 'next/image';


export default function TimeTable({ data, weekRange }) {
    const [dataset, setDataset] = useState(data);
    const context = useContext(ThemeContext)
    const [hover, setHover] = useState(false)
    const slideContainerRef = useRef(null);


    useEffect(() => {
        if (context.weeks) {
            async function getData() {
                const resp = await fetch('/api/getAudInfo', {
                    method: 'post',
                    body: JSON.stringify({
                        monday: context?.weeks?.from,
                        sunday: context?.weeks?.to
                    })
                })

                if (resp) {
                    const data = await resp.json()
                    console.log(data.data);
                    setDataset(data.data)
                }
            }

            getData()
        }
    }, [context.weeks])

    const [day, setDay] = useState(1);
    const [slideIndex, setSlideIndex] = useState(0);


    const nextSlide = () => {
        console.log(slideContainerRef.current)
        slideContainerRef.current.scrollBy(100, 0);
    }


    const prevSlide = () => {
        slideContainerRef.current.scrollBy(-100, 0);
    };

    function getDateFromDay(date, day) {
        var result = new Date(date);
        result.setDate(result.getDate() + (day - 1));
        return new Intl.DateTimeFormat('lt').format(result);
    }

    const handleClickDay = (dayNum) => {
        setDay(dayNum);
    };

    function buildTable(data) {


        const TimeLessonS = {
            1: '8:30',
            2: '10:15',
            3: '12:00',
            4: '14:15',
            5: '16:00',
            6: '17:50',
            6: '19:30'
        }
        const TimeLessonPo = {
            1: '10:05',
            2: '11:50',
            3: '13:35',
            4: '15:50',
            5: '17:35',
            6: '21:00'
        }


        let table = [];
        for (let i = 1; i < 7; i++) {
            let tablePart = (
                <TableRow className='customKletka '>
                    <TableCell >{TimeLessonS[i]}<hr />{TimeLessonPo[i]}</TableCell>
                    {dataset.map((aud) => {
                        const lesson = aud.rasp.find(
                            (lesson) => lesson.weekDay === day && lesson.numberLesson === i


                        );
                        console.log(lesson)
                        if (lesson) {
                            return (
                                <>
                                    {lesson.booked == '1' ? (
                                        <TableCell className="border  transform transition-transform duration-200 "
                                            onMouseEnter={() => setHover(prevState => ({ ...prevState, [lesson.id]: true }))}
                                            onMouseLeave={() => setHover(prevState => ({ ...prevState, [lesson.id]: false }))}
                                        >
                                            <Link href={`/admin/book/UpdatePage/${lesson.id}`}>
                                                <div className={`relative w-[140px] h-[70px] flex flex-col items-center justify-center transition-all duration-200 `}>
                                                    {hover[lesson.id] ? (
                                                        <div className='absolute  flex items-center justify-center gap-2   w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg '>
                                                            <div className='flex flex-col'>
                                                                <p className="font-bold">{lesson.teacher}</p>
                                                                <p>{lesson.discipline}</p>
                                                                <p>{lesson.group}</p>
                                                            </div>

                                                            <div>
                                                                <Link href={`/admin/book/UpdatePage/${lesson.id}`}>
                                                                    <button className="flex items-center justify-center bg-[#921CB0] w-[35px] h-[35px] rounded-md text-stone-50 ">
                                                                        <Image className='w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={edit} alt='editImg' />
                                                                    </button>
                                                                </Link>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div className='absolute flex items-center justify-center flex-col z-[-100]'>
                                                            <p className="z-0">{lesson.teacher.slice(0, 10)}...</p>
                                                            <p className="z-0">{lesson.discipline.slice(0, 10)}...</p>
                                                            <p>{lesson.group.slice(0, 10)}...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </Link>

                                        </TableCell>
                                    ) : (
                                        <TableCell className="border  transform transition-transform duration-200"
                                            onMouseEnter={() => setHover(prevState => ({ ...prevState, [lesson.id]: true }))}
                                            onMouseLeave={() => setHover(prevState => ({ ...prevState, [lesson.id]: false }))}
                                        >
                                            <div className={`relative w-[140px] h-[70px] flex flex-col items-center justify-center transition-all duration-200 `}>
                                                {hover[lesson.id] ? (
                                                    <div className='absolute flex items-center justify-center flex-col w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg gap-2'>
                                                        <p className="font-bold">{lesson.teacher}</p>
                                                        <p>{lesson.discipline}</p>
                                                        <p>{lesson.group}</p>
                                                    </div>
                                                ) : (
                                                    <div className='absolute '>
                                                        <p className="z-0">{lesson.teacher.slice(0, 10)}...</p>
                                                        <p className="z-0">{lesson.discipline.slice(0, 10)}...</p>
                                                        <p>{lesson.group.slice(0, 10)}...</p>
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>
                                    )}


                                </>
                            );
                        } else {
                            return (
                                <TableCell className=" border " key={aud.class}>
                                    <div className='flex w-[140px] h-[70px] items-center justify-center flex-col gap-2 '>
                                        <h1 className='text-[#7E7E7E]'>Свободно</h1>
                                        <Link
                                            href={`/admin/book/${i}/${day}/${aud.class}/${getDateFromDay(
                                                new Date(weekRange.monday),
                                                day
                                            )}`}
                                        >
                                            <button className="flex items-center justify-center bg-[#921CB0] h-[30px] rounded-md text-stone-50 p-5">Занять аудиторию</button>
                                        </Link>
                                    </div>
                                </TableCell>
                            );
                        }
                    })}
                </TableRow>

            );

            table.push(tablePart);
        }

        return table;
    }

    return (
        <section className="flex items-center justify-center flex-col overflow-hidden">
            <div className="flex gap-5">
                <button className={day === 1 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(1)}>Пн</button>
                <button className={day === 2 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(2)}>Вт</button>
                <button className={day === 3 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(3)}>Ср</button>
                <button className={day === 4 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(4)}>Чт</button>
                <button className={day === 5 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(5)}>Пт</button>
                <button className={day === 6 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(6)}>Сб</button>
                <button className={day === 7 && 'text-white bg-[#921CB0] p-2 rounded-md'} onClick={() => handleClickDay(7)}>Вс</button>

            </div>

            {dataset && (
                <div className='overflow-x-scroll w-[100%] '>
                    <Table refProp={slideContainerRef}>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {dataset.map((aud) => (
                                    <TableHead key={aud.class}>{aud.class}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>{buildTable(dataset)}</TableBody>
                    </Table>

                    <div className="flex items-center justify-center gap-5">
                        <button onClick={prevSlide}>
                            <Image className='w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={ArrowLeftImg} alt='leftImg' />
                        </button>
                        <button onClick={nextSlide}>
                            <Image className='w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={ArrowRightImg} alt='rightImg' />
                        </button>
                    </div>

                </div>
            )}
        </section>
    );
}