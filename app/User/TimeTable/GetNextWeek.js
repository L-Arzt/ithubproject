import { PrismaClient } from '@prisma/client';
import TimeTable from './TimeTable';
import { useState } from 'react';



export default async function NextWeekTimeTablePage() {



    const prisma = new PrismaClient()
    const ClassRooms = ['8-621а', '8-623б', '11-112',]

    async function getData(weekOffset) {
        function getNextMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff + 7 * weekOffset));
        }

        function getNextSunday(d) {
            d = getNextMonday(d);
            d.setDate(d.getDate() + 7);
            return d;
        }

        let nextMonday = getNextMonday(new Date());
        let nextSunday = getNextSunday(nextMonday);

        console.log(nextMonday);
        console.log(nextSunday);

        let data = []
        for (let room of ClassRooms) {
            const resp = await prisma.timetable.findMany({
                where: {
                    AND: [
                        { classroom: room },
                        {
                            date: {
                                gte: getNextMonday(new Date()),
                                lte: nextSunday
                            }
                        }
                    ]
                }
            })

            data.push({
                class: room,
                rasp: resp
            })
        }
        return data;
    }


        const data = await getData(weekOffset);
        return <TimeTable data={data} weekOffset={weekOffset} setWeekOffset={setWeekOffset} />
    
}
