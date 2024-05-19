

import { Prisma } from '@prisma/client';
import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { get } from 'http';
import { PrismaClient } from '@prisma/client';

export default async function TimeTable() {
    const prisma = new PrismaClient()

    const ClassRooms = ['8-621а', '8-623б', '11-112',]

    async function getData() {
        let data = []
        for (let room of ClassRooms) {
            const resp = await prisma.timetable.findMany({
                where: {
                    classroom: room
                }
            })

            console.log({ resp });

            data.push({
                class: room,
                rasp: resp
            })
        }
        return data;

    }
    const data = await getData()


    console.log(data)

    let day = 5

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
                                return (<TableCell className="gap-5" key={aud.class}>
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
