'use client'
import { useEffect, useState } from 'react';
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { get } from 'http';

export default function TimeTable() {
    // const [classroomId, setClassroomId] = useState(null);
    const [data, setData] = useState([]);
    let day = 5


    const ClassRooms = [
        {
            roomName: '621-а',
            roomId: 210737156
        },

        {
            roomName: '623-б!',
            roomId: 217739053
        },

        {
            roomName: 'svarka!',
            roomId: 218067665
        },

    ]



    useEffect(() => {
        async function getData() {
            let data = []
            for (let room of ClassRooms) {
                const resp = await (await fetch(`https://edu.donstu.ru/api/Rasp?idAudLine=${room.roomId}&sdate=2024-05-06`)).json()
                data.push({
                    class: room.roomName,
                    rasp: resp.data.rasp
                });

            }

            console.table(data);
            setData(data)
        }
        getData()
    }, [])



    function buildTable(data) {
        let table = []
        for (let i = 1; i < 8; i++) {

            let tablePart = (
                <TableRow>
                    <TableCell>Пара {i}</TableCell>

                    {
                        data.map((aud) => {


                            const lesson = aud.rasp.find(lesson => lesson.деньНедели === day && lesson.номерЗанятия === i);
                            if (lesson) {
                                return (
                                    <TableCell key={aud.class}>
                                        <p>{lesson.преподаватель}</p>
                                        <p>{lesson.дисциплина}</p>
                                        <p>{lesson.группа}</p>
                                    </TableCell>
                                )
                            }
                            else {
                                return (<TableCell className="   gap-5" key={aud.class}>
                                    <h1>Пары нету</h1>
                                    <div className='bg-red-300 h-3 w-3 rounded-sm'> </div>
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
            <h1 className='text-xl'>Выберите свой аудиторию</h1>

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

    return (<div></div>)
}
