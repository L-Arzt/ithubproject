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


export default function TimeTable({ data, weekRange }) {
    const [dataset, setDataset] = useState(data);
    const context = useContext(ThemeContext)
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

    function getDateFromDay(date, day) {
        var result = new Date(date);
        result.setDate(result.getDate() + (day - 1));
        return new Intl.DateTimeFormat('lt').format(result);
    }

    const handleClickDay = (dayNum) => {
        setDay(dayNum);
    };
    // console.log(data);
    // console.log(weekRange);
    function buildTable(data) {
        let table = [];
        for (let i = 1; i < 8; i++) {
            let tablePart = (
                <TableRow>
                    <TableCell>Пара {i}</TableCell>

                    {dataset.map((aud) => {
                        const lesson = aud.rasp.find(
                            (lesson) => lesson.weekDay === day && lesson.numberLesson === i
                        );
                        // console.log(lesson);
                        if (lesson) {
                            return (
                                <>
                                    {lesson.booked ? (
                                        <TableCell className="gap-5 border w-[300px] h-[130px] bg-[#F7F7F8]" key={aud.class}>
                                            <Link href={`/User/book/UpdatePage/${lesson.id}`}>
                                                <p>{lesson.teacher}</p>
                                                <p>{lesson.discipline}</p>
                                                <p>{lesson.group}</p>
                                            </Link>

                                        </TableCell>
                                    ) : (
                                        <TableCell className="gap-5 border w-[300px] h-[130px] bg-[#F7F7F8]" key={aud.class}>
                                            <p>{lesson.teacher}</p>
                                            <p>{lesson.discipline}</p>
                                            <p>{lesson.group}</p>
                                        </TableCell>
                                    )}
                                </>
                            );
                        } else {
                            // console.log(aud.rasp);
                            // console.log('asdas');
                            return (
                                <TableCell className=" border w-[300px] h-[130px]" key={aud.class}>
                                    <div className='flex items-center justify-center flex-col gap-2'>
                                        <h1 className='text-[#7E7E7E]'>Свободно</h1>
                                        <Link

                                            href={`/User/book/${i}/${day}/${aud.class}/${getDateFromDay(
                                                new Date(weekRange.monday),
                                                day
                                            )}`}
                                        >
                                            <button className="flex items-center justify-center bg-[#921CB0] h-[30px] rounded-md text-stone-50 p-5 ">Занять аудиторию</button>
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
        <section className="flex items-center justify-center flex-col gap-10">
            <div className="flex gap-5">
                {/* <button onClick={() => setWeekset(weekset - 1)}>
                    Предыдущая неделя
                </button>
                <button onClick={() => setWeekset(weekset + 1)}>
                    Следующая неделя
                </button> */}
            </div>

            <div className="flex gap-5">
                <button onClick={() => handleClickDay(1)}>Пн</button>
                <button onClick={() => handleClickDay(2)}>Вт</button>
                <button onClick={() => handleClickDay(3)}>Ср</button>
                <button onClick={() => handleClickDay(4)}>Чт</button>
                <button onClick={() => handleClickDay(5)}>Пт</button>
                <button onClick={() => handleClickDay(6)}>Сб</button>
                <button onClick={() => handleClickDay(7)}>Вс</button>
            </div>

            {dataset && (
                <div>
                    <Table>
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
                </div>
            )}
        </section>
    );
}
