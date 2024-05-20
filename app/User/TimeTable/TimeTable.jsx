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
export default function TimeTable({ data }) {

    function bookClass() {

    }

    const [day, setDay] = useState(1)
    const handleClick = (dayNum) => {
        setDay(dayNum)
    }
    function buildTable(data) {
        let table = []
        for (let i = 1; i < 8; i++) {

            let tablePart = (
                <TableRow>
                    <TableCell>Пара {i}</TableCell>

                    {
                        data.map((aud) => {

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
                                console.log(aud.rasp);
                                console.log('asdas');
                                return (<TableCell className="gap-5" key={aud.class}>
                                    <Link href={`/book/${i}`}>
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
                <button onClick={() => handleClick(1)}>Понедельник</button>
                <button onClick={() => handleClick(2)}>Вторник</button>
                <button onClick={() => handleClick(3)}>Среда</button>
                <button onClick={() => handleClick(4)}>Четверг</button>
                <button onClick={() => handleClick(5)}>Пятница</button>
                <button onClick={() => handleClick(6)}>Суббота</button>
                <button onClick={() => handleClick(7)}>Воскресенье</button>
            </div>

            {data && (
                <div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead></TableHead>
                                {data.map((aud) => (
                                    <TableHead key={aud.class}>{aud.class}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody >
                            {buildTable(data)}
                        </TableBody>

                    </Table>

                </div>
            )}
        </section>
    )
}
