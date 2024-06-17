'use client';

import { useContext, useEffect, useState } from 'react';

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


import left from '../../../public/arrowLeft.png'
import right from '../../../public/arrowRight.png'
import Image from 'next/image';


export default function TimeTable({ data, weekRange }) {
    const [dataset, setDataset] = useState(data);
    const context = useContext(ThemeContext)
    const [hover, setHover] = useState(false)

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
        setSlideIndex((prevSlideIndex) => prevSlideIndex + 1);
    };

    const prevSlide = () => {
        setSlideIndex((prevSlideIndex) => prevSlideIndex - 1);
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
                <TableRow>
                    <TableCell>{TimeLessonS[i]}<hr />{TimeLessonPo[i]}</TableCell>
                    {dataset.slice(slideIndex * 5, slideIndex * 5 + 5).map((aud) => {
                        const lesson = aud.rasp.find(
                            (lesson) => lesson.weekDay === day && lesson.numberLesson === i


                        );
                        console.log(lesson)
                        if (lesson) {
                            return (
                                <>
                                    <TableCell className="border w-[180px] h-[90px] transform transition-transform duration-200"
                                        onMouseEnter={() => setHover(prevState => ({ ...prevState, [lesson.id]: true }))}
                                        onMouseLeave={() => setHover(prevState => ({ ...prevState, [lesson.id]: false }))}
                                    >
                                        <div className={`relative flex flex-col items-center justify-center transition-all duration-200 `}>
                                            {hover[lesson.id] ? (
                                                <div className='absolute flex items-center justify-center flex-col w-[250px] h-[120px] p-2 bg-gray-200 rounded-lg gap-2'>
                                                    <p className="font-bold">{lesson.teacher}</p>
                                                    <p>{lesson.discipline}</p>
                                                    <p>{lesson.group}</p>
                                                </div>
                                            ) : (
                                                <div className='absolute'>
                                                    <p className="z-0">{lesson.teacher.slice(0, 10)}...</p>
                                                    <p className="z-0">{lesson.discipline.slice(0, 10)}...</p>
                                                    <p>{lesson.group.slice(0, 10)}...</p>
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                </>
                            );
                        } else {
                            return (
                                <TableCell className="border w-[180px] h-[90px]" key={aud.class}>
                                    <div className='flex items-center justify-center flex-col gap-2'>
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
        <section className="flex items-center justify-center flex-col ">
            <div className="flex gap-5">
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 1 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(1)}>Пн</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 2 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(2)}>Вт</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 3 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(3)}>Ср</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 4 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(4)}>Чт</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 5 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(5)}>Пт</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 6 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(6)}>Сб</button>
                <button style={{ padding: 5, borderRadius: 7, backgroundColor: day === 7 ? '#921CB0' : 'initial' }} onClick={() => handleClickDay(7)}>Вс</button>

            </div>

            {dataset && (
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {dataset.slice(slideIndex * 5, slideIndex * 5 + 5).map((aud) => ( // Change here to display only 5 auditoriums per slide
                                    <TableHead key={aud.class}>{aud.class}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>{buildTable(dataset)}</TableBody>
                    </Table>

                    <div className="flex items-center justify-center gap-5">
                        <button onClick={prevSlide}><Image className=' w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={left} alt='leftImg' /></button>

                        <button onClick={nextSlide}><Image className='w-10 h-10 m-5 bg-[#921CB0] rounded-lg p-1' src={right} alt='rightImg' /></button>
                    </div>

                </div>
            )}
        </section>
    );


}



