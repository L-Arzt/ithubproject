'use client'

import { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import Link from 'next/link';
export default function TimeTable({ data, weekRange }) {

    const [dataset, setDataset] = useState(data)

    const [weekset, setWeekset] = useState(0);

    const [day, setDay] = useState(1)

    function getDateFromDay(date, day) {
        var result = new Date(date);
        result.setDate(result.getDate() + (day - 1));
        return new Intl.DateTimeFormat('lt').format(result);
    }

    const handleClickDay = (dayNum) => {
        setDay(dayNum)
    }
    console.log(data);
    console.log(weekRange);
    function buildTable(data) {
        let table = []
        for (let i = 1; i < 8; i++) {

            let tablePart = (
                <TableRow>
                    <TableCell>Пара {i}</TableCell>

                    {
                        dataset.map((aud) => {

                            const lesson = aud.rasp.find(lesson => lesson.weekDay === day && lesson.numberLesson === i);
                            if (lesson) {
                                return (
                                    <TableCell key={aud.class}>
                                        <p>{lesson.teacher}</p>
                                        <p>{lesson.discipline}</p>
                                        <p>{lesson.group}</p>
                                    </TableCell>
                                )
                            }
                            else {
                                // console.log(aud.rasp);
                                // console.log('asdas');
                                return (<TableCell className="gap-5" key={aud.class}>
                                    <Link href={`/User/book/${i}/${day}/${aud.class}/${getDateFromDay(new Date(weekRange.monday), day)}`}>
                                        <h1>Пары нету</h1>
                                        <div className='bg-red-300 h-3 w-3 rounded-sm'> </div>
                                    </Link>
                                </TableCell>)
                            }
                        })


                    }

                </TableRow>
            )

            table.push(tablePart)

        }

        return table
    }


    return (
        <section className='flex items-center justify-center flex-col gap-10'>
            <div className='flex gap-5'>
                <button onClick={() => setWeekset(weekset - 1)}>Предыдущая неделя</button>
                <button onClick={() => setWeekset(weekset + 1)}>Следующая неделя</button>
            </div>

            <div className='flex gap-5'>
                <button onClick={() => handleClickDay(1)}>Понедельник</button>
                <button onClick={() => handleClickDay(2)}>Вторник</button>
                <button onClick={() => handleClickDay(3)}>Среда</button>
                <button onClick={() => handleClickDay(4)}>Четверг</button>
                <button onClick={() => handleClickDay(5)}>Пятница</button>
                <button onClick={() => handleClickDay(6)}>Суббота</button>
                <button onClick={() => handleClickDay(7)}>Воскресенье</button>
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

                        <TableBody >
                            {buildTable(dataset)}
                        </TableBody>

                    </Table>

                </div>
            )}
        </section>
    )
}
