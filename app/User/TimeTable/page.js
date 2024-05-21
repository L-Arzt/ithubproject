
import { PrismaClient } from '@prisma/client';
import TimeTable from './TimeTable';


export default async function TimeTablePage() {
    const prisma = new PrismaClient()
    const ClassRooms = ['8-621а', '8-623б', '11-112',]

    async function getData() {




        function getMonday(d) {
            d = new Date(d);
            var day = d.getDay(),
                diff = d.getDate() - day + (day == 0 ? -6 : 1);
            return new Date(d.setDate(diff));
        }

        console.log(getMonday(new Date()));


        let data = []
        for (let room of ClassRooms) {
            const resp = await prisma.timetable.findMany({
                where: {
                    AND: [
                        { classroom: room },
                        {
                            date: {
                                gte: getMonday(new Date()),
                                lte: getSunday(new Date()) //не существует
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
    const data = await getData()



    return <TimeTable data={data} />
}
