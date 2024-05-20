
import { PrismaClient } from '@prisma/client';
import TimeTable from './TimeTable';


export default async function TimeTablePage() {
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
